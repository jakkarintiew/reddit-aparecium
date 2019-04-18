import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
import 'aos/dist/aos.css';
import AOS from 'aos';  
import Vuebar from 'vuebar';
import Affix from 'vue-affix';

AOS.init();
Vue.use(SequentialEntrance);
Vue.use(Vuebar);
Vue.use(Affix);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')