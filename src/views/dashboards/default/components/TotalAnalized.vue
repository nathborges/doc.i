<script setup lang="ts">
  import { onMounted } from 'vue';
  import { SearchIcon, CircleArrowUpRightIcon } from 'vue-tabler-icons';
  import { useUserStore } from '@/stores/user';

  const userStore = useUserStore();

  onMounted(async () => {
    await userStore.loadUserProfile();
  });
</script>

<template>
  <v-card
    elevation="0"
    class="h-100 bg-secondary overflow-hidden bubble-shape bubble-secondary-shape"
  >
    <v-card-text class="h-100">
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darksecondary" variant="flat">
          <SearchIcon size="20" stroke-width="1.5" />
        </v-btn>
      </div>
      <h2 class="text-h1 d-none d-md-block font-weight-medium">
        {{ userStore.loading ? '--' : userStore.user?.totalDocuments || '0' }}
        <a href="#"><CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" /></a>
      </h2>
      <h2 class="text-h2 d-block d-md-none font-weight-medium">
        {{ userStore.loading ? '--' : userStore.user?.totalDocuments || '0' }}
        <a href="#"><CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" /></a>
      </h2>

      <span class="text-subtitle-1 text-medium-emphasis text-white">Documentos analisados</span>
    </v-card-text>
  </v-card>
</template>
