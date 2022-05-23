const UPDATE_ITEMS_LOCAL_STORAGE = (state) => {
    state.items = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [];
  };
  
  const SET_ITEM_LOCAL_STORAGE = (state) => {
    localStorage.setItem("items", JSON.stringify(state.items));
  }
  
  const REGISTER_ITEM = (state, payload) => {
    state.items.push(payload);
    localStorage.setItem("items", JSON.stringify(state.items));
  };
  
  const EDIT_ITEM = (state, payload) => {
    state.items.forEach((collaborator, index) => {
      if (collaborator.id === payload.id) {
        
        console.log(state.items[index],'stateANTES')
        state.items[index] = payload;
        console.log(state.items[index],'stateAPOS')
      }
    });
  };
  
  export {
    UPDATE_ITEMS_LOCAL_STORAGE,
    REGISTER_ITEM,
    SET_ITEM_LOCAL_STORAGE,
    EDIT_ITEM
  };
  