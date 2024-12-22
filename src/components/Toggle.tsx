import React from 'react';

interface ToggleProps {
  options: [string, string];
  value: string;
  onChange: (value: string) => void;
}

const Toggle: React.FC<ToggleProps> = ({ options, value, onChange }) => {
  return (
    <div className="inline-flex bg-zinc-900 rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${value === option 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-400 hover:text-white'}
          `}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Toggle;