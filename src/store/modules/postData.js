import axios from 'axios';

const state = {
  postData: []
};

const getters = {
  getPostData: state => state.postData
};

const actions = {
  async fetchPostData({ commit }, inputUrl) {
    const response = await axios.get("https://raw.githubusercontent.com/jakkarintiew/CX4242-Spring-2019-Project/api/data/comment_tree.json?token=AHHR7PF45IHQBX53Z5MG7SS4YG2BQ");
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