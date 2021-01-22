export default [
  {
    path: '/productDetail',
    name: 'productDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "productDetail" */ '../views/app/productDetail.vue'),
    meta: {
      title: '商品详情'
    }
  }
]