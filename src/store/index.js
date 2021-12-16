import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from "../plugins/firebase";
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        campaign: [],
    },
    mutations: vuexfireMutations,
    actions: {
        bindTodosRef: firestoreAction(({ bindFirestoreRef }) => {
            console.log(router.currentRoute.params)
            return bindFirestoreRef('campaign', db.collection('campaigns').doc(router.currentRoute.params.campaign))
        }),
    },
})
