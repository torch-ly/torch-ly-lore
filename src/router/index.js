import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/Home.vue'
import Campaign from '../views/Campaign.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/w/:campaign',
        name: 'Campaign Home',
        component: Campaign,
        props: true
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
