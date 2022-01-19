<template>
  <NavBar>
    <router-view/>
  </NavBar>
</template>
<style>

html, body {
  @apply h-full
}

html {
  @apply bg-gray-100
}

</style>
<script>
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar}
}
</script>
