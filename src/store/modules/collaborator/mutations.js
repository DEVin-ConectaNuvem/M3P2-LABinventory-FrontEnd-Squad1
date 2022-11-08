const UPDATE_COLLABORATOR_LOCAL_STORAGE = (state) => {
  state.collaborators = localStorage.getItem("collaborators")
    ? JSON.parse(localStorage.getItem("collaborators"))
    : [];
};

const SET_COLLABORATOR_LOCAL_STORAGE = (state) => {
  localStorage.setItem("collaborators", JSON.stringify(state.collaborators));
};

const REGISTER_COLLABORATOR = (state, payload) => {
  state.collaborators.push(payload);
  localStorage.setItem("collaborators", JSON.stringify(state.collaborators));
};

const EDIT_COLLABORATOR = (state, payload) => {
  state.collaborators.forEach((collaborator, index) => {
    if (collaborator.id === payload.id) {
      state.collaborators[index] = payload;
    }
  });
};

export {
  UPDATE_COLLABORATOR_LOCAL_STORAGE,
  REGISTER_COLLABORATOR,
  EDIT_COLLABORATOR,
  SET_COLLABORATOR_LOCAL_STORAGE,
};
