<template>
  <div class="w-screen bg-white h-screen fixed z-50 top-0 left-0 flex flex-col justify-center items-center">
    <div>
      <!--img class="h-48 mb-4 mx-auto" src="../assets/logo.svg" /-->
      <p class="text-xl font-bold text-gray-800 mb-4 text-center">Torch-ly Lore</p>
      <button @click="signIn">Google login</button>
      <div id="firebaseui"></div>
    </div>
  </div>
</template>
<script>
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {auth, googleProvider} from '@/plugins/firebase'
import store from "@/store";

export default {
  methods: {
    signIn() {
      signInWithPopup(auth, googleProvider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
          }).catch((error) => {
            const errorMessage = error.message;
      });
    }
  },
}
</script>
