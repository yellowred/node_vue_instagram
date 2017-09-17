import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Fresh from '@/components/Fresh'
import Featured from '@/components/Featured'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/fresh',
      name: 'Fresh',
      component: Fresh
    },
    {
      path: '/featured',
      name: 'Featured',
      component: Featured
    }
  ]
})
