<script setup lang="ts">
  import { useDrawerStore } from '@/stores/drawer';
  import { useSearchStore } from '@/stores/search';
  import { computed, watch, nextTick, ref } from 'vue';
  import ChatBubble from '@/components/shared/ChatBubble.vue';

  const drawer = useDrawerStore();
  const search = useSearchStore();
  const chatContainer = ref<HTMLElement>();

  const messages = computed(() => search.chatMessages || []);

  const scrollToBottom = () => {
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  };

  // Scroll para baixo quando drawer abre
  watch(() => drawer.iaDrawerIsOpen, (isOpen) => {
    if (isOpen) {
      scrollToBottom();
    }
  });

  // Scroll para baixo quando novas mensagens chegam
  watch(() => messages.value.length, () => {
    scrollToBottom();
  });
</script>

<template>
  <v-navigation-drawer
    elevation="10"
    location="end"
    v-model="drawer.iaDrawerIsOpen"
    width="450"
    height="500"
    style="height: 100%; top: auto; border-radius: 12px 12px 0 0"
  >
    <div class="d-flex flex-column h-100">
      <div class="pa-4 d-flex justify-space-between align-center flex-shrink-0">
        <div class="text-h3 font-weight-medium label">Assistente de IA</div>
        <v-btn
          variant="text"
          color="lightText"
          icon="$close"
          density="compact"
          @click="drawer.SET_IA_DRAWER(false)"
        />
      </div>
      <v-divider />

      <div v-if="messages.length === 0" class="text-center text-disabled py-8 h-100">
        <div class="text-body-1 font-weight-regular">Nenhuma conversa ainda.</div>
        <div class="text-caption font-weight-regular">Faça uma busca com IA para começar</div>
      </div>
      <div ref="chatContainer" class="chat-container flex-grow-1 pa-5">
        <div v-for="(message, index) in messages" :key="index">
          <ChatBubble
            :message="{ text: message.text, time: message.time }"
            :is-mine="message.isMine"
          />
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>

  :deep(.text-body-1 strong) {
    font-weight: 700 !important;
    color: inherit !important;
  }

  .label {
    flex: 1;
    text-align: center;
  }

  :deep(.v-card) {
    background-color: #0f5d2e;
    color: white !important;
  }

  :deep(.v-card-text) {
    color: white;
    font-weight: 600;
    strong {
      font-weight: 700 !important;
      color: inherit !important;
    }

    // Para listas com *
    p {
      margin: 4px 0;
      line-height: 1.5;
    }

    // Para quebras de linha
    br {
      line-height: 1.6;
    }
  }

  .label {
    flex: 1;
    text-align: center;
  }

  .chat-container {
    overflow-y: scroll;
    height: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
    justify-items: end;
    font-weight: 500;
  }

  :deep(.v-navigation-drawer__content) {
    overflow-y: hidden !important;
  }
</style>
