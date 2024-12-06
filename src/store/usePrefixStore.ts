import { create } from 'zustand';
import { Prefix, PrefixCategory } from '../types/prefix';

interface PrefixStore {
  prefixes: Prefix[];
  searchTerm: string;
  isDarkMode: boolean;
  promptText: string;
  selectedPrefix: Prefix | null;
  addPrefix: (prefix: Omit<Prefix, 'id' | 'usageCount'>) => void;
  deletePrefix: (id: string) => void;
  updatePrefixOrder: (prefixes: Prefix[]) => void;
  setSearchTerm: (term: string) => void;
  toggleDarkMode: () => void;
  incrementUsage: (id: string) => void;
  setPromptText: (text: string) => void;
  setSelectedPrefix: (prefix: Prefix | null) => void;
}

export const usePrefixStore = create<PrefixStore>((set) => ({
  prefixes: [],
  searchTerm: '',
  isDarkMode: false,
  promptText: '',
  selectedPrefix: null,
  
  addPrefix: (prefix) =>
    set((state) => ({
      prefixes: [
        ...state.prefixes,
        {
          ...prefix,
          id: crypto.randomUUID(),
          usageCount: 0,
        },
      ],
    })),

  deletePrefix: (id) =>
    set((state) => ({
      prefixes: state.prefixes.filter((prefix) => prefix.id !== id),
    })),

  updatePrefixOrder: (prefixes) =>
    set(() => ({
      prefixes,
    })),

  setSearchTerm: (searchTerm) =>
    set(() => ({
      searchTerm,
    })),

  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),

  incrementUsage: (id) =>
    set((state) => ({
      prefixes: state.prefixes.map((prefix) =>
        prefix.id === id
          ? {
              ...prefix,
              usageCount: prefix.usageCount + 1,
              lastUsed: new Date(),
            }
          : prefix
      ),
    })),

  setPromptText: (promptText) =>
    set(() => ({
      promptText,
    })),

  setSelectedPrefix: (prefix) =>
    set(() => ({
      selectedPrefix: prefix,
    })),
}));