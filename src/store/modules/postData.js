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
    const response = await axios.get("https://raw.githubusercontent.com/jakkarintiew/CX4242-Spring-2019-Project/api/data/comment_tree_array_scheme.json?token=AHHR7PDE4YS2IEW7Y2O4MQC4YI6DY");
    commit('setarrayData', response.data);
  },
  // Static Tree
  async fetchtreeData({ commit }, inputUrl) {
    console.log("Fetching Tree Data...")
    const response = await axios.get("https://raw.githubusercontent.com/jakkarintiew/CX4242-Spring-2019-Project/Data/comment_tree.json?token=AHHR7PE4USJGBOYYWHKNJ4S4YI65C");
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