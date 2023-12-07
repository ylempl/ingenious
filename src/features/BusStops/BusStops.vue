<template>
	<section ref="container" v-if="selectedBusLine">
		<h3 class="subtitle">Bus line: {{ selectedBusLine }}</h3>
		<h4 class="table-title" @click="toggleSort">
			Bus Time
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
				v-for="bus in busStops"
				:key="bus.stop + Math.random().toFixed(5)"
				@click="loadBusTimes(bus.stop)"
				:style="{ display: isLoading ? 'none' : 'inherit' }"
				:class="{ active: selectedBusStop === bus.stop }"
			>
				{{
					bus.order
				}}.
				{{
					bus.stop
				}}
			</ol>
		</ul>
	</section>
	<section ref="container" class="empty" v-else>
		Please select the bus line first
	</section>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { fakeLag, sort } from '@/utils';

export default defineComponent({
	setup() {
		const store = useStore();
		const busStops = ref();
		const container = ref<HTMLDivElement | null>(null);
		const content = ref<number>(0);
		const isLoading = ref<boolean>(false);
		const sortDirection = ref<'ASC' | 'DESC'>('ASC');

		const selectedBusLine = computed(() => store.state.bus.selectedBus);
		const selectedBusStop = computed(() => store.state.bus.selectedStop);

		const loadBusTimes = (stop: string) => {
			store.dispatch('bus/selectBusStop', stop);
		};

		const toggleSort = () => {
			sortDirection.value = sortDirection.value === 'ASC' ? 'DESC' : 'ASC';

			isLoading.value = true;

			fakeLag(() => {
				busStops.value = sort(store.state.bus.stops, sortDirection.value);
				isLoading.value = false;
			});
		};

		watch([selectedBusLine], () => {
			isLoading.value = true;

			fakeLag(() => {
				busStops.value = sort(store.state.bus.stops, 'ASC');
				isLoading.value = false;
			});
		});

		onMounted(() => {
			busStops.value = sort(store.state.bus.stops, 'ASC');
			content.value = container.value?.clientHeight ?? 0;
		});

		return {
			selectedBusLine,
			selectedBusStop,
			busStops,
			container,
			content,
			loadBusTimes,
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

	&:hover,
	&.active {
		cursor: pointer;
		background-color: var(--light-grey);
	}
}
</style>
