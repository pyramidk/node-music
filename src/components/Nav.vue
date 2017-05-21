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
          <button @click="toggleLogin">Sign in</button> or <button @click="toggleRegister">Create account</button>
  			</div>
  	  </div>
  	</div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleLogin () {
      this.$store.dispatch('toggleLogin')
    },
    toggleRegister () {
      this.$store.dispatch('toggleRegister')
    }
  }
}
</script>

