import React from 'react';
import { ArrowLeft, Moon, Sun, Settings } from 'lucide-react';
import { usePrefixStore } from '../../store/usePrefixStore';
import { SettingsMenu } from '../SettingsMenu';

interface HeaderProps {
  onBack: () => void;
  prefixText: string;
  prefixColor: string;
}

export const Header: React.FC<HeaderProps> = ({ onBack, prefixText, prefixColor }) => {
  const { isDarkMode, toggleDarkMode } = usePrefixStore();

  return (
    <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border-b dark:border-gray-700">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Chat with AI
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: prefixColor }}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {prefixText}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <SettingsMenu />
          </div>
        </div>
      </div>
    </div>
  );
};