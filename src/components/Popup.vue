<template>
  <div>
    <div class="fixed top-0 left-0" @click="close"/>
    <div class="fixed top-1/4 right-1/3 w-1/3 h-1/4 bg-primary rounded-xl">
      <h1>{{ title }}</h1>

      <slot />

      <button class="button" @click="accent">yes</button>
      <button class="button bg-gray-700" @click="close">no</button>

    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    accept() {
      this.$emit('accept');
    },
  }
}
</script>
