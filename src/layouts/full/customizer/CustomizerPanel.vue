<script setup lang="ts">
  import { useDrawerStore } from '@/stores/drawer';
  import { useSearchStore } from '@/stores/search';
  import { RobotIcon } from 'vue-tabler-icons';
  import { computed } from 'vue';

  const drawer = useDrawerStore();
  const search = useSearchStore();

  const answers = computed(() => search.formattedAnswers || []);
</script>

<template>
  <v-navigation-drawer
    elevation="10"
    location="end"
    v-model="drawer.iaDrawerIsOpen"
    width="450"
    height="500"
    style="height: 100%; top: auto; border-radius: 12px 12px 0 0"
  >
    <div class="pa4 h-100 w-100">
      <v-col cols="12" class="pa-0">
        <div class="pa-4 d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-medium label">Assistente de IA</div>
          <v-btn
            variant="text"
            color="lightText"
            icon="$close"
            density="compact"
            @click="drawer.SET_IA_DRAWER(false)"
          />
        </div>
        <v-divider />
      </v-col>

      <div v-if="answers.length === 0" class="text-center text-disabled py-8 h-100">
        <div class="text-body-1 font-weight-regular">Nenhuma conversa ainda.</div>
        <div class="text-caption font-weight-regular">Faça uma busca com IA para começar</div>
      </div>
      <div v-else class="pa-5">
        <perfect-scrollbar>
          <div v-for="(answer, index) in answers" :key="index" class="mb-4">
            <div class="d-flex align-start">
              <v-btn
                size="small"
                icon
                variant="flat"
                color="secondary"
                class="flex-shrink-0 mt-1 mr-3"
              >
                <RobotIcon />
              </v-btn>
              <v-card class="flex-grow-1" variant="tonal" color="primary" rounded="lg">
                <v-card-text class="pa-3">
                  <div class="text-body-1 mb-2 text-on-primary" v-html="answer"></div>
                  <div class="text-caption text-on-primary opacity-75 text-right">Agora</div>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </perfect-scrollbar>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
  :deep(strong) {
    font-weight: 600;
    color: rgb(var(--v-theme-darkText));
  }

  .label {
    flex: 1;
    text-align: center;
  }
</style>
