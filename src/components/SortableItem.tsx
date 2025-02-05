import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List } from 'antd';
import { DragOutlined } from '@ant-design/icons';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move'
  };

  return (
    <List.Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      extra={<DragOutlined />}
    >
      {children}
    </List.Item>
  );
};

export default SortableItem;
