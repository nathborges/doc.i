<template>
  <ModalWrapper
    v-if="isOpen"
    :key="isOpen"
    width="520px"
    title="Upload de Arquivos"
    @close="closeModal"
  >
    <div class="modal-body">
      <div class="form-group">
        <label>Categoria</label>
        <select v-model="selectedCategory" class="form-select">
          <option value="">Selecione uma categoria</option>
          <option
            v-for="category in categoriesStore.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ capitalizeFirst(category.name) }}
          </option>
        </select>
      </div>

      <div
        class="upload-area"
        :class="{ 'drag-over': isDragOver, 'has-files': files.length > 0 }"
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

        <div v-if="files.length === 0" class="upload-placeholder">
          <span class="material-icons upload-icon">cloud_upload</span>
          <h3>Arraste arquivos aqui ou clique para selecionar</h3>
          <p>Suporte para PDF, DOC, DOCX, TXT, JPG, PNG</p>
          <p class="size-limit">Tamanho máximo: 10MB por arquivo</p>
        </div>

        <div v-else class="files-list">
          <div v-for="(file, index) in files" :key="index" class="file-item">
            <div class="file-info">
              <span class="material-icons file-icon">{{
                getFileIcon(file.type)
              }}</span>
              <div class="file-details">
                <span class="file-name">{{ file.name }}</span>
                <span class="file-size">{{ formatFileSize(file.size) }}</span>
              </div>
            </div>
            <button class="remove-file" @click.stop="removeFile(index)">
              <span class="material-icons">close</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        class="upload-btn"
        :disabled="files.length === 0 || !selectedCategory || isUploading"
        :class="{ loading: isUploading }"
        @click="uploadFiles"
      >
        <span v-if="!isUploading">Fazer Upload</span>
        <span v-if="isUploading" class="loading-content">
          <span class="spinner"></span>
          Enviando...
        </span>
      </button>
    </template>
  </ModalWrapper>
</template>

<script setup>
  import { ref, inject, watch } from 'vue'
  import ModalWrapper from './ModalWrapper.vue'
  import { useCategoriesStore } from '@/store/categories'
  import { FileService } from '@/services/files.service'
  import { useRoute } from 'vue-router'

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['close', 'file-uploaded'])
  const showNotification = inject('showNotification')

  const fileInput = ref(null)
  const files = ref([])
  const isDragOver = ref(false)
  const selectedCategory = ref('')
  const isUploading = ref(false)
  const route = useRoute()

  const categoriesStore = useCategoriesStore()

  watch(
    () => props.isOpen,
    newValue => {
      if (newValue) {
        onModalOpen()
      }
    }
  )

  const onModalOpen = async () => {
    if (route.params.id) {
      selectedCategory.value = route.params.id
    }
  }

  const triggerFileInput = () => {
    fileInput.value?.click()
  }

  const handleFileSelect = event => {
    const selectedFiles = Array.from(event.target.files)
    addFiles(selectedFiles)
  }

  const handleDrop = event => {
    event.preventDefault()
    isDragOver.value = false
    const droppedFiles = Array.from(event.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const addFiles = newFiles => {
    const validFiles = newFiles.filter(file => {
      const maxSize = 10 * 1024 * 1024
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/jpg',
        'image/png'
      ]
      return file.size <= maxSize && allowedTypes.includes(file.type)
    })
    files.value = [...files.value, ...validFiles]
  }

  const removeFile = index => {
    files.value.splice(index, 1)
  }

  const getFileIcon = fileType => {
    if (fileType.includes('pdf')) return 'picture_as_pdf'
    if (fileType.includes('word') || fileType.includes('document'))
      return 'description'
    if (fileType.includes('text')) return 'article'
    if (fileType.includes('image')) return 'image'
    return 'insert_drive_file'
  }

  const capitalizeFirst = text => {
    if (!text) return ''
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const uploadFiles = async () => {
    if (files.value.length === 0) return
    if (!selectedCategory.value) {
      return
    }

    isUploading.value = true

    for (const file of files.value) {
      try {
        const sanitizedName = file.name.replace(/\s+/g, '_')
        const sanitizedFile = new File([file], sanitizedName, {
          type: file.type
        })
        await FileService.upload(sanitizedFile, selectedCategory.value)
        showNotification(`${file.name}`, 'success', 5000)
      } catch (error) {
        showNotification(`${file.name}`, 'error', 5000)
      }
    }
    isUploading.value = false

    emit('file-uploaded')
    closeModal()
  }

  const closeModal = () => {
    files.value = []
    selectedCategory.value = ''
    isDragOver.value = false
    isUploading.value = false
    emit('close')
  }
</script>

<style scoped>
  .modal-body {
    display: flex;
    flex-direction: column;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
  }

  .form-group label {
    font-weight: 500;
    color: var(--text-primary);
  }

  .form-select {
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 14px;
    background: var(--bg-primary);
    color: var(--text-primary);
  }

  .form-select:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  .upload-area {
    border: 2px dashed var(--border-color);
    border-radius: 12px;
    padding: 40px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: var(--bg-secondary);
    height: 35vh;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .upload-area:hover {
    border-color: var(--primary-color);
    background: var(--bg-primary);
  }

  .upload-area.drag-over {
    border-color: var(--primary-color);
    background: var(--primary-color-light, rgba(21, 128, 61, 0.1));
  }

  .upload-area.has-files {
    padding: 20px;
    text-align: left;
  }

  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .upload-icon {
    font-size: 48px;
    color: var(--primary-color);
  }

  .upload-placeholder h3 {
    margin: 0;
    color: var(--text-primary);
    font-size: 18px;
    font-weight: 600;
  }

  .upload-placeholder p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 14px;
  }

  .size-limit {
    font-size: 12px !important;
    color: var(--text-secondary);
  }

  .files-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
  }

  .file-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .file-icon {
    color: var(--primary-color);
    font-size: 24px;
  }

  .file-details {
    display: flex;
    flex-direction: column;
  }

  .file-name {
    font-weight: 500;
    color: var(--text-primary);
    font-size: 14px;
  }

  .file-size {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .remove-file {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .remove-file:hover {
    background: var(--bg-secondary);
    color: var(--error-color);
  }

  .upload-btn {
    color: var(--text-light);
    border: none;
    cursor: pointer;
    padding: 12px 24px;
    font-weight: 700;
    transition: all 0.3s ease;
    border-radius: 8px;
    background-color: var(--primary-color);
    min-width: 120px;
  }

  .upload-btn:hover:not(:disabled) {
    background-color: var(--primary-color-hover);
  }

  .upload-btn.loading {
    background-color: var(--primary-color-hover) !important;
    cursor: not-allowed;
  }

  .loading-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
