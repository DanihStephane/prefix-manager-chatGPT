import React from 'react';
import { Loader2 } from 'lucide-react';
import type { ChatResponse } from '../types/api';
import clsx from 'clsx';

interface ChatResponseDisplayProps {
  response: ChatResponse;
}

export const ChatResponseDisplay: React.FC<ChatResponseDisplayProps> = ({ response }) => {
  if (!response.content && !response.error && !response.loading) {
    return null;
  }

  return (
    <div className={clsx(
      'mt-6 p-4 rounded-lg',
      response.error ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-700/50'
    )}>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        ChatGPT Response
      </h3>
      
      {response.loading ? (
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Loader2 size={16} className="animate-spin" />
          <span>Getting response from ChatGPT...</span>
        </div>
      ) : response.error ? (
        <p className="text-red-600 dark:text-red-400">{response.error}</p>
      ) : (
        <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
          {response.content}
        </p>
      )}
    </div>
  );
};