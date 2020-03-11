<template>
  <div class="v-input">
    <p>Введите название</p>
    <input type="text" v-model="nameTask"/>
  </div>
</template>

<script>
export default {
  data: () => ({
    nameTask: ''
  }),
  watch: {
    nameTask (value) {
      this.$store.commit('setNameFilterInTask', { searchText: value })
    }
  }
}
</script>
