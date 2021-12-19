<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-6">
    <div v-for="val in value" v-if="canView(val)">
      <div class="w-ful md:w-64 h-48 p-4 border border-gray-200 rounded relative">
        <span class="text-lg font-semibold">{{ val.name }}</span>
        <hr class="my-2">

        <slot :val="val" />

        <div class="absolute right-2 bottom-2 flex">
          <router-link v-if="canEdit(val)" :to="'/e/' + $store.state.campaign.id + '/' + route + '/' + val.id"
                       class="button bg-green-400">
            Edit
          </router-link>
          <router-link :to="'/w/' + $store.state.campaign.id + '/' + route + '/' + val.id" class="ml-2 button">
            View
          </router-link>
        </div>

      </div>
    </div>
    <PlusBox v-if="$store.state.userPermission.name !== 'default'" @click="newFunction" class="w-ful md:w-64 h-48"/>
  </div>
</template>
<script>
import {hasFilePermission} from "../../plugins/permissions";
import PlusBox from "../PlusBox";

export default {
  components: {
    PlusBox
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    newFunction: {
      type: Function,
      required: true
    }
  },
  methods: {
    canView(character) {
      return hasFilePermission(character.permissions).canView
    },
    canEdit(character) {
      return hasFilePermission(character.permissions).canEdit
    }
  }
}
</script>
