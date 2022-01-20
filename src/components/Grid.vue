<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li v-for="item in value" :key="item._id" class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <slot :item="item" />
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
  }
}
</script>
