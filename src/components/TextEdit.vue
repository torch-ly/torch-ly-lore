<template>
  <div class="grid grid-cols-2 bg-white border shadow">
    <textarea v-if="editable" class="border-none border-0 resize-none p-3 h-full focus:outline-none" ref="textarea" :value="content" @input="update($event) & setHeight()" @blur="$emit('update:value', $event.target.value) & $emit('blur')" />
    <div class="border-l p-3 prose" v-html="compiledMarkdown" />
  </div>
</template>
<script>
import {marked} from "marked";
import {debounce} from "lodash";
import DOMPurify from 'dompurify';

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
  computed: {
    compiledMarkdown: function () {
      return DOMPurify.sanitize(marked(this.content));
    }
  },
  mounted() {
    if (this.editable) {
      this.$nextTick(() => {
        this.setHeight();
      });
    }
  },
  methods: {
    update: debounce(function(e) {
      this.content = e.target.value;
    }, 300),
    setHeight() {
      this.$refs.textarea.style.height = "0px";
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
    },
  },
  watch: {
    editMode() {
      if (this.editable) {
        this.$nextTick(() => {
          this.setHeight();
        });
      }
    }
  }
}
</script>
