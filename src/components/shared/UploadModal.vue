<script setup lang="ts">
  import { ref, watch } from 'vue';
  import ModalWrapper from './ModalWrapper.vue';
  import LoadingOverlay from './LoadingOverlay.vue';
  import { useCategoriesStore } from '@/stores/categories';
  import { useDocumentsStore } from '@/stores/documents';
  import { CloudUploadIcon, XIcon } from 'vue-tabler-icons';
  import { getFileIcon } from '@/utils/fileIcons';
  import { formatFileSize } from '@/utils/formatter';

  interface Props {
    modelValue: boolean;
  }

  interface Emits {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'upload', data: { files: File[]; categoryId: string }): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
  const categoriesStore = useCategoriesStore();
  const documentsStore = useDocumentsStore();

  const selectedFiles = ref<File[]>([]);
  const selectedCategory = ref('');
  const fileInput = ref<HTMLInputElement>();

  const closeModal = () => {
    emit('update:modelValue', false);
    resetForm();
  };

  const selectFiles = () => {
    fileInput.value?.click();
  };

  const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      if (fileArray.length > 10) {
        selectedFiles.value = fileArray.slice(0, 10);
        console.warn(
          'Máximo de 10 arquivos permitidos. Apenas os primeiros 10 foram selecionados.'
        );
      } else {
        selectedFiles.value = fileArray;
      }
    }
  };

  const uploadFiles = () => {
    if (selectedFiles.value.length > 0 && selectedCategory.value) {
      emit('upload', {
        files: selectedFiles.value,
        categoryId: selectedCategory.value,
      });
      closeModal();
    }
  };

  const resetForm = () => {
    selectedFiles.value = [];
    selectedCategory.value = '';
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  };

  const removeFile = (index: number) => {
    selectedFiles.value.splice(index, 1);
  };

  // Load categories when modal opens
  watch(
    () => props.modelValue,
    (isOpen) => {
      if (isOpen) {
        categoriesStore.loadCategories();
      }
    }
  );
</script>

<template>
  <ModalWrapper :is-open="props.modelValue" title="Upload de Arquivos" @close="closeModal">
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
      class="mb-4"
    />

    <v-card variant="outlined" class="upload-area mb-4">
      <v-card-text class="text-center pa-8" @click="selectFiles">
        <CloudUploadIcon size="48" class="mb-4 text-primary" />
        <div class="text-h6 mb-2">Clique para selecionar arquivos</div>
        <div class="text-caption text-disabled">PDF, DOC, DOCX, TXT, JPG, PNG</div>
        <div class="text-caption text-disabled mt-1">Máximo: 10 arquivos, 10MB cada</div>
      </v-card-text>
      
      <div v-if="selectedFiles.length > 0" class="pa-4 pt-0">
        <v-divider class="mb-3" />
        <div class="text-subtitle-2 mb-3">
          {{ selectedFiles.length }} arquivo(s) selecionado(s)
          <span v-if="selectedFiles.length === 10" class="text-warning ml-2">(máximo atingido)</span>
        </div>
        <div class="files-tags">
          <perfect-scrollbar class="files-scroll">
            <div class="pa-2">
              <v-chip
                v-for="(file, index) in selectedFiles"
                :key="index"
                class="ma-1"
                size="small"
                variant="outlined"
              >
                <template v-slot:prepend>
                  <component :is="getFileIcon(file.name)" size="16" class="mr-1" />
                </template>
                <span class="file-name">{{ file.name }}</span>
                <span class="file-size ml-2">({{ formatFileSize(file.size) }})</span>
                <template v-slot:append>
                  <v-btn
                    icon
                    size="x-small"
                    variant="text"
                    color="error"
                    @click="removeFile(index)"
                    class="ml-1"
                  >
                    <XIcon size="12" />
                  </v-btn>
                </template>
              </v-chip>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
    </v-card>

    <template #footer>
      <v-btn
        color="primary"
        class="pr-5 pl-5"
        variant="flat"
        size="large"
        rounded="sm"
        :disabled="selectedFiles.length === 0 || !selectedCategory || documentsStore.uploading"
        @click="uploadFiles"
      >
        <v-progress-circular
          v-if="documentsStore.uploading"
          indeterminate
          size="16"
          width="2"
          color="white"
          class="mr-2"
        />
        {{
          documentsStore.uploading
            ? `Enviando... ${documentsStore.uploadProgress}%`
            : 'Enviar arquivos'
        }}
      </v-btn>
    </template>
  </ModalWrapper>
  
  <LoadingOverlay 
    :is-visible="documentsStore.uploading" 
    :message="`Enviando arquivos... ${documentsStore.uploadProgress}%`" 
  />
</template>

<style scoped>
  .upload-area {
    cursor: pointer;
    transition: all 0.3s ease;
    border-style: dashed !important;
  }

  .upload-area:hover {
    border-color: rgb(var(--v-theme-primary)) !important;
  }

  .files-tags {
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 4px;
    max-height: 120px;
  }

  .files-scroll {
    max-height: 120px;
  }

  .file-name {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-size {
    font-size: 0.75rem;
    opacity: 0.7;
  }
</style>
