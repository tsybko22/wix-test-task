import { type Category } from '../types';

export const recursiveDeleteCategory = (
  categories: Category[],
  id: string
): Category[] => {
  return categories
    .map((category) => {
      if (category.id === id) return null;

      if (category.children) {
        return {
          ...category,
          children: recursiveDeleteCategory(category.children, id),
        };
      }

      return category;
    })
    .filter((category) => category) as Category[];
};

export const recursiveUpdateCategory = (
  categories: Category[],
  updatedCategory: Category
): Category[] => {
  return categories.map((category) => {
    if (category.id === updatedCategory.id) return updatedCategory;

    if (category.children) {
      return {
        ...category,
        children: recursiveUpdateCategory(category.children, updatedCategory),
      };
    }

    return category;
  });
};

export const recursiveCollapseCategory = (category: Category): Category => {
  return {
    ...category,
    isExpanded: false,
    children: category.children ? category.children.map(recursiveCollapseCategory) : [],
  };
};
