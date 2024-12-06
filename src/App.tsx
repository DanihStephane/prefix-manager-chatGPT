import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { AddPrefixForm } from './components/AddPrefixForm';
import { SearchBar } from './components/SearchBar';
import { PrefixList } from './components/PrefixList';
import { PromptPage } from './components/PromptPage';
import { SettingsMenu } from './components/SettingsMenu';
import { usePrefixStore } from './store/usePrefixStore';

function HomePage() {
  const { isDarkMode, toggleDarkMode } = usePrefixStore();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Prefix Manager
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
            >
              {isDarkMode ? (
                <Sun className="text-white" size={24} />
              ) : (
                <Moon size={24} />
              )}
            </button>
            <SettingsMenu />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <AddPrefixForm />
          <SearchBar />
          <PrefixList />
        </div>
      </div>
    </div>
  );
}

function App() {
  const { isDarkMode } = usePrefixStore();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prompt/:id" element={<PromptPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;