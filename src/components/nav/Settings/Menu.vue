<template>
  <div class="absolute right-0 top-14 py-1 w-40 shadow-lg border bg-white border-gray-300 text-text-dark text-xs rounded">
    <div class="hover:bg-gray-50 pl-3 py-1" @click="openPermissionsPage">Permissions</div>
    <div class="hover:bg-gray-50 pl-3 py-1" @click="logout">Sign out</div>
  </div>
</template>
<script>
export default {
  methods: {
    openPermissionsPage() {
      this.$router.push({name: 'Campaign Permissions'});
    },
    logout() {
      this.$store.commit('logout');
    },
  }
}
</script>
