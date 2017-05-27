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
              <i class="icon ion-chevron-down" @click="toggleLogout"></i>
            </div>
            <div class="nav-user-popover popover-content" v-show="showLogout">
              <ul class="nav-user-popover-list">
                <li class="nav-user-popover-item">
                  <a href="#" class="button orange block" @click="logout">Logout SoundCloud</a>
                </li>
              </ul>
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
      showLogout: false
    }
  },
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
    },
    toggleLogout () {
      this.showLogout = !this.showLogout
    },
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: mapGetters([
    'isLogin'
  ])
}
</script>

