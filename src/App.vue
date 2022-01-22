<template>

  <!-- Define Popups -->
  <AddNPC />
  <EditUser />
  <Notification />
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
import Notification from "@/components/Notification";
export default {
  components: {Notification, EditUser, Confirmation, AddNPC}
}
</script>
