import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MessageItem from './MessageItem.vue';

describe('Сообщение в чате', () => {
    it('Отображение текста сообщения', () => {
        const wrapper = mount(MessageItem, {
            props: {
                message: {
                    id: '1',
                    chatId: '1',
                    text: 'Привет',
                    isUser: false,
                    createdAt: '2026-08-10T14:30:00.000Z',
                },
            },
        });

        expect(wrapper.text()).toContain('Привет');
    });

    it('Сохранение переноса строк', () => {
        const wrapper = mount(MessageItem, {
            props: {
                message: {
                    id: '1',
                    chatId: '1',
                    text: 'Первая строка\nВторая строка',
                    isUser: true,
                    createdAt: '2026-08-10T14:30:00.000Z',
                },
            },
        });

        const text = wrapper.find('p');
        expect(text.classes()).toContain('whitespace-pre-wrap');
        expect(text.text()).toContain('Первая строка');
        expect(text.text()).toContain('Вторая строка');
    });
});
