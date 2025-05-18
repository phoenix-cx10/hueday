import React from 'react';

interface HeaderProps {
  onNavigate: (view: 'calendar' | 'stats' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="
      fixed top-8 left-12 right-12 z-50
      backdrop-blur-md bg-white/30 dark:bg-gray-800/30
      shadow-md rounded-2xl px-6 py-3
    ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Hueday
        </h1>

        <nav className="flex gap-4 text-gray-700 dark:text-gray-300">
          <button
            onClick={() => onNavigate('calendar')}
            className="hover:text-indigo-500 transition-colors"
          >
            Calendar
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="hover:text-indigo-500 transition-colors"
          >
            History
          </button>
          <button
            onClick={() => onNavigate('stats')}
            className="hover:text-indigo-500 transition-colors"
          >
            Stats
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
