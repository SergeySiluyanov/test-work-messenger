import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const TOKEN_STORAGE_KEY = 'auth_token';

export const useSessionStore = defineStore('session', () => {
    const token = ref<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));
    const isAuthenticated = computed(() => token.value !== null);

    function setToken(value: string): void {
        token.value = value;
        localStorage.setItem(TOKEN_STORAGE_KEY, value);
    }

    function clearSession(): void {
        token.value = null;
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    return {
        token,
        isAuthenticated,
        setToken,
        clearSession,
    };
});
