const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function formatChatTime(value: string, now = new Date()): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const difference = today.getTime() - messageDay.getTime();

    const time = new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);

    if (difference === 0) {
        return `сегодня, ${time}`;
    }

    if (difference === DAY_IN_MS) {
        return 'вчера';
    }

    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
    }).format(date);
}
