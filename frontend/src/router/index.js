import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Home.vue')
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('@/view/Login.vue')
    },

    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('@/view/SignUp.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router