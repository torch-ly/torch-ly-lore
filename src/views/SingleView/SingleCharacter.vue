<template>
  <SingleItemView v-if="character" :item="character" collection-name="npcs" v-slot="item">
    <span>Status : </span>
    <span
        :class="item.alive ? 'text-green-500' : 'text-red-500'">{{
        item.alive ? "Alive" : "Dead"
      }}</span>
  </SingleItemView>
</template>
<script>
import SingleItemView from "../../components/View/SingleItemView";
export default {
  components: {SingleItemView},
  computed: {
    character() {
      return this.$store.state.npcs.find(
        (character) => character.id === this.$route.params.id
      );
    }
  }
}
</script>
