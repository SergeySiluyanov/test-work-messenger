import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';

const submitMock = vi.fn();

vi.mock('../model/useLoginForm', () => ({
    useLoginForm: () => ({
        loginValue: ref(''),
        password: ref(''),

        errors: {
            login: undefined,
            password: undefined,
        },

        serverError: ref(null),

        isLoading: ref(false),

        submit: submitMock,
    }),
}));

describe('Форма авторизации', () => {
    it('Успешный переход на авторизованную часть, после авторизации', async () => {
        submitMock.mockResolvedValue(true);
        const wrapper = mount(LoginForm);
        await wrapper.find('form').trigger('submit');
        await Promise.resolve();
        expect(wrapper.emitted('success')).toHaveLength(1);
    });

    it('Не происходит переход на авторизованную часть, при ошибке', async () => {
        submitMock.mockResolvedValue(false);
        const wrapper = mount(LoginForm);
        await wrapper.find('form').trigger('submit');
        await Promise.resolve();
        expect(wrapper.emitted('success')).toBeUndefined();
    });
});
