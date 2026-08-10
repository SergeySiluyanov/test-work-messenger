import { reactive, ref } from 'vue';
import { ApiError } from '@/shared/api';
import { useSessionStore } from '@/entities/session';
import { login } from '../api/login';
import { prepareCredentials } from '../lib/prepareCredentials';
import { validateCredentials } from '../lib/validateCredentials';

import type { LoginFormErrors } from './auth.types';

export function useLoginForm() {
    const sessionStore = useSessionStore();
    const loginValue = ref('');
    const password = ref('');
    const errors = reactive<LoginFormErrors>({});
    const serverError = ref<string | null>(null);
    const isLoading = ref(false);

    function clearErrors(): void {
        errors.login = undefined;
        errors.password = undefined;
        serverError.value = null;
    }

    async function submit(): Promise<boolean> {
        clearErrors();
        const credentials = prepareCredentials({
            login: loginValue.value,
            password: password.value,
        });

        const validationErrors = validateCredentials(credentials);
        errors.login = validationErrors.login;
        errors.password = validationErrors.password;

        if (errors.login || errors.password) {
            return false;
        }

        isLoading.value = true;

        try {
            const response = await login(credentials);
            sessionStore.setToken(response.token);
            return true;
        } catch (error: unknown) {
            serverError.value =
                error instanceof ApiError ? error.message : 'Не удалось выполнить вход';
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        loginValue,
        password,
        errors,
        serverError,
        isLoading,
        submit,
    };
}
