import React, { useState } from 'react';
import { moods } from '../datafiles/moods';
import { Mood } from '../datafiles/label';

interface EmojiSelectorProps {
  selectedMood?: Mood;
  onSelectMood: (mood: Mood) => void;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  selectedMood,
  onSelectMood,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-3 text-neutral-800 dark:text-neutral-950">
       How's it going?
      </h2>

      <div className="grid grid-cols-6 gap-3 ">
        {moods.map((mood, idx) => {
          const isSelected = selectedMood?.emoji === mood.emoji;
          const isHovered = hoveredIndex === idx;

          return (
            <button
              key={mood.label}
              onClick={() => onSelectMood(mood)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 transform bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-600/30 shadow-md transition
                          transition transform duration-200 ease-in-out hover:scale-110
                ${isSelected
                  ? 'bg-gray-100 dark:bg-gray-700 ring-2 ring-indigo-500 scale-60'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-60'
                }`}
              style={{
                boxShadow:
                  isSelected || isHovered
                    ? `0 4px 12px rgba(${hexToRgb(mood.color)}, 0.3)`
                    : 'none',
              }}
            >
              <span
                className="text-2xl mb-1"
                role="img"
                aria-label={mood.label} 
              >
                {mood.emoji}
              </span>
              <span className="text-xs font-medium text-neutral-800 dark:text-neutral-300">
                {mood.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

function hexToRgb(hex: string): string {
  hex = hex.replace('#', ''); // just in case

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

export default EmojiSelector;
