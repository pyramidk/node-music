import * as types from '../mutation-types'
import localKeys from '../config'
import axios from 'axios'

// initial state
const state = {
  loginVisible: false,
  registerVisible: false,
  isLogin: false
}

// getters
const getters = {
  loginVisible: state => state.loginVisible,
  registerVisible: state => state.registerVisible,
  isLogin: state => state.isLogin
}

// actions
const actions = {
  init: ({ commit }) => {
    let loginStatus = localStorage.getItem(localKeys.LOGIN_STATUS)
    if (loginStatus) {
      console.log('test')
      commit(types.LOGIN_STATUS)
    }
  },
  toggleLogin: ({ commit }) => {
    commit(types.TOGGLE_LOGIN)
  },
  toggleRegister: ({ commit }) => {
    commit(types.TOGGLE_REGISTER)
  },
  register: ({ commit }, { name, password }) => {
    axios.post('http://localhost:3000/users/register', {
      username: name,
      password: password
    })
    .then(function (response) {
      if (response.status === 200) {
        actions.login({ commit }, { name, password })
        commit(types.TOGGLE_REGISTER)
      }
    })
  },
  login: ({ commit }, { name, password }) => {
    axios.post('http://localhost:3000/users/login', {
      username: name,
      password: password
    })
    .then(function (response) {
      if (response.status === 200) {
        commit(types.LOGIN_STATUS)
        localStorage.setItem(localKeys.USER_TOKEN, response.data.token)
        localStorage.setItem(localKeys.USER_NAME, name)
        localStorage.setItem(localKeys.LOGIN_STATUS, state.isLogin)
        console.log('登录')
      }
    })
  }
}

// mutations
const mutations = {
  [types.TOGGLE_LOGIN] (state) {
    state.loginVisible = !state.loginVisible
  },
  [types.TOGGLE_REGISTER] (state) {
    state.registerVisible = !state.registerVisible
  },
  [types.LOGIN_STATUS] (state) {
    state.isLogin = true
    state.loginVisible = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
