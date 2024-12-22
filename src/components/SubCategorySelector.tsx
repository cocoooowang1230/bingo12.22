import React from 'react';
import { SubCategory, SubCategoryOption } from '../types/bingo';

interface SubCategorySelectorProps {
  subCategories: SubCategoryOption[];
  selectedSubCategory: SubCategory;
  onSubCategoryChange: (subCategory: SubCategory) => void;
}

const SubCategorySelector: React.FC<SubCategorySelectorProps> = ({
  subCategories,
  selectedSubCategory,
  onSubCategoryChange,
}) => {
  if (subCategories.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {subCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSubCategoryChange(cat.id)}
          className={`
            px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base
            ${selectedSubCategory === cat.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default SubCategorySelector;