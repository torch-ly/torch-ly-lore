<template>
  <div>
    <div v-if="burgerOpen" class="fixed top-0 left-0 w-screen h-screen" @click="burgerOpen = false" />
    <div class="flex relative justify-center w-full rounded-md border border-primary shadow-sm px-4 py-2 bg-primary-light text-sm font-medium text-gray-50 hover:bg-primary-lighter focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" @click="burgerOpen = !burgerOpen">
      <img :src="$store.state.user.photoURL" class="w-8 h-8 rounded-full gap-0"/>
      <div class="flex items-center justify-center ml-3">
        {{$store.state.user.displayName}}
        <font-awesome-icon class="mb-1 ml-2" icon="sort-down" />
      </div>
      <Menu v-if="burgerOpen" />
    </div>
  </div>
</template>
<script>
import Menu from "./Menu";
export default {
  components: {Menu},
  data() {
    return {
      burgerOpen: false
    }
  }
}
</script>
