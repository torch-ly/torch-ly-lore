import {createStore} from 'vuex'
import {collection, doc, onSnapshot, query, where} from "firebase/firestore";
import {signOut} from "firebase/auth";
import {auth, db} from "@/plugins/firebase";
import router from "@/router";
import {npcConverter} from "@/plugins/collections/npcs";

export default createStore({
    state: {
        npcs: [],
        _npcListener: null,
        campaignData: null,
        _campaignDataListener: null,
        campaign: null,
        user: null,
        users: [],
    },
    getters: {
        isGM: state => {
            return state.campaignData?.gms.includes(state.user?.uid);
        },
        isUser: state => {
            return state.campaignData?.users.includes(state.user?.uid)
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setUsers(state, users) {
            state.users = users;
        },
        setCampaign(state, campaign) {
            state.campaign = campaign;
        },
        setNpcs(state, npcs) {
            state.npcs = npcs;
        },
        setNpcListener(state, listener) {
            state._npcListener = listener;
        },
        setCampaignData(state, data) {
            state.campaignData = data;
        },
        setCampaignDataListener(state, listener) {
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
        async bindNpcs({commit, state, dispatch, getters}) {

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

                    if (state.campaignData?.users?.includes(state.user.uid)) {
                        validArray.push("users");
                    }
                }

                // GMs are allowed to read all fields
                let queryArgument = query(NPC_COLLECTION, where('permissionRead', 'array-contains-any', validArray));
                if (getters.isGM) {
                    queryArgument = query(NPC_COLLECTION)
                }

                let listener = onSnapshot(queryArgument, (snapshot) => {
                    commit('setNpcs', snapshot.docs.map(doc => {
                        return doc.data()
                    }));
                });
                commit('setNpcListener', listener);

            }

        },
        async bindCampaignData({commit, state, dispatch}) {

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
        async bindUsers({commit}) {

            // TODO set limit
            const USERS_COLLECTION = collection(db, "users");

            onSnapshot(query(USERS_COLLECTION), (snapshot) => {
                commit('setUsers', snapshot.docs.map(doc => {
                    let data = {
                        id: doc.id,
                        ...doc.data()
                    }
                    return data
                }));
            });

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
                } else {
                    await context.commit('setUser', null);
                }

                // TODO change this! This consumes a lot of resources
                await context.state?._npcListener();
                context.commit('setNpcListener', null);

                context.dispatch('bindNpcs');
            })
        }
    }
})
