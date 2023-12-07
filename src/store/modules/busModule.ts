import { Module } from 'vuex';
import { Bus, BusStop } from '@/features/BusLines/types';
import { getBusLines, getBusStops, getBusTimes } from '@/utils';

interface BusScheduleState {
	schedules: Bus[];
	lines: number[];
	stops: BusStop[];
	times: string[];
	searchStop: string;
	selectedBus?: number | null;
	selectedStop?: string | null;
	selectedLine?: number | null;
}

const busScheduleModule: Module<BusScheduleState, unknown> = {
	namespaced: true,
	state: {
		schedules: [],
		lines: [],
		stops: [],
		times: [],
		searchStop: '',
		selectedLine: null,
		selectedBus: null,
		selectedStop: null,
	},
	mutations: {
		setSchedules(state, newSchedules) {
			state.schedules = newSchedules;
		},
		setLines(state, newLines) {
			state.lines = newLines;
		},
		setStops(state, newStops) {
			state.stops = newStops;
		},
		setTimes(state, newTimes) {
			state.times = newTimes;
		},
		setSelectedLine(state, newSelectedLine) {
			state.selectedLine = newSelectedLine;
		},
		setSelectedBus(state, newSelectedBus) {
			state.selectedBus = newSelectedBus;
		},
		setSelectedStop(state, newSelectedStop) {
			state.selectedStop = newSelectedStop;
		},
		setSearchStop(state, newSearchStop) {
			state.searchStop = newSearchStop;
		},
	},
	actions: {
		async fetchBusData({ commit }, endpoint: string) {
			try {
				const response = await fetch(endpoint);
				const data = await response.json();
				commit('setSchedules', data);
				commit('setLines', getBusLines(data));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		},
		selectBusLine({ commit, state }, bus: number) {
			commit('setTimes', []);
			commit('setSelectedStop', '');
			commit('setSelectedLine', bus);
			commit('setSelectedBus', bus);
			commit('setStops', getBusStops(state.schedules, bus));
		},
		selectBusStop({ commit, state }, stop: string) {
			commit('setSelectedStop', stop);
			commit('setTimes', getBusTimes(state.stops, stop));
		},
		setSearchInput({ commit }, query: string) {
			commit('setSearchStop', query);
		},
	},
};

export default busScheduleModule;
