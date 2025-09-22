export interface CreateCategoryData {
  name: string;
  description: string;
  color: string;
  iconName: string;
}


// src/types/categories/Category.ts
export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  iconName: string;
  totalDocuments: string;
}

export interface CategoryDisplay {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
  iconColor: string;
  iconName: string;
  totalDocuments: string;

}
