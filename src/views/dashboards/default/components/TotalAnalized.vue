<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { SearchIcon, CircleArrowUpRightIcon } from 'vue-tabler-icons';
import { UserService } from '@/services/user.service';
import type { User } from '@/types/user';

  const user = ref<User | null>(null)

  onMounted(async () => {
    try {
      const response = await UserService.getUserProfile();
      user.value = response;
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  });
</script>

<template>
  <v-card elevation="0" class="h-100 bg-secondary overflow-hidden bubble-shape bubble-secondary-shape">
    <v-card-text class="h-100">
      <div class="d-flex align-start mb-6">
        <v-btn icon rounded="sm" color="darksecondary" variant="flat">
<SearchIcon size="20" stroke-width="1.5" />

        </v-btn>
      </div>
      <h2 class="text-h1 font-weight-medium">
        {{ user?.totalDocuments || '0' }}
        <a href="#"><CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" /></a>
      </h2>
      <span class="text-subtitle-1 text-medium-emphasis text-white">Documentos analisados</span>
    </v-card-text>
  </v-card>
</template>
