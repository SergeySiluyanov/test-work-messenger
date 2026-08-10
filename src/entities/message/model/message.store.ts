import { ref } from 'vue';
import { defineStore } from 'pinia';
import { updateChat, useChatStore } from '@/entities/chat';
import { getMessages, MESSAGES_PAGE_SIZE } from '../api/getMessage';
import { sendMessage } from '../api/sendMessage';
import type { Message } from './message.types';

export const useMessageStore = defineStore('message', () => {
    const chatStore = useChatStore();
    const messages = ref<Message[]>([]);
    const chatId = ref<string | null>(null);
    const page = ref(1);
    const isLoading = ref(false);
    const hasMore = ref(true);
    const error = ref<string | null>(null);
    const sendError = ref<string | null>(null);

    async function loadInitial(selectedChatId: string): Promise<void> {
        chatId.value = selectedChatId;
        messages.value = [];
        page.value = 1;
        hasMore.value = true;
        error.value = null;
        sendError.value = null;
        await loadMore();
    }

    async function loadMore(): Promise<void> {
        if (!chatId.value || isLoading.value || !hasMore.value) {
            return;
        }

        isLoading.value = true;
        error.value = null;

        try {
            const newMessages = await getMessages({
                chatId: chatId.value,
                page: page.value,
                limit: MESSAGES_PAGE_SIZE,
            });

            const sortedMessages = [...newMessages].reverse();

            messages.value = [...sortedMessages, ...messages.value];

            if (newMessages.length < MESSAGES_PAGE_SIZE) {
                hasMore.value = false;
            } else {
                page.value += 1;
            }
        } catch {
            error.value = 'Не удалось загрузить сообщения';
        } finally {
            isLoading.value = false;
        }
    }

    async function createMessage(text: string): Promise<boolean> {
        if (!chatId.value) {
            return false;
        }

        const currentChatId = chatId.value;
        const createdAt = new Date().toISOString();
        sendError.value = null;

        try {
            const message = await sendMessage({
                chatId: currentChatId,
                text,
                isUser: true,
                createdAt,
            });

            if (chatId.value !== currentChatId) {
                return false;
            }

            messages.value.push(message);
            chatStore.updateLastMessage(currentChatId, message.text, message.createdAt);

            try {
                await updateChat(currentChatId, {
                    lastMessage: message.text,
                    lastMessageAt: message.createdAt,
                });
            } catch {
                sendError.value = 'Не удалось обновить информацию чата';
            }

            return true;
        } catch {
            sendError.value = 'Не удалось отправить сообщение';
            return false;
        }
    }

    function clearSendError(): void {
        sendError.value = null;
    }

    function reset(): void {
        messages.value = [];
        chatId.value = null;
        page.value = 1;
        isLoading.value = false;
        hasMore.value = true;
        error.value = null;
        sendError.value = null;
    }

    return {
        messages,
        chatId,
        isLoading,
        hasMore,
        error,
        sendError,
        loadInitial,
        loadMore,
        createMessage,
        clearSendError,
        reset,
    };
});
