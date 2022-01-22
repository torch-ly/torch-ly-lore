<template>
  <NavBar>
    <template v-slot:header>Campaign Settings</template>
    <template v-slot:body>
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
