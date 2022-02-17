<template>
    <div class="col text-center">
        <ProgressSpinner />
        <div class="lead">Please wait...</div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from '@vue/runtime-core';
import { useAuthStore } from '../stores/useAuth';
const auth = useAuthStore();
const router = useRouter();
document.title = `uERP | Please wait...`;
onMounted(() => auth.logout().then(() => router.push({ name: 'login' })));
</script>
