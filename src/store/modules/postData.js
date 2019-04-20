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
    // console.log("Fetching Static Array Data...")
    // const response = await axios.get("https://raw.githubusercontent.com/jakkarintiew/CX4242-Spring-2019-Project/api/data/array_n412.json?token=AHHR7PFTT77WS4JU4UJVND24YO34K");

    // console.log("Fetching API Array Data...")
    const response = await axios.get("http://127.0.0.1:5000/api/array?post_url=" + inputUrl + "&use_bow=true&use_textblob=false");

    commit('setarrayData', response.data);
  },
  // Static Tree
  async fetchtreeData({ commit }, inputUrl) {
    // console.log("Fetching Static Tree Data...")
    // const response = await axios.get("https://raw.githubusercontent.com/jakkarintiew/CX4242-Spring-2019-Project/api/data/tree_n412.json?token=AHHR7PFVQKYVYHVL5YCIHK24YO34O");

    // console.log("Fetching API Tree Data...")
    const response = await axios.get("http://127.0.0.1:5000/api/tree?post_url=" + inputUrl + "&use_bow=true&use_textblob=false");

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