<template>
  <NavBar>
    <template v-slot:header>
      <div class="flex justify-between">
        Settings for {{item.type}} "{{item.object?.name}}"
        <button @click="$router.push({name: item.route})" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Go back
        </button>
      </div>
    </template>
    <template v-slot:body>
      {{item}}
    </template>
  </NavBar>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
  components: {NavBar},
  computed: {
    item() {
      switch (this.$route.params.type) {
        case "npc":
          return {type: "NPC", object: this.$store.state.npcs.find(npc => npc._id === this.$route.params.id), route: "Npc details"};
      }
    }
  }
}
</script>
