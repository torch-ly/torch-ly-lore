<template>
  <div>
    <textarea class="p-2 mt-1 w-2/3 border"
              @input="setHeight"
              ref="textarea"
              v-model="content"
              @blur="updateData() & $emit('focusLost')"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: this.value
    }
  },
  methods: {
    updateData() {
      console.log(22, this.content)
      this.$emit('input', this.content);
    },
    setHeight() {
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
    }
  },
  mounted() {
    this.setHeight();
  }
}
</script>
