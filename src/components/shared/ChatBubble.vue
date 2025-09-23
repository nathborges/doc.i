<template>
  <div class="d-flex mb-3" :class="{ 'justify-end': isMine, 'justify-start': !isMine }">

    <!-- Bubble da mensagem -->
    <div
      class="chat-bubble px-3 py-2"
      :class="{
        'chat-bubble--mine': isMine,
        'chat-bubble--other': !isMine
      }"
    >
      <div class="text-body-2" v-html="message.text"></div>
      <div class="text-caption mt-1 opacity-70" :class="{ 'text-right': isMine }">
        {{ message.time }}
      </div>
    </div>

    <!-- Avatar direita (usuário) -->
  </div>
</template>

<script setup>
import { RobotIcon } from 'vue-tabler-icons';

defineProps({
  message: {
    type: Object,
    required: true // { text: '...', time: 'HH:mm' }
  },
  isMine: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.chat-bubble {
  max-width: 75%;
  border-radius: 18px;
  word-wrap: break-word;
  position: relative;
  font-weight: 600;
}

.chat-bubble--mine {
  background: #f5f5f5;
  color: #333;
  border-bottom-right-radius: 4px;
}

.chat-bubble--other {
  background: linear-gradient(135deg, #eef2f6 0%, #ede7f6 100%);
  color: #333;
  border-bottom-left-radius: 4px;
}

.chat-bubble--mine .text-caption {
  color: rgba(0, 0, 0, 0.6);
}

.chat-bubble--other .text-caption {
  color: rgba(0, 0, 0, 0.6);
}

:deep(strong) {
  font-weight: 600;
}
</style>