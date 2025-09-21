// src/types/categories/Category.ts
export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  iconName: string;
}

export interface CategoryDisplay {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  backgroundColor: string;
  iconColor: string;
  iconName: string;
}
