export interface Message {
    id: string;
    chatId: string;
    text: string;
    isUser: boolean;
    createdAt: string;
}

export interface GetMessagesParams {
    chatId: string;
    page: number;
    limit: number;
}

export interface SendMessagePayload {
    chatId: string;
    text: string;
    isUser: true;
    createdAt: string;
}
