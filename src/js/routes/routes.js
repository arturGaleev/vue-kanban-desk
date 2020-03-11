import Home from '../../templates/views/Home.vue'
import ErrorComp from '../../templates/views/404.vue'
import store from './../store/index.js'

export const routes = [
  {
    path: '/',
    component: Home,
    beforeEnter (to, from, next) {
      store.dispatch('fetchData')
        .then(() => {
          next(true)
        })
        .catch(err => {
          console.log(err)
          next(true)
        })
    }
  },
  {
    path: '*',
    component: ErrorComp,
    name: '404'
  }
]
