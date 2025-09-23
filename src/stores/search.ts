import { SearchService } from '@/services/search.service';
import { defineStore } from 'pinia';
import type { SearchResult, SearchFile } from '@/types/search';

export const useSearchStore = defineStore('search', {
  state: () => ({
    currentResult: null as SearchResult | null,
    searchHistory: [] as SearchResult[],
    chatMessages: [] as Array<{ text: string; time: string; isMine: boolean; query?: string }>,
    isLoading: false,
    isExportLoading: false,
    isAnActiveSearch: false,
    lastSearchFileNames: [] as SearchFile[],
    error: null as string | null,
  }),

  actions: {
    async performSearch(query: string, categoryId: string | null) {
      this.isLoading = true;
      this.error = null;

      // Vibra o celular se suportado
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }

      // Adiciona mensagem do usuário
      const userTime = new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      this.chatMessages.push({
        text: query,
        time: userTime,
        isMine: true,
        query: query
      });

      try {
        const response = await SearchService.search(query, categoryId);

        const result: SearchResult = {
          id: Date.now().toString(),
          answer: response.answer,
          files: response.files,
          timestamp: new Date(),
        };
        this.isAnActiveSearch = true;

        // Adiciona resposta da IA
        const aiTime = new Date().toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
        this.chatMessages.push({
          text: response.answer
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\\_/g, '_')
            .replace(/\n/g, '<br>'),
          time: aiTime,
          isMine: false
        });

        this.currentResult = result;
        this.searchHistory.unshift(result);
        this.lastSearchFileNames = result.files;

        if (this.searchHistory.length > 10) {
          this.searchHistory = this.searchHistory.slice(0, 10);
        }

        return result;
      } catch (error) {
        this.error = 'Erro ao realizar busca';
        this.clearIsAnActiveSearch();
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    clearCurrent() {
      this.currentResult = null;
    },

    clearIsAnActiveSearch() {
      this.isAnActiveSearch = false;
      this.lastSearchFileNames = [];
    },

    clearHistory() {
      this.searchHistory = [];
      this.currentResult = null;
    },
    async exportReport(fields: string, content: string) {
      this.isExportLoading = true;
      this.error = null;
      try {
        const blob = await SearchService.exportReport(fields, content);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        this.error = 'Erro ao exportar relatório';
        throw error;
      } finally {
        this.isExportLoading = false;
      }
    },

    clearError() {
      this.error = null;
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