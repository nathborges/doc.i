export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  iconName: string;
  createdAt?: string;
  updatedAt?: string;
  totalDocuments?: string;
}

export interface CreateCategoryData {
  name: string;
  description: string;
  color: string;
  iconName: string;
}
