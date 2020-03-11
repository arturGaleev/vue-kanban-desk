// scss
import './../scss/main.scss'
import '@babel/polyfill'

import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes/routes.js'
import store from './store/index.js'
import App from '../templates/App.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

Vue.directive('click-outside', {
  bind (el, binding) {
    el.addEventListener('click', e => e.stopPropagation())
    document.body.addEventListener('click', binding.value)
  },
  unbind (el, binding) {
    document.body.removeEventListener('click', binding.value)
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
