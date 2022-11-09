const registerCollaborator = ({ commit }, payload) => {
  commit("REGISTER_COLLABORATOR", payload);
};
const editCollaborator = ({ commit }, payload) => {
  commit("EDIT_COLLABORATOR", payload);
  commit("UPDATE_COLLABORATOR_LOCAL_STORAGE");
};

export { registerCollaborator, editCollaborator };
