// store/index.js
import { createStore } from 'vuex';

// 創建一個 Vuex store
const store = createStore({
  state: {
    currentArea: {},
    isScreenWidth: null, // 視窗寬度
  },
  mutations: {
    updateCurrentArea(state, payload) {
      state.currentArea = payload;
    },
    updateIsScreenWidth(state, payload) {
      state.isScreenWidth = payload;
    }
  },
  actions: {
    setCurrentArea({ commit }, payload) {
      commit('updateCurrentArea', payload);
    },
    setIsScreenWidth({ commit }, payload) {
      commit('updateIsScreenWidth', payload);
    }   
  },
  getters: {
    getCurrentArea(state) {
      return state.currentArea;
    },
    getIsScreenWidth(state) {
      return state.isScreenWidth;
    },
  },
});

export default store;
