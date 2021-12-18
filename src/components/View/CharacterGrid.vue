<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
    <div v-for="char in $store.state.npcs">
      <div class="w-64 h-48 p-4 border border-gray-200 rounded relative">
        <span class="text-lg font-semibold">{{char.name}}</span>
        <hr class="my-2">

        <div>
          <span>Status: </span>
          <span :class="char.alive ? 'text-green-500' : 'text-red-500'">{{char.alive ? "Alive" : "Dead"}}</span>
        </div>

        <div v-if="getRaces(char)">
          <span>Race: </span>
          <span>{{ getRaces(char).content }}</span>
        </div>

        <div class="absolute right-2 bottom-2 flex">
          <router-link :to="'/e/' + $store.state.campaign.id + '/char/' + char.id" class="button bg-green-400">Edit</router-link> <!-- Hide if this button can not be edited -->
          <router-link :to="'/w/' + $store.state.campaign.id + '/char/' + char.id" class="ml-2 button">View</router-link>
        </div>

      </div>
    </div>

    <PlusBox @click="newCharacter" class="w-64 h-48 p-4"/>

  </div>
</template>
<script>
import {db} from "../../plugins/firebase";
import router from "../../router";
import PlusBox from "../PlusBox";

export default {
  components: {PlusBox},
  methods: {
    newCharacter() {
      db.collection('campaigns').doc(router.currentRoute.params.campaign).collection('npcs').doc().set({
        name: 'New Character',
        alive: true,
        permissions: {
          default: 4, // Default group can view,

        }
      })
    },
    getRaces(character) {
      if (!character || !character.quickinfo) return null;
      return character.quickinfo.find((info) => info.title === "Race");
    }
  }
}
</script>
