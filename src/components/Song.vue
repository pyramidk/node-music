<template>
  <div class="container">
    <div class="content">
      <div class="grid">
        <div class="col-7-10">
          <div class="song card" v-for="item in songTop">
            <div class="song-main">
              <div class="song__image" @click="tooglePlay(0)">
                <img :src="item.img">
                <div class="toggle-play-button" :class="{'active': item.isActive, 'is-playing': item.isPlaying}">
                  <i class="toggle-play-button-icon ion-ios-play"></i>
                  <i class="toggle-play-button-icon ion-radio-waves"></i>
                </div>
              </div>
              <div class="song__info__wrap">
                <div class="song__info">
                  <div class="song-title">{{item.name}}</div>
                  <div class="song-user">
                    <img class="song-list-item-user-image" :src="item.avatar">
                    <a class="song-username">{{item.singer}}</a>
                  </div>
                  <div class="song-stats">
                    <div class="song-list-item-stat song-heart-count undefined popover">
                      <div><i class="icon ion-ios-heart"></i><span>35,503</span></div>
                    </div>
                    <div class="song-stat"><i class="icon ion-play"></i><span>786,349</span></div>
                    <div class="song-stat"><i class="icon ion-chatbubble"></i><span>667</span></div>
                  </div>
                  <div class="song-description">最佳推荐</div>
                </div>
              </div>
              <div class="song-waveform">
                <Wave></Wave>
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div class="song-list-item" v-for="(item, index) in songsList" :index="index">
              <div class="song-list-item__image" @click="tooglePlay(index + 1)">
                <img :src=item.img>
                <div class="toggle-play-button" :class="{'active': item.isActive, 'is-playing': item.isPlaying}">
                  <i class="toggle-play-button-icon ion-ios-play"></i>
                  <i class="toggle-play-button-icon ion-radio-waves"></i>
                </div>
              </div>
              <div class="song-list-item__info__wrap">
                <div class="song-list-item__info">
                  <a class="song-list-item-title">{{item.name}}</a>
                  <div class="song-list-item-info-extra">
                    <div class="song-list-item__user">
                      <img class="song-list-item-user-image" :src=item.avatar>
                      <a class="song-list-item-username">{{item.singer}}</a>
                    </div>
                    <div class="song-list-item-stats">
                      <div class="song-list-item-stat song-heart-count undefined popover">
                        <div><i class="icon ion-ios-heart"></i><span>6,818</span></div>
                      </div>
                      <div class="song-list-item-stat"><i class="icon ion-play"></i><span>185,738</span></div>
                      <div class="song-list-item-stat"><i class="icon ion-chatbubble"></i><span>153</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="song-list-item-waveform">
                <Wave></Wave>
              </div> 
            </div>
          </div>
        </div>
        <Comment></Comment>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Wave from './Wave'
import Comment from './Comment'
export default {
  data () {
    return {
      index: ''
    }
  },
  mounted () {
    this.$store.dispatch('getSongs')
  },
  methods: {
    playHandler (index) {
      this.index = index
      this.$store.dispatch('getPlayData', index)
      this.$parent.$children.forEach(item => {
        if (item.$refs.audio) item.play(index)
      })
      this.$store.dispatch('getComments', index)
    },
    pauseHandler (index) {
      this.$parent.$children.forEach(item => {
        if (item.$refs.audio) item.pause(index)
      })
    },
    tooglePlay (index) {
      this.$nextTick(() => {
        if (!this.$store.state.player.playStatus || this.index !== index) {
          this.playHandler(index)
        } else {
          this.pauseHandler(index)
        }
      })
    }
  },
  computed: mapGetters([
    'songTop',
    'songsList',
    'scrollLoading',
    'playStatus'
  ]),
  components: {
    Wave,
    Comment
  }
}
</script>
