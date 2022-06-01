import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/view/HomeView.vue')
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/LoginView.vue')
    },

    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/view/SignUpView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router