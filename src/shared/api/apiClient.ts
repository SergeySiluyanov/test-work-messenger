import { ApiError } from './apiError';

const API_URL = import.meta.env.VITE_API_URL;

interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
    body?: unknown;
}

interface ErrorResponse {
    message?: string;
}

function isErrorResponse(value: unknown): value is ErrorResponse {
    return typeof value === 'object' && value !== null && 'message' in value;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,

        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },

        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
        const message =
            isErrorResponse(data) && typeof data.message === 'string'
                ? data.message
                : 'Произошла ошибка при выполнении запроса';

        throw new ApiError(message, response.status);
    }

    return data as T;
}
