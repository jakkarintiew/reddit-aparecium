import axios from 'axios'

const state = {
  username: String,
  about: {},
  comments: [],
  submitted: [],
  commentsLoading: false,
  submittedLoading: false
}

const getters = {
  getUsername: state => state.username,
  getAbout: state => state.about,
  getComments: state => state.comments,
  getSubmitted: state => state.submitted,
  getCommentsLoading: state => state.commentsLoading,
  getSubmittedLoading: state => state.submittedLoading
}

const actions = {
  async fetchAbout ({ commit }) {
    const response = await axios.get(
      `https://www.reddit.com/user/${state.username}/about/.json`
    )

    commit('setAbout', response.data.data)
  },

  async fetchComments ({ commit, dispatch }, after) {
    commit('setLoadingComments', true)
    const response = await axios.get(
      `https://www.reddit.com/user/${
        state.username
      }/comments.json?limit=100&after=${after}`
    )

    let arr = response.data.data.children

    // Add additional posts to array
    arr.forEach(item => {
      commit('pushComments', item)
    })

    // No more comments
    if (arr.length < 100) {
      commit('setLoadingComments', false)
      return
    }
    // If there's (almost certainly) more, recursively fetch more
    if (arr.length == 100) {
      dispatch('fetchComments', arr[99].data.name)
    }
  },

  async fetchSubmitted ({ commit, dispatch }, after) {
    commit('setLoadingSubmitted', true)
    const response = await axios.get(
      `https://www.reddit.com/user/${
        state.username
      }/submitted.json?limit=100&after=${after}`
    )

    let arr = response.data.data.children

    // Add additional posts to array
    arr.forEach(item => {
      commit('pushSubmitted', item)
    })

    // No more posts
    if (arr.length < 100) {
      commit('setLoadingSubmitted', false)
      return
    }

    // If there's (almost certainly) more, recursively fetch more
    if (arr.length == 100) {
      dispatch('fetchSubmitted', arr[99].data.name)
    }
  }
}

const mutations = {
  setUsername: (state, username) => (state.username = username),
  setAbout: (state, about) => (state.about = about),
  pushComments: (state, item) => state.comments.push(item),
  pushSubmitted: (state, item) => state.submitted.push(item),
  setLoadingComments: (state, loading) => (state.commentsLoading = loading),
  setLoadingSubmitted: (state, loading) => (state.submittedLoading = loading)
}

export default {
  state,
  getters,
  actions,
  mutations
}
