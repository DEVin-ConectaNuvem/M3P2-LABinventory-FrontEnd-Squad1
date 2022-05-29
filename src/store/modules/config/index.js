import {toggleSidebar} from './actions'
import {UPDATE_CONFIGS_LOCAL_STORAGE, TOGGLE_SIDEBAR, SET_CONFIGS_LOCAL_STORAGE } from './mutations'

export default {
  namespaced: true,
  state() {
    return {
      configs: {
        sidebarVisible: false,
      },
    };
  },
  actions: {
    toggleSidebar,
},
  mutations: {
    UPDATE_CONFIGS_LOCAL_STORAGE,
    TOGGLE_SIDEBAR,
    SET_CONFIGS_LOCAL_STORAGE,
  },
};