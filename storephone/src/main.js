import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import $api from './assets/js/api'
import $http from '@/assets/js/https.js'
import $util from '@/assets/js/common.js'
import { toast } from '@nutui/nutui'
toast.install(Vue)
import Vconsole from 'vconsole';
new Vconsole();
// import '@nutui/nutui/dist/nutui.css';
Vue.config.productionTip = false
Vue.prototype.$http = $http
Vue.prototype.$api = $api
Vue.prototype.$util = $util
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
