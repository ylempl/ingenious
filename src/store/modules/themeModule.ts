import { Module } from 'vuex';

interface ThemeState {
  darkMode: boolean;
}

const themeModule: Module<ThemeState, unknown> = {
  namespaced: true,
  state: () => ({
    darkMode: false,
  }),
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit('toggleDarkMode');
    },
  },
};

export default themeModule;