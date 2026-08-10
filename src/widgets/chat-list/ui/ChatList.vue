<template>
    <div class="flex h-full flex-col bg-surface">
        <header class="shrink-0 border-b border-border px-5 py-5">
            <h1 class="text-center text-[20px] font-semibold text-text-primary">Messenger</h1>
        </header>

        <div
            ref="scrollContainer"
            class="min-h-0 flex-1 overflow-y-auto"
        >
            <div
                v-if="chatStore.isLoading && !chatStore.isInitialized"
                class="flex h-full items-center justify-center"
            >
                <span
                    class="h-7 w-7 animate-spin rounded-full border-2 border-chat-blue/30 border-t-chat-blue"
                />
            </div>

            <div
                v-else-if="chatStore.error"
                class="flex h-full items-center justify-center p-6 text-center"
            >
                <div>
                    <p class="text-[15px] font-medium text-error">
                        {{ chatStore.error }}
                    </p>

                    <button
                        type="button"
                        class="mt-3 text-sm font-medium text-chat-blue"
                        @click="chatStore.loadChats"
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>

            <div
                v-else-if="chatStore.isEmpty"
                class="flex h-full items-center justify-center p-6 text-center"
            >
                <div>
                    <p class="text-[15px] font-medium text-text-primary">Чатов пока нет</p>

                    <p class="mt-1 text-sm text-text-secondary">
                        Здесь появится список ваших диалогов
                    </p>
                </div>
            </div>

            <template v-else>
                <ChatItem
                    v-for="chat in chatStore.chats"
                    :key="chat.id"
                    :chat="chat"
                    @select="chatStore.selectChat"
                />

                <div
                    ref="loadMoreTrigger"
                    class="h-px"
                />

                <div
                    v-if="chatStore.isLoading && chatStore.isInitialized"
                    class="flex justify-center py-4"
                >
                    <span
                        class="h-6 w-6 animate-spin rounded-full border-2 border-chat-blue/30 border-t-chat-blue"
                    />
                </div>
            </template>
        </div>

        <footer class="shrink-0 border-t border-border p-4">
            <button
                type="button"
                class="group flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-6 py-4 text-[16px] font-medium text-text-secondary transition-all duration-200 hover:border-error/30 hover:bg-error-background hover:text-error active:scale-[0.98]"
                @click="handleLogout"
            >
                <svg
                    viewBox="0 0 24 24"
                    class="h-6 w-6 shrink-0 fill-current transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                >
                    <path
                        d="M10 3a1 1 0 0 1 1 1v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4v2H7a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h3Zm5.3 4.3a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.4-1.4l2.3-2.3H9a1 1 0 1 1 0-2h8.6l-2.3-2.3a1 1 0 0 1 0-1.4Z"
                    />
                </svg>

                <span> Выйти </span>
            </button>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChatItem, useChatStore } from '@/entities/chat';
import { useSessionStore } from '@/entities/session';

const router = useRouter();
const sessionStore = useSessionStore();
const chatStore = useChatStore();

const scrollContainer = ref<HTMLElement | null>(null);
const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

function createObserver(): void {
    if (observer || !scrollContainer.value || !loadMoreTrigger.value) {
        return;
    }

    observer = new IntersectionObserver(
        entries => {
            const entry = entries[0];

            if (entry?.isIntersecting) {
                void chatStore.loadChats();
            }
        },
        {
            root: scrollContainer.value,
            rootMargin: '150px 0px',
            threshold: 0,
        },
    );
    observer.observe(loadMoreTrigger.value);
}

async function initialize(): Promise<void> {
    if (chatStore.isInitialized) {
        await nextTick();
        createObserver();
        return;
    }

    await chatStore.loadChats();
    await nextTick();
    createObserver();
}

async function handleLogout(): Promise<void> {
    sessionStore.clearSession();
    await router.replace({
        name: 'login',
    });
}

onMounted(() => {
    void initialize();
});

onBeforeUnmount(() => {
    observer?.disconnect();
});
</script>
