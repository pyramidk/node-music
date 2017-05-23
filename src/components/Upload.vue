<template>
  <div>
    <el-dialog
      title="上传"
      :visible.sync="uploadShow"
      size="tiny"
      :before-close="toggleUpload">
      <div class="user-input-wrapper">
        <i class="icon ion-person"></i>
        <input type="text" class="user-input" placeholder="歌手" v-model="singer">
      </div>
      <div class="user-input-wrapper">
        <i class="icon ion-headphone"></i>
        <input type="text" class="user-input" placeholder="音乐地址" v-model="music">
      </div>
      <div class="user-input-wrapper">
        <i class="icon ion-image"></i>
        <input type="text" class="user-input" placeholder="图片地址" v-model="img">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toggleUpload">取 消</el-button>
        <el-button type="primary" @click="register(name, password)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      singer: '',
      music: '',
      img: ''
    }
  },
  methods: {
    toggleUpload () {
      this.$store.dispatch('toggleUpload')
    }
  },
  computed: mapGetters([
    'uploadShow'
  ])
}
</script>

