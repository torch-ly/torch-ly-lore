<template>
  <div class="m-2 relative p-6" v-if="character">
    <button v-if="!editMode" class="button float-right inline-block" @click="editCharacter">Edit</button>
    <button v-else class="button float-right inline-block bg-green-400" @click="exitEditCharacter">Stop Edit</button>

    <h1 :contenteditable="editMode" @keydown.enter.prevent @blur="onNameChange" class="text-3xl mb-4 font-semibold">
      {{ character.name }}</h1>

    <SideCart class="mt-4">
      <div class="mt-2">
        <span>Status: </span>
        <span
            :class="character.alive ? 'text-green-500' : 'text-red-500'">{{ character.alive ? "Alive" : "Dead" }}</span>
      </div>

      <div class="mt-2">
        <span>Race: </span>
        <span>{{ character.race }}</span>
      </div>
    </SideCart>

    <h2 class="mt-8 text-lg">Description</h2>
    <div v-for="(content, title) in character.description" class="mt-2">
      <h3 :contenteditable="editMode" @keydown.enter.prevent
          @blur="onDescriptionTitleChange($event.target.innerText, title)">{{ title }}</h3>
      <div :contenteditable="editMode"
            @blur="onDescriptionContentChange($event.target.innerText, title)">{{ content }}</div>

    </div>

    <div v-if="editMode" class="w-2/3 py-2 mt-4 border-4 border-dashed rounded flex justify-center items-center">
      <font-awesome-icon class="inline-block text-text-dark" icon="plus"/>
    </div>


  </div>
</template>
<script>
import SideCart from "../components/View/SideCard";
import {db} from "../plugins/firebase";
import router from "../router";

export default {
  components: {SideCart},
  computed: {
    character() {
      return this.$store.state.npcs.find(npc => npc.id === this.$route.params.id);
    },
    editMode() {
      return this.$route.params.mode === "e";
    },
    dbRef() {
      return db.collection('campaigns').doc(router.currentRoute.params.campaign).collection('npcs').doc(this.character.id);
    }
  },
  methods: {
    editCharacter() {
      this.$router.push({
        name: "Character Overview",
        params: {mode: "e"}
      });
    },
    exitEditCharacter() {
      this.$router.push({
        name: "Character Overview",
        params: {mode: "w"}
      });
    },
    onNameChange({target: {innerText}}) {
      this.dbRef.update({
        name: innerText
      });
    },
    onDescriptionTitleChange(newIdentifier, oldIdentifier) {
      if (newIdentifier === oldIdentifier) return;

      let description = {
        [newIdentifier]: this.character.description[oldIdentifier],
        ...this.character.description,
      };
      delete description[oldIdentifier];
      this.dbRef.update({description});
    },
    onDescriptionContentChange(newText, identifier) {
      this.dbRef.update({
        description: {
          ...this.character.description,
          [identifier]: newText
        }
      });
    }
  },
}
</script>
