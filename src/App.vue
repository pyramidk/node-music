<template>
  <div id="app">
    <CNav></CNav>
    <router-view></router-view>
    <Login></Login>
    <Register></Register>
    <Upload></Upload>
  </div>
</template>

<script>
import CNav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import Upload from './components/Upload'
export default {
  name: 'app',
  components: {
    CNav,
    Login,
    Register,
    Upload
  }
}
</script>
