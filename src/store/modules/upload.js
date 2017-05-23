import * as types from '../mutation-types'
import localKeys from '../config'
import axios from 'axios'

// initial state
const state = {
  uploadShow: false
}

// getters
const getters = {
  uploadShow: state => state.uploadShow
}

// actions
const actions = {
  toggleUpload: ({ commit }) => {
    commit(types.TOGGLE_UPLOAD)
  },
  upload: () => {
    let token = localStorage.getItem(localKeys.USER_TOKEN)
    axios.post('http://localhost:3000/dishes', {
      name: 'zack',
      description: 'update',
      comment: [],
      token: token
    })
    .then(function (response) {
      console.log(response)
    })
  }
}

// mutations
const mutations = {
  [types.TOGGLE_UPLOAD] (state) {
    state.uploadShow = !state.uploadShow
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
