import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

// Vue.filter('dateSnippet', function (value) {
//   if (value) {
//     return value.slice(0, 10)
//   }
// })

// Vue.filter('dateDot', function (value) {
//   if (value) {
//     return value.replace(/-/g, '.')
//   }
// })

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('YYYY.MM.DD')
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogined) {
      next({
        name: 'Home'
      }, alert('Please login first!'))
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
