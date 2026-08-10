<template>
    <main
        class="flex min-h-dvh w-full items-center justify-center bg-app-background px-4 py-8 sm:px-6"
    >
        <section class="w-full max-w-[360px]">
            <header class="mb-7 text-center sm:mb-8">
                <div
                    class="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-chat-blue sm:h-20 sm:w-20"
                >
                    <svg
                        viewBox="0 0 24 24"
                        class="h-9 w-9 fill-white sm:h-10 sm:w-10"
                        aria-hidden="true"
                    >
                        <path
                            d="M21.7 3.4 18.5 19c-.2 1.1-.9 1.4-1.8.9l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9-8.1c.4-.4-.1-.6-.6-.2L6.1 12.8l-4.8-1.5c-1-.3-1.1-1 .2-1.5L20.2 2.6c.9-.3 1.7.2 1.5.8Z"
                        />
                    </svg>
                </div>

                <h1 class="text-[26px] font-semibold text-text-primary sm:text-[28px]">
                    Messenger
                </h1>

                <p class="mt-2 text-[14px] leading-5 text-text-secondary sm:text-[15px]">
                    Введите логин и пароль,
                    <br />
                    чтобы продолжить
                </p>
            </header>

            <LoginForm @success="handleSuccess" />
        </section>
    </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { LoginForm } from '@/features/auth';

const router = useRouter();

async function handleSuccess(): Promise<void> {
    await router.push({
        name: 'messenger',
    });
}
</script>
