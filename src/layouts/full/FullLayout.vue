<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
  import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
  import AssistentAiDrawer from './drawer/AssistentAiDrawer.vue';
  import { RobotIcon } from 'vue-tabler-icons';
  import { useDrawerStore } from '@/stores/drawer';
  import { useSearchStore } from '@/stores/search';
  import { computed } from 'vue';

  const drawer = useDrawerStore();
  const searchStore = useSearchStore();

  const shouldShake = computed(() => {
    return searchStore.newSearch;
  });

  const openDrawer = () => {
    searchStore.setNewSearchFalse();
    console.log(searchStore.newSearch);

    drawer.SET_IA_DRAWER(true);
  };
</script>

<template>
  <v-locale-provider>
    <v-app theme="PurpleTheme">
      <AssistentAiDrawer />
      <VerticalSidebarVue />
      <VerticalHeaderVue />

      <v-main>
        <v-container fluid class="page-wrapper">
          <div>
            <RouterView />
            <v-btn
              class="ia-btn"
              :class="{ shake: shouldShake }"
              size="x-large"
              icon
              variant="flat"
              color="secondary"
              @click="openDrawer()"
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

<style scoped>
  .shake {
    animation: pulse-shake 1.5s infinite;
  }

  @keyframes pulse-shake {
    0%,
    70%,
    100% {
      transform: scale(1) translateX(0);
    }
    10% {
      transform: scale(1.05) translateX(-2px);
    }
    20% {
      transform: scale(1.05) translateX(2px);
    }
    30% {
      transform: scale(1.05) translateX(-2px);
    }
    40% {
      transform: scale(1.05) translateX(2px);
    }
    50% {
      transform: scale(1) translateX(0);
    }
  }
</style>
