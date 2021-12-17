<template>
  <div class="m-2 relative" v-if="character">
    <h1 class="text-3xl underline">{{ character.name }}</h1>

    <h2 class="mt-4 text-lg">Quick Information</h2>
    <div class="mt-2">
      <span>Status: </span>
      <span :class="character.alive ? 'text-green-500' : 'text-red-500'">{{character.alive ? "Alive" : "Dead"}}</span>
    </div>

    <div>
      <span>Race: </span>
      <span>{{character.race}}</span>
    </div>

    <h2 class="mt-4 text-lg">Description</h2>
    <div v-for="(content, title) in character.description" class="mt-2">
      <h3>{{title}}</h3>
      {{content}}
    </div>

    <button class="button absolute top-2 right-2">Edit</button>

  </div>
</template>
<script>
export default {
  computed: {
    character() {
      return this.$store.state.npcs.find(npc => npc.id === this.$route.params.id);
    }
  },
}
</script>
