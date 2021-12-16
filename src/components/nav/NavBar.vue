<template>
  <div class="flex justify-between w-screen p-4 text-text-light bg-primary">
    <div v-if="burgerOpen" class="fixed top-0 left-0 z-10 w-screen h-screen" @click="burgerOpen = false" />
    <div class="flex justify-center items-center">
      <router-link to="/">Torch-ly Lore</router-link>
    </div>
    <div>
      <div class="relative z-20" v-if="$store.state.isLoggedIn">
        <div class="flex relative" @click="burgerOpen = !burgerOpen">
          <img :src="$store.state.user.photoURL" class="w-8 h-8 rounded-full gap-0"/>
          <div class="flex items-center justify-center ml-3">
            {{$store.state.user.displayName}}
            <font-awesome-icon class="mb-1 ml-1" icon="sort-down"></font-awesome-icon>
          </div>
          <div v-if="burgerOpen" class="absolute right-0 top-8 p-2 shadow-lg border border-gray-300 bg-gray-100 text-text-dark text-xs rounded" @click="logout">LOG OUT</div>
        </div>
      </div>
      <router-link to="/login" v-else class="button">Login</router-link>
    </div>
  </div>
</template>
<script>
import router from '../../router';
export default {
  data() {
    return {
      router,
      burgerOpen: false,
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout');
    },
  },
}

</script>
