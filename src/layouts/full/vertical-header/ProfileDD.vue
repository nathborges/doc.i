<script setup lang="ts">
  import { ref } from 'vue';
  import { SettingsIcon, LogoutIcon, UserIcon } from 'vue-tabler-icons';
  import { useAuthStore } from '@/stores/auth';

  const swt1 = ref(true);
  const swt2 = ref(false);
  const authStore = useAuthStore();
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- profile DD -->
  <!-- ---------------------------------------------- -->
  <div class="pa-4">
    <div class="pa-2">
      <h4 class="mb-n1">
        Bom dia,
        <span class="font-weight-regular">Nathália</span>
      </h4>
      <span class="text-subtitle-2 text-medium-emphasis">Administrador(a) do projeto</span>
    </div>
    <v-divider></v-divider>

    <perfect-scrollbar style="height: calc(100vh - 670px); max-height: 250px">
      <v-list>
        <v-list-item color="secondary" rounded="md">
          <template v-slot:prepend>
            <SettingsIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2">Configurações da Conta</v-list-item-title>
        </v-list-item>

        <v-list-item color="secondary" rounded="md">
          <template v-slot:prepend>
            <UserIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2">Perfil Social</v-list-item-title>
        </v-list-item>

        <v-list-item @click="authStore.logout()" color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2">Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>
