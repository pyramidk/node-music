<template>
  <div class="waveform">
    <canvas class="waveform-canvas"></canvas>
    <div class="waveform-image-container">
      <img alt="song waveform" class="waveform-image" src="../assets/wave/wave.png">
      <div class="waveform-image-bg" style="width: 0%;"></div>
      <div>
        <div class="waveform-play-highlight"></div>
        <div class="waveform-play-highlight-icon">
          <i class="icon ion-ios-play"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

