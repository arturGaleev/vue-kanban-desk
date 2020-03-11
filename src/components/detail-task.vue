<template>
  <div>
    <p class="task-detail__title">{{ task.title }}</p>
    <div class="task-detail__users">
      <users
          :task-data=task
      />
    </div>
    <div class="task-detail__body" v-if="task.body">
      <small>Описание:</small>
      <p>{{ task.body }}</p>
    </div>
    <div class="task-detail__comments">
      <p class="task-detail__comments-label" v-if="commentsList.length">Комментарии:</p>
      <div class="task-detail__comments-items" v-if="commentsList.length">
        <div class="task-detail__comments-item" v-for="comment in commentsList" :key="comment.id">
          <div class="task-detail__comments-item-user">
            <div class="user">
              <span>{{ getUser(comment.userID).name.substr(0, 1) }}</span>
            </div>
            <p>{{ getUser(comment.userID).name }}</p>
          </div>
          <div class="task-detail__comments-item-text">
            {{ comment.body }}
          </div>
        </div>
      </div>
      <div class="task-detail__comments-add">
        <p>Добавить комментарий:</p>
        <textarea placeholder="Комментарий" v-model="commentText"></textarea>
        <button class="btn" @click="addComment">Добавить комментарий</button>
      </div>
    </div>
  </div>
</template>

<script>
import users from './users.vue'
export default {
  components: {
    users
  },
  data () {
    return {
      commentText: ''
    }
  },
  computed: {
    task () {
      return this.$store.getters.getTaskForComment
    },
    commentsList () {
      let comments = this.$store.getters.comments(this.task.commentID)
      return comments
    }
  },
  methods: {
    getUser (id) {
      let user = this.$store.getters.getUser(id)
      return user
    },
    addComment () {
      if (this.commentText.length) {
        this.$store.commit('addCommit', { commentText: this.commentText })
        this.commentText = ''
      }
    }
  }
}
</script>
