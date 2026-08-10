import { describe, expect, it } from 'vitest';

import { prepareCredentials } from './prepareCredentials';

describe('prepareCredentials', () => {
    it('Автоформатирование логина, приведение к нижнему регистру, удаление пробелов', () => {
        expect(
            prepareCredentials({
                login: '  USER  ',
                password: 'password',
            }),
        ).toEqual({
            login: 'user',
            password: 'password',
        });
    });

    it('Пароль остается без изменений', () => {
        expect(
            prepareCredentials({
                login: 'user',
                password: ' PassWord ',
            }).password,
        ).toBe(' PassWord ');
    });
});
