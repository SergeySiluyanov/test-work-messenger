import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { sendMessage } from '../api/sendMessage';
import { useMessageStore } from './message.store';

vi.mock('../api/getMessages', () => ({
    MESSAGES_PAGE_SIZE: 50,
    getMessages: vi.fn(async () => []),
}));

vi.mock('../api/sendMessage', () => ({
    sendMessage: vi.fn(),
}));

vi.mock('@/entities/chat/api/updateChat', () => ({
    updateChat: vi.fn(async (chatId, payload) => ({
        id: chatId,
        ...payload,
    })),
}));

const sendMessageMock = vi.mocked(sendMessage);

describe('messageStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-08-10T15:00:00.000Z'));
        sendMessageMock.mockReset();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('Добавление отправленного сообщения в конец всех сообщений', async () => {
        sendMessageMock.mockResolvedValue({
            id: '999',
            chatId: '1',
            text: 'Новое сообщение',
            isUser: true,
            createdAt: '2026-08-10T15:00:00.000Z',
        });

        const store = useMessageStore();
        store.chatId = '1';
        const result = await store.createMessage('Новое сообщение');
        expect(result).toBe(true);
        expect(store.messages.at(-1)?.text).toBe('Новое сообщение');
        expect(store.messages.at(-1)?.isUser).toBe(true);
    });

    it('Остается активным чат после отправки сообщения', async () => {
        sendMessageMock.mockResolvedValue({
            id: '999',
            chatId: '1',
            text: 'Новое сообщение',
            isUser: true,
            createdAt: '2026-08-10T15:00:00.000Z',
        });

        const store = useMessageStore();
        store.chatId = '1';
        await store.createMessage('Новое сообщение');
        expect(store.chatId).toBe('1');
    });

    it('Ошибка при отправке сообщения, отображение ошибки', async () => {
        sendMessageMock.mockRejectedValue(new Error('Network error'));
        const store = useMessageStore();
        store.chatId = '1';
        const result = await store.createMessage('Новое сообщение');
        expect(result).toBe(false);
        expect(store.messages).toHaveLength(0);
        expect(store.sendError).toBe('Не удалось отправить сообщение');
    });
});
