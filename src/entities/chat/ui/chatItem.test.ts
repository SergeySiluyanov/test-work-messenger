import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatItem from './ChatItem.vue';

const chat = {
    id: '1',
    userName: 'Александр Иванов',
    avatar: 'avatar-1',
    isOnline: true,
    lastMessage: 'Привет! Как дела?',
    lastMessageAt: '2026-08-10T14:30:00.000Z',
};

describe('Элемент из списка чатов', () => {
    it('Отображение данных чата', () => {
        const wrapper = mount(ChatItem, {
            props: {
                chat,
            },
        });

        expect(wrapper.text()).toContain('Александр Иванов');
        expect(wrapper.text()).toContain('Привет! Как дела?');
        expect(wrapper.text()).toContain('онлайн');
    });

    it('Эмит события select с id чата', async () => {
        const wrapper = mount(ChatItem, {
            props: {
                chat,
            },
        });

        await wrapper.trigger('click');
        expect(wrapper.emitted('select')).toEqual([['1']]);
    });
});
