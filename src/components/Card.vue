<template>
  <div class="flex flex-col h-full min-h-[10rem]">
    <div class="flex-grow">
      <h2 class="text-xl font-semibold text-gray-900 my-2">{{title}}</h2>

      <hr>

      <div class="my-2 px-2 mb-16">
        <slot />
      </div>
    </div>

    <div class="-mt-px flex divide-x divide-gray-200 border-t">
      <div v-if="editable" class="w-0 flex-1 flex">
        <button @click="edit" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-3 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          <PencilIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
          <span class="ml-3">Edit</span>
        </button>
      </div>
      <div :class="editable ? '-ml-px' : ''" class="w-0 flex-1 flex" >
        <button @click="view" :class="editable ? '' : 'rounded-bl-lg'" class="relative w-0 flex-1 inline-flex items-center justify-center py-3 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          <SearchIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
          <span class="ml-3">View</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { SearchIcon, PencilIcon } from "@heroicons/vue/solid";

export default {
  components: {
    SearchIcon,
    PencilIcon
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    // TODO bind this parameter
    editable: {
      type: Boolean,
      default: false,
    },
    route: {
      type: String,
      required: true,
    },
  },
  methods: {
    edit() {
      console.error("not yet implemented");
      this.$router.push(this.route);
    },
    view() {
      this.$router.push(this.route);
    },
  }
}
</script>
