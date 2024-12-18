import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check size={16} className="text-green-500" />
          <span className="text-sm">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={16} />
          <span className="text-sm">Copy</span>
        </>
      )}
    </button>
  );
};