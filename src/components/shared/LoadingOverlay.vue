<template>
  <v-overlay
    :model-value="isVisible"
    scrim="rgba(0, 0, 0, 0.6)"
    class="align-center justify-center loading-overlay"
    persistent
    z-index="9999"
  >
    <div class="text-center">
      <v-progress-circular indeterminate size="64" width="6" color="primary" />
      <div class="text-h3 mt-4 text-white">{{ message }}</div>
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

<style scoped>
.loading-overlay {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>