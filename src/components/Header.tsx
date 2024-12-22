import React from 'react';
import { ChevronLeft, Search } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'bingo';
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onBack }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          {currentView === 'bingo' && (
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-xl font-bold text-gray-900">
            {currentView === 'home' ? '許願賓果' : '我的賓果卡'}
          </h1>
        </div>
        
        {currentView === 'bingo' && (
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜尋目標..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all w-48"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;