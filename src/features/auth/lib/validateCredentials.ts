import type { LoginCredentials, LoginFormErrors } from '../model/auth.types';

export function validateCredentials(credentials: LoginCredentials): LoginFormErrors {
    const errors: LoginFormErrors = {};

    if (!credentials.login) {
        errors.login = 'Введите логин';
    } else if (credentials.login.length < 3) {
        errors.login = 'Логин должен содержать минимум 3 символа';
    }

    if (!credentials.password) {
        errors.password = 'Введите пароль';
    } else if (credentials.password.length < 6) {
        errors.password = 'Пароль должен содержать минимум 6 символов';
    }

    return errors;
}
