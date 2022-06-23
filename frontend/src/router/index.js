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
    },

    {
        path: '/newpost',
        name: 'newpost',
        component: () => import('@/view/newPostView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router