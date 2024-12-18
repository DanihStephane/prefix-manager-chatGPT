import React from 'react';
import { Message } from './Message';
import { ChatMessage } from '../../types/chat';

interface ChatWindowProps {
  messages: ChatMessage[];
  prefix?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, prefix }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          isLatest={index === messages.length - 1}
          prefix={prefix}
        />
      ))}
    </div>
  );
};