import React from 'react';
import { Share2 } from 'lucide-react';

interface BingoProgressProps {
  onShare: () => void;
}

const BingoProgress: React.FC<BingoProgressProps> = ({ onShare }) => {
  return (
    <button
      onClick={onShare}
      className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
      <span>分享</span>
    </button>
  );
};

export default BingoProgress;