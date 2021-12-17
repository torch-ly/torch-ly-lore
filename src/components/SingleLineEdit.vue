<template>
  <div class="flex">
    <div :contenteditable="editMode" @keydown.enter.prevent class="wFit p-2"
         @blur="updateData($event.target.innerText) & $emit('focusLost')">{{ value }}
    </div>
    <font-awesome-icon v-if="editMode && !noTrash" :class="trashClicked ? 'text-red-500' : true" class="mt-3 ml-4" icon="trash" @click="deleteData"/>
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
    },
    noTrash: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      trashClicked: false
    }
  },
  methods: {
    updateData(data) {
      this.$emit('input', data);
    },
    deleteData() {
      if (this.trashClicked) {
        this.$emit('trash');
      } else {
        this.trashClicked = true;
        setTimeout(() => {
          this.trashClicked = false;
        }, 2000);
      }
    }
  }
}
</script>
<style scoped>
.wFit {
  width: fit-content;
}
</style>
