<template>
    <main class="h-dvh w-full overflow-hidden bg-app-background">
        <div class="mx-auto flex h-full w-full max-w-[1920px] overflow-hidden bg-surface">
            <aside
                class="h-full w-full shrink-0 border-r border-border md:block md:w-[400px]"
                :class="chatStore.selectedChatId ? 'hidden md:block' : 'block'"
            >
                <ChatList />
            </aside>

            <section
                class="h-full min-w-0 flex-1"
                :class="chatStore.selectedChatId ? 'block' : 'hidden md:block'"
            >
                <ChatWindow />
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useChatStore } from '@/entities/chat';
import { ChatList } from '@/widgets/chat-list';
import { ChatWindow } from '@/widgets/chat-window';

const chatStore = useChatStore();
</script>
