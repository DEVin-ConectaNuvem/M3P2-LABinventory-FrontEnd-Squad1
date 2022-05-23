const registerItem = ({ commit }, payload) => {
    commit("UPDATE_ITEMS_LOCAL_STORAGE");
    commit("REGISTER_ITEM", payload);
  };
  const editItem = ({ commit }, payload) => {
    commit("UPDATE_ITEMS_LOCAL_STORAGE");
    commit("EDIT_ITEM", payload);
    commit("SET_ITEM_LOCAL_STORAGE")
  };
  
  export { registerItem, editItem };
  