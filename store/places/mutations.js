import Vue from 'vue';

export default {
  setItems(state, data) {
    state.map = data;
  },

  setCategories(state, data) {
    state.categories = data;
  },

  setEditablePlace(state, data) {
    state.editablePlace = data;
  },

  updatePlace(state, data) {
    state.map.data.forEach((item, index) => {
      if (item.id === data.id) {
        Vue.set(state.map.data, index, data);
        state.editablePlace = {};
        return false;
      }
    });
  }
}
