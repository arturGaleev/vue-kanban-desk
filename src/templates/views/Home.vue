<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="filters">
          <p class="filters__name">Фильтр:</p>
          <ul>
            <li>
              <v-select
                  :items="boardsForStatus"
                  label="Статус"
                  fieldOutput="nameOutput"
                  filterName="boards"
              />
            </li>
            <li>
              <v-select
                  :items="users"
                  label="Пользователь"
                  filterName="users"
              />
            </li>
            <li>
              <v-input />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="board">
      <div class="container">
        <div class="row">
          <board
            v-for="board in boards"
            :key="board.id"
            :data-board="board"
          />
        </div>
      </div>
    </div>
    <popup v-if="popup" @close="closePopup">
      <div slot="body">
        <detail-task />
      </div>
    </popup>
  </div>
</template>

<script>
import vSelect from './../../components/v-select.vue'
import vInput from './../../components/v-input.vue'
import board from './../../components/board.vue'
import detailTask from './../../components/detail-task.vue'
import popup from './../../components/popup.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    vSelect,
    board,
    detailTask,
    popup,
    vInput
  },
  computed: {
    ...mapGetters([
      'users',
      'popup'
    ]),
    boardsForStatus () {
      return this.$store.getters.boards
    },
    boards () {
      let boardsFilter = this.$store.getters.boardsFilter
      let boards = this.$store.getters.boards
      return boardsFilter.length ? boardsFilter : boards
    }
  },
  methods: {
    closePopup () {
      this.$store.commit('closePopup')
    }
  }
}
</script>
