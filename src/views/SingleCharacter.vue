<template>
  <PermissionsSufficient v-if="character" :permissions="character.permissions" @canEdit="canEdit = $event">
    <div class="m-2 relative p-6">
      <button v-if="!editMode" class="-mt-10 lg:mt-0 button float-right inline-block" @click="setEditMode(true)">Edit
      </button>
      <button v-else class="-mt-10 lg:mt-0 button float-right inline-block bg-green-400" @click="setEditMode(false)">
        Stop Edit
      </button>

      <SingleLineEdit :editMode="editMode" @focusLost="onNameChange" v-model="character.name" @trash="deleteCharacter"
                      class="h1 mb-4"/>

      <SideCart class="mt-4">
        <div class="mt-2 ml-2">
          <span>Status : </span>
          <span
              :class="character.alive ? 'text-green-500' : 'text-red-500'">{{
              character.alive ? "Alive" : "Dead"
            }}</span>
        </div>

        <div class="mt-2 flex" v-for="(info, index) in character.quickinfo">

          <SingleLineEdit noTrash :editMode="editMode" @focusLost="onQuickInfoChange" v-model="info.title"/>
          <span class="py-2">:</span>
          <SingleLineEdit :editMode="editMode" @focusLost="onQuickInfoChange" @trash="removeQuickInfo(index)"
                          v-model="info.content"/>

        </div>

        <PlusBox v-if="editMode" class="mt-4 border-accent" @click="addQuickInfo"/>

      </SideCart>

      <h2 class="mt-8 text-lg p-2">Description</h2>
      <div v-for="(description, index) in character.description" class="mt-2">

        <SingleLineEdit class="h3" :editMode="editMode" @focusLost="onDescriptionChange"
                        @trash="removeDescriptionField(index)" v-model="description.title"/>

        <MultilineTextEdit :editMode="editMode" @focusLost="onDescriptionChange" v-model="description.content"/>

      </div>

      <PlusBox v-if="editMode" class="w-2/3 mt-4" @click="addDescriptionField"/>

    </div>
  </PermissionsSufficient>
</template>
<script>
import SideCart from "../components/View/SideCard";
import {db} from "../plugins/firebase";
import router from "../router";
import MultilineTextEdit from "../components/MultilineTextEdit";
import SingleLineEdit from "../components/SingleLineEdit";
import PlusBox from "../components/PlusBox";
import PermissionsSufficient from "../components/View/Permission/PermissionsSufficient";

export default {
  components: {PermissionsSufficient, PlusBox, SingleLineEdit, MultilineTextEdit, SideCart},
  data() {
    return {
      canEdit: false,
    }
  },
  computed: {
    character() {
      return this.$store.state.npcs.find(npc => npc.id === this.$route.params.id);
    },
    editMode() {
      return this.canEdit && this.$route.params.mode === "e";
    },
    dbRef() {
      return db.collection('campaigns').doc(router.currentRoute.params.campaign).collection('npcs').doc(this.character.id);
    }
  },
  methods: {
    setEditMode(mode) {
      this.$router.push({
        params: {mode: mode ? 'e' : 'w'}
      });
    },
    onNameChange() {
      this.dbRef.update({name: this.character.name});
    },
    deleteCharacter() {
      this.dbRef.delete();
      router.push({name: "Character Overview"});
    },
    onDescriptionChange() {
      this.dbRef.update({description: this.character.description});
    },
    addDescriptionField() {
      if (!this.character.description) {
        this.character.description = [];
      }

      this.dbRef.update({
        description: [
          ...this.character.description,
          {
            title: "New Description",
            content: "Write your text here!"
          }
        ]
      });
    },
    removeDescriptionField(index) {
      this.character.description.splice(index, 1);
      this.dbRef.update({description: this.character.description});
    },
    addQuickInfo() {
      if (!this.character.quickinfo) {
        this.character.quickinfo = [];
      }

      this.dbRef.update({
        quickinfo: [
          ...this.character.quickinfo,
          {
            title: "Info",
            content: "Content"
          }
        ]
      });
    },
    onQuickInfoChange() {
      this.dbRef.update({quickinfo: this.character.quickinfo});
    },
    removeQuickInfo(index) {
      this.character.quickinfo.splice(index, 1);
      this.dbRef.update({quickinfo: this.character.quickinfo});
    }
  },
}
</script>
<style scoped>
.h1 {
  @apply text-3xl font-semibold pr-20;
}

h2 {
  @apply text-xl font-bold pr-20;
}

.h3 {
  @apply text-lg font-bold pr-20;
}
</style>
