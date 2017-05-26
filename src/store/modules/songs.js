import * as types from '../mutation-types'
import localKeys from '../config'
import axios from 'axios'

// initial state
const state = {
  songTop: [],
  songsList: [],
  songsTotal: [],
  comments: [],
  id: ''
}

// getters
const getters = {
  songTop: state => state.songTop,
  songsList: state => state.songsList
}

// actions
const actions = {
  getSongs: ({ commit }) => {
    axios.get('http://localhost:3000/songs')
    .then(function (response) {
      console.log(response)
      response.data.forEach(item => {
        commit(types.FORMAT_RESPONSE, {para: item})
      })
      commit(types.GET_SONGS, { data: response.data })
    })
    .then(function () {
      actions.getComments({commit}, 0)
    })
  },
  getComments: ({ commit }, index) => {
    commit(types.GET_SONGID, {index: index})
    console.log(state.id)
    axios.get('http://localhost:3000/songs/' + state.id + '/comments')
    .then(function (response) {
      // console.log(response)
      commit(types.GET_COMMENTS, {comments: response.data})
    })
  },
  postComments: ({ commit }, { comment }) => {
    let token = localStorage.getItem(localKeys.USER_TOKEN)
    console.log(comment)
    axios.post('http://localhost:3000/songs/' + state.id + '/comments', {
      comment: comment,
      token: token
    })
    .then(function (response) {
      console.log(response)
    })
  }
}

// mutations
const mutations = {
  [types.GET_SONGS] (state, { data }) {
    state.songTop.push(data.shift())
    state.songsList = data
    state.songsTotal = state.songTop.concat(state.songsList)
  },
  [types.FORMAT_RESPONSE] (state, {para}) {
    para.isActive = false
    para.isPlaying = false
  },
  [types.GET_COMMENTS] (state, {comments}) {
    state.comments = comments
  },
  [types.GET_SONGID] (state, {index}) {
    state.id = state.songsTotal[index]._id
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
