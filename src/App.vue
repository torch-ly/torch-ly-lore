<template>
  <div class="flex flex-col h-screen">
    <NavBar/>

    <Popup/>

    <div class="hidden lg:flex flex-row flex-grow">
      <NavBarLeft v-if="$store.state.campaign" class="h-full shadow-xl flex-shrink-0"/>
      <router-view class="flex-grow w-screen"/>
    </div>

    <div class="lg:hidden relative h-full">
      <div class="absolute h-full flex flex-row flex-grow z-20" @click="navBarOpen = !navBarOpen">
        <NavBarLeft v-if="navBarOpen" class="h-full shadow-xl flex-grow"/>
        <div class="bg-primary-lighter border-2 border-black mt-2 w-12 h-12 flex justify-center items-center text-gray-100">
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
import Popup from "./components/Popup";
import {generatePermissionTree, userPermission} from "./plugins/permissions";

export default {
  components: {NavBarLeft, NavBar, Popup},
  data() {
    return {
      navBarOpen: false,
    }
  },
  computed: {
    permissions() {
      return this.$store.state.campaign.permissions;
    },
    userPermission() {
      return this.$store.state.campaign.users;
    }
  },
  watch: {
    userPermission(campaign) {
      if (campaign) {
        this.$store.commit("setUserPermission", userPermission())
        this.$store.commit("userPermissionTree", generatePermissionTree())
      }
    },
    permissions(campaign) {
      if (campaign) {
        this.$store.commit("setUserPermission", userPermission())
        this.$store.commit("userPermissionTree", generatePermissionTree())
      }
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
