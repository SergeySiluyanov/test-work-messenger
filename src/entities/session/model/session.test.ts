import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useSessionStore } from './session.store';

describe('sessionStore', () => {
    beforeEach(() => {
        localStorage.clear();
        setActivePinia(createPinia());
    });

    it('Запись токена', () => {
        const store = useSessionStore();
        store.setToken('test-token');
        expect(store.token).toBe('test-token');
        expect(store.isAuthenticated).toBe(true);
        expect(localStorage.getItem('auth_token')).toBe('test-token');
    });

    it('Очистка сессии', () => {
        const store = useSessionStore();
        store.setToken('test-token');
        store.clearSession();
        expect(store.token).toBeNull();
        expect(store.isAuthenticated).toBe(false);
        expect(localStorage.getItem('auth_token')).toBeNull();
    });
});
