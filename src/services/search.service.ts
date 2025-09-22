import axios from '@/utils/httpClient';

const API_URL = import.meta.env.VITE_API_URL;

interface SearchRequest {
  query: string;
  limit: number;
  categoryId?: string;
}

interface ResponseAi {
  answer: string;
  fileNames: any[];
}

export interface SearchResponse {
  answer: string;
  fileNames: any[];
}

export const SearchService = {
  async search(query: string, categoryId: string | null): Promise<SearchResponse> {
    try {
      const searchData: SearchRequest = {
        query,
        limit: 10,
      };

      // Add categoryId only if provided
      if (categoryId) {
        searchData.categoryId = categoryId;
      }

      const response = await axios.post(`${API_URL}/search`, searchData);
      console.log(response);

      return response.data.responseAi;
    } catch (error) {
      console.error('Error searching:', error);

      return {
        answer:
          'Infelizmente, devido a uma indisponibilidade não consigo responder sua pergunta no momento.',
        fileNames: [],
      };
    }
  },
};
