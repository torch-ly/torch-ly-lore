<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "@/plugins/firebase";

export default {
  mounted() {

    db.collection("campaigns").doc("Iqor").collection("npcs")
        .onSnapshot((snap) => {
          snap.docChanges().forEach((change) => {
            console.log(change)
          });
        });
  }
}
</script>
