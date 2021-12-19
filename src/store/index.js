import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db, auth} from "../plugins/firebase";
import router from "../router";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        campaign: [],
        npcs: [],
        user: null,
        users: [],
        userPermission: 'default',
        userPermissionTree: [],
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
        userPermissionTree(state, tree) {
            state.userPermissionTree = tree;
        },
        setUserPermission(state, permission) {
            state.userPermission = permission;
        },
        ...vuexfireMutations
    },
    actions: {
        bindCampaign: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('campaign', db.collection('campaigns').doc(router.currentRoute.params.campaign))
        }),
        bindNPCs: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('npcs', db.collection('campaigns').doc(router.currentRoute.params.campaign).collection('npcs'))
        }),
        bindUsers: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('users', db.collection('users'))
        }),
        handleLogin(context) {
            auth.onAuthStateChanged(async user => {
                if (user) {
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

export default store;
