<template>
  <v-overlay 
    :model-value="isVisible" 
    class="align-center justify-center"
    persistent
    z-index="9999"
  >
    <div class="text-center">
      <v-progress-circular
        indeterminate
        size="64"
        width="6"
        color="primary"
      />
      <div class="text-h6 mt-4 text-white">{{ message }}</div>
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
interface Props {
  isVisible: boolean;
  message?: string;
}

defineProps<Props>();
</script>