const registerItem = ({ commit }, payload) => {
    commit("REGISTER_ITEM", payload);
    commit("UPDATE_ITEMS_LOCAL_STORAGE");
  };

const editItem = ({ commit }, payload) => {
    commit("EDIT_ITEM", payload);
    commit("UPDATE_ITEMS_LOCAL_STORAGE");
};

const setLoanItem = ({ commit }, payload) => {
    commit("SET_LOAN_ITEM", payload);
    commit("UPDATE_ITEMS_LOCAL_STORAGE");
};
  
  export { registerItem, editItem, setLoanItem };
  