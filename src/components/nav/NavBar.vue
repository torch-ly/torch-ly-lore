<template>
  <div class="flex justify-between w-screen p-4 text-text-light bg-primary">
    <div class="flex justify-center items-center">
      <router-link to="/">Torch-ly Lore</router-link>
    </div>
    <div>
      <div class="relative z-20" v-if="$store.state.isLoggedIn">
        <Settings />
      </div>
      <router-link to="/login" v-else class="button">Login</router-link>
    </div>
  </div>
</template>
<script>
import Settings from "./Settings/Settings";
export default {
  components: {Settings},
}
</script>
