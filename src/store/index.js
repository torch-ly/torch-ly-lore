import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db, auth} from "../plugins/firebase";
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        campaign: [],
        user: null,
        isLoggedIn: false
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setLoggedInState(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
            auth.signOut();
        },
        ...vuexfireMutations
    },
    actions: {
        bindTodosRef: firestoreAction(({ bindFirestoreRef }) => {
            console.log(router.currentRoute.params)
            return bindFirestoreRef('campaign', db.collection('campaigns').doc(router.currentRoute.params.campaign))
        }),
        handleLogin(context) {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    console.log(1, user)
                    await context.commit('setUser', user);
                    await context.commit('setLoggedInState', true);
                } else {
                    await context.commit('setUser', {});
                    await context.commit('setLoggedInState', false);
                }
            })
        }
    },
})
