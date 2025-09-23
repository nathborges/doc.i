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
    return false;
  });
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
  animation: chatShake 0.5s ease-in-out infinite;
}

@keyframes chatShake {
  0% { transform: translateX(0); }
  10% { transform: translateX(-3px); }
  20% { transform: translateX(3px); }
  30% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  50% { transform: translateX(-1px); }
  60% { transform: translateX(1px); }
  100% { transform: translateX(0); }
}
</style>
