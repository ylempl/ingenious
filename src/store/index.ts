import { createStore } from 'vuex';
import themeModule from './modules/themeModule';
import busModule from './modules/busModule';

export default createStore({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		bus: busModule,
		theme: themeModule,
	},
});
