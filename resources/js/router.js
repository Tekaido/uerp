import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from "./stores/useAuth";
import Dashboard from './pages/Dashboard.vue';

const redirectToHomeOnLoggedIn = (to, from, next) => {
  if (useAuthStore().loggedIn) next({ name: "dashboard" });
  else next();
};

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            layout: "loggedIn",
            requireAuth: true,
        },
    },
    {
    path: "/login",
    name: "login",
    component: () => import("./pages/Login"),
    beforeEnter: redirectToHomeOnLoggedIn,
    },
    {
    path: "/logout",
    name: "logout",
    component: () => import("./pages/Logout"),
    meta: { requireAuth: true },
  },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth && !useAuthStore().loggedIn) {
        next({ name: "login" });
    }
    else {
        next();
    }
});

export default router;
