import axios from 'axios';

const state = {
  postData: []
};

const getters = {
  getPostData: state => state.postData
};

const actions = {
  async fetchPostData({ commit }, inputUrl) {
    const response = await axios.get(inputUrl + ".json");
    commit('setPostData', response.data);
  }
};

const mutations = {
  setPostData: (state, postData) => (state.postData = postData)
};

export default {
  state,
  getters,
  actions,
  mutations
};