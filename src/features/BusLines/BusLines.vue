<template>
	<section>
		<h3 class="subtitle">Select Bus Line</h3>
		<BusLinesList
			v-if="!isLoading"
			:busLines="busLines"
			@bus-line-click="loadBusStops"
		/>
		<p v-else>Loading...</p>
	</section>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { BUS_STOPS_ENDPOINT } from '@/api/constants';
import BusLinesList from '@/features/BusLines/components/BusLinesList.vue';
import { Bus } from './types';
import { fakeLag, sortNumbers } from '@/utils';

export default defineComponent({
	components: {
		BusLinesList,
	},
	setup() {
		const store = useStore();
		const isLoading = ref<boolean>(false);

		const loadBusStops = (bus: Bus) => {
			store.dispatch('bus/selectBusLine', bus);
		};

		const busLines = computed(() => sortNumbers(store.state.bus.lines));

		onMounted(() => {
			if (store.state.bus.schedules.length === 0) {
				isLoading.value = true;

				fakeLag(() => {
					store.dispatch('bus/fetchBusData', BUS_STOPS_ENDPOINT);
					isLoading.value = false;
				});
			}
		});

		return {
			busLines,
			isLoading,
			loadBusStops,
		};
	},
});
</script>
