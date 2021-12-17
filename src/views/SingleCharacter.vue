<template>
  <div class="m-2 relative p-6" v-if="character">
    <button v-if="!editMode" class="button float-right inline-block" @click="editCharacter">Edit</button>
    <button v-else class="button float-right inline-block bg-green-400" @click="exitEditCharacter">Stop Edit</button>

    <h1 :contenteditable="editMode" @keydown.enter.prevent @blur="onNameChange" class="mb-4 p-2">
      {{ character.name }}</h1>

    <SideCart class="mt-4">
      <div class="mt-2">
        <span>Status : </span>
        <span
            :class="character.alive ? 'text-green-500' : 'text-red-500'">{{ character.alive ? "Alive" : "Dead" }}</span>
      </div>

      <div class="mt-2" v-for="(info, index) in character.quickinfo">
        <span :contenteditable="editMode" @keydown.enter.prevent
              @blur="onInfoTitleChange($event.target.innerText, index)">{{ info.title }}</span>:
        <span :contenteditable="editMode" @keydown.enter.prevent
              @blur="onInfoContentChange($event.target.innerText, index)">{{ info.content }}</span>
      </div>

      <div v-if="editMode" @click="addQuickInfo" class="py-2 mt-4 border-4 border-accent border-dashed rounded flex justify-center items-center">
        <font-awesome-icon class="inline-block text-text-dark" icon="plus"/>
      </div>

    </SideCart>

    <h2 class="mt-8 text-lg p-2">Description</h2>
    <div v-for="(description, index) in character.description" class="mt-2">
      <h3 :contenteditable="editMode" @keydown.enter.prevent class="p-2"
          @blur="onDescriptionTitleChange($event.target.innerText, index)">{{ description.title }}</h3>

      <MultilineTextEdit v-if="editMode" @focusLost="onDescriptionContentChange(index)" v-model="character.description[index].content"/>

      <pre v-else class="p-2 mt-1 w-2/3">{{ character.description[index].content }}</pre>

    </div>

    <div v-if="editMode" @click="addDescriptionField" class="w-2/3 py-2 mt-4 border-4 border-dashed rounded flex justify-center items-center">
      <font-awesome-icon class="inline-block text-text-dark" icon="plus"/>
    </div>


  </div>
</template>
<script>
import SideCart from "../components/View/SideCard";
import {db} from "../plugins/firebase";
import router from "../router";
import MultilineTextEdit from "../components/MultilineTextEdit";

export default {
  components: {MultilineTextEdit, SideCart},
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
    onDescriptionTitleChange(newTitle, index) {

      let description = [...this.character.description];
      description[index].title = newTitle;

      this.dbRef.update({description});
    },
    onDescriptionContentChange(identifier) {
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
    onInfoTitleChange(newTitle, index) {
      let quickinfo = [...this.character.quickinfo];
      quickinfo[index].title = newTitle;

      this.dbRef.update({quickinfo});
    },
    onInfoContentChange(newContent, index) {
      let quickinfo = [...this.character.quickinfo];
      quickinfo[index].content = newContent;

      this.dbRef.update({quickinfo});
    }
  },
}
</script>
<style scoped>
h1 {
  @apply text-3xl font-semibold wFit pr-20;
}
h2 {
  @apply text-xl font-bold wFit pr-20;
}
h3 {
  @apply text-lg font-bold wFit pr-20;
}

.wFit {
  width: fit-content;
}

</style>
