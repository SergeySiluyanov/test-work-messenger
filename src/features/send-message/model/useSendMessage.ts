import { ref } from 'vue';
import { useMessageStore } from '@/entities/message';

export function useSendMessage() {
    const messageStore = useMessageStore();
    const text = ref('');
    const isSending = ref(false);

    async function submit(): Promise<void> {
        const preparedText = text.value.trim();

        if (!preparedText || isSending.value) {
            return;
        }

        isSending.value = true;

        try {
            const isSuccess = await messageStore.createMessage(preparedText);
            if (!isSuccess) {
                return;
            }
            text.value = '';
        } finally {
            isSending.value = false;
        }
    }

    return {
        text,
        isSending,
        submit,
    };
}
