<template>
  <div class="grid grid-cols-3 xl:grid-cols-4 gap-3">
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

    <div class="w-64 h-48 p-4 border-4 border-dashed tracking-[1em] border-gray-200 rounded flex justify-center items-center" @click="newCharacter">
      <font-awesome-icon size="4x" class="mt-1 mr-2" icon="plus" />
    </div>

  </div>
</template>
<script>
export default {
  methods: {
    newCharacter() {
      // TODO
    },
    getRaces(character) {
      if (!character || !character.quickinfo) return null;
      return character.quickinfo.find((info) => info.title === "Race");
    }
  }
}
</script>
