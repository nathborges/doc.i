<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
  import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
  import Customizer from './customizer/CustomizerPanel.vue';
  import { RobotIcon } from 'vue-tabler-icons';
  import { useDrawerStore } from '@/stores/drawer';
  const drawer = useDrawerStore();
</script>

<template>
  <v-locale-provider>
    <v-app theme="PurpleTheme">
      <Customizer />
      <VerticalSidebarVue />
      <VerticalHeaderVue />

      <v-main>
        <v-container fluid class="page-wrapper">
          <div>
            <RouterView />
            <v-btn
              class="ia-btn"
              size="x-large"
              icon
              variant="flat"
              color="secondary"
              @click="drawer.SET_IA_DRAWER(true)"
            >
              <RobotIcon size="28" />
            </v-btn>
          </div>
        </v-container>
        <v-container fluid class="pt-0"></v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
