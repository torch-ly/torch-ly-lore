<template>
  <div v-if="value || editable" class="bg-white border shadow">
    <input :disabled="!editable" class="bg-white border-none text-xl font-semibold border-0 resize-none p-3 w-full focus:outline-none" ref="textarea" v-model="content" @blur="$emit('update:value', $event.target.value) & $emit('blur')" />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:value', 'blur'],
  data() {
    return {
      content: this.value
    }
  },
}
</script>
