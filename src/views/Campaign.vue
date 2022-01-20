<template>
  <NavBar>
    <template v-slot:header>Campaign Dashboard</template>
    <template v-slot:body>
      {{$store.state.campaignData}}
    </template>
  </NavBar>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar}
}
</script>
