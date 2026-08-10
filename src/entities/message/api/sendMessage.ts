import { apiRequest } from '@/shared/api';
import type { Message, SendMessagePayload } from '../model/message.types';

export function sendMessage(payload: SendMessagePayload): Promise<Message> {
    return apiRequest<Message>('/messages', {
        method: 'POST',
        body: payload,
    });
}
