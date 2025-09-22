import { defineStore } from 'pinia';
import { CategoriesService } from '@/services/categories.service';
import type { Category, CategoryDisplay } from '@/types/category';

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

export const useCategoriesStore = defineStore({
  id: 'categories',
  state: () => ({
    categories: [] as CategoryDisplay[],
    loading: false,
    error: null as string | null,
  }),
  getters: {
    getCategoryById: (state) => (id: string) => state.categories.find((cat) => cat.id === id),
    categoriesCount: (state) => state.categories.length,
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
          backgroundColor: darkenColor(cat.color, 50),
          iconColor: cat.color,
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
        await CategoriesService.deleteCategory(categoryId);
        this.categories = this.categories.filter((cat) => cat.id !== categoryId);
      } catch (error) {
        this.error = 'Erro ao deletar categoria';
        throw error;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
