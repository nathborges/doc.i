<template>
  <v-dialog v-model="props.isOpen" :max-width="props.width" persistent class="pr-2 pl-2">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h3 w-100 text-center">{{ title }}</span>
        <v-btn icon size="small" variant="text" @click="$emit('close')">
          <XIcon stroke-width="1.5" size="20" />
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-subtitle v-if="description" class="pb-0">
        {{ description }}
      </v-card-subtitle>

      <v-card-text class="pl-5 pr-5 pt-5 pb-2">
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
      default: '450px',
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
