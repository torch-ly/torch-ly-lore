<template>{{ $store.state.npcs }}</template>
<script>
import store from "@/store";

export default {
  mounted() {
    store.dispatch('bindNpcs', this.$route.params.campaign);
  }
}
</script>
