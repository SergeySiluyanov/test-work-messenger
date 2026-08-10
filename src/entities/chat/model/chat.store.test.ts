import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useChatStore } from './chat.store';

vi.mock('../api/getChats', () => ({
    CHATS_PAGE_SIZE: 25,
    getChats: vi.fn(),
}));

describe('chatStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('Выбор чата', () => {
        const store = useChatStore();
        store.selectChat('2');
        expect(store.selectedChatId).toBe('2');
    });

    it('Сброс выбранного чата', () => {
        const store = useChatStore();
        store.selectChat('2');
        store.clearSelection();
        expect(store.selectedChatId).toBeNull();
    });

    it('Обновляет последнее сообщение и перенос чата на верх списка', () => {
        const store = useChatStore();
        store.chats.push(
            {
                id: '1',
                userName: 'Иван',
                avatar: 'avatar-1',
                isOnline: true,
                lastMessage: 'Первое',
                lastMessageAt: '2026-08-10T10:00:00.000Z',
            },
            {
                id: '2',
                userName: 'Мария',
                avatar: 'avatar-2',
                isOnline: false,
                lastMessage: 'Второе',
                lastMessageAt: '2026-08-10T11:00:00.000Z',
            },
        );

        store.updateLastMessage('2', 'Новое сообщение', '2026-08-10T15:00:00.000Z');
        expect(store.chats[0]?.id).toBe('2');
        expect(store.chats[0]?.lastMessage).toBe('Новое сообщение');
    });

    it('Не сбрасывается selectedChatId при обновлении чата', () => {
        const store = useChatStore();
        store.chats.push({
            id: '1',
            userName: 'Иван',
            avatar: 'avatar-1',
            isOnline: true,
            lastMessage: 'Старое',
            lastMessageAt: '2026-08-10T10:00:00.000Z',
        });

        store.selectChat('1');
        store.updateLastMessage('1', 'Новое', '2026-08-10T15:00:00.000Z');
        expect(store.selectedChatId).toBe('1');
        expect(store.selectedChat?.id).toBe('1');
    });
});
