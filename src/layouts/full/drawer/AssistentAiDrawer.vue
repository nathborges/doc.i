<script setup lang="ts">
  import { useDrawerStore } from '@/stores/drawer';
  import { useSearchStore } from '@/stores/search';
  import { RobotIcon } from 'vue-tabler-icons';
  import { computed } from 'vue';

  const drawer = useDrawerStore();
  const search = useSearchStore();

  const answers = computed(() => (search.formattedAnswers || []).slice().reverse());
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
    <div class="d-flex flex-column h-100">
      <div class="pa-4 d-flex justify-space-between align-center flex-shrink-0">
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

      <div v-if="answers.length === 0" class="text-center text-disabled py-8 h-100">
        <div class="text-body-1 font-weight-regular">Nenhuma conversa ainda.</div>
        <div class="text-caption font-weight-regular">Faça uma busca com IA para começar</div>
      </div>
      <perfect-scrollbar class="d-flex flex-column justify-end flex-grow-1 pa-5">
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
                <div class="text-body-1 mb-2 text-on-primary" v-html="answer.content"></div>
                <div class="text-caption text-on-primary opacity-75 text-right">
                  {{ answer.timestamp }}
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </perfect-scrollbar>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
  :deep(.v-card-text strong) {
    font-weight: 700 !important;
    color: inherit !important;
  }

  :deep(.text-body-1 strong) {
    font-weight: 700 !important;
    color: inherit !important;
  }

  .label {
    flex: 1;
    text-align: center;
  }

  :deep(.v-card-text) {
    strong {
      font-weight: 700 !important;
      color: inherit !important;
    }

    // Para listas com *
    p {
      margin: 4px 0;
      line-height: 1.5;
    }

    // Para quebras de linha
    br {
      line-height: 1.6;
    }
  }

  .label {
    flex: 1;
    text-align: center;
  }
</style>
