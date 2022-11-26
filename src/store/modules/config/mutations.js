const UPDATE_CONFIGS_LOCAL_STORAGE = state => {
  state.configs.sidebarVisible = localStorage.getItem('configs')
    ? JSON.parse(localStorage.getItem('configs'))
    : []
}

const SET_CONFIGS_LOCAL_STORAGE = state => {
  localStorage.setItem('configs', JSON.stringify(state.configs.sidebarVisible))
}

const TOGGLE_SIDEBAR = state => {
  state.configs.sidebarVisible = !state.configs.sidebarVisible
  localStorage.setItem('configs', JSON.stringify(state.configs.sidebarVisible))
}

const SET_PAGE_NAME = (state, payload) => {
  state.configs.pageName = payload
}

const TOGGLE_LOADING = (state, payload) => {
  if (payload !== state.configs.loading) {
    state.configs.loading = payload
  }
}


export {
  UPDATE_CONFIGS_LOCAL_STORAGE,
  TOGGLE_SIDEBAR,
  SET_CONFIGS_LOCAL_STORAGE,
  SET_PAGE_NAME,
  TOGGLE_LOADING
}
