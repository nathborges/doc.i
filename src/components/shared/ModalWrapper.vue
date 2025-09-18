<template>
  <v-dialog v-model="isOpen" :max-width="width" persistent>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h5">{{ title }}</span>
        <v-btn icon size="small" variant="text" @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-subtitle v-if="description" class="pb-0">
        {{ description }}
      </v-card-subtitle>

      <v-card-text>
        <slot />
      </v-card-text>

      <v-card-actions v-if="$slots.footer" class="justify-center">
        <slot name="footer" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '520px',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  });

  defineEmits(['close']);
</script>
