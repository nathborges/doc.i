<template>
  <v-dialog v-model="isOpen" max-width="400px" persistent>
    <v-card>
      <v-card-title class="text-h6">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="closeModal">Cancelar</v-btn>
        <v-btn :color="confirmColor" variant="flat" @click="confirmAction">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Confirmar ação',
    },
    message: {
      type: String,
      default: 'Tem certeza que deseja continuar?',
    },
    confirmText: {
      type: String,
      default: 'Confirmar',
    },
    confirmColor: {
      type: String,
      default: 'primary',
    },
  });

  const emit = defineEmits(['close', 'confirm']);

  const closeModal = () => {
    emit('close');
  };

  const confirmAction = () => {
    emit('confirm');
    closeModal();
  };
</script>
