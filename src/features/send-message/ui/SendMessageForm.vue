<template>
    <div class="border-t border-border bg-surface">
        <div
            v-if="messageStore.sendError"
            role="alert"
            class="px-4 pt-3 text-center text-[13px] text-red-400 pb-3"
        >
            {{ messageStore.sendError }}
        </div>
        <form
            class="flex items-end gap-3 border-t border-border bg-surface p-4"
            @submit.prevent="submitMessage"
        >
            <textarea
                ref="textareaRef"
                v-model="text"
                rows="1"
                placeholder="Сообщение"
                class="max-h-32 min-h-[44px] flex-1 resize-none overflow-y-auto rounded-2xl border border-border bg-app-background px-4 py-3 text-[14px] leading-5 text-text-primary outline-none transition focus:border-chat-blue"
                @input="resizeTextarea"
                @keydown.enter.exact.prevent="submitMessage"
            />

            <button
                type="submit"
                :disabled="!text.trim() || isSending"
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-chat-blue text-white transition hover:bg-chat-blue-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Отправить сообщение"
            >
                <span
                    v-if="isSending"
                    class="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                />

                <svg
                    v-else
                    viewBox="0 0 24 24"
                    class="h-5 w-5 fill-current"
                    aria-hidden="true"
                >
                    <path
                        d="m3.4 20.4 17.4-7.5c1.2-.5 1.2-1.3 0-1.8L3.4 3.6c-1.1-.5-1.7.1-1.4 1.2l1.9 6.1 9.6 1.1-9.6 1.1L2 19.2c-.3 1.1.3 1.7 1.4 1.2Z"
                    />
                </svg>
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useMessageStore } from '@/entities/message';
import { useSendMessage } from '../model/useSendMessage';

const messageStore = useMessageStore();
const { text, isSending, submit } = useSendMessage();

const textareaRef = ref<HTMLTextAreaElement | null>(null);

function resizeTextarea(): void {
    const textarea = textareaRef.value;

    if (!textarea) {
        return;
    }
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 128)}px`;
}

async function submitMessage(): Promise<void> {
    await submit();
    await nextTick();
    if (!textareaRef.value) {
        return;
    }
    textareaRef.value.style.height = 'auto';
}
</script>
