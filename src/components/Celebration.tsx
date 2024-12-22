import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

const Celebration: React.FC = () => {
  const [showRocket, setShowRocket] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRocket(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Background overlay with particles */}
      <div className="absolute inset-0 bg-black/50 animate-fade-in">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Central celebration content */}
      <div className="relative text-center">
        <h2 className="text-6xl font-bold text-white mb-8 animate-bounce">
          🎉 恭喜完成 🎉
        </h2>
        {showRocket && (
          <div className="animate-launch-up">
            <Rocket className="w-24 h-24 text-white mx-auto" />
          </div>
        )}
        <p className="text-3xl text-white animate-pulse">
          你的夢想即將起飛！
        </p>
      </div>
    </div>
  );
};

export default Celebration;