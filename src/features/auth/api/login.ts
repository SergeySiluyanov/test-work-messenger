import { apiRequest } from '@/shared/api';
import type { LoginCredentials, LoginResponse } from '../model/auth.types';

export function login(credentials: LoginCredentials): Promise<LoginResponse> {
    return apiRequest<LoginResponse>('/auth/login', {
        method: 'POST',
        body: credentials,
    });
}
