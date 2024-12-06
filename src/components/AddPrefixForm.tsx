import React, { useState } from 'react';
import { PrefixCategory } from '../types/prefix';
import { usePrefixStore } from '../store/usePrefixStore';

const CATEGORIES: PrefixCategory[] = ['general', 'development', 'translation', 'language'];
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

export const AddPrefixForm: React.FC = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<PrefixCategory>('general');
  const [color, setColor] = useState(COLORS[0]);
  const addPrefix = usePrefixStore((state) => state.addPrefix);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    addPrefix({
      text,
      category,
      color,
      variables: [],
    });

    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter prefix text..."
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as PrefixCategory)}
          className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full ${
                color === c ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Add Prefix
      </button>
    </form>
  );
};