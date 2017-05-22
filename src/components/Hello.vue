<template>
  <div class="container">
    <div class="content">
      <div class="grid">
        <div class="col-7-10">
          <div class="song card">
            <div class="song-main">
              <div class="song__image" style="background-image: );">
                <div class="toggle-play-button">
                  <i class="toggle-play-button-icon ion-ios-play"></i>
                </div>
              </div>
              <div class="song__info__wrap">
                <div class="song__info">
                  <div class="song-title">Mree - Lift Me Up (FlyBoy Remix)</div>
                  <div class="song-user">
                    <div class="song-user-image" style="background-image: ;"></div>
                    <a class="song-username" href="/#/users/60557527" title="">Flyboy</a>
                  </div>
                  <div class="song-stats">
                    <div class="song-list-item-stat song-heart-count undefined popover">
                      <div><i class="icon ion-ios-heart"></i><span>35,503</span></div>
                    </div>
                    <div class="song-stat"><i class="icon ion-play"></i><span>786,349</span></div>
                    <div class="song-stat"><i class="icon ion-chatbubble"></i><span>667</span></div>
                  </div>
                  <div class="song-description">55555</div>
              </div>
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div class="song-list-item ">
              <div class="song-list-item__image" style="background-image: ;">
                <div class="toggle-play-button"><i class="toggle-play-button-icon ion-ios-play"></i></div>
              </div>
              <div class="song-list-item__info__wrap">
                <div class="song-list-item__info">
                  <a class="song-list-item-title" href="/#/songs/302507194" title="">Iceland (feat. Gavrielle)</a>
                  <div class="song-list-item-info-extra">
                    <div class="song-list-item__user">
                      <div class="song-list-item-user-image" style="background-image"></div>
                      <a class="song-list-item-username" href="/#/users/60557527" title="">Flyboy</a>
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
                <div class="waveform">
                  <canvas class="waveform-canvas"></canvas>
                  <div class="waveform-image-container">
                    <img alt="song waveform" class="waveform-image">
                    <div class="waveform-image-bg" style="width: 0%;"></div>
                    <div>
                      <div class="waveform-play-highlight"></div>
                      <div class="waveform-play-highlight-icon">
                        <i class="icon ion-ios-play"></i>
                      </div>
                    </div>
                  </div>
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
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
