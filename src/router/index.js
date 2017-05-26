import Vue from 'vue'
import Router from 'vue-router'
import Song from '@/components/Song'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Song',
      component: Song
    }
  ]
})
