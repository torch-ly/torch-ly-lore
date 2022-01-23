<template>
  <NavBar>
    <template v-slot:header>
      <div class="flex justify-between">
        Settings for {{item.type}} "{{item.object?.name}}"
        <button @click="$router.back()" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Go back
        </button>
      </div>
    </template>
    <template v-slot:body>
      <div v-if="item.object && isGM">
        <h3 class="text-lg font-semibold mb-2 mt-4">Permissions</h3>
        <PermissionsTable :item="item.object" @update="updatePermissions($event)" />
      </div>
      <div v-else>
        <span class="text-5xl">You are not allowed to be here!</span>
        <button @click="$router.push($route.path)"  type="button" class="block mx-auto mt-12 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Go back
        </button>
      </div>
    </template>
  </NavBar>
</template>
<script>
import NavBar from "@/components/NavBar";
import PermissionsTable from "@/components/PermissionsTable";
import {updateDoc} from "firebase/firestore";
export default {
  components: {PermissionsTable, NavBar},
  computed: {
    item() {
      switch (this.$route.params.type) {
        case "npc":
          return {type: "NPC", object: this.$store.state.npcs.find(npc => npc._id === this.$route.params.id)};
      }
    },
    isGM() {
      return this.$store.getters.isGM;
    }
  },
  methods: {
    updatePermissions(permissions) {
      updateDoc(this.item.object.ref(), permissions).catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>
