import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/Home.vue'
import Campaign from '../views/Campaign.vue'
import Npcs from '../views/NPC/Npcs.vue'
import Npc from '../views/NPC/Npc.vue'
import DocumentSettings from '../views/DocumentSettings.vue'
import store from "@/store";

const Setting = () => import('../views/Settings.vue');
const Join = () => import('../views/Join.vue');

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
        path: '/register',
        name: 'register',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/w/:campaign',
        name: 'Campaign Home',
        component: Campaign
    },
    {
        path: '/w/:campaign/settings',
        name: 'Campaign Settings',
        component: Setting
    },
    {
        path: '/w/:campaign/join',
        name: 'Join Campaign',
        component: Join
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
    },
    {
        path: '/w/:campaign/:type/:id/settings',
        name: 'Document settings',
        component: () => import('../views/DocumentSettings.vue')
    },
    {
        path: "/:catchAll(.*)",
        name: '404',
        component: () => import('../views/404.vue')
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
