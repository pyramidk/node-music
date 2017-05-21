<template>
  <div>
    <el-dialog
      title="注册"
      :visible.sync="registerVisible"
      size="tiny"
      :before-close="toggleRegister">
      <div class="user-input-wrapper">
        <i class="icon ion-person"></i>
        <input type="text" class="user-input" placeholder="请输入用户名">
      </div>
      <div class="user-input-wrapper">
        <i class="icon ion-locked"></i>
        <input type="text" class="user-input" placeholder="请输入密码">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="toggleRegister">取 消</el-button>
        <el-button type="primary" @click="toggleRegister">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      rember: false
    }
  },
  methods: {
    toggleRegister () {
      this.$store.dispatch('toggleRegister')
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done()
      })
      .catch(_ => {})
    }
  },
  computed: mapGetters([
    'registerVisible'
  ])
}
</script>

