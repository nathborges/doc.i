<template>
  <UiParentCard :title="`${categoryName}`" class="w-100 h-100">
    <!-- Overlay de loading -->
    <template v-slot:action>
      <v-chip size="small" color="primary" variant="tonal">
        {{ documents.length }} arquivos
      </v-chip>
    </template>

    <div class="d-flex justify-space-between align-center mb-4">
      <h4 class="text-h4">{{ tableTitle }}</h4>
      <div class="d-flex">
        <v-btn v-if="isSearchMode" color="primary" variant="text" @click="openReportModal">
          Exportar
        </v-btn>
        <v-btn v-if="isSearchMode && !mobile" color="primary" variant="text"
          @click="searchStore.clearIsAnActiveSearch()">
          Limpar pesquisa
        </v-btn>
      </div>
    </div>

    <!-- Loading State -->

    <!-- Content -->
    <div v-if="loading" class="d-flex flex-column justify-center align-center h-100">
      <v-progress-circular indeterminate color="primary" />
      <div class="text-h5 mt-2">Carregando documentos...</div>
    </div>
    
    <div v-else-if="documents.length > 0" class="d-flex flex-column">
      <v-data-table :headers="headers" :items="documents" :items-per-page="-1" :loading="loading"
        :hide-default-footer="true" hide-no-data class="elevation-0" height="60vh" hover density="comfortable" :sort-by="[{ key: 'fileName', order: 'asc' }]">
        <template v-slot:item.fileName="{ item }">
          <div class="d-flex align-center py-2">
            <!-- <v-avatar size="32" variant="tonal" class="mr-3">
              <FileFilledIcon size="16" stroke-width="1.5" />
            </v-avatar> -->
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
          <div class="d-flex gap-1 justify-center">
            <v-btn icon size="small" variant="text" color="primary" :href="item.fileLocation" target="_blank">
              <DownloadIcon size="16" stroke-width="1.5" />
            </v-btn>
            <v-btn 
              icon 
              size="small" 
              variant="text" 
              color="error" 
              :loading="categoriesStore.deletingDocument"
              :disabled="categoriesStore.deletingDocument"
              @click="deleteDocument(item.id)"
            >
              <TrashIcon size="16" stroke-width="1.5" />
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </div>
    
    <div v-else class="d-flex flex-column justify-center align-center h-100 text-center">
      <FileFilledIcon size="64" class="text-disabled mb-4" />
      <div class="text-h5 mb-2">Nenhum arquivo encontrado</div>
      <div class="text-body-1 text-disabled">Esta categoria ainda não possui documentos.</div>
    </div>

  </UiParentCard>
  <ReportModal v-model="showModal" :loading="searchStore.isExportLoading" @confirm="exportReport" />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
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

const isSearchMode = computed(() => searchStore.isAnActiveSearch);
const categoryName = computed(() => categoriesStore.getCategoryName(categoryId.value));
const categoryDescription = computed(() => categoriesStore.getCategorySubtitle(categoryId.value));

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
    { title: 'Ações', key: 'actions', sortable: false, align: 'center' as const, width: '20%' },
  ];

  if (!mobile.value) {
    baseHeaders.splice(2, 0, {
      title: 'Proprietário',
      key: 'owner',
      align: 'start' as const,
      sortable: true,
      width: '15%',
    });
    baseHeaders.splice(3, 0, {
      title: 'Data de Criação',
      key: 'createdAt',
      align: 'start' as const,
      sortable: true,
      width: '20%',
    });
  }

  return baseHeaders;
});

const openReportModal = () => {
  showModal.value = true;
};

const exportReport = async (tags: string) => {
  const content = isSearchMode.value
    ? searchStore.lastSearchFileNames.map((file) => file.plainText).join('\n\n')
    : '';
  await searchStore.exportReport(tags, content);
  showModal.value = false;
};

const deleteDocument = async (documentId: string) => {
  try {
    await categoriesStore.deleteDocument(documentId, categoryId.value);
  } catch (error) {
    console.error('Erro ao deletar documento:', error);
  }
};

const initializePage = async () => {
  try {
    searchStore.clearIsAnActiveSearch();
    if (categoriesStore.categories.length === 0) {
      await categoriesStore.loadCategories();
    }
    await categoriesStore.loadDocumentsByCategory(categoryId.value);
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
};

// Watch para mudanças no categoryId da rota
watch(
  () => route.params.id,
  async (newCategoryId, oldCategoryId) => {
    // Primeira execução (oldCategoryId é undefined)
    if (!oldCategoryId) {
      categoryId.value = newCategoryId as string;
      await initializePage();
      return;
    }

    // Mudanças subsequentes
    if (newCategoryId && newCategoryId !== categoryId.value) {
      categoryId.value = newCategoryId as string;
      searchStore.clearIsAnActiveSearch();
      await categoriesStore.loadDocumentsByCategory(categoryId.value);
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.v-data-table {
  height: 100%;
}

.v-data-table__wrapper {
  min-height: 50vh !important;
  height: 50vh !important;
  overflow-y: auto !important;
}

:deep(.v-card-text) {
  height: 75vh !important;
}

:deep(.v-data-table__wrapper) {
  scroll-behavior: smooth;
}
</style>