import Vue from 'vue';
import Vuex from 'vuex';
import postData from './modules/postData';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    postData
  }
});