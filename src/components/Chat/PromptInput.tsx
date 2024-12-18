import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { PreviewButton } from './PreviewButton';

interface PromptInputProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  prefix: string;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  onSubmit,
  disabled = false,
  placeholder = 'Type your message...',
  prefix,
}) => {
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSubmit(text.trim());
      setText('');
    }
  };

  return (
    <div className="border-t dark:border-gray-700">
      {showPreview && text.trim() && (
        <div className="max-w-2xl mx-auto px-4 py-3 mt-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Preview
            </h3>
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
              {`${prefix} ${text}`}
            </p>
          </div>
        </div>
      )}
      
      <div className="p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-end">
            <PreviewButton
              showPreview={showPreview}
              onClick={() => setShowPreview(!showPreview)}
            />
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              disabled={!text.trim() || disabled}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};