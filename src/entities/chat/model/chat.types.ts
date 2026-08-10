export interface Chat {
    id: string;
    userName: string;
    avatar: string;
    isOnline: boolean;
    lastMessage: string;
    lastMessageAt: string;
}

export interface GetChatsParams {
    page: number;
    limit: number;
}
