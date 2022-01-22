<template>
  <NavBar>
    <template v-slot:header>Campaign Settings</template>
    <template v-slot:body>

      <h3 class="text-lg font-semibold mb-2 mt-4">Users</h3>

      <UsersTable />
    </template>
  </NavBar>
</template>
<script>
import NavBar from "@/components/NavBar";
import UsersTable from "@/components/UsersTable";
export default {
  components: {UsersTable, NavBar}
}
</script>
