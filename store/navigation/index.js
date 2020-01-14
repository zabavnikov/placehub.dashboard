const state = () => ({

  active: [],
  open: [],
});

const mutations = {
  setActive(state, active) {
    state.active = active;
  },
  setOpen(state, open) {
    state.open = open;
  }
};

export default {
  state,
  mutations
}
