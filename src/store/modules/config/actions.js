const toggleSidebar = ({ commit }, payload) => {
  commit("TOGGLE_SIDEBAR", payload);
  commit("SET_CONFIGS_LOCAL_STORAGE", payload);
};

export { toggleSidebar };
