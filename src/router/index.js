import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/Home.vue'
import Campaign from '../views/Campaign.vue'
import Npcs from '../views/NPC/Npcs.vue'
import Npc from '../views/NPC/Npc.vue'
import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/w/:campaign',
        name: 'Campaign Home',
        component: Campaign
    },
    {
        path: '/w/:campaign/npcs',
        name: 'Npcs',
        component: Npcs
    },
    {
        path: '/w/:campaign/npc/:id',
        name: 'Npc details',
        component: Npc
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.afterEach(() => {
    store.dispatch('bindCampaignData')
    store.dispatch('bindNpcs')
})

export default router
