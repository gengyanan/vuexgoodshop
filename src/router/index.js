import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/view/shop'
import Project from '../vuex-project/project'
import Item from '@/components/shop-item'
import Cart from '@/view/cart'
import PayMent from '@/view/payment'
import Account from '@/view/account'
import Order from '@/view/order'
import Chidren from '@/vuex-project/router-children'
import UserProfile from '@/vuex-project/profile/profile'
import UserSettings from '@/vuex-project/usersetting/UserSettings'
import UserEmailsSubscriptions from '@/vuex-project/usersetting/email'
import UserProfilePreview from '@/vuex-project/usersetting/profile'

const Checkout = () => import('@/view/checkout')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: Shop,
    },
    {
      path: '/project',
      name: 'Project',
      component: Project,
    },
    {
      path: '/item',
      name: 'Item',
      component: Item,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
    },
    {
      path: '/payment',
      name: 'PayMent',
      component: PayMent,
    },
    {
      path: '/account',
      component: Account,
      children: [
        {
          path: '',
          name: 'Account',
          component: Order,
        }
      ]
    },
    {
      path: '/chidren/:id?',
      name: 'Chidren',
      component: Chidren,
      children: [{
        path: 'profile', //当不写的时候直接渲染在页面上，如果写上就得去对应的路径下访问/user/:id/profile
        component: UserProfile
      }]
    },
    {
      path: '/settings',
      // You could also have named views at tho top
      component: UserSettings,
      children: [{
        path: 'emails',
        components:{
          default:UserEmailsSubscriptions,
          per:UserProfilePreview,
        }
      }, {
        path: 'profile',
        components: {
          default: UserProfile,
          helper: UserProfilePreview
        }
      }]
    }
  ]
})
