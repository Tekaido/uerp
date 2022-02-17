<template>
    <div class="layout-profile">
        <div>
            <img src="assets/layout/images/profile.png" alt="" />
        </div>
        <button class="p-link layout-profile-link" @click="onClick">
            <span class="username">{{ authStore.user.name }} {{ authStore.user.surname }}</span>
            <i class="pi pi-fw pi-cog"></i>
        </button>
        <Transition name="layout-submenu-wrapper">
            <ul v-show="expanded">
                <li>
                    <button class="p-link" @click="$router.push('/account/profile')"><i class="pi pi-fw pi-user"></i><span>Account</span></button>
                </li>
                <li>
                    <button class="p-link"><i class="pi pi-fw pi-inbox"></i><span>Notifications</span><span class="menuitem-badge">2</span></button>
                </li>
                <li>
                    <button class="p-link" @click="$router.push('logout')"><i class="pi pi-fw pi-power-off"></i><span> Logout</span></button>
                </li>
            </ul>
        </Transition>
    </div>
</template>

<script>
import { useAuthStore } from '../stores/useAuth';

export default {
    setup() {
        const authStore = useAuthStore();
        authStore.fetchUser();
        return { authStore };
    },
    data() {
        return {
            expanded: false,
        };
    },
    methods: {
        onClick(event) {
            this.expanded = !this.expanded;
            event.preventDefault();
        },
    },
};
</script>

<style scoped></style>
