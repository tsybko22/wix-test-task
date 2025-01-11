import React, { useEffect, useState } from 'react';
import { type Category } from '../../types';

import CategoryItem from './CategoryItem';

import {
  recursiveCollapseCategory,
  recursiveDeleteCategory,
  recursiveUpdateCategory,
} from '../../utils/categoryUtils';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';

interface Props {
  initialCategories: Category[];
}

const LOCAL_STORAGE_KEY = 'categoryTree';

const CategoryTree: React.FC<Props> = ({ initialCategories }) => {
  const [categories, setCategories] = useState<Category[]>(
    loadFromLocalStorage(LOCAL_STORAGE_KEY) || initialCategories
  );

  const updateCategory = (updatedCategory: Category) => {
    setCategories(recursiveUpdateCategory(categories, updatedCategory));
  };

  const deleteCategory = (id: string) => {
    setCategories(recursiveDeleteCategory(categories, id));
  };

  const collapseCategory = (category: Category) => {
    const updatedCategory = recursiveCollapseCategory(category);

    updateCategory(updatedCategory);
  };

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_KEY, categories);
  }, [categories]);

  return (
    <>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
          collapseCategory={collapseCategory}
        />
      ))}
    </>
  );
};

export default CategoryTree;
