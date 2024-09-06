// store/index.js
import { createStore } from 'vuex';

// 創建一個 Vuex store
const store = createStore({
  state: {
    currentArea: {},
    isScreenWidth: null, // 視窗寬度
    openMenus: new Set() // 記住所有開啟的menuButton
  },
  mutations: {
    updateCurrentArea(state, payload) {
      state.currentArea = payload;
    },
    updateIsScreenWidth(state, payload) {
      state.isScreenWidth = payload;
    },
    toggleMenu(state, menuId) {
      if (state.openMenus.has(menuId)) {
        state.openMenus.delete(menuId);
      } else {
        state.openMenus.add(menuId);
      }
    },
    setOpenMenus(state, menuIds) {
      state.openMenus = new Set(menuIds);
    }
  },
  actions: {
    setCurrentArea({ commit }, payload) {
      commit('updateCurrentArea', payload);
    },
    setIsScreenWidth({ commit }, payload) {
      commit('updateIsScreenWidth', payload);
    },
    toggleMenu({ commit }, menuId) {
      commit('toggleMenu', menuId);
    },
    setOpenMenus({ commit }, menuIds) {
      commit('setOpenMenus', menuIds);
    }   
  },
  getters: {
    getCurrentArea(state) {
      return state.currentArea;
    },
    getIsScreenWidth(state) {
      return state.isScreenWidth;
    },
    isMenuOpen: (state) => (menuId) => {
      return state.openMenus.has(menuId);
    }
  },
});

export default store;
