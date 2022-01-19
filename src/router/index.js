import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/Home.vue'
import Campaign from '../views/Campaign.vue'
import Npcs from '../views/Npcs.vue'
import {updateNavigation} from "@/components/NavBar";
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
        component: Campaign,
        props: true
    },
    {
        path: '/w/:campaign/npcs',
        name: 'Npcs',
        component: Npcs,
        props: true
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.afterEach(() => {
    store.dispatch('bindNpcs')
})

export default router
