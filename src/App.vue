<template>

  <!-- Define Popups -->
  <AddNPC />
  <EditUser />
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
import EditUser from "@/components/Popups/EditUser";
export default {
  components: {EditUser, Confirmation, AddNPC}
}
</script>
