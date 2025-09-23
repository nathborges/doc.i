export interface SearchResult {
  answer: string;
  files: SearchFile[];
  id: string;
  timestamp: Date;
}

export interface SearchFile {
  plainText: string;
  fileName: string;
}

export interface SearchResponse {
  answer: string;
  files: SearchFile[];
}
