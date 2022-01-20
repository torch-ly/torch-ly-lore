<template>
  <NavBar>
    <template v-slot:header>NPCs</template>
    <template v-slot:body>
      <Grid :value="$store.state.npcs" v-slot="{item}">
        <NpcCard :value="item"></NpcCard>
      </Grid>
    </template>
  </NavBar>
</template>
<script>
import NavBar from "@/components/NavBar";
import Grid from "@/components/Grid";
import NpcCard from "@/components/Npcs/NpcCard";
export default {
  components: {NpcCard, Grid, NavBar}
}
</script>
