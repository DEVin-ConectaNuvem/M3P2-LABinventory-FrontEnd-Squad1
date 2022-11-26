import { toggleSidebar } from './actions'
import {
  UPDATE_CONFIGS_LOCAL_STORAGE,
  TOGGLE_SIDEBAR,
  SET_CONFIGS_LOCAL_STORAGE,
  SET_PAGE_NAME
} from './mutations'

export default {
  namespaced: true,
  state() {
    return {
      configs: {
        sidebarVisible: false,
        pageName: ''
      }
    }
  },
  actions: {
    toggleSidebar
  },
  mutations: {
    UPDATE_CONFIGS_LOCAL_STORAGE,
    TOGGLE_SIDEBAR,
    SET_CONFIGS_LOCAL_STORAGE,
    SET_PAGE_NAME
  }
}
