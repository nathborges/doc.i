<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { DatabaseIcon, CircleArrowUpRightIcon } from 'vue-tabler-icons';
  import { useUserStore } from '@/stores/user';
  import { formatFileSize } from '@/utils/formatter';

  const tab = ref('1');
  const userStore = useUserStore();

  const storage = computed(() => {
    if (userStore.loading) return '--';
    return formatFileSize(userStore.user?.totalStorageUsed || 0);
  });

  onMounted(async () => {
    await userStore.loadUserProfile();
  });

  const chartOptions1 = computed(() => {
    return {
      chart: {
        type: 'bar',
        height: 90,
        fontFamily: `inherit`,
        foreColor: '#a1aab2',
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#fff'],
      fill: {
        type: 'solid',
        opacity: 1,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      yaxis: {
        min: 0,
        max: 100,
      },
      tooltip: {
        theme: 'light',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => 'Armazenamento usado (GB):',
          },
        },
        marker: {
          show: false,
        },
      },
    };
  });

  // chart 1
  const lineChart1 = {
    series: [
      {
        name: 'series1',
        data: [0, 1, 6, 7, 2, 10, 9, 2],
      },
    ],
  };

  // chart 2
  const chartOptions2 = computed(() => {
    return {
      chart: {
        type: 'bar',
        height: 90,
        fontFamily: `inherit`,
        foreColor: '#a1aab2',
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#fff'],
      fill: {
        type: 'solid',
        opacity: 1,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      yaxis: {
        min: 0,
        max: 100,
      },
      tooltip: {
        theme: 'light',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => 'Pedidos Totais',
          },
        },
        marker: {
          show: false,
        },
      },
    };
  });

  // chart 2
  const lineChart2 = computed(() => {
    const storageValue = parseInt(userStore.user?.totalStorageUsed || '0');
    const baseValue = Math.max(storageValue, 50); // Mínimo 50 para mostrar variação
    return {
      series: [
        {
          name: 'series1',
          data: [
            baseValue * 0.2,
            baseValue * 0.4,
            baseValue * 0.1,
            baseValue * 0.6,
            baseValue * 0.5,
            baseValue * 0.8,
            baseValue * 0.4,
            baseValue,
          ],
        },
      ],
    };
  });
</script>

<template>
  <v-card elevation="0" class="bg-secondary overflow-hidden bubble-shape bubble-primary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-3">
        <v-btn icon rounded="sm" color="darkprimary" variant="flat">
          <DatabaseIcon stroke-width="1.5" width="20" />
        </v-btn>
        <div class="ml-auto z-1">
          <v-tabs v-model="tab" class="theme-tab" density="compact" align-tabs="end">
            <v-tab value="1" hide-slider color="transparent">Mês</v-tab>
            <v-tab value="2" hide-slider color="transparent">Ano</v-tab>
          </v-tabs>
        </div>
      </div>
      <v-tabs-window v-model="tab" class="z-1">
        <v-tabs-window-item value="1">
          <v-row>
            <v-col cols="6">
              <div class="d-none d-md-block">
                <h2 class="text-h1 font-weight-medium">
                  {{ storage }}
                  <a href="#">
                    <CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" />
                  </a>
                </h2>
              </div>
              <div class="d-flex align-center d-block d-md-none">
                <h2 class="text-h2 font-weight-medium mr-2 mobile-storage">
                  {{ storage }}
                </h2>
                <a href="#">
                  <CircleArrowUpRightIcon stroke-width="1.5" width="24" class="text-white" />
                </a>
              </div>
              <span class="text-subtitle-1 text-medium-emphasis text-white">
                Armazenamento utilizado
              </span>
            </v-col>
            <v-col cols="6">
              <apexchart
                type="line"
                height="90"
                :options="chartOptions1"
                :series="lineChart1.series"
              ></apexchart>
            </v-col>
          </v-row>
        </v-tabs-window-item>
        <v-tabs-window-item value="2">
          <v-row>
            <v-col cols="6">
              <div class="d-none d-md-block">
                <h2 class="text-h1 font-weight-medium">
                  {{ storage }}
                  <a href="#">
                    <CircleArrowUpRightIcon stroke-width="1.5" width="28" class="text-white" />
                  </a>
                </h2>
              </div>
              <div class="d-flex align-center d-block d-md-none">
                <h2 class="text-h2 font-weight-medium mr-2 mobile-storage">
                  {{ storage }}
                </h2>
                <a href="#">
                  <CircleArrowUpRightIcon stroke-width="1.5" width="24" class="text-white" />
                </a>
              </div>
              <span class="text-subtitle-1 text-medium-emphasis text-white">
                Armazenamento Usado
              </span>
            </v-col>
            <v-col cols="6">
              <apexchart
                type="line"
                height="90"
                :options="chartOptions2"
                :series="lineChart2.series"
              ></apexchart>
            </v-col>
          </v-row>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.mobile-storage {
  font-size: 1.2rem !important;
}
</style>
