import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PrefixItem } from './PrefixItem';
import { usePrefixStore } from '../store/usePrefixStore';

export const PrefixList: React.FC = () => {
  const { prefixes, searchTerm, updatePrefixOrder } = usePrefixStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredPrefixes = prefixes.filter((prefix) =>
    prefix.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = prefixes.findIndex((p) => p.id === active.id);
      const newIndex = prefixes.findIndex((p) => p.id === over.id);
      updatePrefixOrder(arrayMove(prefixes, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredPrefixes.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredPrefixes.map((prefix) => (
            <PrefixItem key={prefix.id} prefix={prefix} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};