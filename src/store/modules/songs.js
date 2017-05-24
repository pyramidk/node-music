import * as types from '../mutation-types'
// import localKeys from '../config'
import axios from 'axios'

// initial state
const state = {
  songsList: []
}

// getters
const getters = {
  songsList: state => state.songsList
}

// actions
const actions = {
  getSongs: ({ commit }) => {
    // let token = localStorage.getItem(localKeys.USER_TOKEN)
    axios.get('http://localhost:3000/songs')
    .then(function (response) {
      console.log(response)
      commit(types.GET_SONGS, { data: response.data })
    })
  }
}

// mutations
const mutations = {
  [types.GET_SONGS] (state, { data }) {
    state.songsList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
