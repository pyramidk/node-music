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
  upload: ({ commit, dispatch }, { name, singer, music, avatar, img }) => {
    let token = localStorage.getItem(localKeys.USER_TOKEN)
    axios.post('http://localhost:3000/songs', {
      name: name,
      singer: singer,
      music: music,
      avatar: avatar,
      img: img,
      token: token
    })
    .then(function (response) {
      dispatch('getSongs')
      commit(types.TOGGLE_UPLOAD)
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
