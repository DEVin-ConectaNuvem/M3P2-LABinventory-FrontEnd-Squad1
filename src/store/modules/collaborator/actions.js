const registerCollaborator = ({ commit }, payload) => {
  commit("UPDATE_COLLABORATOR_LOCAL_STORAGE");
  commit("REGISTER_COLLABORATOR", payload);
};
const editCollaborator = ({ commit }, payload) => {
  commit("UPDATE_COLLABORATOR_LOCAL_STORAGE");
  commit("EDIT_COLLABORATOR", payload);
  commit("SET_COLLABORATOR_LOCAL_STORAGE");
};

export { registerCollaborator, editCollaborator };
