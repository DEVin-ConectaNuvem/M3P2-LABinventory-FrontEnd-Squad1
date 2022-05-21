const UPDATE_COLLABORATOR_LOCAL_STORAGE = (state) =>{
    state.collaborators = localStorage.getItem("collaborators") ? JSON.parse(localStorage.getItem("collaborators")) : [];
}

const REGISTER_COLLABORATOR = (state, payload) =>{
    state.collaborators.push(payload);
    localStorage.setItem("collaborators", JSON.stringify(state.collaborators));
}

export  { UPDATE_COLLABORATOR_LOCAL_STORAGE, REGISTER_COLLABORATOR };