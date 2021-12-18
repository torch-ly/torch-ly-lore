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
    this.generatePermissionTree()
    this.hasPermission()

    setTimeout(() => {
      this.generatePermissionTree()
      this.hasPermission()
    }, 100)

    setTimeout(() => {
      this.generatePermissionTree()
      this.hasPermission()
    }, 10000)
  },
  watch: {
    permissions() {
      this.generatePermissionTree()
      this.hasPermission()
    },
    userPermission() {
      this.generatePermissionTree()
      this.hasPermission()
    },
    campaignPermissions() {
      this.generatePermissionTree()
      this.hasPermission()
    },
    campaign() {
      this.generatePermissionTree()
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
      for (let perm of this.permissionsTree) {
        if (this.permissions[perm] !== null) {
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
          if (this.permissions[perm] === 0) {
            this.canView = false
            this.$emit("canView", false);
            this.$emit("canEdit", false);
            this.$emit("canChangePermissions", false);
          }
        }
      }
    },
    generatePermissionTree() {
      let tree = [];
      let subperm = this.userPermission();
      while (subperm && subperm.name !== 'default' && subperm.name !== 'gm') {
        tree.push(subperm.name)
        let newSubperm = this.campaignPermissions.find((perm) => perm.name === subperm.root)
        if (newSubperm) {
          subperm = newSubperm
        } else {
          break
        }
      }
      tree.push(subperm.name)
      this.permissionsTree = tree;

    },
    userPermission() {
      let perm = this.campaignUsers.find((user) => {
        return user.object.id === this.$store.state.user.uid
      });

      if (!perm) {
        return {name: "", root: "default"};
      } else {
        perm = perm.permission;
      }

      return this.campaign.permissions.find((permission) => {
        if (permission.name === perm) {
          return permission;
        }
      });
    },
  }
}
</script>
