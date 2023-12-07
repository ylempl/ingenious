<template>
	<BusLines />
	<div class="container">
		<BusStops />
		<BusTimes />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BusLines from '@/features/BusLines/BusLines.vue';
import BusStops from '@/features/BusStops/BusStops.vue';
import BusTimes from '@/features/BusTimes/BusTimes.vue';

export default defineComponent({
	components: {
		BusLines,
		BusStops,
		BusTimes,
	},
});
</script>

<style scoped lang="scss">
.container {
	display: flex;
	gap: var(--gap-16);

	section {
		display: flex;
		flex-direction: column;
		width: 50%;
		border: 1px solid transparent;

		&.empty {
			border: 1px dashed var(--grey);
			color: var(--grey-out-text);
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
