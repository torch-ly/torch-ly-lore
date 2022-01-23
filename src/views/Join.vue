<template>
  Joining Campaign...
  <span class="block">{{error}}</span>
</template>
<script>
import {auth, functions} from "@/plugins/firebase";
import campaign from "@/views/Campaign";
import {httpsCallable} from "firebase/functions";
import {notify} from "@/components/Notification";

export default {
  data() {
    return {
      error: null,
    };
  },
  computed: {
    key() {
      return this.$route.query.key;
    },
    campaign() {
      return this.$route.params.campaign;
    }
  },
  mounted() {
    console.log(auth.currentUser);
    if (auth.currentUser == null) {

      let loginTimeout = setTimeout(() => {
        this.$router.push({name: "login"});
      }, 1000);

      auth.onAuthStateChanged((user) => {
        if (!user) return;

        console.log("User changed", user);
        this.join()
        clearTimeout(loginTimeout);
      })
    } else {
      this.join();
    }
  },
  methods: {
    join() {
      const joinCampaign = httpsCallable(functions, 'joinCampaign');
      joinCampaign({ campaign: this.campaign, key: this.key }).then(({data}) => {

        console.log("You were added to the campaign!");
        this.$router.push({name: 'Campaign Home'});

      }).catch(((error) => {
        this.error = error;
      }))
    }
  }
}
</script>
