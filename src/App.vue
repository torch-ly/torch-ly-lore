<template>

  <!-- Define Popups -->
  <AddNPC />

  <router-view/>
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
import AddNPC from "@/components/Popups/AddNPC";
export default {
  components: {AddNPC}
}
</script>
