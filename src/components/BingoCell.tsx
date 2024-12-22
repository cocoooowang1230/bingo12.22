import React from 'react';
import { Star } from 'lucide-react';

interface BingoCellProps {
  item: string;
  stars: number;
  onClick: () => void;
  isGlowing?: boolean;
  isLocked?: boolean;
}

const BingoCell: React.FC<BingoCellProps> = ({
  item,
  stars,
  onClick,
  isGlowing = false,
  isLocked = false,
}) => {
  const getBackgroundColor = () => {
    switch (stars) {
      case 1: return 'bg-purple-500';
      case 2: return 'bg-green-500';
      case 3: return 'bg-yellow-500';
      default: return 'bg-white hover:bg-gray-100';
    }
  };

  const getTextColor = () => {
    return stars > 0 ? 'text-white' : 'text-gray-700';
  };

  const glowingEffect = isGlowing ? 'animate-glow' : '';
  const lockStyle = isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        aspect-square p-1 sm:p-2 rounded-lg
        flex flex-col items-center justify-center gap-1
        transition-all duration-200
        ${getBackgroundColor()} ${getTextColor()}
        ${glowingEffect} ${lockStyle}
      `}
    >
      <div className="text-sm sm:text-base font-bold leading-tight text-center w-full">
        {item}
      </div>
      {stars > 0 && (
        <div className="flex items-center gap-0.5 mt-1">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} size={12} className="sm:w-4 sm:h-4" fill="currentColor" />
          ))}
        </div>
      )}
    </button>
  );
};

export default BingoCell;