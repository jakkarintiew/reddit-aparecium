const state = {
  loading: false
};

const getters = {
  getLoading: state => state.loading
};

const actions = {
  changeLoadingTrue({
    commit
  }) {
    commit('setLoadingTrue');
  },
  changeLoadingFalse({
    commit
  }) {
    commit('setLoadingFalse');
  },
};

const mutations = {
  setLoadingTrue: state => (state.loading = true),
  setLoadingFalse: state => (state.loading = false)
};

export default {
  state,
  getters,
  actions,
  mutations
};