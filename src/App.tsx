import { type Category } from './types';

import { CategoryTree } from './components/CategoryTree';

export default function App() {
  const data: Category[] = [
    {
      id: '1',
      name: 'Category 1',
      isExpanded: true,
      children: [
        {
          id: '1-1',
          name: 'Subcategory 1-1',
          isExpanded: true,
          children: [
            {
              id: '1-1-1',
              name: 'Subcategory 1-1-1',
              isExpanded: false,
              children: [],
            },
          ],
        },
        {
          id: '1-2',
          name: 'Subcategory 1-2',
          isExpanded: false,
          children: [],
        },
      ],
    },
    {
      id: '2',
      name: 'Category 2',
      isExpanded: false,
      children: [
        {
          id: '2-1',
          name: 'Subcategory 2-1',
          isExpanded: false,
          children: [],
        },
      ],
    },
  ];

  return (
    <main className='grid min-h-screen place-items-center bg-zinc-200'>
      <div className='w-[300px] rounded-md bg-white p-4 shadow-md'>
        <CategoryTree initialCategories={data} />
      </div>
    </main>
  );
}
