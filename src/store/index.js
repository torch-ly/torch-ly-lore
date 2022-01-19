import { createStore } from 'vuex'
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "@/plugins/firebase";
import Vue from 'vue'

const NPC_COLLECTION = query(collection(db, "campaigns", "Iqor", "npcs"))

export default createStore({
  state: {
    npcs: []
  },
  getters: {
  },
  mutations: {
    setNpcs (state, npcs) {
      // TODO update the firestore
    },
    _privateSetNpcs (state, npcs) {
      state.npcs = npcs
    }
  },
  actions: {
    async bindNpcs ({ commit }) {
      onSnapshot(NPC_COLLECTION, (snapshot) => {
        commit('_privateSetNpcs', snapshot.docs.map(doc => doc.data()));
      });
    }
  },
  modules: {
  }
})
