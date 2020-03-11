<template>
  <div class="v-select-list">
    <div v-for="item in items"
         :key="item.id"
         @click="setItem(item)"
         :class="{'selected': selected(item)}">
      <i class="icon-checked" v-if="selected(item)"></i>
      {{ item[nameOutput] }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['items', 'itemsSelected', 'fieldOutput'],
  computed: {
    nameOutput () {
      return this.fieldOutput ? this.fieldOutput : 'name'
    }
  },
  methods: {
    setItem (val) {
      if (this.selected(val)) {
        let idx = this.itemsSelected.findIndex(i => i.id === val.id)
        this.itemsSelected.splice(idx, 1)
      } else {
        this.itemsSelected.push(val)
      }
      this.$emit('handlerItemsSelected', this.itemsSelected)
    },
    selected (val) {
      return this.itemsSelected.findIndex(i => i.id === val.id) >= 0
    }
  }
}
</script>
