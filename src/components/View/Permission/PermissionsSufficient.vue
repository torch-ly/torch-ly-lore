<template>
  <div class="h-full">
    <div v-if="canView">
      <slot/>
    </div>
    <div v-else class="w-fill h-full flex items-center justify-center">
      <strong>You do not have permission to view this page.</strong>
    </div>
  </div>
</template>
<script>
import {hasFilePermission} from "../../../plugins/permissions";

export default {
  props: {
    permissions: {
      type: Object,
      required: true
    }
  },
  computed: {
    campaign() {
      return this.$store.state.campaign;
    },
    campaignUsers() {
      return this.$store.state.campaign.users;
    },
    campaignPermissions() {
      return this.campaign.permissions;
    },
    permissionTree() {
      return this.$store.state.userPermissionTree;
    }
  },
  data() {
    return {
      canView: false
    }
  },
  mounted() {
    this.hasPermission()
  },
  watch: {
    permissions() {
      this.hasPermission()
    },
    userPermission() {
      this.hasPermission()
    },
    campaignPermissions() {
      this.hasPermission()
    },
    campaign() {
      this.hasPermission()
    },
    permissionTree() {
      this.hasPermission()
    }
  },
  methods: {
    hasPermission() {
      let filePermission = hasFilePermission(this.permissions)

      this.canView = filePermission.canView;
      this.$emit("canView", filePermission.canView);
      this.$emit("canEdit", filePermission.canEdit);
      this.$emit("canChangePermissions", filePermission.canChangePermissions);

    }
  }
}
</script>
