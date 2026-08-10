import type { LoginCredentials } from '../model/auth.types';

export function prepareCredentials(credentials: LoginCredentials): LoginCredentials {
    return {
        login: credentials.login.trim().toLowerCase(),
        password: credentials.password,
    };
}
