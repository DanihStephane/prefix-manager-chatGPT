import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApiKeyStore } from '../store/useApiKeyStore';

interface ApiKeyModalProps {
  onClose: () => void;
  existingKey?: string | null;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onClose, existingKey }) => {
  const [apiKey, setApiKey] = useState(existingKey || '');
  const setStoredApiKey = useApiKeyStore((state) => state.setApiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setStoredApiKey(apiKey.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {existingKey ? 'Update API Key' : 'Enter OpenAI API Key'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={!apiKey.trim()}
            className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {existingKey ? 'Update API Key' : 'Save API Key'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Your API key will be stored securely in your browser's local storage.
        </p>
      </div>
    </div>
  );
};