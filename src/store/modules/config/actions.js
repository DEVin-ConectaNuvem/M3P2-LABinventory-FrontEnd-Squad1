const toggleSidebar = ({ commit }, payload) => {
  commit('TOGGLE_SIDEBAR', payload)
  commit('SET_CONFIGS_LOCAL_STORAGE', payload)
}

const toggleLoading = ({ commit }, payload) => {
  commit('TOGGLE_LOADING', payload)
}

export { toggleSidebar, toggleLoading }
