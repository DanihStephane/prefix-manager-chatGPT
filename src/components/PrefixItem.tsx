import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import { Prefix } from '../types/prefix';
import { usePrefixStore } from '../store/usePrefixStore';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

interface PrefixItemProps {
  prefix: Prefix;
}

export const PrefixItem: React.FC<PrefixItemProps> = ({ prefix }) => {
  const { deletePrefix, incrementUsage, setSelectedPrefix } = usePrefixStore();
  const navigate = useNavigate();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: prefix.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = () => {
    incrementUsage(prefix.id);
    setSelectedPrefix(prefix);
    navigate(`/prompt/${prefix.id}`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'flex items-center gap-2 p-3 rounded-lg bg-white dark:bg-gray-800',
        'border border-gray-200 dark:border-gray-700',
        'hover:shadow-md transition-shadow'
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab hover:text-gray-600 dark:hover:text-gray-300"
      >
        <GripVertical size={20} />
      </div>
      
      <div
        className="flex-1 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: prefix.color }}
          />
          <span className="font-medium dark:text-white">{prefix.text}</span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Used {prefix.usageCount} times
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deletePrefix(prefix.id);
        }}
        className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};