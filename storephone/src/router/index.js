import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import appRouter from './app'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  ...appRouter
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // ...
  if (to.meta.title) {
    document.title = to.meta.title
  }
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  next()
})
export default router
