import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia, type Pinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import SendMessageForm from './SendMessageForm.vue';

const submitMock = vi.fn().mockResolvedValue(undefined);

vi.mock('../model/useSendMessage', () => ({
    useSendMessage: () => ({
        text: ref('Тест'),
        isSending: ref(false),
        submit: submitMock,
    }),
}));

describe('Форма отправки сообщений', () => {
    let pinia: Pinia;

    beforeEach(() => {
        pinia = createPinia();
        setActivePinia(pinia);
        submitMock.mockClear();
    });

    function mountComponent() {
        return mount(SendMessageForm, {
            global: {
                plugins: [pinia],
            },
        });
    }

    it('Отправка сообщений по кнопке', async () => {
        const wrapper = mountComponent();
        await wrapper.find('form').trigger('submit');
        expect(submitMock).toHaveBeenCalledTimes(1);
    });

    it('Отправка сообщений по Enter', async () => {
        const wrapper = mountComponent();
        await wrapper.find('textarea').trigger('keydown.enter');
        expect(submitMock).toHaveBeenCalledTimes(1);
    });
});
