<template>
  <transition name="modal-popup">
    <div class="modal-popup" tabindex="0" @keyup.esc="$emit('close')" ref="modal">
      <div class="modal-popup-wrapper">
        <div class="modal-popup-container">
          <div class="modal-popup-body">
            <slot name="body"></slot>
          </div>
          <span class="modal-popup-close" @click="$emit('close')"  @keyup.esc="$emit('close')" tabindex="0"></span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  mounted () {
    this.$nextTick(() => {
      this.$refs.modal.focus()
      document.body.classList.add('hidden')
    })
  },
  destroyed () {
    document.body.classList.remove('hidden')
  }
}
</script>
