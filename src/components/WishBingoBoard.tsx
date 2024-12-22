import React, { useState, useEffect } from 'react';
import { Category, SubCategory } from '../types/bingo';
import { bingoItems } from '../data/bingoItems';
import BingoCell from './BingoCell';
import BingoLegend from './BingoLegend';
import BingoProgress from './BingoProgress';
import SubCategorySelector from './SubCategorySelector';
import { Trophy, RotateCcw } from 'lucide-react';

interface WishBingoBoardProps {
  selectedCategory: Category;
  onShare: () => void;
  onComplete: (categoryKey: string) => void;
  onRestart: (categoryKey: string) => void;
  completedCategories: Set<string>;
}

const WishBingoBoard: React.FC<WishBingoBoardProps> = ({
  selectedCategory,
  onShare,
  onComplete,
  onRestart,
  completedCategories,
}) => {
  const [subCategory, setSubCategory] = useState<SubCategory>('consumption');
  const [stars, setStars] = useState<Record<string, Record<number, number>>>({});

  useEffect(() => {
    if (selectedCategory === 'lifestyle') {
      setSubCategory('consumption');
    } else if (selectedCategory === 'learning') {
      setSubCategory('knowledge');
    }
  }, [selectedCategory]);

  const getCurrentItems = () => {
    switch (selectedCategory) {
      case 'financial':
        return bingoItems.financial;
      case 'travel':
        return bingoItems.travel;
      case 'relationships':
        return bingoItems.relationships;
      case 'lifestyle':
        return bingoItems.lifestyle[subCategory] || [];
      case 'learning':
        return bingoItems.learning[subCategory] || [];
      default:
        return [];
    }
  };

  const getSubCategories = () => {
    if (selectedCategory === 'lifestyle') {
      return [
        { id: 'consumption' as const, label: '消費升級' },
        { id: 'enjoyment' as const, label: '生活享受' },
        { id: 'habits' as const, label: '生活習慣' }
      ];
    }
    if (selectedCategory === 'learning') {
      return [
        { id: 'knowledge' as const, label: '知識增長' },
        { id: 'health' as const, label: '健康挑戰' },
        { id: 'personal' as const, label: '個人突破' }
      ];
    }
    return [];
  };

  const getCurrentStarKey = () => {
    if (['financial', 'travel', 'relationships'].includes(selectedCategory)) {
      return selectedCategory;
    }
    return `${selectedCategory}-${subCategory}`;
  };

  const isCurrentCategoryCompleted = () => {
    return completedCategories.has(getCurrentStarKey());
  };

  const calculateTotalStars = () => {
    const key = getCurrentStarKey();
    return Object.values(stars[key] || {}).reduce((sum, stars) => sum + (stars || 0), 0);
  };

  const handleCellClick = (index: number) => {
    if (isCurrentCategoryCompleted()) return;
    
    const key = getCurrentStarKey();
    const currentValue = stars[key]?.[index] || 0;
    const newValue = (currentValue + 1) % 4;
    
    // Check if adding this star would exceed the limit
    const currentTotal = calculateTotalStars();
    const isUnlimitedCategory = selectedCategory === 'financial';
    
    if (!isUnlimitedCategory && currentTotal - currentValue + newValue > 20) {
      return; // Don't allow exceeding 20 stars
    }

    setStars(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [index]: newValue || undefined
      }
    }));
  };

  const hasAnyStars = calculateTotalStars() > 0;

  const handleComplete = () => {
    if (hasAnyStars) {
      onComplete(getCurrentStarKey());
    }
  };

  const handleRestart = () => {
    const key = getCurrentStarKey();
    setStars(prev => ({
      ...prev,
      [key]: {}
    }));
    onRestart(key);
  };

  const items = getCurrentItems();
  const subCategories = getSubCategories();
  const currentStars = stars[getCurrentStarKey()] || {};
  const totalStars = calculateTotalStars();
  const showStarLimit = selectedCategory !== 'financial';
  const isCompleted = isCurrentCategoryCompleted();
  const isStarLimitReached = showStarLimit && totalStars >= 20;

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      {subCategories.length > 0 && (
        <SubCategorySelector
          subCategories={subCategories}
          selectedSubCategory={subCategory}
          onSubCategoryChange={setSubCategory}
        />
      )}

      <BingoLegend />

      <div className={`grid ${['financial', 'travel'].includes(selectedCategory) ? 'grid-cols-5' : 'grid-cols-4'} gap-1 sm:gap-2`}>
        {items.map((item, index) => (
          <BingoCell
            key={index}
            item={item}
            stars={currentStars[index] || 0}
            onClick={() => handleCellClick(index)}
            isGlowing={isCompleted && currentStars[index] > 0}
            isLocked={isStarLimitReached && !currentStars[index]}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        {isCompleted ? (
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            重新開始
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={!hasAnyStars}
            className={`
              w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors
              ${hasAnyStars
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
            完成賓果
          </button>
        )}
        
        <BingoProgress onShare={onShare} />
      </div>
    </div>
  );
}

export default WishBingoBoard;