import { createRouter, createWebHistory } from 'vue-router';

import { pinia } from '@/app/providers/pinia';

import { useSessionStore } from '@/entities/session';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login/ui/LoginPage.vue'),
            meta: {
                guestOnly: true,
            },
        },
        {
            path: '/messenger',
            name: 'messenger',
            component: () => import('@/pages/messenger/ui/MessengerPage.vue'),
            meta: {
                requiresAuth: true,
            },
        },
    ],
});

router.beforeEach(to => {
    const sessionStore = useSessionStore(pinia);
    if (to.meta.requiresAuth && !sessionStore.isAuthenticated) {
        return {
            name: 'login',
        };
    }

    if (to.meta.guestOnly && sessionStore.isAuthenticated) {
        return {
            name: 'messenger',
        };
    }

    return true;
});

export { router };
