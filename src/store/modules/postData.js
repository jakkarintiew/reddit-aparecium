import axios from 'axios';

const state = {
  arrayData: {},
  treeData: []
};

const getters = {
  getarrayData: state => state.arrayData,
  gettreeData: state => state.treeData
};

const actions = {
  // Static Array
  async fetcharrayData({ commit }, inputUrl) {
    console.log("Fetching Array Data...")
    const response = await axios.get("https://raw.githubusercontent.com/jakkarintiew/CX4242-Spring-2019-Project/api/data/array_n412.json?token=AHHR7PFTT77WS4JU4UJVND24YO34K");
    commit('setarrayData', response.data);
  },
  // Static Tree
  async fetchtreeData({ commit }, inputUrl) {
    console.log("Fetching Tree Data...")
    const response = await axios.get("https://raw.githubusercontent.com/jakkarintiew/CX4242-Spring-2019-Project/api/data/tree_n412.json?token=AHHR7PFVQKYVYHVL5YCIHK24YO34O");
    commit('settreeData', response.data);
  }
};

const mutations = {
  setarrayData: (state, arrayData) => (state.arrayData = arrayData),
  settreeData: (state, treeData) => (state.treeData = treeData)

};

export default {
  state,
  getters,
  actions,
  mutations
};