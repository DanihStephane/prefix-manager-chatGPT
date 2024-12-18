import React from 'react';
import { Bot, User } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { CopyButton } from './CopyButton';
import { ChatMessage } from '../../types/chat';

interface MessageProps {
  message: ChatMessage;
  isLatest: boolean;
  prefix?: string;
}

export const Message: React.FC<MessageProps> = ({ message, isLatest, prefix }) => {
  const isBot = message.role === 'assistant';
  
  // Remove prefix from the start of the response if it matches
  const content = isBot && prefix && message.content.startsWith(prefix)
    ? message.content.slice(prefix.length).trim()
    : message.content;

  return (
    <div className={`py-8 group ${isBot ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
      <div className="max-w-2xl mx-auto flex gap-4 px-4">
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isBot 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {isBot ? <Bot size={20} /> : <User size={20} />}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {isBot ? 'ChatGPT' : 'You'}
            </span>
            {isBot && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={content} />
              </div>
            )}
          </div>
          <div className="prose dark:prose-invert max-w-none">
            {isBot && isLatest ? (
              <TypewriterText text={content} />
            ) : (
              <div className="whitespace-pre-wrap">{content}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};