<template>
  <NavBar>
    <template v-slot:header>Campaign Dashboard</template>
    <template v-slot:body>
      {{$store.state.npcs}}
    </template>
  </NavBar>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar}
}
</script>
