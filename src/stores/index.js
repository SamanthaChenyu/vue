// store/index.js
import { createStore } from 'vuex';

// 創建一個 Vuex store
const store = createStore({
  state: {
    currentArea: {},
  },
  mutations: {
    updateCurrentArea(state, payload) {
      state.currentArea = payload;
    },
  },
  actions: {
    setCurrentArea({ commit }, payload) {
      commit('updateCurrentArea', payload);
    },
  },
  getters: {
    getCurrentArea(state) {
      return state.currentArea;
    },
  },
});

export default store;
