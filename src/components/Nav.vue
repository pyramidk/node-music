<template>
  <div class="nav">
  	<div class="container">
  		<div class="nav-logo">
  			<i class="icon ion-radio-waves"></i>
  		</div>
  		<div class="nav-nav float-left">
  			<div class="nav-nav-item">
  				<a class="nav-nav-item-link active" title="">SOUNDCLOUND</a>
  			</div>
  		</div>
  		<div class="nav-nav float-right">
  			<div class="nav-nav-item">     
          <div class="nav-user popover" v-show="!isLogin">
            <button @click="toggleLogin">Sign in</button> or <button @click="toggleRegister">Create account</button>
          </div>
          <div class="nav-user popover" v-show="isLogin">
            <div class="nav-user-link">
              <button class="upload" @click="toggleUpload">Upload</button>
              <i class="icon ion-person"></i>
              <i class="icon ion-log-out"></i>
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
  mounted () {
    this.$store.dispatch('init')
  },
  methods: {
    toggleLogin () {
      this.$store.dispatch('toggleLogin')
    },
    toggleRegister () {
      this.$store.dispatch('toggleRegister')
    },
    toggleUpload () {
      this.$store.dispatch('toggleUpload')
    },
    upload () {
      this.$store.dispatch('upload')
    }
  },
  computed: mapGetters([
    'isLogin'
  ])
}
</script>

