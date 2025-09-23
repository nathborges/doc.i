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
  
  const shouldShake = computed(() => searchStore.isLoading || searchStore.chatMessages?.length > 0);
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
              :class="{ 'shake': shouldShake }"
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

<style scoped>
.shake {
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}
</style>
