<template>
    <div
        class="flex"
        :class="message.isUser ? 'justify-end' : 'justify-start'"
    >
        <div
            class="max-w-[75%] rounded-2xl px-4 py-2 text-[14px] leading-5 shadow-sm"
            :class="message.isUser ? 'bg-chat-blue text-white' : 'bg-surface text-text-primary'"
        >
            <p class="whitespace-pre-wrap break-words">
                {{ message.text }}
            </p>

            <time
                :datetime="message.createdAt"
                class="mt-1 block text-right text-[11px] opacity-70"
            >
                {{ formattedTime }}
            </time>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Message } from '../model/message.types';

interface Props {
    message: Message;
}

const props = defineProps<Props>();

const formattedTime = computed(() =>
    new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(props.message.createdAt)),
);
</script>
