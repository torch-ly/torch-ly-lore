<template>
  <div class="about">
    {{npcs}}
    <h1>This is an about page</h1>
    <div></div>
  </div>
</template>
<script>
import {db} from "@/plugins/firebase";
import { collection, query, where, onSnapshot, doc, getDoc, getDocs } from "firebase/firestore";

export default {
  computed: {
    npcs() {
      return this.$store.state.npcs;
    }
  },
}
</script>
