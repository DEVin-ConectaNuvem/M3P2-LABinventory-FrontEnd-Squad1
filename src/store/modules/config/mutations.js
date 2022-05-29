const UPDATE_CONFIGS_LOCAL_STORAGE = (state) => {
    state.configs.sidebarVisible = localStorage.getItem("configs")
      ? JSON.parse(localStorage.getItem("configs"))
      : [];
  };
  
  const SET_CONFIGS_LOCAL_STORAGE = (state) => {
    localStorage.setItem("configs", JSON.stringify(state.configs.sidebarVisible));
  }
  
  const TOGGLE_SIDEBAR = (state) => {
    state.configs.sidebarVisible = !state.configs.sidebarVisible;
    localStorage.setItem("configs", JSON.stringify(state.configs.sidebarVisible));
  };




export {UPDATE_CONFIGS_LOCAL_STORAGE, TOGGLE_SIDEBAR, SET_CONFIGS_LOCAL_STORAGE }