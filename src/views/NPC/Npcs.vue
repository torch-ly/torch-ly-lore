<template>
  <NavBar>
    <template v-slot:header>NPCs</template>
    <template v-slot:body>
      <Grid :value="$store.state.npcs" :add="addCharacter" v-slot="{item}">
        <NpcCard :value="item"></NpcCard>
      </Grid>
    </template>
  </NavBar>
</template>
<script>
import NavBar from "@/components/NavBar";
import Grid from "@/components/Grid";
import NpcCard from "@/components/Npcs/NpcCard";
import {addDoc, collection} from "firebase/firestore";
import {db} from "@/plugins/firebase";
import {newNPC} from "@/components/Popups/AddNPC";

export default {
  components: {NpcCard, Grid, NavBar},
  methods: {
    async addCharacter() {

      console.log("addCharacter");

      await newNPC()
          .then(async (character) => {
            await addDoc(collection(db, "campaigns", this.$route.params.campaign, "npcs"), {
              name: character.name,
              alive: character.alive,
              description: character.description,
              quickinfo: character.quickinfo,
              permissionRead: character.permissionRead,
              permissionWrite: character.permissionWrite,
            })
          })
    }
  }
}
</script>
