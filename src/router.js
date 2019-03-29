import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Aparecium from '@/views/Aparecium.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/comments/:postId',
      name: 'aparecium',
      component: Aparecium,
      props: true
    }
  ]
})
