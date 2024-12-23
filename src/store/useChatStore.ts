import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage } from '../types/chat';

interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  prefixId: string;
}

interface ChatStore {
  history: Chat[];
  currentChatId: string | null;
  addChat: (prefixId: string) => string;
  addMessage: (chatId: string, message: ChatMessage) => void;
  selectChat: (chatId: string) => void;
  clearHistory: () => void;
  updateChatTitle: (chatId: string, title: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      history: [],
      currentChatId: null,

      addChat: (prefixId: string) => {
        const id = crypto.randomUUID();
        set((state) => ({
          history: [
            {
              id,
              title: 'New Chat',
              messages: [],
              createdAt: new Date(),
              prefixId,
            },
            ...state.history,
          ],
          currentChatId: id,
        }));
        return id;
      },

      addMessage: (chatId: string, message: ChatMessage) => {
        set((state) => ({
          history: state.history.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, message],
                  title:
                    chat.title === 'New Chat' && message.role === 'user'
                      ? message.content.slice(0, 30) + '...'
                      : chat.title,
                }
              : chat
          ),
        }));
      },

      selectChat: (chatId: string) => {
        set({ currentChatId: chatId });
      },

      clearHistory: () => {
        set({ history: [], currentChatId: null });
      },

      updateChatTitle: (chatId: string, title: string) => {
        set((state) => ({
          history: state.history.map((chat) =>
            chat.id === chatId ? { ...chat, title } : chat
          ),
        }));
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);