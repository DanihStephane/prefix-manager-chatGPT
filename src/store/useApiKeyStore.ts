import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ApiKeyStore {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
}

export const useApiKeyStore = create<ApiKeyStore>()(
  persist(
    (set) => ({
      apiKey: null,
      setApiKey: (key) => set({ apiKey: key }),
      clearApiKey: () => set({ apiKey: null }),
    }),
    {
      name: 'api-key-storage',
    }
  )
);