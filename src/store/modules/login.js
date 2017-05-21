import * as types from '../mutation-types'

// initial state
const state = {
  loginVisible: false,
  registerVisible: false
}

// getters
const getters = {
  loginVisible: state => state.loginVisible,
  registerVisible: state => state.registerVisible
}

// actions
const actions = {
  toggleLogin: ({ commit }) => {
    commit(types.TOGGLE_LOGIN)
  },
  toggleRegister: ({ commit }) => {
    commit(types.TOGGLE_REGISTER)
  }
}

// mutations
const mutations = {
  [types.TOGGLE_LOGIN] (state) {
    state.loginVisible = !state.loginVisible
  },
  [types.TOGGLE_REGISTER] (state) {
    state.registerVisible = !state.registerVisible
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
