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
    async uploadDocuments(file: File, categoryId: string) {
      try {
        await DocumentsService.uploadDocuments(file, categoryId);
      } catch (error) {
        this.error = 'Erro durante o upload dos arquivos';
        console.error('Erro no upload:', error);
        throw error;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
