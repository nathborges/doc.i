import axios from '@/utils/httpClient';

const API_URL = import.meta.env.VITE_API_URL;

interface SearchRequest {
  query: string;
  limit: number;
  categoryId: string | null;
  question: string;
  withAi: boolean;
}

interface SearchResponse {
  answer: string;
  files: any[];
}

export const SearchService = {
  async search(query: string, usingIA: boolean, categoryId: string | null) {
    try {
      const queryIfNotIa = usingIA ? ' ' : query;
      const questionIfIa = usingIA ? query : ' ';

      const searchData: SearchRequest = {
        query: queryIfNotIa,
        limit: 5,
        categoryId,
        question: questionIfIa,
        withAi: usingIA,
      };

      const response = await axios.post(`${API_URL}/search/semantic`, searchData);

      if (usingIA) {
        const rawAnswer =
          response.data.responseAi.answer ||
          'Infelizmente, devido a uma indisponibilidade não consigo responder sua pergunta no momento.';

        return {
          answer: rawAnswer,
          files: response.data.fileNames || [],
        };
      }
    } catch (error) {
      console.error('Error searching:', error);

      return {
        answer:
          'Infelizmente, devido a uma indisponibilidade não consigo responder sua pergunta no momento.',
        files: [],
      };
    }
  },
};
