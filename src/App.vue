<template>

  <!-- Define Popups -->
  <AddNPC />
  <Confirmation />

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
import Confirmation from "@/components/Popups/Confirmation";
export default {
  components: {Confirmation, AddNPC}
}
</script>
