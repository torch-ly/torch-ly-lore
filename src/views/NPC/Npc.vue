<template>
  <NavBar>
    <template v-slot:header>
      <div class="flex justify-between">
        {{ npc?.name }}
        <button @click="$router.push({query: {edit: null}})" v-if="npc && canWrite(npc.permissionWrite) && $route.query.edit === undefined" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Edit Character
        </button>
        <div v-if="npc && canWrite(npc.permissionWrite) && $route.query.edit !== undefined" class="flex justify-between">
          <button @click="$router.push($route.path)" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Leave Edit
          </button>
          <div @click="removeNPC" class="pt-1 mx-3 text-red-500"><font-awesome-icon icon="trash" /></div>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div v-if="npc != null">
        <div @click="$router.push($route.path)" v-if="$route.query.edit !== undefined && !canWrite(npc.permissionWrite)" class="mt-52 text-center">
          <span class="text-5xl">You are not allowed to be here!</span>
          <button type="button" class="block mx-auto mt-12 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go back
          </button>
        </div>
        <div v-else>
          <div v-if="npc" v-for="(desc, id) in npc.description">
            <LineEdit :editable="$route.query.edit !== undefined && canWrite(npc.permissionWrite)" class="my-5" v-model:value="desc.title" @blur="updateDescription" :remove="() => removeDescription(id)"/>
            <TextEdit :editable="$route.query.edit !== undefined && canWrite(npc.permissionWrite)" class="my-2" v-model:value="desc.content" @blur="updateDescription"/>
          </div>
          <div v-if="$route.query.edit !== undefined && canWrite(npc.permissionWrite)" @click="npc.description.push({title: 'New Section', content: ''})" class="w-full text-center bg-gray-50 text-gray-900 border shadow py-2 mt-5"><font-awesome-icon size="2x" icon="plus" /></div>
        </div>
      </div>
    </template>

  </NavBar>
</template>
<script>
import NavBar from "@/components/NavBar";
import TextEdit from "@/components/InputFields/TextEdit";
import {updateDoc, deleteDoc} from "firebase/firestore";
import {canWrite} from "@/plugins/permissions";
import LineEdit from "@/components/InputFields/LineEdit";
import {getConfirmation} from "@/components/Popups/Confirmation";

export default {
  components: {LineEdit, NavBar, TextEdit},
  computed: {
    npc() {
      return this.$store.state.npcs.find((npc) => npc._id === this.$route.params.id);
    },
  },
  methods: {
    updateDescription() {
      updateDoc(this.npc.ref(), {
        description: this.npc.description.filter((desc) => desc.title !== '' || desc.content !== ''),
      }).catch((err) => {
        console.log(err)
      })
    },
    removeDescription(id) {
      this.npc.description[id] = { title: '', content: '' };
      this.updateDescription();
    },
    canWrite,
    removeNPC() {
      let self = this;
      getConfirmation("Delete NPC", "Are you sure you want to delete this NPC? All data will be permanently removed from our servers. This action can not be undone.").then(() => {
        deleteDoc(self.npc.ref());
        this.$router.push({name: 'Npcs'});
      }).catch(() => {
        // Do nothing
      });
    }
  }
}
</script>
