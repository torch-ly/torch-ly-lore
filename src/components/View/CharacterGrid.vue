<template>
  <Grid :value="$store.state.npcs" :new-function="newCharacter" route="char" v-slot="val">
    <div>
      <span>Status: </span>
      <span :class="val.alive ? 'text-green-500' : 'text-red-500'">{{ val.alive ? "Alive" : "Dead" }}</span>
    </div>

    <div v-if="getRaces(val)">
      <span>Race: </span>
      <span>{{ getRaces(val).content }}</span>
    </div>
  </Grid>
</template>
<script>
import {db} from "../../plugins/firebase";
import router from "../../router";
import Grid from "./Grid";

export default {
  components: {Grid},
  methods: {
    async newCharacter() {
      let res = await db.collection('campaigns').doc(router.currentRoute.params.campaign).collection('npcs').add({
        name: 'New Character',
        alive: true,
        permissions: {
          default: 4, // Default group can view,
          [this.$store.state.userPermission.name]: 7 // you can view and edit
        }
      })

      await router.push('/e/' + router.currentRoute.params.campaign + '/char/' + res.id)
    },
    getRaces(character) {
      if (!character || !character.quickinfo) return null;
      return character.quickinfo.find((info) => info.title === "Race");
    },

  }
}
</script>
