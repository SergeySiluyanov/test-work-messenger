<template>
    <div class="flex h-full min-h-0 flex-col bg-app-background">
        <template v-if="chatStore.selectedChatId">
            <header
                v-if="chatStore.selectedChat"
                class="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-4 py-3"
            >
                <button
                    type="button"
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-secondary transition hover:bg-app-background md:hidden"
                    aria-label="Вернуться к списку чатов"
                    @click="handleBack"
                >
                    <svg
                        viewBox="0 0 24 24"
                        class="h-5 w-5 fill-current"
                        aria-hidden="true"
                    >
                        <path
                            d="M14.7 5.3a1 1 0 0 1 0 1.4L9.4 12l5.3 5.3a1 1 0 0 1-1.4 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0Z"
                        />
                    </svg>
                </button>

                <div class="min-w-0">
                    <h2 class="truncate text-[16px] font-semibold text-text-primary">
                        {{ chatStore.selectedChat.userName }}
                    </h2>

                    <p
                        class="mt-0.5 text-[13px]"
                        :class="
                            chatStore.selectedChat.isOnline ? 'text-chat-blue' : 'text-text-muted'
                        "
                    >
                        {{ chatStore.selectedChat.isOnline ? 'онлайн' : 'оффлайн' }}
                    </p>
                </div>
            </header>

            <div
                ref="scrollContainer"
                class="min-h-0 flex-1 overflow-y-auto p-4"
                @scroll="handleScroll"
            >
                <div
                    v-if="messageStore.isLoading && messageStore.messages.length === 0"
                    class="flex h-full items-center justify-center"
                >
                    <span
                        class="h-7 w-7 animate-spin rounded-full border-2 border-chat-blue/30 border-t-chat-blue"
                    />
                </div>

                <template v-else>
                    <div
                        v-if="messageStore.isLoading && messageStore.messages.length > 0"
                        class="flex justify-center py-3"
                    >
                        <span
                            class="h-5 w-5 animate-spin rounded-full border-2 border-chat-blue/30 border-t-chat-blue"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <MessageItem
                            v-for="message in messageStore.messages"
                            :key="message.id"
                            :message="message"
                        />
                    </div>
                </template>
            </div>

            <SendMessageForm />
        </template>

        <div
            v-else
            class="flex min-h-0 flex-1 items-center justify-center p-6"
        >
            <div class="text-center">
                <h2 class="text-[18px] font-semibold text-text-primary">Выберите чат</h2>

                <p class="mt-1 text-[14px] text-text-secondary">
                    Выберите чат, чтобы начать переписку
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useChatStore } from '@/entities/chat';
import { MessageItem, useMessageStore } from '@/entities/message';
import { SendMessageForm } from '@/features/send-message';

const chatStore = useChatStore();
const messageStore = useMessageStore();
const scrollContainer = ref<HTMLElement | null>(null);

async function scrollToBottom(behavior: ScrollBehavior = 'auto'): Promise<void> {
    await nextTick();
    const container = scrollContainer.value;

    if (!container) {
        return;
    }

    container.scrollTo({
        top: container.scrollHeight,
        behavior,
    });
}

function handleBack(): void {
    chatStore.clearSelection();
}

async function handleScroll(): Promise<void> {
    const container = scrollContainer.value;

    if (
        !container ||
        container.scrollTop > 100 ||
        messageStore.isLoading ||
        !messageStore.hasMore
    ) {
        return;
    }

    const previousHeight = container.scrollHeight;
    await messageStore.loadMore();
    await nextTick();
    const newHeight = container.scrollHeight;
    container.scrollTop += newHeight - previousHeight;
}

watch(
    () => chatStore.selectedChatId,
    async chatId => {
        if (!chatId) {
            return;
        }

        await messageStore.loadInitial(chatId);
        await scrollToBottom();
    },
);

watch(
    () => messageStore.messages.at(-1)?.id,
    async (currentId, previousId) => {
        if (!currentId || currentId === previousId) {
            return;
        }

        const lastMessage = messageStore.messages.at(-1);
        if (!lastMessage?.isUser) {
            return;
        }

        await scrollToBottom('smooth');
    },
);
</script>
