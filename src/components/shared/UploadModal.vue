<script setup lang="ts">
  import { ref, watch } from 'vue';
  import ModalWrapper from './ModalWrapper.vue';
  import { useCategoriesStore } from '@/stores/categories';
  import { CloudUploadIcon, XIcon } from 'vue-tabler-icons';
  import { getFileIcon } from '@/utils/fileIcons';
  import { formatFileSize } from '@/utils/formatter';
  import { useRouter } from 'vue-router';
  import LoadingOverlay from './LoadingOverlay.vue';

  interface Props {
    modelValue: boolean;
    loading?: boolean;
    estimatedTime?: number;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['update:modelValue', 'upload']);
  const categoriesStore = useCategoriesStore();
  const router = useRouter();

  const selectedFiles = ref<File[]>([]);
  const selectedCategory = ref('');
  const fileInput = ref<HTMLInputElement>();
  const isDragOver = ref(false);
  const limit = 100;

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragOver.value = false;
    const files = event.dataTransfer?.files;
    if (files) {
      selectedFiles.value = Array.from(files).slice(0, limit);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    isDragOver.value = true;
  };

  const handleDragLeave = () => {
    isDragOver.value = false;
  };

  const closeModal = () => {
    if (!props.loading) {
      emit('update:modelValue', false);
      selectedFiles.value = [];
      selectedCategory.value = '';
      if (fileInput.value) fileInput.value.value = '';
    }
  };

  const selectFiles = () => {
    fileInput.value?.click();
  };

  const handleFileSelect = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      selectedFiles.value = Array.from(files).slice(0, limit);
    }
  };

  const uploadFiles = () => {
    if (selectedFiles.value.length > 0 && selectedCategory.value) {
      emit('upload', {
        files: selectedFiles.value,
        categoryId: selectedCategory.value,
      });
    }
  };

  const removeFile = (index: number) => {
    selectedFiles.value.splice(index, 1);
  };

  watch(
    () => props.modelValue,
    (isOpen) => {
      if (isOpen) {
        categoriesStore.loadCategories();
        const categoryId = router.currentRoute.value.params.id;
        selectedCategory.value = Array.isArray(categoryId) ? (categoryId[0] ?? '') : (categoryId ?? '');
      }
    }
  );
</script>

<template>
  <ModalWrapper :is-open="props.modelValue" :loading="props.loading" title="Upload de Arquivos" @close="closeModal">
    <div class="position-relative">
      <LoadingOverlay :isVisible="props.loading" message="Enviando arquivos..." />
      
      <input
        ref="fileInput"
        type="file"
        multiple
        style="display: none"
        @change="handleFileSelect"
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
      />

      <v-select
        v-model="selectedCategory"
        :items="categoriesStore.categories"
        item-title="title"
        item-value="id"
        label="Categoria"
        variant="outlined"
        :hide-details="true"
        :disabled="props.loading"
        class="mb-4"
      />

      <v-card variant="outlined" class="upload-area" :class="{ 'drag-over': isDragOver }">
        <div 
          class="upload-content pa-3 pr-0" 
          @click="!props.loading ? selectFiles() : null"
          @drop="!props.loading ? handleDrop : null"
          @dragover="!props.loading ? handleDragOver : null"
          @dragleave="!props.loading ? handleDragLeave : null"
        >
          <div
            v-if="selectedFiles.length <= 0"
            class="text-center h-100 d-flex flex-column align-center justify-center"
          >
            <CloudUploadIcon size="48" class="text-primary" />
            <div class="text-h6 mb-2">Arraste arquivos ou clique para selecionar</div>
            <div class="text-caption text-disabled">PDF, DOC, DOCX, TXT, JPG, PNG</div>
            <div class="text-caption text-disabled mt-1">Máximo: 10 arquivos, 10MB cada</div>
          </div>
          <div v-else class="files-container">
            <div class="pt-2 pb-2">
              <div class="text-subtitle-2 mb-3">
                {{ selectedFiles.length }} arquivo(s) selecionado(s)
              </div>
              <v-divider />

              <div class="files-list">
                <v-list density="compact" class="pa-0">
                  <v-list-item v-for="(file, index) in selectedFiles" :key="index" class="px-0 py-1">
                    <template v-slot:prepend>
                      <component :is="getFileIcon(file.name)" size="18" class="mr-3" />
                    </template>

                    <v-list-item-title class="file-name text-body-2">
                      {{ file.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-caption">
                      {{ formatFileSize(file.size) }}
                    </v-list-item-subtitle>

                    <template v-slot:append>
                      <v-btn
                        icon
                        size="x-small"
                        variant="text"
                        color="error"
                        :disabled="props.loading"
                        @click="removeFile(index)"
                      >
                        <XIcon size="14" />
                      </v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </div>
        </div>
      </v-card>
      

      <div v-if="props.loading && props.estimatedTime" class="text-center mt-3 mb-3">
        <v-chip color="info" size="small">
          Tempo estimado: ~{{ props.estimatedTime }}s
        </v-chip>
      </div>
        <div v-if="true" class="text-center mt-3 mb-3">
        <v-chip color="error" size="small">
          Upload será reativado após a apresentação.
        </v-chip>
      </div>
    </div>

    <template #footer>
      <v-btn
        color="primary"
        class="pr-5 pl-5"
        variant="flat"
        size="large"
        rounded="sm"
        :disabled="true"
        :loading="props.loading"
        @click="uploadFiles"
      >
        {{ props.loading ? 'Enviando...' : 'Enviar arquivos' }}
      </v-btn>
    </template>
  </ModalWrapper>
</template>

<style scoped>
  .upload-area {
    border: 2px dashed;
  }

  .upload-content {
    cursor: pointer;
    transition: all 0.3s ease;
    height: 180px;
  }

  .upload-content:hover {
    background-color: rgba(var(--v-theme-primary), 0.04);
  }

  .files-container {
    background-color: rgba(var(--v-theme-surface), 1);
    overflow-y: scroll;
    height: 100%;
  }

  .file-name {
    max-width: 280px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>