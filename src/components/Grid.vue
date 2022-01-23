<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li v-for="item in value" :key="item._id" class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <slot :item="item" />
    </li>
    <li v-if="add !== undefined && ($store.getters.isGM || $store.getters.isUser)" @click="add">
      <div class="h-full min-h-[10rem] col-span-1 flex flex-col justify-center text-center bg-white rounded-lg shadow divide-y divide-gray-200 text-gray-90"><font-awesome-icon size="2x" icon="plus" /></div>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    add: {
      type: Function,
      required: false
    }
  }
}
</script>
