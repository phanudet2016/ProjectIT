import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Fire from '@/components/Fire'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/fire',
      name: 'fire',
      component: Fire
    }
  ]
})
