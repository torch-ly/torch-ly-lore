<template>
  <div>
    <div v-if="editMode" class="mr-20">

      <span>Please not that it is necessary to manually save what you have changed here!</span>

      <!-- At the current time @blur is not working as expected! -->
      <v-md-editor
          @blur="updateData() & $emit('focusLost')"
          @save="updateData() & $emit('focusLost')"
          v-model="content"
          height="400px" />

    </div>

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
    }
  }
}
</script>
