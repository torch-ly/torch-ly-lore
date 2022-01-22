import { createStore } from 'vuex'
import {collection, doc, onSnapshot, query, where} from "firebase/firestore";
import { signOut } from "firebase/auth";
import {auth, db} from "@/plugins/firebase";
import router from "@/router";
import {npcConverter} from "@/plugins/collections/npcs";

export default createStore({
  state: {
    npcs: [],
    _npcListener: null,
    campaignData: [],
    _campaignDataListener: null,
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
    setCampaignData (state, data) {
      state.campaignData = data;
    },
    setCampaignDataListener (state, listener) {
      state._campaignDataListener = listener;
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

        let validArray = ['default'];
        if (state.user) {
          validArray.push(state.user.uid);

          if (state.campaignData.users?.includes(state.user.uid)) {
            validArray.push("users");
          }
        }

        let listener = onSnapshot(query(NPC_COLLECTION, where('permissionRead', 'array-contains-any', validArray)), (snapshot) => {
          commit('setNpcs', snapshot.docs.map(doc => {return doc.data()}));
        });
        commit('setNpcListener', listener);

      }

    },
    async bindCampaignData ({commit, state, dispatch}) {

      if (router.currentRoute.value.params.campaign !== state.campaign) {
        await dispatch('unbind');
      }

      if (state._npcListener === null) {
        let campaign = router.currentRoute.value.params.campaign + "";

        commit('setCampaign', campaign);

        const DOC = doc(db, "campaigns", campaign);

        let listener = onSnapshot(DOC, async (doc) => {
          commit('setCampaignData', doc.data());

          // TODO change this! This consumes a lot of resources
          await state._npcListener();
          commit('setNpcListener', null);

          dispatch('bindNpcs');
        });

        commit('setCampaignDataListener', listener);

      }

    },
    async unbind({commit, state}) {
      if (state._npcListener != null) await state._npcListener();
      commit('setNpcListener', null);

      if (state._campaignDataListener != null) await state._campaignDataListener();
      commit('setCampaignDataListener', null);
    },
    handleLogin(context) {
      auth.onAuthStateChanged(async user => {
        if (user) {
          await context.commit('setUser', user);

          // TODO change this! This consumes a lot of resources
          await context.state._npcListener();
          context.commit('setNpcListener', null);

          context.dispatch('bindNpcs');

        } else {
          await context.commit('setUser', null);
        }
      })
    }
  }
})
