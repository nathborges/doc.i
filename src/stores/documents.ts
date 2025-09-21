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
    async uploadDocuments(files: File[], categoryId: string) {
      this.uploading = true;
      this.error = null;
      this.uploadProgress = 50; // Set to 50% while uploading

      try {
        const result = await DocumentsService.uploadDocuments(files, categoryId);
        this.uploadProgress = 100;

        return {
          success: true,
          data: result,
          filesCount: files.length,
        };
      } catch (error) {
        this.error = 'Erro durante o upload dos arquivos';
        console.error('Erro no upload:', error);
        throw error;
      } finally {
        this.uploading = false;
        this.uploadProgress = 0;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
