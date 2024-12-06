import React, { useState } from 'react';
import { Settings, Key, Trash2, Edit2 } from 'lucide-react';
import { useApiKeyStore } from '../store/useApiKeyStore';
import { ApiKeyModal } from './ApiKeyModal';

export const SettingsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const { apiKey, clearApiKey } = useApiKeyStore();

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
        >
          <Settings size={24} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Key size={20} />
                    <span>API Key</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setShowApiKeyModal(true);
                        setIsOpen(false);
                      }}
                      className="p-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                      title="Edit API Key"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        clearApiKey();
                        setIsOpen(false);
                      }}
                      className="p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete API Key"
                      disabled={!apiKey}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {apiKey ? 'API key is set' : 'No API key configured'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showApiKeyModal && (
        <ApiKeyModal
          onClose={() => setShowApiKeyModal(false)}
          existingKey={apiKey}
        />
      )}
    </>
  );
};