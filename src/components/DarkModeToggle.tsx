import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { usePrefixStore } from '../store/usePrefixStore';

export const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = usePrefixStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="text-white" size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
};