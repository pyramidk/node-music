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
          <div class="comment" v-for="item in comments">
            <div class="comment-image" style="background-image: url(../static/avatar/comment.jpg)"></div>
            <div class="comment-info">
              <div class="comment-comment">{{item.comment}}</div>
              <div class="comment-username">{{item.postedBy.username}}</div>
            </div>
            <div class="comment-time">00:00</div>
          </div>
          <div class="user-input-wrapper">
            <i class="ion-chatbox-working"></i>
            <input type="text" class="user-input" placeholder="add comment" v-model="comment">
            <span class="ion-paper-airplane" @click="addComment(comment)"></span>    
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
      comment: ''
    }
  },
  methods: {
    addComment (comment) {
      this.$store.dispatch('postComments', { comment })
    }
  },
  computed: mapGetters([
    'comments'
  ])
}
</script>

