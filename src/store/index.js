import { createStore } from 'vuex'
import {collection, onSnapshot, query} from "firebase/firestore";
import { signOut } from "firebase/auth";
import {auth, db} from "@/plugins/firebase";

export default createStore({
  state: {
    npcs: [],
    user: null
  },
  getters: {
  },
  mutations: {
    setNpcs (state, npcs) {
      state.npcs = npcs;
    },
    setUser (state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      signOut(auth).then(() => {
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  actions: {
    // TODO unbind listener
    async bindNpcs ({ commit }, campaign) {
      const NPC_COLLECTION = collection(db, "campaigns", campaign, "npcs");
      onSnapshot(query(NPC_COLLECTION), (snapshot) => {
        commit('setNpcs', snapshot.docs.map(doc => {return {...doc.data(), _id: doc.id}}));
      });
    },
    handleLogin(context) {
      auth.onAuthStateChanged(async user => {
        if (user) {
          await context.commit('setUser', user);
        } else {
          await context.commit('setUser', null);
        }
      })
    }
  }
})
