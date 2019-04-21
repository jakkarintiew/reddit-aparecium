import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
import 'aos/dist/aos.css'
import AOS from 'aos'
import Vuebar from 'vuebar'
import Affix from 'vue-affix'
import VueScrollTo from 'vue-scrollto'
import VueResource from 'vue-resource'

AOS.init()
Vue.use(SequentialEntrance)
Vue.use(Vuebar)
Vue.use(Affix)
Vue.use(VueScrollTo, {
  container: '#scrollContainer',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
