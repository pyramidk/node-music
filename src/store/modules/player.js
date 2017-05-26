import * as types from '../mutation-types'

// initial state
const state = {
  playList: '',
  playNow: {
    user: {
      username: ''
    }
  },
  playStatus: false,
  activeNum: 0
}

// getters
const getters = {
  playStatus: state => state.playStatus,
  playNow: state => state.playNow
}

// actions
const actions = {
  getPlayData: ({ commit, rootState }, index) => {
    commit(types.GET_PLAYLIST, {rootState})
    commit(types.GET_PLAY_NOW, {index: index})
  },
  play: ({ commit, rootState }, index) => {
    commit(types.CHANGE_TO_PLAY, {rootState, index: index})
  },
  pause: ({ commit, rootState }) => {
    commit(types.CHANGE_TO_PAUSE, {rootState})
  }
}

// mutations
const mutations = {
  [types.GET_PLAYLIST] (state, {rootState}) {
    state.playList = rootState.songs.songsTotal
    console.log(state.playList)
  },
  [types.GET_PLAY_NOW] (state, {index}) {
    state.playNow = state.playList[index]
    console.log(state.playNow)
  },
  [types.CHANGE_TO_PLAY] (state, {rootState, index}) {
    state.playStatus = true
    // active
    if (state.activeNum !== index || state.activeNum === 0) {
      rootState.songs.songsTotal[state.activeNum].isActive = false
      rootState.songs.songsTotal[state.activeNum].isPlaying = false
      if (!rootState.songs.songsTotal[state.activeNum].isPlaying) {
        state.activeNum = index
      }
      rootState.songs.songsTotal[index].isActive = true
      rootState.songs.songsTotal[index].isPlaying = true
    } else {
      rootState.songs.songsTotal[index].isPlaying = true
    }
  },
  [types.CHANGE_TO_PAUSE] (state, {rootState}) {
    state.playStatus = false
    // playing相关
    rootState.songs.songsTotal[state.activeNum].isPlaying = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
