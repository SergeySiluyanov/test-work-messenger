import { apiRequest } from '@/shared/api';
import type { Chat } from '../model/chat.types';

interface UpdateChatPayload {
    lastMessage: string;
    lastMessageAt: string;
}

export function updateChat(chatId: string, payload: UpdateChatPayload): Promise<Chat> {
    return apiRequest<Chat>(`/chats/${chatId}`, {
        method: 'PATCH',
        body: payload,
    });
}
