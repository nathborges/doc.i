import { SearchService } from '@/services/search.service';
import { defineStore } from 'pinia';

interface SearchResult {
  id: string;
  query: string;
  answer: string;
  files: any[];
  usingIA: boolean;
  timestamp: Date;
}

export const useSearchStore = defineStore('search', {
  state: () => ({
    currentResult: null as SearchResult | null,
    searchHistory: [] as SearchResult[],
    isLoading: false,
  }),

  actions: {
    async performSearch(query: string, usingIA: boolean, categoryId: string | null) {
      this.isLoading = true;

      try {
        // Aqui você chamaria o SearchService
        const response = await SearchService.search(query, usingIA, categoryId);

        const result: SearchResult = {
          id: Date.now().toString(),
          query,
          answer: response.answer,
          files: response.files,
          usingIA,
          timestamp: new Date(),
        };

        this.currentResult = result;
        this.searchHistory.unshift(result); // Adiciona no início

        // Limita histórico a 10 itens
        if (this.searchHistory.length > 10) {
          this.searchHistory = this.searchHistory.slice(0, 10);
        }

        return result;
      } finally {
        this.isLoading = false;
      }
    },

    clearCurrent() {
      this.currentResult = null;
    },

    clearHistory() {
      this.searchHistory = [];
      this.currentResult = null;
    },
  },

  getters: {
    hasCurrentResult: (state) => state.currentResult !== null,
    currentAnswer: (state) => state.currentResult?.answer || '',
    currentFiles: (state) => state.currentResult?.files || [],
    allAnswers: (state) => state.searchHistory.map((r) => r.answer).filter(Boolean),
    formattedAnswers: (state) =>
      state.searchHistory.map((r) =>
        r.answer
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\\_/g, '_')
          .replace(/\n/g, '<br>')
      ),
    recentSearches: (state) => state.searchHistory.slice(0, 5),
  },
});
