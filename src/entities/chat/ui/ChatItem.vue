<template>
    <button
        type="button"
        class="flex w-full gap-3 px-4 py-3 text-left transition hover:bg-app-background"
        @click="emit('select', chat.id)"
    >
        <div class="relative shrink-0">
            <img
                :src="avatarUrl"
                :alt="chat.userName"
                class="h-14 w-14 rounded-full object-cover"
            />

            <span
                class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-surface"
                :class="chat.isOnline ? 'bg-green-500' : 'bg-text-muted'"
            />
        </div>

        <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                    <p class="truncate text-[15px] font-semibold text-text-primary">
                        {{ chat.userName }}
                    </p>

                    <p
                        class="mt-0.5 text-[12px]"
                        :class="chat.isOnline ? 'text-chat-blue' : 'text-text-muted'"
                    >
                        {{ chat.isOnline ? 'онлайн' : 'оффлайн' }}
                    </p>
                </div>

                <time
                    :datetime="chat.lastMessageAt"
                    class="shrink-0 text-[12px] text-text-muted"
                >
                    {{ formatChatTime(chat.lastMessageAt) }}
                </time>
            </div>

            <p class="mt-1 truncate text-[14px] text-text-secondary">
                {{ chat.lastMessage }}
            </p>
        </div>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatChatTime } from '@/shared/lib/date/formatChatTime';
import { chatAvatars } from '../model/chatAvatars';
import type { Chat } from '../model/chat.types';

interface Props {
    chat: Chat;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    select: [chatId: string];
}>();

const avatarUrl = computed(() => chatAvatars[props.chat.avatar] ?? chatAvatars['avatar-1']);
</script>
