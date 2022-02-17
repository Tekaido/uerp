import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from './stores/useAuth';
import Dashboard from './pages/Dashboard.vue';
import Clients from './pages/Clients.vue';
import Billing from './pages/Billing.vue';
import Accounting from './pages/Accounting.vue';
import Profile from './pages/Account/Profile.vue';

const redirectToHomeOnLoggedIn = (to, from, next) => {
    if (useAuthStore().loggedIn) next({ name: 'dashboard' });
    else next();
};

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            layout: 'loggedIn',
            requireAuth: true,
        },
    },
    {
        path: '/clients',
        name: 'clients',
        component: Clients,
        meta: {
            layout: 'loggedIn',
            requireAuth: true,
        },
    },
    {
        path: '/billing',
        name: 'billing',
        component: Billing,
        meta: {
            layout: 'loggedIn',
            requireAuth: true,
        },
    },
    {
        path: '/accounting',
        name: 'accounting',
        component: Accounting,
        meta: {
            layout: 'loggedIn',
            requireAuth: true,
        },
    },
    {
        path: '/account/profile',
        name: 'profile',
        component: Profile,
        meta: {
            layout: 'loggedIn',
            requireAuth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login'),
        beforeEnter: redirectToHomeOnLoggedIn,
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('./pages/Logout'),
        meta: { requireAuth: true },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('./pages/Misc/404.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth && !useAuthStore().loggedIn) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
