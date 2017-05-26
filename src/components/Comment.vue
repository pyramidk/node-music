<template>
  <div class="col-3-10">
    <div class="sidebar">
      <div class="comments">
        <div class="comments-header">
          <div class="comments-header-title">Comments</div>
          <div class="switch ">
            <div class="switch-button"></div>
          </div>
        </div>
        <div class="sidebar-content null">
          <div class="comment" style="animation-delay: 0ms;">
            <div class="comment-image" style="background-image: url(&quot;https://i1.sndcdn.com/avatars-000294004882-x15kra-t300x300.jpg&quot;);"></div>
            <div class="comment-info">
              <div class="comment-comment">Aloha!</div>
              <div class="comment-username">PREETA</div>
            </div>
            <div class="comment-time">00:00</div></div>
        </div>
        <div class="user-input-wrapper">
          <i class="ion-chatbox-working"></i>
          <input type="text" class="user-input" placeholder="add comment" v-model="comment">
          <span class="ion-paper-airplane" @click="addComment(comment)"></span>    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        comment: ''
      }
    },
    methods: {
      addComment (comment) {
        console.log('add')
        this.$store.dispatch('postComments', { comment })
      }
    }
  }
</script>

