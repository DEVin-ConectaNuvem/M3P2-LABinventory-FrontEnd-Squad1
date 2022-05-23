import {registerItem, editItem} from './actions'
import {UPDATE_ITEMS_LOCAL_STORAGE, REGISTER_ITEM, SET_ITEM_LOCAL_STORAGE, EDIT_ITEM} from './mutations'

export default {
  namespaced: true,
  state() {
    return {
      items: [],
    };
  },
  actions: {
    registerItem, 
    editItem
  },
  mutations: {
    UPDATE_ITEMS_LOCAL_STORAGE,
    REGISTER_ITEM,
    SET_ITEM_LOCAL_STORAGE,
    EDIT_ITEM
  },
};
