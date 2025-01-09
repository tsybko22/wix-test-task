import React, { useRef, useState } from 'react';
import { type Category } from '../../types';

import { Minus, Pencil, Plus, Trash2 } from 'lucide-react';

interface Props {
  category: Category;
  updateCategory: (updatedCategory: Category) => void;
  deleteCategory: (id: string) => void;
  isRoot?: boolean;
}

const CategoryItem: React.FC<Props> = ({
  category,
  updateCategory,
  deleteCategory,
  isRoot = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(category.name);
  const spanRef = useRef<HTMLSpanElement>(null);

  const addSubcategory = () => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: 'New Subcategory',
      children: [],
    };

    updateCategory({
      ...category,
      isExpanded: true,
      children: [...(category.children || []), newCategory],
    });
  };

  const renameCategory = () => {
    let name = category.name;

    if (inputValue.trim()) {
      name = inputValue;
    }

    updateCategory({ ...category, name });
    setInputValue(name);
    setIsEditing(false);
  };

  const toggleExpanded = (category: Category) => {
    if (category.children && category.children.length === 0) return;

    updateCategory({ ...category, isExpanded: !category.isExpanded });
  };

  const getCategoryIcon = (category: Category) => {
    if (category.children && category.children.length > 0) {
      return category.isExpanded ? (
        <>
          <Minus size={18} />
          Collapse
        </>
      ) : (
        <>
          <Plus size={18} />
          Expand
        </>
      );
    }

    return (
      <>
        <Minus size={18} />
        Collapse
      </>
    );
  };

  return (
    <ul className={isRoot ? '' : 'ml-2 border-l border-zinc-200 pl-2'}>
      <li className='flex items-center justify-between gap-5'>
        <div className='flex min-w-0 items-center'>
          <button
            type='button'
            className='text-[0px] font-semibold text-blue-500 disabled:text-blue-300'
            disabled={category.children && category.children.length === 0}
            onClick={() => toggleExpanded(category)}
          >
            {getCategoryIcon(category)}
          </button>
          {isEditing ? (
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={renameCategory}
              onKeyDown={(e) => {
                if (e.key === 'Enter') renameCategory();
              }}
              className='ml-2 p-1'
              style={{
                width: `${spanRef.current?.offsetWidth}px`,
              }}
              autoFocus
            />
          ) : (
            <span
              className='ml-2 inline-block cursor-pointer truncate p-1'
              onDoubleClick={() => setIsEditing(true)}
              ref={spanRef}
              title={category.name}
            >
              {category.name}
            </span>
          )}
        </div>
        <div className='flex items-center gap-1'>
          <button
            type='button'
            className='text-[0px] text-blue-500'
            onClick={addSubcategory}
          >
            <Plus size={18} />
            Add
          </button>
          <button
            type='button'
            className='text-[0px] text-green-500'
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={18} />
            Edit
          </button>
          <button
            type='button'
            className='text-[0px] text-red-500'
            onClick={() => deleteCategory(category.id)}
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </li>
      {category.isExpanded && category.children && (
        <li>
          {category.children.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              updateCategory={updateCategory}
              deleteCategory={deleteCategory}
              isRoot={false}
            />
          ))}
        </li>
      )}
    </ul>
  );
};

export default CategoryItem;
