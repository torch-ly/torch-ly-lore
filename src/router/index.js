import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CampaignHome from '../views/CampaignHome.vue'
import Login from "../views/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/w/:campaign',
        name: 'Campaign Details',
        component: CampaignHome,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
