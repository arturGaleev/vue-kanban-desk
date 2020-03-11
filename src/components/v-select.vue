<template>
  <div class="v-select">
    <p @click="show = true" v-click-outside="close">{{ label }} {{ countSelected }}</p>
    <v-list
      v-show="show"
      :items="items"
      :field-output="fieldOutput"
      :items-selected="itemsSelected"
      @handlerItemsSelected="setItemsSelected"
    />
  </div>
</template>

<script>
import vList from './v-list.vue'
export default {
  components: {
    vList
  },
  data: () => ({
    show: false,
    itemsSelected: []
  }),
  computed: {
    countSelected () {
      let count = this.itemsSelected.length
      return count ? `(${count})` : ''
    }
  },
  props: ['items', 'label', 'fieldOutput', 'filterName'],
  methods: {
    close () {
      this.show = false
    },
    setItemsSelected (value) {
      this.itemsSelected = value
      this.$store.commit('setFilter', { filter: this.filterName, value })
    }
  }
}
</script>
