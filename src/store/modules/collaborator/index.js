import { registerCollaborator, editCollaborator } from './actions';
import { UPDATE_COLLABORATOR_LOCAL_STORAGE, REGISTER_COLLABORATOR, EDIT_COLLABORATOR, SET_COLLABORATOR_LOCAL_STORAGE } from './mutations';


export default {
  namespaced: true,
  state() {
    return {
      collaborators: [],
      collaboratorSelected: [],
    };
  },
  actions: {
    registerCollaborator,
    editCollaborator,
  },
  mutations: {
    UPDATE_COLLABORATOR_LOCAL_STORAGE,
    REGISTER_COLLABORATOR, 
    EDIT_COLLABORATOR,
    SET_COLLABORATOR_LOCAL_STORAGE,
  },
};
