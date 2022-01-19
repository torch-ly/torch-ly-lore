import { createStore } from 'vuex'
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "@/plugins/firebase";

export default createStore({
  state: {
    npcs: [],
    campaign: "Iqor"
  },
  getters: {
  },
  mutations: {
    setNpcs (state, npcs) {
      state.npcs = npcs;
    }
  },
  actions: {
    // TODO unbind listener
    async bindNpcs ({ commit }, campaign) {
      const NPC_COLLECTION = collection(db, "campaigns", campaign, "npcs");
      onSnapshot(query(NPC_COLLECTION), (snapshot) => {
        commit('setNpcs', snapshot.docs.map(doc => {return {...doc.data(), _id: doc.id}}));
      });
    }
  }
})
