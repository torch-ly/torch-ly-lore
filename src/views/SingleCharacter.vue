<template>
  <div class="m-2 relative p-6" v-if="character">
    <button class="button float-right inline-block">Edit</button>
    <h1 class="text-3xl mb-4 font-semibold">{{ character.name }}</h1>

    <SideCart class="mt-4">
        <div class="mt-2">
          <span>Status: </span>
          <span :class="character.alive ? 'text-green-500' : 'text-red-500'">{{character.alive ? "Alive" : "Dead"}}</span>
        </div>

        <div class="mt-2">
          <span>Race: </span>
          <span>{{character.race}}</span>
        </div>
    </SideCart>

    <h2 class="mt-8 text-lg">Description</h2>
    <div v-for="(content, title) in character.description" class="mt-2">
      <h3>{{title}}</h3>
      {{content}}
    </div>


  </div>
</template>
<script>
import SideCart from "../components/View/SideCard";
export default {
  components: {SideCart},
  computed: {
    character() {
      return this.$store.state.npcs.find(npc => npc.id === this.$route.params.id);
    }
  },
}
</script>
