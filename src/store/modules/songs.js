import * as types from '../mutation-types'
// import localKeys from '../config'
import axios from 'axios'

// initial state
const state = {
  songTop: [],
  songsList: [],
  songsTotal: []
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
      response.data.forEach(item => {
        commit(types.FORMAT_RESPONSE, {para: item})
      })
      commit(types.GET_SONGS, { data: response.data })
    })
  }
}

// mutations
const mutations = {
  [types.GET_SONGS] (state, { data }) {
    // state.songsTotal = data
    state.songTop.push(data.shift())
    state.songsList = data
    state.songsTotal = state.songTop.concat(state.songsList)
  },
  [types.FORMAT_RESPONSE] (state, {para}) {
    para.isActive = false
    para.isPlaying = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
