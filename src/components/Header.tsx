import React from 'react';
import logo from '../assets/hueday-logo.jpeg';

interface HeaderProps {
  onNavigate: (view: 'calendar' | 'stats' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="
      fixed top-8 left-12 right-12 z-50
      backdrop-blur-2xl bg-white/20 dark:bg-gray-900/50
      shadow-md rounded-2xl px-6 py-3
    ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="text-xl font-normal font-pacifico text-gray-800 dark:text-white">
            Hueday
          </h1>
        </div>

        <nav className="flex gap-4 text-gray-100 dark:text-gray-100">
          <button
            onClick={() => onNavigate('calendar')}
            className="hover:text-indigo-500 transition-colors font-caveat font-semibold"
          >
            Calendar
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="hover:text-indigo-500 transition-colors font-caveat font-semibold"
          >
            History
          </button>
          <button
            onClick={() => onNavigate('stats')}
            className="hover:text-indigo-500 transition-colors font-caveat font-semibold"
          >
            Stats
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
