import { describe, expect, it } from 'vitest';

import { validateCredentials } from './validateCredentials';

describe('validateCredentials', () => {
    it('Отображение ошибок, при пустых полях', () => {
        expect(
            validateCredentials({
                login: '',
                password: '',
            }),
        ).toEqual({
            login: 'Введите логин',
            password: 'Введите пароль',
        });
    });

    it('Проверка на минимальную длину', () => {
        const result = validateCredentials({
            login: 'ab',
            password: '123',
        });

        expect(result.login).toBeDefined();
        expect(result.password).toBeDefined();
    });

    it('Авторизация прошла успешно', () => {
        expect(
            validateCredentials({
                login: 'user',
                password: 'password',
            }),
        ).toEqual({});
    });
});
