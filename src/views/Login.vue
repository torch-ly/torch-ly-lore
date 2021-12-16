<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <div>
      <!--img class="h-48 mb-4 mx-auto" src="../assets/logo.svg" /-->
      <p class="text-xl font-bold text-gray-800 mb-4 text-center">Torch-ly Lore</p>
      <div id="firebaseui"></div>
    </div>
  </div>
</template>
<script>
import { ui, uiConfig } from "../plugins/firebase-ui";
import "firebaseui/dist/firebaseui.css"

export default {
  mounted() {
    ui.start("#firebaseui", uiConfig);
  },
}
</script>
