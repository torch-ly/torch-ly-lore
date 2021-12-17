<template>
  <div class="flex flex-col h-screen">
    <NavBar />
    <div class="flex flex-row flex-grow">
      <NavBarLeft v-if="$store.state.campaign" class="h-full shadow-xl flex-shrink-0"/>
      <router-view class="flex-grow w-screen"/>
    </div>

  </div>
</template>
<script>
import NavBar from "./components/nav/NavBar";
import NavBarLeft from "./components/nav/NavBarLeft";
export default {
  components: {NavBarLeft, NavBar}
}
</script>

<style>
pre {
  @apply font-sans !important;
}
</style>
