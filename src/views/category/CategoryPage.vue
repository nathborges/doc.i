<template>
  <UiParentCard :title="`${categoryName}`" class="w-100 h-100">
    <template v-slot:action>
      <v-chip v-if="!mobile" size="small" color="primary" variant="tonal">
        {{ documents.length }} arquivos
      </v-chip>
    </template>

    <div class="d-flex justify-space-between align-center mb-4">
        <h4 class="text-h4">{{ tableTitle }}</h4>
        <div class="d-flex">
                  <v-btn v-if="isSearchMode" color="primary" variant="text" @click="openReportModal">
          Exportar
        </v-btn>
        <v-btn v-if="isSearchMode && !mobile" color="primary" variant="text" @click="searchStore.clearIsAnActiveSearch()">
          Limpar filtro
        </v-btn>

        </div>

      </div>

    
    <!-- Loading State -->
    <div v-if="loading" class="d-flex flex-column justify-center align-center h-100" style="height: 60vh">
      <v-progress-circular indeterminate color="primary" />
      <div class="text-h5 mt-2">Carregando documentos...</div>
    </div>

    <!-- Content -->
    <div v-else class="d-flex flex-column h-100">
      <v-data-table 
        :headers="headers" 
        :items="documents"
        :items-per-page="-1"
        hide-default-footer

        :loading="loading"
        class="elevation-0 flex-grow-1" 
        height="100%"
        hover 
        density="comfortable"
      >
        <template v-slot:item.fileName="{ item }">
          <div class="d-flex align-center py-2">
            <v-avatar size="32" variant="tonal" class="mr-3">
              <FileFilledIcon size="16" stroke-width="1.5" />
            </v-avatar>
            <div class="text-body-1">{{ item.fileName }}</div>
          </div>
        </template>

        <template v-slot:item.fileSize="{ item }">
          <span class="text-body-2">{{ formatFileSize(item.fileSize) }}</span>
        </template>

        <template v-slot:item.owner="{ item }">
          <div class="d-flex align-center">
            <v-avatar size="24" class="mr-2">
              <img src="@/assets/images/profile/user-round.svg" alt="Usuário" />
            </v-avatar>
            <span class="text-body-2">eu</span>
          </div>
        </template>

        <template v-slot:item.createdAt="{ item }">
          <span class="text-body-2">{{ formatDate(item.createdAt) }}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn 
            icon 
            size="small" 
            variant="text" 
            color="primary"
            :href="item.fileLocation" 
            target="_blank"
            class="mr-1"
          >
            <DownloadIcon size="16" stroke-width="1.5" />
          </v-btn>
          <v-btn 
            icon 
            size="small" 
            variant="text" 
            color="error" 
            @click="deleteDocument(item.id)"
          >
            <TrashIcon size="16" stroke-width="1.5" />
          </v-btn>
        </template>

        <template v-slot:no-data>
          <div class="text-center py-8">
            <div class="text-h5 text-disabled">Nenhum documento encontrado</div>
            <div class="text-body-2 text-disabled">Esta categoria ainda não possui arquivos</div>
          </div>
        </template>
      </v-data-table>
    </div>
  </UiParentCard>
  <ReportModal v-model="showModal" @confirm="exportReport" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useCategoriesStore } from '@/stores/categories';
import { DownloadIcon, TrashIcon, FileFilledIcon } from 'vue-tabler-icons';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { formatFileSize, formatDate } from '@/utils/formatter';
import ReportModal from '@/components/shared/ReportModal.vue';
import { useSearchStore } from '@/stores/search';

const route = useRoute();
const { mobile } = useDisplay();
const categoriesStore = useCategoriesStore();
const searchStore = useSearchStore();
const categoryId = ref(route.params.id as string);
const showModal = ref(false);

// Computeds centralizados
const isSearchMode = computed(() => searchStore.isAnActiveSearch);
const categoryName = computed(() => categoriesStore.getCategoryName(categoryId.value));
const documents = computed(() => 
  categoriesStore.getFilteredDocuments(searchStore.lastSearchFileNames, isSearchMode.value)
);
const loading = computed(() => categoriesStore.documentsLoading);
const tableTitle = computed(() => 
  isSearchMode.value ? 'Resultados da busca:' : 'Arquivos da categoria'
);

const headers = computed(() => {
  const baseHeaders = [
    { title: 'Nome', key: 'fileName', align: 'start' as const, sortable: true, width: '30%' },
    { title: 'Tamanho', key: 'fileSize', align: 'start' as const, sortable: true, width: '15%' },
    { title: 'Data de Criação', key: 'createdAt', align: 'start' as const, sortable: true, width: '20%' },
    { title: 'Ações', key: 'actions', sortable: false, align: 'center' as const, width: '20%' },
  ];

  if (!mobile.value) {
    baseHeaders.splice(2, 0, { 
      title: 'Proprietário', 
      key: 'owner', 
      align: 'start' as const, 
      sortable: true, 
      width: '15%' 
    });
  }

  return baseHeaders;
});



const openReportModal = () => {
  showModal.value = true;
};

const exportReport = async (tags: string) => {
  const content = isSearchMode.value 
    ? searchStore.lastSearchFileNames.map(file => file.plainText).join('\n\n')
    : '';
  await searchStore.exportReport(tags, content);
  showModal.value = false;
};

const deleteDocument = async (documentId: string) => {
  try {
    await categoriesStore.deleteDocument(documentId);
  } catch (error) {
    console.error('Erro ao deletar documento:', error);
  }
};

// Função simplificada
const initializePage = async () => {
  try {
    searchStore.clearIsAnActiveSearch();
    await categoriesStore.initializeCategoryPage(categoryId.value);
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
};

onMounted(initializePage);
</script>

<style lang="scss">
.v-container.page-wrapper {
  height: 80%;

  > div:not([class]) {
    height: 100% !important;
  }
}

.v-data-table {
  height: 100% !important;
}

.v-data-table__wrapper {
  height: 100% !important;
  overflow-y: auto !important;
}

.v-card-text {
  height: 80% !important;
}
</style>