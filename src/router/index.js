import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Listtable from '@/components/Listtable'
import Lendhistory from '@/components/Lendhistory'
import Approve from '@/components/Approve'
import Signupform from '@/components/Signupform'
import Loginform from '@/components/Loginform'
import Uhome from '@/components/Uhome'
import Ulisttable from '@/components/Ulisttable'
import Ulendhistory from '@/components/Ulendhistory'
import Urequest from '@/components/Urequest'
import Ualert from '@/components/Ualert'
import Uapprove from '@/components/Uapprove'
import Eqmtable from '@/components/Eqmtable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/eqmtable/:id',
      name: 'eqmttable',
      component: Eqmtable
    },
    {
      path: '/uapprove',
      name: 'uapprove',
      component: Uapprove
    },
    {
      path: '/ualert',
      name: 'ualert',
      component: Ualert
    },
    {
      path: '/urequest',
      name: 'urequest',
      component: Urequest
    },
    {
      path: '/ulendhistory',
      name: 'ulendhistory',
      component: Ulendhistory
    },
    {
      path: '/ulisttable',
      name: 'ulisttable',
      component: Ulisttable
    },
    {
      path: '/uhome',
      name: 'uhome',
      component: Uhome
    },
    {
      path: '/home',
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
    },
    {
      path: '/approve',
      name: 'approve',
      component: Approve
    },
    {
      path: '/signupform',
      name: 'signupform',
      component: Signupform
    },
    {
      path: '/',
      name: 'loginform',
      component: Loginform
    }
  ]
})
