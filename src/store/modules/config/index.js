import { toggleSidebar, toggleLoading } from './actions'
import {
  UPDATE_CONFIGS_LOCAL_STORAGE,
  TOGGLE_SIDEBAR,
  SET_CONFIGS_LOCAL_STORAGE,
  SET_PAGE_NAME,
  TOGGLE_LOADING
} from './mutations'

export default {
  namespaced: true,
  state() {
    return {
      configs: {
        sidebarVisible: false,
        pageName: '',
        loading: false
      }
    }
  },
  actions: {
    toggleSidebar,
    toggleLoading
  },
  mutations: {
    UPDATE_CONFIGS_LOCAL_STORAGE,
    TOGGLE_SIDEBAR,
    SET_CONFIGS_LOCAL_STORAGE,
    SET_PAGE_NAME,
    TOGGLE_LOADING
  }
}
