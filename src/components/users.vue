<template>
  <div class="users">
    <div class="user user_add" tooltip="Назначить пользователя"
      @click.stop="show = true"
      v-click-outside="close"
    >
      <span><i class="icon-plus"></i></span>
      <v-list
          v-show="show"
          :items="users"
          :items-selected="usersSelected"
          @handlerItemsSelected="setItemsSelected"
      />
    </div>
    <div class="user" v-for="userSelected in usersSelected" :key="userSelected.id">
      <span>{{ userSelected.name.substr(0,1) }}</span>
    </div>
  </div>
</template>

<script>
import vList from './v-list.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    vList
  },
  props: ['taskData'],
  data: () => ({
    show: false
  }),
  computed: {
    ...mapGetters([
      'users'
    ]),
    usersSelected () {
      let arr = []
      this.taskData.userIDs.forEach(id => {
        arr.push(this.users.find(user => user.id === id))
      })
      return arr
    }
  },
  methods: {
    close () {
      this.show = false
    },
    setItemsSelected (value) {
      this.$store.commit('setUserInTask', {
        taskID: this.taskData.id,
        usersSelected: value.map(i => i.id)
      })
    }
  },
  mounted () {

  }
}
</script>
