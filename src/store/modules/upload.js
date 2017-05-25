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
  upload: ({ commit }, { name, singer, music, avatar, img }) => {
    let token = localStorage.getItem(localKeys.USER_TOKEN)
    console.log(token)
    axios.post('http://localhost:3000/songs', {
      name: name,
      singer: singer,
      music: music,
      avatar: avatar,
      img: img,
      token: token
    })
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/songs',
    //   headers: {'x-access-token': token},
    //   data: {
    //     name: name,
    //     singer: singer,
    //     music: music,
    //     img: img,
    //     token: token
    //   }
    // })
    .then(function (response) {
      console.log(response)
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
