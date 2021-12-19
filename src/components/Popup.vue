<template>
  <div class="" v-if="isOpen">
    <div class="fixed w-screen h-screen top-0 left-0 bg-gray-700 animateOpacity"/>
    <div class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center" @click="close">
      <div class="w-1/3 bg-white rounded pt-4">

        <div class="flex mr-2">

          <div class="w-1/6 flex justify-center">
            <div class="flex w-10 h-10 items-center justify-center bg-red-100 rounded-full"><font-awesome-icon class="text-red-500" icon="exclamation-triangle" /></div>
          </div>

          <div class="w-5/6">
            <h1 class="text-lg text-gray-900 leading-6 font-medium">{{ title }}</h1>

            <div class="text-gray-500 text-sm">
              {{ content }}
            </div>
          </div>

        </div>

        <div class="text-black bg-gray-50 sm:flex sm:flex-row-reverse rounded-b mt-5 px-4 py-3 sm:px-6">
          <button class="uppercase mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="close">cancel</button>
          <button class="uppercase w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" @click="accept">yes</button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import component from "./Popup.vue";

let com = null;

export default {
  data() {
    return {
      isOpen: false,
      title: "",
      content: "",
      close: () => {},
      accept: () => {}
    }
  },
  mounted() {
    com = this;
  }
}

export async function confirmationPopup(title, content) {
  com.isOpen = true;
  com.title = title;
  com.content = content;
  return await new Promise((resolve) => {
    com.close = () => {
      com.isOpen = false;
      resolve(false);
    }
    com.accept = () => {
      com.isOpen = false;
      resolve(true);
    }
  });

}

</script>
<style scoped>
.animateOpacity {
  animation: fadeInAnimation ease-in 200ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes fadeInAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.75;
  }
}
</style>
