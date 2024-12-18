import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PreviewButtonProps {
  showPreview: boolean;
  onClick: () => void;
}

export const PreviewButton: React.FC<PreviewButtonProps> = ({
  showPreview,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
  >
    {showPreview ? (
      <>
        <EyeOff size={16} />
        <span className="text-sm">Hide Preview</span>
      </>
    ) : (
      <>
        <Eye size={16} />
        <span className="text-sm">Show Preview</span>
      </>
    )}
  </button>
);