import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

// import card from './modules/card'
// import player from './modules/player'
import user from './modules/user'
import upload from './modules/upload'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    upload
  },
  strict: debug
})
