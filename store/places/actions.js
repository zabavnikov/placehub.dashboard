export default {
  async fetchItems({ commit }) {
    const query = `
      map(count: 25) {
        data {
          id
          name
        }
      }
    `;

    const map = await this.$axios.$post('/', {query});

    console.log(map);

    commit('setItems', map.data);
    // commit('setCategories', categories.data);
  }
}
