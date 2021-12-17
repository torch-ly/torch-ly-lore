<template>
  <div>
    <textarea v-if="editMode"
              class="p-2 mt-1 w-2/3 border"
              @input="setHeight"
              ref="textarea"
              v-model="content"
              @blur="updateData() & $emit('focusLost')"
    />

    <pre v-else class="p-2 mt-1 w-2/3">{{ content }}</pre>

  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    editMode: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      content: this.value
    }
  },
  methods: {
    updateData() {
      this.$emit('input', this.content);
    },
    setHeight() {
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
    }
  },
  mounted() {
    if (this.editMode) {
      this.$nextTick(() => {
        this.setHeight();
      });
    }
  },
  watch: {
    editMode() {
      if (this.editMode) {
        this.$nextTick(() => {
          this.setHeight();
        });
      }
    }
  }
}
</script>
