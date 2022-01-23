<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="../assets/Torchly-lore.png" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ register ? "Create an account" : "Sign in to your account" }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

        <div class="flex items-center mb-4" v-if="!register">
          <div class="text-sm">
            Don't have an account?
            <router-link to="register" replace class="font-medium text-indigo-600 hover:text-indigo-500">
              Create one
            </router-link>
          </div>
        </div>

        <form @submit.prevent="register ? createWithEmail() : signInWithEmail()" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input id="email" v-model="email" name="email" type="email" autocomplete="email" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input id="password" v-model="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="flex items-center justify-end" v-if="!register">
            <div class="text-sm">
              <a @click="resetPassword" class="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div class="flex items-center justify-end" v-else>
            <div class="text-sm">
              <router-link to="login" replace class="font-medium text-indigo-600 hover:text-indigo-500">
                Already have an account?
              </router-link>
            </div>
          </div>

          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ register ? 'Create account' : 'Sign in' }}
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-3">
            <div>
              <button @click="signInGoogle" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <span class="text-center mt-2 text-red-500">{{error}}</span>

  </div>
</template>
<script>
import {GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'
import {auth, googleProvider} from '@/plugins/firebase'
import store from "@/store";

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    signInGoogle() {
      signInWithPopup(auth, googleProvider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            this.$router.back();
          }).catch((error) => {
            const errorMessage = error.message;
      });
    },
    createWithEmail() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            this.$router.back();
            // ...
          })
          .catch((error) => {
            this.error = error;
          });
    },
    signInWithEmail() {
      signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.$router.back();
        // ...
      }).catch((error) => {
        this.error = error;
      });
    },
    resetPassword() {
      if (!this.email) {
        this.error = 'Please enter your email';
        return;
      }

      sendPasswordResetEmail(auth, this.email).then(() => {
        this.error = 'Password reset email sent';
      }).catch((error) => {
        this.error = error;
      });
    }
  },
  computed: {
    register() {
      return this.$route.name === 'register';
    }
  }
}
</script>
