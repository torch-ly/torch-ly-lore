<template>
  <div class="text-white" v-if="isOpen">
    <div class="fixed top-0 left-0" @click="close"/>
    <div class="fixed top-1/4 right-1/3 w-1/3 h-1/4 bg-primary rounded-xl">
      <h1 class="w-full text-center text-xl mt-2">{{ title }}</h1>

      <div class="m-4">
        {{ content }}
      </div>

      <div class="absolute bottom-4 right-4 text-black">
        <button class="button px-3 py-1" @click="accept">yes</button>
        <button class="button px-3 py-1 ml-3 bg-gray-700" @click="close">no</button>
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
