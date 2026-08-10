import { apiRequest } from '@/shared/api';
import type { Chat, GetChatsParams } from '../model/chat.types';

const CHATS_PAGE_SIZE = 25;

export function getChats({ page, limit = CHATS_PAGE_SIZE }: GetChatsParams): Promise<Chat[]> {
    const params = new URLSearchParams({
        _page: String(page),
        _limit: String(limit),
        _sort: 'lastMessageAt',
        _order: 'desc',
    });

    return apiRequest<Chat[]>(`/chats?${params.toString()}`);
}

export { CHATS_PAGE_SIZE };
