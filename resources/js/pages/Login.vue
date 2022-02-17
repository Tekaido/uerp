<template>
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
            <span class="text-600 font-medium line-height-3">Don't have an account?</span>
            <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
        </div>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="username" class="block text-900 font-medium mb-2">Username</label>
                <InputText id="username" v-model="credentials.username" type="text" class="w-full mb-3" />

                <label for="password" class="block text-900 font-medium mb-2">Password</label>
                <InputText id="password" v-model="credentials.password" type="password" class="w-full mb-3" />

                <div class="flex align-items-center justify-content-between mb-6">
                    <div class="flex align-items-center">
                        <Checkbox id="rememberme1" :binary="true" class="mr-2"></Checkbox>
                        <label for="rememberme1">Remember me</label>
                    </div>
                    <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
                </div>

                <Button label="Sign In" icon="pi pi-user" class="w-full" type="submit"></Button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuth';
import { useErrorStore } from '../stores/useError';
document.title = 'uERP | Login';

const credentials = ref({});
const loading = ref(false);
const router = useRouter();
const error = useErrorStore();
const onSubmit = () => {
    loading.value = !loading.value;
    useAuthStore()
        .login(credentials.value)
        .then(() => router.push({ name: 'dashboard' }))
        .catch(() => (loading.value = !loading.value));
};
onBeforeUnmount(() => error.$reset());
</script>
