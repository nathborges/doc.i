<template>
  <v-dialog :model-value="isOpen" @update:model-value="closeModal" max-width="600px" persistent>
    <v-card elevation="12" rounded="lg">
      <v-card-title class="d-flex align-center pa-6 pb-4">
        <v-icon color="primary" class="mr-3" size="24">mdi-cloud-upload</v-icon>
        <span class="text-h5 font-weight-medium">Upload de Arquivos</span>
        <v-spacer />
        <v-btn icon variant="text" size="small" @click="closeModal">
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-6">
        <div
          class="upload-area"
          :class="{ 'drag-over': isDragOver }"
          @drop="handleDrop"
          @dragover.prevent="isDragOver = true"
          @dragleave="isDragOver = false"
          @click="triggerFileInput"
        >
          <input
            ref="fileInput"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            @change="handleFileSelect"
            style="display: none"
          />

          <div v-if="files.length === 0" class="upload-placeholder text-center">
            <v-icon size="48" color="primary" class="mb-4">mdi-cloud-upload-outline</v-icon>
            <div class="text-h6 font-weight-medium mb-2">
              Arraste arquivos aqui ou clique para selecionar
            </div>
            <div class="text-body-2 text-medium-emphasis mb-2">
              Suporte para PDF, DOC, DOCX, TXT, JPG, PNG
            </div>
            <v-chip size="small" variant="outlined" color="primary">
              Tamanho máximo: 10MB por arquivo
            </v-chip>
          </div>

          <div v-else class="files-list">
            <v-card
              v-for="(file, index) in files"
              :key="index"
              variant="outlined"
              class="mb-3 file-card"
              hover
            >
              <v-card-text class="d-flex align-center pa-4">
                <v-avatar size="40" :color="getFileColor(file.name)" variant="tonal" class="mr-4">
                  <component
                    :is="getFileIcon(file.name)"
                    :size="20"
                    :color="getFileColor(file.name)"
                  />
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="text-body-1 font-weight-medium mb-1">{{ file.name }}</div>
                  <div class="text-caption text-medium-emphasis">
                    {{ formatFileSize(file.size) }}
                  </div>
                </div>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  color="error"
                  @click.stop="removeFile(index)"
                >
                  <v-icon size="18">mdi-close</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card-text>

      <v-divider />
      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn variant="text" @click="closeModal" class="mr-3">Cancelar</v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :disabled="files.length === 0 || isUploading"
          :loading="isUploading"
          @click="uploadFiles"
          class="text-none"
        >
          Fazer Upload
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getFileIcon, getFileColor } from '@/utils/fileIcons';

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits(['close', 'file-uploaded']);

  const fileInput = ref<HTMLInputElement>();
  const files = ref<File[]>([]);
  const isDragOver = ref(false);
  const isUploading = ref(false);

  const triggerFileInput = () => {
    fileInput.value?.click();
  };

  const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const selectedFiles = Array.from(target.files);
      addFiles(selectedFiles);
    }
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragOver.value = false;
    if (event.dataTransfer?.files) {
      const droppedFiles = Array.from(event.dataTransfer.files);
      addFiles(droppedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];

    const validFiles = newFiles.filter((file) => {
      return file.size <= maxSize && allowedTypes.includes(file.type);
    });

    files.value = [...files.value, ...validFiles];
  };

  const removeFile = (index: number) => {
    files.value.splice(index, 1);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const uploadFiles = async () => {
    if (files.value.length === 0) return;

    isUploading.value = true;

    try {
      // Aqui você faria o upload real para a API
      // const formData = new FormData()
      // files.value.forEach(file => formData.append('files', file))
      // await FileService.upload(formData, props.categoryId)

      // Simulando upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      emit('file-uploaded');
      closeModal();
    } catch (error) {
      console.error('Erro no upload:', error);
    } finally {
      isUploading.value = false;
    }
  };

  const closeModal = () => {
    files.value = [];
    isDragOver.value = false;
    isUploading.value = false;
    emit('close');
  };
</script>

<style scoped>
  .upload-area {
    border: 2px dashed rgba(var(--v-theme-primary), 0.3);
    border-radius: 16px;
    padding: 48px 24px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    min-height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--v-theme-surface), 0.5);
  }

  .upload-area:hover {
    background: rgba(var(--v-theme-primary), 0.04);
    border-color: rgba(var(--v-theme-primary), 0.6);
    transform: translateY(-1px);
  }

  .upload-area.drag-over {
    background: rgba(var(--v-theme-primary), 0.08);
    border-color: rgb(var(--v-theme-primary));
    transform: scale(1.02);
  }

  .files-list {
    width: 100%;
    max-height: 320px;
    overflow-y: auto;
    padding: 8px 0;
  }

  .file-card {
    transition: all 0.2s ease;
  }

  .file-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  }

  :deep(.v-card-title) {
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  }
</style>
