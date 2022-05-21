import { registerCollaborator } from './actions';
import { UPDATE_COLLABORATOR_LOCAL_STORAGE, REGISTER_COLLABORATOR } from './mutations';

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
  },
  mutations: {
    UPDATE_COLLABORATOR_LOCAL_STORAGE,
    REGISTER_COLLABORATOR
  },
  
};
