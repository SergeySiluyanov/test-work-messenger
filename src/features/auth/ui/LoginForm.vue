<template>
    <form
        class="flex w-full flex-col gap-4"
        novalidate
        @submit.prevent="handleSubmit"
    >
        <div>
            <div
                class="relative rounded-xl border bg-surface transition"
                :class="
                    errors.login
                        ? 'border-error'
                        : 'border-border focus-within:border-chat-blue focus-within:ring-1 focus-within:ring-chat-blue'
                "
            >
                <input
                    id="login"
                    v-model="loginValue"
                    type="text"
                    autocomplete="username"
                    placeholder=" "
                    class="peer h-[54px] w-full rounded-xl bg-transparent px-4 pt-4 text-[16px] text-text-primary outline-none"
                />

                <label
                    for="login"
                    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-surface text-[16px] text-text-secondary transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-chat-blue peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                    Логин
                </label>
            </div>

            <p
                v-if="errors.login"
                class="mt-1.5 px-1 text-[13px] text-error"
            >
                {{ errors.login }}
            </p>
        </div>

        <div>
            <div
                class="relative rounded-xl border bg-surface transition"
                :class="
                    errors.password
                        ? 'border-error'
                        : 'border-border focus-within:border-chat-blue focus-within:ring-1 focus-within:ring-chat-blue'
                "
            >
                <input
                    id="password"
                    v-model="password"
                    type="password"
                    autocomplete="current-password"
                    placeholder=" "
                    class="peer h-[54px] w-full rounded-xl bg-transparent px-4 pt-4 text-[16px] text-text-primary outline-none"
                />

                <label
                    for="password"
                    class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 bg-surface text-[16px] text-text-secondary transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-chat-blue peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                    Пароль
                </label>
            </div>

            <p
                v-if="errors.password"
                class="mt-1.5 px-1 text-[13px] text-error"
            >
                {{ errors.password }}
            </p>
        </div>

        <div
            v-if="serverError"
            role="alert"
            class="rounded-xl bg-error-background px-4 py-3 text-center text-sm text-error-text"
        >
            {{ serverError }}
        </div>

        <button
            type="submit"
            :disabled="isLoading"
            class="mt-2 flex h-[50px] w-full items-center justify-center rounded-xl bg-chat-blue px-4 text-[15px] font-semibold text-white transition hover:bg-chat-blue-hover active:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
            <span
                v-if="isLoading"
                class="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                aria-label="Выполняется вход"
            />

            <span v-else> Войти </span>
        </button>
    </form>
</template>

<script setup lang="ts">
import { useLoginForm } from '../model/useLoginForm';

const emit = defineEmits<{
    success: [];
}>();

const { loginValue, password, errors, serverError, isLoading, submit } = useLoginForm();

async function handleSubmit(): Promise<void> {
    const success = await submit();

    if (success) {
        emit('success');
    }
}
</script>
