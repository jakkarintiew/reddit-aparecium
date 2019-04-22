import axios from 'axios'

const state = {
  arrayData: {},
  treeData: [],
  arrayLoading: false,
  treeLoading: false
}

const getters = {
  getarrayData: state => state.arrayData,
  gettreeData: state => state.treeData,
  getarrayLoading: state => state.arrayLoading,
  gettreeLoading: state => state.treeLoading
}

const actions = {
  async fetcharrayData ({ commit }, inputUrl) {
    commit('setarrayLoading', true)

    // console.log(`Loading? ${state.arrayLoading}`)
    // console.log('Fetching API Array Data...')

    const response = await axios.get(
      `http://127.0.0.1:5000/api/array?post_url=${inputUrl}`
    )

    // console.log(response)

    commit('setarrayLoading', false)
    commit('setarrayData', response.data)

    // console.log(`Loading? ${state.arrayLoading}`)
  },

  async fetchtreeData ({ commit }, inputUrl) {
    commit('settreeLoading', true)
    // console.log(`Loading? ${state.treeLoading}`)
    // console.log('Fetching API Tree Data...')
    const response = await axios.get(
      `http://127.0.0.1:5000/api/tree?post_url=${inputUrl}`
    )
    // console.log(response)
    commit('settreeLoading', false)
    commit('settreeData', response.data)
    // console.log(`Loading? ${state.treeLoading}`)
  }
}

const mutations = {
  setarrayData: (state, arrayData) => (state.arrayData = arrayData),
  settreeData: (state, treeData) => (state.treeData = treeData),
  setarrayLoading: (state, loading) => (state.arrayLoading = loading),
  settreeLoading: (state, loading) => (state.treeLoading = loading)
}

export default {
  state,
  getters,
  actions,
  mutations
}
