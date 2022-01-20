import { createStore } from 'vuex'
import {collection, onSnapshot, query} from "firebase/firestore";
import { signOut } from "firebase/auth";
import {auth, db} from "@/plugins/firebase";
import router from "@/router";
import {npcConverter} from "@/plugins/collections/npcs";

export default createStore({
  state: {
    npcs: [],
    _npcListener: null,
    campaign: null,
    user: null
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setCampaign (state, campaign) {
      state.campaign = campaign;
    },
    setNpcs (state, npcs) {
      state.npcs = npcs;
    },
    setNpcListener (state, listener) {
      state._npcListener = listener;
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
    async bindNpcs ({commit, state, dispatch}) {

      if (router.currentRoute.value.params.campaign !== state.campaign) {
        await dispatch('unbind');
      }

      if (state._npcListener === null) {
        let campaign = router.currentRoute.value.params.campaign + "";

        commit('setCampaign', campaign);

        const NPC_COLLECTION = collection(db, "campaigns", campaign, "npcs").withConverter(npcConverter);

        let listener = onSnapshot(query(NPC_COLLECTION), (snapshot) => {
          commit('setNpcs', snapshot.docs.map(doc => {return {...doc.data(), _id: doc.id}}));
        });
        commit('setNpcListener', listener);

      }

    },
    async unbind({commit, state}) {
      if (state._npcListener != null) await state._npcListener();
      commit('setNpcListener', null);
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
