<template>
  <div>
    <div class="m-3" v-if="canOpenPage">
      <h1>User Permissions of {{ campaignName }}</h1>

      <PermissionsTable />

      <UserTable />
    </div>
    <div v-else class="w-fill h-full flex items-center justify-center">
      <strong>You do not have permission to view this page.</strong>
    </div>
  </div>
</template>
<script>
import UserTable from "../components/View/Permission/UserTable";
import PermissionsTable from "../components/View/Permission/PermissionsTable";

export default {
  components: {PermissionsTable, UserTable},
  data() {
    return {
      canOpenPage: false,
    }
  },
  computed: {
    campaignName() {
      return this.$route.params.campaign;
    },
    permissionTree() {
      return this.$store.state.userPermissionTree;
    }
  },
  watch: {
    permissionTree(newVal) {
      this.canOpenPage = newVal.includes("gm");
    }
  },
}
</script>
<style scoped>
h1 {
  @apply text-2xl font-semibold;
}
</style>
