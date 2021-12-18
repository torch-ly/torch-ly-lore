<template>
  <div class="flex flex-col h-screen">
    <NavBar/>
    <div class="hidden lg:flex flex-row flex-grow">
      <NavBarLeft v-if="$store.state.campaign" class="h-full shadow-xl flex-shrink-0"/>
      <router-view class="flex-grow w-screen"/>
    </div>

    <div class="lg:hidden relative h-full">
      <div class="absolute h-full flex flex-row flex-grow z-20" @click="navBarOpen = !navBarOpen">
        <NavBarLeft v-if="navBarOpen" class="h-full shadow-xl flex-grow"/>
        <div class="bg-gray-700 border-2 border-black mt-2 w-12 h-12 flex justify-center items-center">
          <font-awesome-icon icon="bars"/>
        </div>
      </div>

      <router-view class="z-10 mt-20"/>

    </div>

  </div>
</template>
<script>
import NavBar from "./components/nav/NavBar";
import NavBarLeft from "./components/nav/NavBarLeft";

export default {
  components: {NavBarLeft, NavBar},
  data() {
    return {
      navBarOpen: false,
    }
  }
}
</script>

<style>
pre {
  @apply font-sans !important;
}

.wFit {
  width: fit-content;
}
</style>
