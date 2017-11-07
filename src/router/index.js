import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Listtable from '@/components/Listtable'
import Lendhistory from '@/components/Lendhistory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/listtable',
      name: 'listtable',
      component: Listtable
    },
    {
      path: '/lendhistory',
      name: 'lendhistory',
      component: Lendhistory
    }
  ]
})
