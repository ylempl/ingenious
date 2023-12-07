<template>
	<section ref="container">
		<label for="searchStopInput" />
		<input
			@input="handleSearchInput"
			id="stopInput"
			placeholder="Search for a stop..."
			type="search"
			v-model="searchStopInput"
		/>
		<ul
			ref="content"
			v-if="!isLoading"
			:style="{
				height: `${content - 140}px`,
			}"
			@scroll="handleScroll"
		>
			<li
				v-for="(result, index) in visibleResults"
				:key="index + Math.random().toFixed(5)"
			>
				{{ result.line }} - {{ result.stop }} - {{ result.time }} -
				{{ result.order }}
			</li>
		</ul>
		<p v-else>Loading...</p>
	</section>
</template>
<script lang="ts">
import { Bus } from '@/features/BusLines/types';
import { BUS_STOPS_ENDPOINT } from '@/api/constants';
import { fakeLag, sort } from '@/utils';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		const container = ref<HTMLDivElement | null>(null);
		const content = ref();
		const endIndex = ref<number>(30);
		const isLoading = ref<boolean>(false);
		const searchStopInput = ref<string>('');
		const startIndex = ref<number>(0);
		const store = useStore();

		const busSchedules = computed(() => store.state.bus.schedules);

		onMounted(() => {
			if (store.state.bus.schedules.length === 0) {
				isLoading.value = true;

				fakeLag(() => {
					store.dispatch('bus/fetchBusData', BUS_STOPS_ENDPOINT);
					isLoading.value = false;
				});
			}

			searchStopInput.value = store.state.bus.searchStop;
			content.value = container.value?.clientHeight ?? 0;
		});

		const handleSearchInput = (event: Event): void => {
			const value = (event.target as HTMLInputElement).value;
			isLoading.value = true;

			fakeLag(() => {
				store.dispatch('bus/setSearchInput', value);
				isLoading.value = false;
			});
		};

		const filteredResults = computed<Bus[] | undefined>(() => {
			const searchStopsInput = new RegExp(searchStopInput.value, 'i');
			return sort(
				busSchedules.value.filter((item: Bus) =>
					searchStopsInput.test(item.stop)
				),
				'ASC'
			);
		});

		const visibleResults = computed(() => {
			const start = startIndex.value;
			const end = Math.min(
				start + endIndex.value,
				(filteredResults.value ?? []).length
			);
			return filteredResults.value?.slice(start, end);
		});

		const handleScroll = () => {
			const containerElement = content.value;
			if (containerElement) {
				const scrollTop = containerElement.scrollTop;
				const itemHeight = 50;
				const visibleItems = 20;

				startIndex.value = Math.floor(scrollTop / itemHeight);
				endIndex.value = Math.min(
					startIndex.value + visibleItems,
					(filteredResults.value ?? []).length
				);
			}
		};

		return {
			searchStopInput,
			visibleResults,
			container,
			content,
			isLoading,
			handleScroll,
			handleSearchInput,
		};
	},
};
</script>

<style lang="scss" scoped>
section {
	grid-row-start: 3;
	grid-row-end: 6;

	input {
		margin-bottom: var(--gap-16);
	}

	ul {
		max-height: 750px;
		overflow-y: auto;

		li {
			padding: var(--gap-16);
			border-top: 1px solid var(--grey);

			&:hover,
			&.active {
				background-color: var(--light-grey);
			}
		}
	}
}
</style>
