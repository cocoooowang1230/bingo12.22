import React, { useState, useEffect } from 'react';
import { Category } from './types/bingo';
import WishBingoBoard from './components/WishBingoBoard';
import { Rocket } from 'lucide-react';
import Celebration from './components/Celebration';
import ShareButton from './components/ShareButton';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('financial');
  const [completedCategories, setCompletedCategories] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: '許願BINGO',
      text: '來玩許願BINGO吧！記錄你的夢想清單，一步步實現願望！',
      url: window.location.href
    };

    try {
      // Check if Web Share API is supported and available
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await copyToClipboard(shareData.url);
      }
    } catch (error) {
      // Handle any errors gracefully
      console.error('Share failed:', error);
      // Fallback to clipboard if sharing fails
      await copyToClipboard(shareData.url);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('已複製連結到剪貼簿！');
    } catch (err) {
      console.error('複製失敗:', err);
      showToast('無法複製連結，請手動複製網址');
    }
  };

  const showToast = (message: string) => {
    // Create and show a temporary toast message
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleComplete = (categoryKey: string) => {
    setCompletedCategories(prev => new Set([...prev, categoryKey]));
  };

  const handleRestart = (categoryKey: string) => {
    setCompletedCategories(prev => {
      const newSet = new Set(prev);
      newSet.delete(categoryKey);
      return newSet;
    });
  };

  const categories: { id: Category; label: string; emoji: string }[] = [
    { id: 'financial', label: '投資理財', emoji: '🐔' },
    { id: 'travel', label: '夢想旅遊', emoji: '✈️' },
    { id: 'lifestyle', label: '生活享受', emoji: '🍜' },
    { id: 'learning', label: '學習成長', emoji: '🦉' },
    { id: 'relationships', label: '人際關係', emoji: '👥' },
  ];

  const backgroundEmojis = ['🦁', '🐘', '🦒', '🦊', '🦝', '🐼', '🦘', '🦛', '🦍', '🦧'];

  const isCategoryFullyCompleted = (category: Category) => {
    if (['financial', 'travel', 'relationships'].includes(category)) {
      return completedCategories.has(category);
    }
    
    const subcategories = category === 'lifestyle' 
      ? ['consumption', 'enjoyment', 'habits']
      : ['knowledge', 'health', 'personal'];
    
    return subcategories.every(sub => 
      completedCategories.has(`${category}-${sub}`)
    );
  };

  const totalCompleted = categories.filter(cat => 
    isCategoryFullyCompleted(cat.id)
  ).length;

  const totalProgress = Math.round((totalCompleted / categories.length) * 100);

  useEffect(() => {
    if (totalProgress === 100) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  }, [totalProgress]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-3 sm:p-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        {backgroundEmojis.map((emoji, index) => (
          <div
            key={index}
            className="absolute text-4xl sm:text-6xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 1.5}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {showCelebration && <Celebration />}
      
      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">許願BINGO</h1>
          <div className="w-full sm:w-auto">
            <div className="relative w-full sm:w-64 h-8">
              <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-1000"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <span className="text-white font-medium text-sm sm:text-base">
                  完成進度: {totalProgress}%
                </span>
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base
                ${selectedCategory === category.id
                  ? 'bg-white text-indigo-500 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
                }
                ${isCategoryFullyCompleted(category.id)
                  ? 'border-2 border-green-400'
                  : ''
                }
              `}
            >
              <span className="mr-1 sm:mr-2">{category.emoji}</span>
              {category.label}
              {isCategoryFullyCompleted(category.id) && (
                <span className="ml-1 sm:ml-2 text-green-400">✓</span>
              )}
            </button>
          ))}
        </div>

        <WishBingoBoard 
          selectedCategory={selectedCategory}
          onShare={handleShare}
          onComplete={handleComplete}
          onRestart={handleRestart}
          completedCategories={completedCategories}
        />
      </div>
    </div>
  );
}

export default App;