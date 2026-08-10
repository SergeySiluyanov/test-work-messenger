export interface LoginCredentials {
    login: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface LoginFormErrors {
    login?: string;
    password?: string;
}
