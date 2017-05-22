<template>
  <div class="nav">
  	<div class="container">
  		<div class="nav-logo">
  			<i class="icon ion-radio-waves"></i>
  		</div>
  		<div class="nav-nav float-left">
  			<div class="nav-nav-item">
  				<a class="nav-nav-item-link active" href="/#/songs" title="">SOUNDCLOUND</a>
  			</div>
  		</div>
  		<div class="nav-nav float-right">
  			<div class="nav-nav-item">
  				<div class="nav-search">
  					<i class="icon ion-search"></i>
  					<input type="text" class="nav-search-input" placeholder="SEARCH">
  				</div>
  			</div>
  			<div class="nav-nav-item">     
          <div class="nav-user popover" v-show="!isLogin">
            <button @click="toggleLogin">Sign in</button> or <button @click="toggleRegister">Create account</button>
          </div>
          <div class="nav-user popover" v-show="isLogin">
            <div class="nav-user-link">
              <button class="upload" @click="upload">Upload</button>
              <i class="icon ion-person"></i>
              <!-- <i class="icon ion-chevron-down"></i> -->
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
    upload () {
      this.$store.dispatch('upload')
    }
  },
  computed: mapGetters([
    'isLogin'
  ])
}
</script>

