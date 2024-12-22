import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  onShare: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ onShare }) => {
  return (
    <button
      onClick={onShare}
      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <Share2 className="w-5 h-5" />
      <span>分享</span>
    </button>
  );
};

export default ShareButton;