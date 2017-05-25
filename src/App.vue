<template>
  <div id="app">
    <CNav></CNav>
    <router-view></router-view>
    <Login></Login>
    <Register></Register>
    <Upload></Upload>
    <Player></Player>
  </div>
</template>

<script>
import CNav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import Upload from './components/Upload'
import Player from './components/Player'
export default {
  name: 'app',
  components: {
    CNav,
    Login,
    Register,
    Upload,
    Player
  }
}
</script>
