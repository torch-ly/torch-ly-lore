<template>
  <Card :title="value.name">
    <span :class="['px-2 py-1 text-green-800 text-xs font-medium rounded-full select-none', value.alive ? 'bg-green-100' : 'bg-red-100']">{{ value.alive ? 'alive' : 'dead' }}</span>
  </Card>
</template>
<script>
import Card from '@/components/Card'

export default {
  components: {
    Card
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
}
</script>
