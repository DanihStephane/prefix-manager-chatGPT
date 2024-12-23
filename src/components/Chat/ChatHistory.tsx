import React from 'react';
import { MessageCircle, Trash2 } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';
import { formatDate } from '../../utils/date';

export const ChatHistory: React.FC = () => {
  const { history, clearHistory, selectChat } = useChatStore();

  return (
    <div className="w-64 h-full bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">History</h2>
        <div className="space-y-2">
          {history.map((chat) => (
            <div
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className="p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {chat.title || 'New Chat'}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatDate(chat.createdAt)}
              </p>
            </div>
          ))}
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-600 text-sm"
          >
            <Trash2 size={16} />
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};