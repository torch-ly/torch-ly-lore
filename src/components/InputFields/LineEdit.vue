<template>
  <div v-if="value || editable" class="flex justify-between bg-white border shadow">
    <input :disabled="!editable" class="bg-white border-none text-xl font-semibold border-0 resize-none p-3 w-full focus:outline-none" ref="textarea" v-model="content" @blur="$emit('update:value', $event.target.value) & $emit('blur')" />
    <div v-if="editable && remove" @click="getConfirmation" class="m-4 text-red-400"><font-awesome-icon icon="trash" /></div>
  </div>
</template>
<script>
import {getConfirmation} from "@/components/Popups/Confirmation";

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
    remove: {
      type: Function,
    }
  },
  emits: ['update:value', 'blur'],
  data() {
    return {
      content: this.value
    }
  },
  methods: {
    getConfirmation() {
      let self = this;
      getConfirmation("Delete description", "Are you sure you want to delete this part of the description? All data in this description will be permanently removed from our servers. This action can not be undone.").then(() => {
        self.remove();
      }).catch(() => {
        // Do nothing
      });
    }
  }
}
</script>
