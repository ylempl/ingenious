<template>
	<section ref="container" v-if="selectedBusStop">
		<h3 class="subtitle">Bus stop: {{ selectedBusStop }}</h3>
		<h4 class="table-title" @click="toggleSort">
			Bus Times
			<span
				class="sort-icon"
				:class="{
					asc: sortDirection === 'ASC',
					desc: sortDirection === 'DESC',
				}"
			/>
		</h4>
		<ul
			ref="content"
			:style="{
				height: `${content - 164}px`,
				overflowY: content ? 'auto' : 'hidden',
			}"
		>
			<p v-if="isLoading">Loading...</p>
			<ol
				v-for="time in busTimes"
				:key="time + Math.random().toFixed(3)"
				:style="{ display: isLoading ? 'none' : 'inherit' }"
			>
				{{
					time
				}}
			</ol>
		</ul>
	</section>
	<section ref="container" class="empty" v-else>
		Please select the bus stop first
	</section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { sortByTime, fakeLag } from '@/utils';

export default defineComponent({
	setup() {
		const store = useStore();
		const busTimes = ref<string[]>([]);
		const container = ref<HTMLDivElement | null>(null);
		const content = ref<number>(0);
		const isLoading = ref<boolean>(false);
		const sortDirection = ref<'ASC' | 'DESC'>('ASC');

		const selectedBusStop = computed(() => store.state.bus.selectedStop);

		const toggleSort = () => {
			sortDirection.value = sortDirection.value === 'ASC' ? 'DESC' : 'ASC';

			isLoading.value = true;

			fakeLag(() => {
				busTimes.value = sortByTime(store.state.bus.times, sortDirection.value);
				isLoading.value = false;
			});
		};

		watch([selectedBusStop], () => {
			content.value = container.value?.clientHeight ?? 0;

			fakeLag(() => {
				busTimes.value = sortByTime(store.state.bus.times);
				isLoading.value = false;
			});
		});

		onMounted(() => {
			busTimes.value = sortByTime(store.state.bus.times);
			content.value = container.value?.clientHeight ?? 0;
		});

		return {
			selectedBusStop,
			busTimes,
			container,
			content,
			toggleSort,
			sortDirection,
			isLoading,
		};
	},
});
</script>

<style scoped lang="scss">
.sort-icon {
	margin-left: 4px;
	font-size: 12px;
	line-height: 1;
	vertical-align: middle;

	&.asc::before {
		content: '▲';
	}

	&.desc::before {
		content: '▼';
	}
}
ol {
	padding: var(--gap-16);
	border-top: 1px solid var(--grey);

	&:hover {
		cursor: pointer;
		background-color: var(--light-grey);
	}
}
</style>
