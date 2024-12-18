import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrefixStore } from '../store/usePrefixStore';
import { useApiKeyStore } from '../store/useApiKeyStore';
import { ApiKeyModal } from './ApiKeyModal';
import { ChatWindow } from './Chat/ChatWindow';
import { PromptInput } from './Chat/PromptInput';
import { Header } from './Chat/Header';
import { getChatGPTResponse } from '../services/openai';
import { ChatMessage } from '../types/chat';

export const PromptPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedPrefix, isDarkMode } = usePrefixStore();
  const { apiKey } = useApiKeyStore();
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!selectedPrefix || selectedPrefix.id !== id) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (text: string) => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    const prompt = `${selectedPrefix.text} "${text}"`;
    const userMessage: ChatMessage = {
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getChatGPTResponse(apiKey, prompt);
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `Error: ${error.message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex-1 bg-gray-50 dark:bg-gray-900">
        <Header
          onBack={() => navigate('/')}
          prefixText={selectedPrefix.text}
          prefixColor={selectedPrefix.color}
        />

        <div className="flex-1 flex flex-col">
          <ChatWindow 
            messages={messages.map(msg => ({
              ...msg,
              color: selectedPrefix.color
            }))}
            prefix={selectedPrefix.text}
          />
          <PromptInput
            onSubmit={handleSubmit}
            disabled={isLoading}
            placeholder="Type your message..."
            prefix={selectedPrefix.text}
          />
        </div>
      </div>

      {showApiKeyModal && (
        <ApiKeyModal onClose={() => setShowApiKeyModal(false)} />
      )}
    </div>
  );
};