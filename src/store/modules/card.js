import * as types from '../mutation-types'
import * as constants from '../config'

import axios from 'axios'

// initial state
const state = {
  cardList: [],
  nextHref: '',
  nextData: [],
  scrollLoading: false,
  typeNow: 'chill',
  width: 10,
  formateList: [],
  currentPage: 1
}

// getters
const getters = {
  cardList: state => state.cardList,
  scrollLoading: state => state.scrollLoading,
  typeNow: state => state.typeNow,
  formateList: state => state.formateList
}

// actions
const actions = {
  // mutation 不能异步；state要在mutation里修改
  getData: ({ commit }, index) => {
    commit(types.CLEAR_DATA, {type: index})
    axios.get(constants.API + '&tags=' + constants.TYPE[index] + '%20house')
    .then(response => {
      response.data.collection.forEach(item => {
        commit(types.FORMAT_RESPONSE, {para: item})
      })
      commit(types.GET_WIDTH, {width: response.data.collection.length})
      commit(types.GET_DATA, {list: response.data.collection, href: response.data.next_href})
      commit(types.FORMAT_SONG_TITLE)
      // 添加了其他图片API，所以先注释掉
      // commit(types.FORMAT_IMG_URL)
    }, response => {
      console.log('请求出错')
    })
    .then(() => {
      axios.get(constants.IMAGEAPI + constants.TYPE[index] + '&rpp=40' + '&image_size=440&consumer_key=bSMgHdOHOQICt1q6gkNCumjh1hsLzkn9gmEZ3zcv').then(response => {
        commit(types.CHANGE_IMG_URL, {imgData: response.data.photos})
      })
    })
  },
  loadMore: ({ commit }) => {
    axios.get(state.nextHref).then(response => {
      response.data.collection.forEach(item => {
        commit(types.FORMAT_RESPONSE, {para: item})
      })
      commit(types.GET_WIDTH, {width: response.data.collection.length})
      commit(types.CHANGE_NEXT_DATA, {data: response.data.collection, href: response.data.next_href})
    })
    .then(() => {
      commit(types.GET_CURRENT_PAGE)
      axios.get(constants.IMAGEAPI + state.typeNow + '&rpp=40' + '&image_size=440&consumer_key=bSMgHdOHOQICt1q6gkNCumjh1hsLzkn9gmEZ3zcv' + '&page=' + state.currentPage).then(response => {
        commit(types.CHANGE_IMG_URL, {imgData: response.data.photos})
      })
    })
  },
  loadStop: ({ commit }) => {
    commit(types.RECOVER_SCROLL)
  },
  clear: ({ commit }) => {
    commit(types.CLEAR_DATA)
  }
}

// mutations
const mutations = {
  [types.FORMAT_RESPONSE] (state, {para}) {
    para.isActive = false
    para.isPlaying = false
    para.artwork_url = ''
    para.user.avatar_url = ''
  },
  [types.GET_CURRENT_PAGE] (state) {
    state.currentPage ++
  },
  [types.GET_DATA] (state, {list, href}) {
    state.nextData = list
    state.nextHref = href
  },
  [types.FORMAT_SONG_TITLE] (state) {
    state.nextData.forEach(item => {
      if (!item.title) {
        return ''
      }
      const arr = item.title.replace('–', '-').split(' - ')
      item.title = arr[arr.length - 1].split(' (')[0]
    })
  },
  [types.CHANGE_IMG_URL] (state, {imgData}) {
    for (let i = 0; i < state.width; i++) {
      state.nextData[i].artwork_url = imgData[i].image_url
      state.nextData[i].user.avatar_url = imgData[i].image_url
    }
    // 这里得到最终需要渲染的数据
    state.cardList = state.cardList.concat(state.nextData)
  },
  [types.GET_WIDTH] (state, {width}) {
    state.width = width
  },
  [types.CHANGE_NEXT_DATA] (state, {data, href}) {
    state.nextData = data
    state.nextHref = href
    state.scrollLoading = false
  },
  [types.RECOVER_SCROLL] (state) {
    state.scrollLoading = true
  },
  // router
  [types.CLEAR_DATA] (state, {type}) {
    state.cardList = []
    // toolbar type的修改
    state.typeNow = type
  },
  [types.FORMAT_IMG_URL] (state) {
    state.nextData.forEach(item => {
      if (item.artwork_url) item.artwork_url = item.artwork_url.replace('large', 't300x300')
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
