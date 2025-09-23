import { defineStore } from 'pinia';
import { CategoriesService } from '@/services/categories.service';
import type { Category, CategoryDisplay } from '@/types/category';
import type { Document } from '@/types/document';

const darkenColor = (hex: string, percent: number) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};
const lightenColor = (hex: string, percent: number) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return (
    '#' +
    (0x1000000 + (R < 255 ? R : 255) * 0x10000 + (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255))
      .toString(16)
      .slice(1)
  );
};

export const useCategoriesStore = defineStore({
  id: 'categories',
  state: () => ({
    categories: [] as CategoryDisplay[],
    loading: false,
    documentsLoading: false,
    documents: [] as Document[],
    error: null as string | null,
  }),
  getters: {
    getCategoryById: (state) => (id: string) => state.categories.find((cat) => cat.id === id),
    categoriesCount: (state) => state.categories.length,
    getFilteredDocuments: (state) => (searchFiles: any[], isSearchMode: boolean) => {
      if (isSearchMode && searchFiles.length) {
        const fileNames = searchFiles.map((file) => file.fileName);
        return state.documents.filter((doc) => fileNames.includes(doc.fileName));
      }
      return state.documents;
    },
    getCategoryName: (state) => (id: string) => {
      const category = state.categories.find((cat) => cat.id === id);
      return category?.title || '';
    },
    getCategorySubtitle: (state) => (id: string) => {
      const category = state.categories.find((cat) => cat.id === id);
      return category?.subtitle || '';
    },
  },
  actions: {
    async loadCategories() {
      if (this.loading) return;

      this.loading = true;
      this.error = null;
      try {
        const data: Category[] = await CategoriesService.getCategories();
        this.categories = data.map((cat) => ({
          id: cat.id,
          title: cat.name,
          subtitle: cat.description,
          backgroundColor: cat.color,
          iconColor: lightenColor(cat.color, 20),
          iconName: cat.iconName,
          totalDocuments: cat.totalDocuments ?? '0',
        }));
      } catch (error) {
        this.error = 'Erro ao carregar categorias';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createCategory(categoryData: {
      name: string;
      description: string;
      color: string;
      iconName: string;
    }) {
      try {
        await CategoriesService.createCategory(categoryData);
        this.loadCategories();
      } catch (error) {
        this.error = 'Erro ao criar categoria';
        throw error;
      }
    },

    async deleteCategory(categoryId: string) {
      try {
        this.categories = this.categories.map((cat) => 
          cat.id === categoryId ? { ...cat, deleting: true } : cat
        );
        
        await CategoriesService.deleteCategory(categoryId);
        
        this.categories = this.categories.filter((cat) => cat.id !== categoryId);
      } catch (error) {
        this.categories = this.categories.map((cat) => 
          cat.id === categoryId ? { ...cat, deleting: false } : cat
        );
        this.error = 'Erro ao deletar categoria';
        throw error;
      }
    },

    async loadDocumentsByCategory(categoryId: string) {
      this.documentsLoading = true;
      this.error = null;
      try {
        this.documents = await CategoriesService.getDocumentsByCategory(categoryId);
      } catch (error) {
        this.error = 'Erro ao carregar documentos';
        this.documents = [];
        throw error;
      } finally {
        this.documentsLoading = false;
      }
    },

    async deleteDocument(documentId: string) {
      try {
        await CategoriesService.deleteDocument(documentId);
        this.documents = this.documents.filter((doc: any) => doc.id !== documentId);
      } catch (error) {
        this.error = 'Erro ao deletar documento';
        throw error;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
