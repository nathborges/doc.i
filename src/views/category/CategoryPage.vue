<template>
  <v-row>
    <v-col cols="12">
      <UiParentCard :title="`${categoryName} - ${documents.length} arquivos`">
        <template v-slot:action></template>
        <div
          v-if="loading"
          class="text-center py-8 d-flex flex-column justify-center align-center ga-4"
          style="height: 60vh"
        >
          <v-progress-circular indeterminate color="primary" />
          <div class="text-h5 mt-2">Carregando documentos...</div>
        </div>

        <div v-else-if="false" class="text-center py-8">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-file-outline</v-icon>
          <div class="text-h5 text-disabled">Nenhum documento encontrado</div>
          <div class="text-body-2 text-disabled mt-2">Esta categoria ainda não possui arquivos</div>
        </div>
        <v-data-table
          v-else
          :headers="headers"
          :items="documents"
          :items-per-page="10"
          :loading="loading"
          class="elevation-0"
          hover
          density="comfortable"
        >
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
            <div class="text-body-2">{{ item.fileSize }}</div>
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

          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              size="small"
              variant="text"
              :href="item.fileLocation"
              target="_blank"
              color="primary"
              class="mr-1"
            >
              <DownloadIcon size="16" stroke-width="1.5" />
            </v-btn>
            <v-btn icon size="small" variant="text" color="error" @click="deleteDocument(item.id)">
              <TrashIcon size="16" stroke-width="1.5" />
            </v-btn>
          </template>
        </v-data-table>
      </UiParentCard>
    </v-col>
  </v-row>

  <UploadModal
    :is-open="uploadModalOpen"
    :category-id="categoryId"
    @close="uploadModalOpen = false"
    @file-uploaded="onFileUploaded"
  />
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { CategoriesService } from '@/services/categories.service';
  import { DownloadIcon, TrashIcon, FileFilledIcon } from 'vue-tabler-icons';
  import UiParentCard from '@/components/shared/UiParentCard.vue';
  import UploadModal from '@/components/shared/UploadModal.vue';
  import { getFileIcon } from '@/utils/fileIcons';

  const route = useRoute();
  const categoryId = ref(route.params.id as string);
  const categoryName = ref('Carregando...');
  const categoryColor = ref('#6b7280');
  const documents = ref<any[]>([]);
  const loading = ref(true);
  const uploadModalOpen = ref(false);

  const headers = [
    { title: 'Nome', key: 'fileName', sortable: true, width: '30%' },
    { title: 'Tamanho', key: 'fileSize', sortable: true, width: '15%' },
    { title: 'Proprietário', key: 'owner', sortable: true, width: '15%' },
    { title: 'Data de Criação', key: 'createdAt', sortable: true, width: '20%' },
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
