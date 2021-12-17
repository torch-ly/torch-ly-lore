<template>
  <div :contenteditable="editMode" @keydown.enter.prevent class="p-2 wFit"
       @blur="updateData($event.target.innerText) & $emit('focusLost')">{{ value }}
  </div>
</template>
<script>
export default {
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateData(data) {
      this.$emit('input', data);
    },
  }
}
</script>
<style scoped>
.wFit {
  width: fit-content;
}
</style>
