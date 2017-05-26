import * as types from '../mutation-types'
// import axios from 'axios'

// initial state
const state = {
  comments: [],
  commentsList: [],
  id: ''
}

// getters
const getters = {

}

// actions
const actions = {
  getComments: ({ commit, rootState }, index) => {
    commit(types.GET_SONGID, {rootState, index: index})
    // axios.get('http://localhost:3000/songs/5925666da45a8f243473597b/comments')
    // .then(function (response) {
    //   console.log(response)
    //   commit(types.GET_COMMENTS, {comments: response})
    // })
  }
}

// mutations
const mutations = {
  [types.GET_COMMENTS] (state, {comments}) {
    state.comments = comments
  },
  [types.GET_SONGID] (state, {rootState, index}) {
    state.commentsList = rootState.songs.songsTotal
    // state.id = state.commentsList[index]._id
    console.log(state.commentsList)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
