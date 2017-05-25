<template>
  <div class="player" v-show="playerShow">
  	<audio :src="playNow.music" ref='audio'></audio>
    <div class="container">
      <div class="player-main">
        <div class="player-section player-info">
          <img alt="song artwork" class="player-image" :src="playNow.avatar">
          <div class="song-card-details">
            <a class="song-card-title">{{playNow.name}}</a>
            <a class="song-card-user-username">{{playNow.singer}}</a>
          </div>
        </div>
        <div class="player-section">
          <div class="player-button" @click="playNext(playNum - 1)">
            <i class="icon ion-ios-rewind"></i>
          </div>
          <div class="player-button">
            <i v-show="!playStatus" class="icon ion-ios-play" @click='play(playNum)'></i>
            <i v-show="playStatus" class="icon ion-ios-pause" @click='pause(playNum)'></i>
          </div>
          <div class="player-button" @click="playNext(playNum + 1)">
            <i class="icon ion-ios-fastforward"></i>
          </div>
        </div>
        <div class="player-section player-seek">
          <div class="player-seek-bar-wrap" ref="seekWrap" @click="progressChange($event)">
            <div class="player-seek-bar" ref="playerSeekBar">
              <div class="player-seek-duration-bar" :style="{width: durationBar + '%'}">
                <div class="player-seek-handle" @mousdown="progressChange($event)"></div>
              </div>
            </div>
          </div>
          <div class="player-time">
            <span>{{currentTime}}</span>
            <span class="player-time-divider">/</span>
            <span>{{duration}}</span>
          </div>
        </div>
        <div class="player-section">
          <div class="player-button">
            <i class="icon ion-loop"></i>
          </div>
          <div class="player-button">
            <i class="icon ion-shuffle"></i>
          </div>
          <div class="player-button top-right popover">
            <i class="icon ion-android-list"></i>
          </div>
          <div class="player-button player-volume-button">
            <div class="player-volume-button-wrap" @click="muteVolume">
              <i class="icon ion-android-volume-up"></i>
              <i class="icon ion-android-volume-mute"></i>
            </div>
          </div>
          <div class="player-volume">
            <div class="player-seek-bar-wrap" ref="volumeWrap" @click="volumeChange($event)">
              <div class="player-seek-bar">
                <div class="player-seek-duration-bar" :style="{width: volumeDuration + '%'}">
                  <div class="player-seek-handle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      playerShow: false,
      currentTime: '00:00',
      duration: '00:00',
      playNum: 0,
      clear: {},
      durationBar: 0,
      barWidth: 0,
      volumeDuration: 50
    }
  },
  methods: {
    play (index) {
      this.$store.dispatch('play', index)
      this.$nextTick(() => {
        console.log('开始播放')
        this.$refs.audio.play()
        this.timeChange()
        this.playNum = index
        // 得到bar的宽
        this.barWidth = this.$refs.playerSeekBar.offsetWidth
      })
      if (!this.playerShow) this.playerShow = true
    },
    pause (index) {
      this.$store.dispatch('pause')
      this.$refs.audio.pause()
      clearInterval(this.clear)
      console.log('暂停播放')
    },
    timeFormat (number) {
      let minute = parseInt(number / 60)
      let second = parseInt(number % 60)
      minute = minute > 10 ? minute : '0' + minute
      second = second >= 10 ? second : '0' + second
      return minute + ':' + second
    },
    timeChange () {
      let that = this
      // 需要clearInterval, 播放结束的时候要clear
      this.clear = setInterval(() => {
        that.currentTime = that.timeFormat(that.$refs.audio.currentTime)
        if (isNaN(that.$refs.audio.duration)) {
          that.duration = '00:00'
        } else {
          that.duration === '00:00' ? that.duration = that.timeFormat(that.$refs.audio.duration) : ''
          that.durationBar = (that.$refs.audio.currentTime / that.$refs.audio.duration) * 100
          if (that.durationBar === 100) {
            clearInterval(that.clear)
            // 结束自动播放下一曲
            that.playNext(that.playNum + 1)
          }
        }
      }, 1000)
    },
    progressChange (event) {
      let startPosition, movePosition, percent
      // 开始位置
      startPosition = this.$refs.playerSeekBar.offsetLeft
      // 鼠标移动的位置
      movePosition = event.clientX
      percent = (movePosition - startPosition) / this.barWidth
      // 得到百分比，然后和总时间相乘得到出currenttime
      this.$refs.audio.currentTime = this.$refs.audio.duration * percent
      this.currentTime = this.timeFormat(this.$refs.audio.currentTime)
      this.durationBar = (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
    },
    playNext (index) {
      this.playNum = index
      this.$store.dispatch('getPlayData', index)
      this.play(index)
    },
    muteVolume () {
      this.$refs.audio.volume = 0
      this.volumeDuration = 0
    },
    volumeChange (event) {
      let width, startPosition, movePosition, percent
      width = this.$refs.volumeWrap.offsetWidth
      startPosition = this.$refs.volumeWrap.offsetLeft
      movePosition = event.clientX
      percent = (movePosition - startPosition) / width
      this.$refs.audio.volume = percent
      this.volumeDuration = percent * 100
    }
  },
  computed: mapGetters([
    'playNow',
    'playStatus'
  ])
}
</script>

