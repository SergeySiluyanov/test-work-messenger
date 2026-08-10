import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatChatTime } from './formatChatTime';

describe('formatChatTime', () => {
    beforeEach(() => {
        vi.useFakeTimers();

        vi.setSystemTime(new Date('2026-08-10T15:00:00'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('Если сообщение было отправлено сегодня', () => {
        expect(formatChatTime('2026-08-10T14:30:00')).toBe('сегодня, 14:30');
    });

    it('Если сообщение было отправлено вчера', () => {
        expect(formatChatTime('2026-08-09T14:30:00')).toBe('вчера');
    });

    it('Если сообщению больше 2 дней', () => {
        expect(formatChatTime('2026-08-05T14:30:00')).toBe('05.08');
    });
});
