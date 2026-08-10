import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { CHATS_PAGE_SIZE, getChats } from '../api/getChats';
import type { Chat } from './chat.types';

export const useChatStore = defineStore('chat', () => {
    const chats = ref<Chat[]>([]);
    const selectedChatId = ref<string | null>(null);
    const page = ref(1);
    const isLoading = ref(false);
    const isInitialized = ref(false);
    const hasMore = ref(true);
    const error = ref<string | null>(null);

    const selectedChat = computed(
        () => chats.value.find(chat => chat.id === selectedChatId.value) ?? null,
    );

    const isEmpty = computed(() => isInitialized.value && chats.value.length === 0);

    async function loadChats(): Promise<void> {
        if (isLoading.value || !hasMore.value) {
            return;
        }

        isLoading.value = true;
        error.value = null;

        try {
            const newChats = await getChats({
                page: page.value,
                limit: CHATS_PAGE_SIZE,
            });

            const existingIds = new Set(chats.value.map(chat => chat.id));
            const uniqueChats = newChats.filter(chat => !existingIds.has(chat.id));
            chats.value.push(...uniqueChats);

            if (newChats.length < CHATS_PAGE_SIZE) {
                hasMore.value = false;
            } else {
                page.value += 1;
            }
        } catch {
            error.value = 'Не удалось загрузить чаты';
        } finally {
            isLoading.value = false;
            isInitialized.value = true;
        }
    }

    function updateLastMessage(chatId: string, text: string, createdAt: string): void {
        const chatIndex = chats.value.findIndex(chat => chat.id === chatId);
        if (chatIndex === -1) {
            return;
        }

        const currentChat = chats.value[chatIndex];
        if (!currentChat) {
            return;
        }

        const updatedChat: Chat = {
            ...currentChat,
            lastMessage: text,
            lastMessageAt: createdAt,
        };
        chats.value.splice(chatIndex, 1);
        chats.value.unshift(updatedChat);
    }

    function selectChat(chatId: string): void {
        selectedChatId.value = chatId;
    }

    function clearSelection(): void {
        selectedChatId.value = null;
    }

    return {
        chats,
        selectedChatId,
        selectedChat,
        isLoading,
        isInitialized,
        hasMore,
        isEmpty,
        error,
        loadChats,
        selectChat,
        updateLastMessage,
        clearSelection,
    };
});
