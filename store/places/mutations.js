import Vue from 'vue';

export default {
  setItems(state, data) {
    state.geo = data;
  },

  setCategories(state, data) {
    state.categories = data;
  },

  setEditablePlace(state, data) {
    state.editablePlace = data;
  },

  updatePlace(state, data) {
    state.geo.data.forEach((item, index) => {
      if (item.id === data.id) {
        Vue.set(state.geo.data, index, data);
        state.editablePlace = {};
        return false;
      }
    });
  }
}
