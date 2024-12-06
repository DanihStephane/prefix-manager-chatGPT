import React from 'react';
import { Search } from 'lucide-react';
import { usePrefixStore } from '../store/usePrefixStore';

export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = usePrefixStore();

  return (
    <div className="relative mb-6">
      <Search
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search prefixes..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
};