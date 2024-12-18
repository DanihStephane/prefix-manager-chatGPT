import React from 'react';
import { Bot, User } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { CopyButton } from './CopyButton';
import { ChatMessage } from '../../types/chat';

interface MessageProps {
  message: ChatMessage;
  isLatest: boolean;
  prefix?: string;
  color?: string;
}

export const Message: React.FC<MessageProps> = ({
                                                  message,
                                                  isLatest,
                                                  prefix,
                                                  color = '#4ECDC4'
                                                }) => {
  const isBot = message.role === 'assistant';

  // Remove the prefix + user input from the bot's response if it starts with them
  const content = message.content;

  return (
      <div className={`py-4 group ${isBot ? 'bg-gray-50/50 dark:bg-gray-800/30' : ''}`}>
        <div className="max-w-3xl mx-auto px-4">
          <div className={`flex gap-4 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="flex-shrink-0 pt-1">
              <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isBot ? 'bg-gradient-to-br from-emerald-400 to-teal-500' : ''
                  }`}
                  style={!isBot ? { backgroundColor: color } : undefined}
              >
                {isBot ? <Bot size={18} className="text-white" /> : <User size={18} className="text-white" />}
              </div>
            </div>
            <div className={`flex-1 ${isBot ? 'pl-4' : 'pr-4'}`}>
              <div className={`flex items-center gap-2 mb-1 ${isBot ? '' : 'justify-end'}`}>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {isBot ? 'ChatGPT' : 'You'}
              </span>
                {isBot && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopyButton text={content} />
                    </div>
                )}
              </div>
              <div
                  className={`prose dark:prose-invert max-w-none p-4 rounded-2xl ${
                      isBot
                          ? 'bg-white dark:bg-gray-800 shadow-sm'
                          : 'bg-blue-500 dark:bg-blue-600 text-white ml-auto'
                  }`}
                  style={!isBot ? { backgroundColor: color } : undefined}
              >
                {isBot && isLatest ? (
                    <TypewriterText text={content} />
                ) : (
                    <div className="whitespace-pre-wrap">{content}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};