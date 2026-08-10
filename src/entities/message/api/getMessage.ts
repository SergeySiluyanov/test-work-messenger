import { apiRequest } from '@/shared/api';
import type { GetMessagesParams, Message } from '../model/message.types';

export const MESSAGES_PAGE_SIZE = 50;

export function getMessages({
    chatId,
    page,
    limit = MESSAGES_PAGE_SIZE,
}: GetMessagesParams): Promise<Message[]> {
    const params = new URLSearchParams({
        chatId,
        _page: String(page),
        _limit: String(limit),
        _sort: 'createdAt',
        _order: 'desc',
    });

    return apiRequest<Message[]>(`/messages?${params.toString()}`);
}
