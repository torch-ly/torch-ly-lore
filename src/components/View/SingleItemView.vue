<template>
  <PermissionsSufficient v-if="item" :permissions="item.permissions" @canEdit="canEdit = $event">
    <div class="m-2 relative p-6">
      <div v-if="canEdit">
        <button v-if="!editMode" class="-mt-10 lg:mt-0 button float-right inline-block" @click="setEditMode(true)">Edit
        </button>
        <button v-else class="-mt-10 lg:mt-0 button float-right inline-block bg-green-400" @click="setEditMode(false)">
          Stop Edit
        </button>
      </div>

      <SingleLineEdit :editMode="editMode" @focusLost="onNameChange" v-model="item.name" @trash="deleteCharacter"
                      class="h1 mb-4"/>

      <SideCart class="mt-4">

        <div class="mt-2 ml-2">
          <slot :item="item"/>
        </div>

        <div class="mt-2 flex" v-for="(info, index) in item.quickinfo">

          <SingleLineEdit noTrash :editMode="editMode" @focusLost="onQuickInfoChange" v-model="info.title"/>
          <span class="py-2">:</span>
          <SingleLineEdit :editMode="editMode" @focusLost="onQuickInfoChange" @trash="removeQuickInfo(index)"
                          v-model="info.content"/>

        </div>

        <PlusBox v-if="editMode" class="mt-4 border-accent" @click="addQuickInfo"/>

      </SideCart>

      <h2 class="mt-8 text-lg p-2">Description</h2>
      <div v-for="(description, index) in item.description" class="mt-2">

        <SingleLineEdit class="h3" :editMode="editMode" @focusLost="onDescriptionChange"
                        @trash="removeDescriptionField(index)" v-model="description.title"/>

        <MultilineTextEdit :editMode="editMode" @focusLost="onDescriptionChange" v-model="description.content"/>

      </div>

      <PlusBox v-if="editMode" class="w-2/3 mt-4" @click="addDescriptionField"/>

    </div>
  </PermissionsSufficient>
</template>
<script>
import SideCart from "./SideCard";
import {db} from "../../plugins/firebase";
import router from "../../router";
import MultilineTextEdit from "../MultilineTextEdit";
import SingleLineEdit from "../SingleLineEdit";
import PlusBox from "../PlusBox";
import PermissionsSufficient from "./Permission/PermissionsSufficient";

export default {
  components: {PermissionsSufficient, PlusBox, SingleLineEdit, MultilineTextEdit, SideCart},
  data() {
    return {
      canEdit: false,
    }
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
  },
  computed: {
    editMode() {
      return this.canEdit && this.$route.params.mode === "e";
    },
    dbRef() {
      return db.collection('campaigns').doc(router.currentRoute.params.campaign).collection(this.collectionName).doc(this.item.id);
    }
  },
  methods: {
    setEditMode(mode) {
      this.$router.push({
        params: {mode: mode ? 'e' : 'w'}
      });
    },
    onNameChange() {
      this.dbRef.update({name: this.item.name});
    },
    deleteCharacter() {
      this.dbRef.delete();
      router.push({name: "Character Overview"});
    },
    onDescriptionChange() {
      this.dbRef.update({description: this.item.description});
    },
    addDescriptionField() {
      if (!this.item.description) {
        this.item.description = [];
      }

      this.dbRef.update({
        description: [
          ...this.item.description,
          {
            title: "New Description",
            content: "Write your text here!"
          }
        ]
      });
    },
    removeDescriptionField(index) {
      this.item.description.splice(index, 1);
      this.dbRef.update({description: this.item.description});
    },
    addQuickInfo() {
      if (!this.item.quickinfo) {
        this.item.quickinfo = [];
      }

      this.dbRef.update({
        quickinfo: [
          ...this.item.quickinfo,
          {
            title: "Info",
            content: "Content"
          }
        ]
      });
    },
    onQuickInfoChange() {
      this.dbRef.update({quickinfo: this.item.quickinfo});
    },
    removeQuickInfo(index) {
      this.character.quickinfo.splice(index, 1);
      this.dbRef.update({quickinfo: this.item.quickinfo});
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
