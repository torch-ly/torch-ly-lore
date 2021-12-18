<template>
  <div class="m-3">
    <h1>User Permissions of {{ campaignName }}</h1>

    <PermissionsTable />

    <UserTable />
  </div>
</template>
<script>
import UserTable from "../components/View/Permission/UserTable";
import PermissionsTable from "../components/View/Permission/PermissionsTable";

export default {
  components: {PermissionsTable, UserTable},
  computed: {
    campaignName() {
      return this.$route.params.campaign;
    }
  }
}
</script>
<style scoped>
h1 {
  @apply text-2xl font-semibold;
}
</style>
