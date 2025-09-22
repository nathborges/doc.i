<template>
  <UiParentCard :title="`Categorias > ${categoryName}`" class="w-100 h-100">
    <template v-slot:action>
      <v-chip size="small" color="primary" variant="tonal">
        {{ documents.length }} arquivos
      </v-chip>
    </template>
    <div v-if="loading" class="text-center py-8 d-flex flex-column justify-center align-center ga-4 h-100"
      style="height: 60vh">
      <v-progress-circular indeterminate color="primary" />
      <div class="text-h5 mt-2">Carregando documentos...</div>
    </div>

    <div v-else-if="false" class="text-center py-8">
      <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-file-outline</v-icon>
      <div class="text-h5 text-disabled">Nenhum documento encontrado</div>
      <div class="text-body-2 text-disabled mt-2">Esta categoria ainda não possui arquivos</div>
    </div>
    <div v-else class="d-flex flex-column h-100">
      <div class="d-flex flex-row w-100 justify-space-between align-center mb-4">
        <div class="text-h4">Resultados da pesquisa </div>
        <v-btn color="primary" variant="text" @click="showAddDocumentDialog = true">
          Exportar
        </v-btn>
      </div>
      <v-data-table class="elevation-0 flex-grow-1" height="100%" :headers="headers" :items="documents"
        :items-per-page="10" :loading="loading" hover density="comfortable">
        <template v-slot:item.fileName="{ item }">
          <div class="d-flex align-center py-2">
            <v-avatar size="32" variant="tonal" class="mr-3">
              <FileFilledIcon size="16" stroke-width="1.5" />
            </v-avatar>
            <div>
              <div class="text-body-1">{{ item.fileName }}</div>
            </div>
          </div>
        </template>

        <template v-slot:item.fileSize="{ item }">
          <div class="text-body-2">{{ formatFileSize(item.fileSize) }}</div>
        </template>

        <template v-slot:item.owner="{ item }">
          <div class="d-flex align-center">
            <v-avatar size="24" class="mr-2">
              <img src="@/assets/images/profile/user-round.svg" alt="Eu" />
            </v-avatar>
            <span class="text-body-2">eu</span>
          </div>
        </template>

        <template v-slot:item.createdAt="{ item }">
          <div class="text-body-2">{{ formatDate(item.createdAt) }}</div>
        </template>

        <template v-slot:no-data>
          <div class="text-center py-8">
            <div class="text-h5 text-disabled">Nenhum documento encontrado.</div>
            <div class="text-body-2 text-disabled">Esta categoria ainda não possui arquivos</div>
          </div>
        </template>


        <template v-slot:item.actions="{ item }">
          <v-btn icon size="small" variant="text" :href="item.fileLocation" target="_blank" color="primary"
            class="mr-1">
            <DownloadIcon size="16" stroke-width="1.5" />
          </v-btn>
          <v-btn icon size="small" variant="text" color="error" @click="deleteDocument(item.id)">
            <TrashIcon size="16" stroke-width="1.5" />
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </UiParentCard>

  <UploadModal v-model="uploadModalOpen" :category-id="categoryId" @upload="onFileUploaded" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { CategoriesService } from '@/services/categories.service';
import { DownloadIcon, TrashIcon, FileFilledIcon } from 'vue-tabler-icons';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UploadModal from '@/components/shared/UploadModal.vue';
import { formatFileSize } from '@/utils/formatter';

const route = useRoute();
const categoryId = ref(route.params.id as string);
const categoryName = ref('Carregando...');
const categoryColor = ref('#6b7280');
const documents = ref<any[]>([]);
const loading = ref(true);
const uploadModalOpen = ref(false);

const headers = [
  { title: 'Nome', key: 'fileName', align: 'start', sortable: true, width: '30%' },
  { title: 'Tamanho', key: 'fileSize', align: 'start', sortable: true, width: '15%' },
  { title: 'Proprietário', key: 'owner', align: 'start', sortable: true, width: '15%' },
  { title: 'Data de Criação', key: 'createdAt', align: 'start', sortable: true, width: '20%' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center', width: '20%' },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const deleteDocument = async (documentId: string) => {
  try {
    // Aqui você adicionaria a chamada para deletar o documento
    // await DocumentService.deleteDocument(documentId)

    // Remove da lista local
    documents.value = documents.value.filter((doc: any) => doc.id !== documentId);
  } catch (error) {
    console.error('Erro ao deletar documento:', error);
  }
};

const onFileUploaded = () => {
  loadCategoryAndDocuments(); // Recarrega a lista após upload
};

const loadCategoryAndDocuments = async () => {
  try {
    // Carrega categoria
    const categories = await CategoriesService.getCategories();
    const category = categories.find((cat: any) => cat.id === categoryId.value);
    if (category) {
      categoryName.value =
        category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase();
      categoryColor.value = category.color;
    }

    // Carrega documentos
    const docs = await CategoriesService.getDocumentsByCategory(categoryId.value);
    documents.value = docs;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    categoryName.value = 'Categoria não encontrada';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadCategoryAndDocuments();
});
</script>
<style lang="scss">
.v-container.page-wrapper {
  height: 80%;

  >div:not([class]) {
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
