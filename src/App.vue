<template>
  <div id="app">
    <CNav></CNav>
    <router-view></router-view>
    <Login></Login>
    <Register></Register>
  </div>
</template>

<script>
import CNav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
export default {
  name: 'app',
  components: {
    CNav,
    Login,
    Register
  }
}
</script>
