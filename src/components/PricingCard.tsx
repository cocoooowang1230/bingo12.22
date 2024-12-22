import React from 'react';
import { Coins } from 'lucide-react';

interface PricingCardProps {
  name: string;
  tokens: string;
  originalTokens?: string;
  price: number;
  description: string;
  isPopular: boolean;
  savePercentage?: number;
  buttonText: string;
  buttonVariant: 'primary' | 'secondary';
  isYearly: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  tokens,
  originalTokens,
  price,
  description,
  isPopular,
  savePercentage,
  buttonText,
  buttonVariant,
  isYearly,
}) => {
  return (
    <div className={`
      relative rounded-xl p-6 
      ${isPopular ? 'border-2 border-blue-500' : 'border border-zinc-800'}
      bg-zinc-900 flex flex-col
    `}>
      {savePercentage && (
        <div className="absolute -top-3 right-4 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
          Save {savePercentage}%
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-4">{name}</h3>
      
      <div className="flex items-center gap-2 mb-2">
        <Coins className="w-4 h-4 text-gray-400" />
        <span className="text-green-400">{tokens}</span>
        {originalTokens && (
          <span className="text-gray-500 line-through text-sm">
            {originalTokens}
          </span>
        )}
      </div>

      <div className="mb-4">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-gray-400">/ month</span>
        {isYearly && (
          <div className="text-sm text-gray-400">Billed yearly</div>
        )}
      </div>

      <p className="text-gray-400 text-sm mb-6 flex-grow">
        {description}
      </p>

      <button
        className={`
          w-full py-2 px-4 rounded-lg font-medium transition-colors
          ${buttonVariant === 'primary' 
            ? 'bg-blue-500 hover:bg-blue-600 text-white' 
            : 'bg-zinc-800 hover:bg-zinc-700 text-white'}
        `}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;