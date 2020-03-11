<template>
  <div class="board-item">
    <p class="board-item__title">{{ dataBoard.nameOutput }}</p>
    <div class="board-item__body">
      <draggable
          class="list-group"
          :data-id="dataBoard.id"
          group="board"
          @end="handlerChange"
      >
        <task
            v-for="element in listBoard"
            :key="element.title"
            :task-data="element"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import task from './task.vue'
export default {
  components: {
    task,
    draggable
  },
  computed: {
    listBoard () {
      let usersFilter = this.$store.getters.usersFilter
      let nameFilter = this.$store.getters.nameFilter
      let tasks = this.$store.getters.getListTasks(this.dataBoard.name)
      if (usersFilter.length) {
        usersFilter.forEach(user => {
          tasks = tasks.filter(i => i.userIDs.indexOf(user.id) !== -1)
        })
      }
      console.log(nameFilter)
      if (nameFilter.length) {
        tasks = tasks.filter(i => nameFilter.indexOf(i.id) !== -1)
      }
      return tasks
    }
  },
  props: ['dataBoard'],
  methods: {
    handlerChange (evt) {
      let taskID = +evt.item.dataset.id
      let boardID = +evt.to.dataset.id
      this.$store.commit('setBoardInTask', { taskID, boardID })
    }
  }
}
</script>
