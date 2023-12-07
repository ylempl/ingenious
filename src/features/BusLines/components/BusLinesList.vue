<template>
	<ul>
		<ol
			ref="line"
			v-for="line in busLines"
			:key="line"
			@click="loadBusStops(line)"
			:class="{
				active: selectedBusLine === line,
			}"
		>
			{{
				line
			}}
		</ol>
	</ul>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	props: {
		busLines: {
			type: Array as PropType<Array<number>>,
		},
	},
	setup(props, { emit }) {
		const store = useStore();
		const selectedBusLine = computed(() => store.state.bus.selectedBus);

		const loadBusStops = (line: number) => {
			emit('bus-line-click', line);
		};

		return {
			selectedBusLine,
			loadBusStops,
		};
	},
});
</script>

<style scoped lang="scss">
ul {
	flex-direction: row;
	ol {
		cursor: pointer;
		background: var(--blue);
		padding: calc(var(--gap-16) / 2) var(--gap-16);
		border-radius: var(--round);
		margin-right: calc(var(--gap-16) / 2);
		color: var(--white);

		&.active {
			background-color: var(--dark-blue);
		}

		&.disabled {
			pointer-events: none;
		}
	}
}
</style>
