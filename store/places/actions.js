export default {
  async fetchItems({ commit }) {
    const query = `
      geo(count: 25) {
        data {
          id
          name
        }
      }
    `;

    const geo = await this.$axios.$post('/', {query});

    console.log(geo);

    commit('setItems', geo.data);
    // commit('setCategories', categories.data);
  }
}
