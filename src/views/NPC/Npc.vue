<template>
  <NavBar>
    <template v-slot:header>{{ npc?.name }}</template>
    <template v-slot:body>
      <TextEdit v-if="npc" v-for="desc in npc.description" :editable="canWrite(npc.permissions)" class="my-5" v-model:value="desc.content" @blur="updateDescription"/>
    </template>

  </NavBar>
</template>
<script>
import NavBar from "@/components/NavBar";
import TextEdit from "@/components/TextEdit";
import {updateDoc} from "firebase/firestore";
import {canWrite} from "@/plugins/permissions";

export default {
  components: {NavBar, TextEdit},
  computed: {
    npc() {
      return this.$store.state.npcs.find((npc) => npc._id === this.$route.params.id);
    }
  },
  methods: {
    updateDescription() {
      console.log(this.npc.ref(), this.npc.description)
      updateDoc(this.npc.ref(), {
        description: this.npc.description
      }).then(() => {
        console.log("updated")
      }).catch((err) => {
        console.log(err)
      })
    },
    canWrite,
  }
}
</script>
