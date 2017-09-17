// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
// import store from './store'
import { createStore } from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

import titleMixin from './util/title'
import * as filters from './util/filters'

// mixin for handling title
Vue.mixin(titleMixin)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

const store = createStore()
sync(store, router)

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  data: {fresh:[], featured: []},
  template: '<App/>',
  components: { App },
  methods: {
  }
})
