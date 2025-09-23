import { defineStore } from 'pinia';
import { DocumentsService } from '@/services/documents.service';

export const useDocumentsStore = defineStore({
  id: 'documents',
  state: () => ({
    uploading: false,
    uploadProgress: 0,
    error: null as string | null,
  }),
  actions: {
    async uploadDocuments(files: File | File[], categoryId: string) {
      try {
        this.uploading = true;
        const fileArray = Array.isArray(files) ? files : [files];
        await DocumentsService.uploadDocuments(fileArray, categoryId);
      } catch (error) {
        this.error = 'Erro durante o upload dos arquivos';
        console.error('Erro no upload:', error);
        throw error;
      } finally {
        this.uploading = false;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
