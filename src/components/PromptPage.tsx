import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Eye, EyeOff } from 'lucide-react';
import { usePrefixStore } from '../store/usePrefixStore';
import { useApiKeyStore } from '../store/useApiKeyStore';
import { ApiKeyModal } from './ApiKeyModal';
import { ChatResponseDisplay } from './ChatResponse';
import { getChatGPTResponse } from '../services/openai';
import type { ChatResponse } from '../types/api';

export const PromptPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedPrefix, promptText, setPromptText } = usePrefixStore();
  const { apiKey } = useApiKeyStore();
  const [showPreview, setShowPreview] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [response, setResponse] = useState<ChatResponse>({
    content: '',
    loading: false,
  });

  if (!selectedPrefix || selectedPrefix.id !== id) {
    navigate('/');
    return null;
  }

  const finalPrompt = `${selectedPrefix.text} '${promptText}'`;

  const handleSubmit = async () => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setResponse({ content: '', loading: true });

    try {
      const content = await getChatGPTResponse(apiKey, finalPrompt);
      setResponse({ content, loading: false });
    } catch (error: any) {
      setResponse({
        content: '',
        error: error.message,
        loading: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Prompt
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedPrefix.color }}
            />
            <span className="font-medium dark:text-white">
              {selectedPrefix.text}
            </span>
          </div>

          <div className="space-y-4">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-32 p-3 border rounded-lg resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {showPreview ? (
                  <>
                    <EyeOff size={20} />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye size={20} />
                    Show Preview
                  </>
                )}
              </button>

              <button
                onClick={handleSubmit}
                disabled={!promptText.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Send size={20} />
                Ask ChatGPT
              </button>
            </div>

            {showPreview && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Preview
                </h3>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {finalPrompt}
                </p>
              </div>
            )}

            <ChatResponseDisplay response={response} />
          </div>
        </div>
      </div>

      {showApiKeyModal && (
        <ApiKeyModal onClose={() => setShowApiKeyModal(false)} />
      )}
    </div>
  );
};