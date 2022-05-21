const registerCollaborator = ({ commit }, payload) => {
    commit("UPDATE_COLLABORATOR_LOCAL_STORAGE");
    commit("REGISTER_COLLABORATOR", payload);
};


export { registerCollaborator };

