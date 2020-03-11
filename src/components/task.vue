<template>
  <div class="task" @click="openTask" :data-id="taskData.id">
    <p class="task__title">{{ taskData.title }}</p>
    <users
      :task-data=taskData
    />
  </div>
</template>

<script>
import users from './users.vue'
export default {
  components: {
    users
  },
  props: ['taskData'],
  methods: {
    openTask () {
      this.$store.commit('setTaskForComment', { taskID: this.taskData.id })
      this.$store.commit('showPopup')
    }
  }
}
</script>
