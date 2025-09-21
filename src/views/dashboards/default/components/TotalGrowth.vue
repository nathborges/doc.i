<script setup lang="ts">
  import { ref, computed, shallowRef } from 'vue';
  import {
    ArchiveIcon,
    CopyIcon,
    DownloadIcon,
    FileExportIcon,
    DotsIcon,
    CircleArrowUpRightIcon,
    TagIcon,
  } from 'vue-tabler-icons';
  import iconCard from '@/assets/images/icons/icon-card.svg';

  const select = ref({ state: 'Hoje', abbr: 'FL' });
  const items = [
    { state: 'Hoje', abbr: 'FL' },
    { state: 'Este Mês', abbr: 'GA' },
    { state: 'Este Ano', abbr: 'NE' },
  ];

  const categories = ref([
    { title: 'Contratos', subtitle: 'Teste', value: '$1,200.00' },
    { title: 'Documentos', subtitle: 'Arquivos', value: '$850.00' },
    { title: 'Relatórios', subtitle: 'Dados', value: '$2,100.00' },
    { title: 'Projetos', subtitle: 'Ativos', value: '$950.00' },
    { title: 'Clientes', subtitle: 'Cadastros', value: '$1,750.00' },
  ]);

  const menuItems = shallowRef([
    { title: 'Importar Cartão', icon: DownloadIcon },
    { title: 'Copiar Dados', icon: CopyIcon },
    { title: 'Exportar', icon: FileExportIcon },
    { title: 'Arquivar Arquivo', icon: ArchiveIcon },
  ]);

  // chart 1
  const lineChart1 = {
    series: [
      {
        name: 'Investimento',
        data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75],
      },
      {
        name: 'Perda',
        data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75],
      },
      {
        name: 'Lucro',
        data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10],
      },
      {
        name: 'Manutenção',
        data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0],
      },
    ],
  };
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="9">
            <span class="text-subtitle-2 text-disabled font-weight-bold">Categorias</span>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="(category, index) in categories" :key="index">
            <v-card
              elevation="0"
              class="bg-containerBg overflow-hidden bubble-shape bubble-primary-shape"
            >
              <v-card-text>
                <div class="d-flex align-start mb-6">
                  <v-btn icon rounded="sm" color="darkprimary" variant="flat">
                    <img :src="iconCard" width="25" />
                  </v-btn>
                  <div class="ml-auto z-1">
                    <v-menu :close-on-content-click="false">
                      <template v-slot:activator="{ props }">
                        <v-btn
                          icon
                          rounded="sm"
                          color="primary"
                          variant="flat"
                          size="small"
                          v-bind="props"
                        >
                          <DotsIcon stroke-width="1.5" width="20" />
                        </v-btn>
                      </template>
                      <v-sheet rounded="md" width="150" class="elevation-10">
                        <v-list density="compact">
                          <v-list-item
                            v-for="(item, itemIndex) in menuItems"
                            :key="itemIndex"
                            :value="itemIndex"
                          >
                            <template v-slot:prepend>
                              <component :is="item.icon" stroke-width="1.5" size="20" />
                            </template>
                            <v-list-item-title class="ml-2">{{ item.title }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-sheet>
                    </v-menu>
                  </div>
                </div>
                <h2 class="text-h1 font-weight-medium text-darkText">
                  {{ category.title }}
                  <a href="#"><TagIcon stroke-width="1.5" width="28" class="text-primary" /></a>
                </h2>
                <span class="text-subtitle-1 text-lightText">{{ category.subtitle }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-card>
</template>
