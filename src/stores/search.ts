import { SearchService } from '@/services/search.service';
import { defineStore } from 'pinia';

interface SearchResult {
  answer: string;
  files: any[];
  id: string;
  timestamp: Date;
}

export const useSearchStore = defineStore('search', {
  state: () => ({
    currentResult: null as SearchResult | null,
    searchHistory: [] as SearchResult[],
    isLoading: false,
  }),

  actions: {
    async performSearch(query: string, categoryId: string | null) {
      this.isLoading = true;

      try {
        const response = await SearchService.search(query, categoryId);
        console.log(response);

        const result: SearchResult = {
          id: Date.now().toString(),
          answer: response.answer,
          files: response.fileNames,
          timestamp: new Date(),
        };

        this.currentResult = result;
        this.searchHistory.unshift(result);

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
    formattedAnswers: (state) =>
      state.searchHistory.map((r) => ({
        content: r.answer
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\\_/g, '_')
          .replace(/\n/g, '<br>'),
        timestamp: r.timestamp.toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      })),
  },
});
