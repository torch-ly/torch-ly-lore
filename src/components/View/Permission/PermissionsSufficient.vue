<template>
  <div class="h-full">
    <div v-if="canView">
      <slot/>
    </div>
    <div v-else class="alert alert-danger w-fill h-full flex items-center justify-center">
      <strong>You do not have permission to view this page.</strong>
    </div>
  </div>
</template>
<script>

/*
 * TODO: This is a temporary implementation. It should be replaced with a proper one!
 */

import {generatePermissionTree, userPermission} from "../../../plugins/permissions";

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
  },
  data() {
    return {
      permissionsTree: [],
      canView: false
    }
  },
  mounted() {
    this.permissionsTree = generatePermissionTree()
    this.hasPermission()

    setTimeout(() => {
      this.permissionsTree = generatePermissionTree()
      this.hasPermission()
    }, 100)

    setTimeout(() => {
      this.permissionsTree = generatePermissionTree()
      this.hasPermission()
    }, 10000)
  },
  watch: {
    permissions() {
      this.permissionsTree = generatePermissionTree()
      this.hasPermission()
    },
    userPermission() {
      this.permissionsTree = generatePermissionTree()
      this.hasPermission()
    },
    campaignPermissions() {
      this.permissionsTree = generatePermissionTree()
      this.hasPermission()
    },
    campaign() {
      this.permissionsTree = generatePermissionTree()
      this.hasPermission()
    }
  },
  methods: {
    hasPermission() {
      if (this.permissionsTree.includes("gm")) {
        this.canView = true;
        this.$emit("canView", true);
        this.$emit("canEdit", true);
        this.$emit("canChangePermissions", true);
        return;
      }

      this.$emit("canView", false);
      this.$emit("canEdit", false);
      this.$emit("canChangePermissions", false);

      for (let perm of this.permissionsTree) {
        if (this.permissions[perm] - 4 >= 0) {
          this.canView = true
          this.$emit('canView', true)
        }
        if (this.permissions[perm] - 4 - 2 >= 0) {
          this.$emit('canEdit', true)
        }
        if (this.permissions[perm] - 4 - 2 - 1 >= 0) {
          this.$emit('canChangePermissions', true)
        }
      }
    }
  }
}
</script>
