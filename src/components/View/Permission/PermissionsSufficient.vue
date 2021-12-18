<template>
  <div v-if="canView">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    permissions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      permissionsTree: ['Taube', 'default'],
      canView: false
    }
  },
  mounted() {
    this.hasPermission()
  },
  watch: {
    permissions() {
      this.hasPermission()
    }
  },
  methods: {
    hasPermission() {
      for (let perm of this.permissionsTree) {
        if (this.permissions[perm]) {
          if (this.permissions[perm] - 4 >= 0) {
            this.canView = true
            this.$emit('canView')
          }
          if (this.permissions[perm] -4 - 2 >= 0) {
            this.$emit('canEdit')
          }
          if (this.permissions[perm] -4 - 2 - 1 >= 0) {
            this.$emit('canChangePermissions')
          }
        }
      }
    }
  }
}
</script>
