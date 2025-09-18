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
    <h4 class="mb-n1">
      Bom dia,
      <span class="font-weight-regular">John Doe</span>
    </h4>
    <span class="text-subtitle-2 text-medium-emphasis">Administrador do projeto</span>

    <!-- <v-text-field persistent-placeholder placeholder="Pesquisar" class="my-3" color="primary" variant="outlined" hide-details>
      <template v-slot:prepend-inner>
        <SearchIcon stroke-width="1.5" size="20" class="text-lightText SearchIcon" />
      </template>
    </v-text-field> -->

    <perfect-scrollbar style="height: calc(100vh - 700px); max-height: 515px">
      <!-- <div class="bg-lightwarning rounded-md pa-5 my-3 circle sm-circle lg-circle">
        <h4>Atualize seu plano</h4>
        <h6 class="text-subtitle-2 text-medium-emphasis mr-11 pr-11 mb-3 mt-2">70% de desconto para assinaturas de 1 ano.</h6>
        <v-btn color="warning" variant="flat" target="_" href="https://codedthemes.com/item/berry-vue-admin-dashboard/"> Ir Premium </v-btn>
      </div> -->

      <v-divider></v-divider>

      <v-list class="mt-3">
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

          <template v-slot:append>
            <v-chip color="warning" class="text-white" text="02" variant="flat" size="small" />
          </template>
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
