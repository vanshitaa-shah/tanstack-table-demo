import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { CheckCircleOutlined } from "@ant-design/icons";
import { setColumnOrder } from "../store/columnSlice";
import { Button } from "antd";

const CustomizeList: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const columnOrder = useSelector((state: RootState) => state.columns.order);

  const initialItems = [
    { id: "id", title: "ID", icon: <CheckCircleOutlined /> },
    { id: "organization", title: "Organizations", icon: <CheckCircleOutlined /> },
    { id: "parentOrganization", title: "Parent Organizations", icon: <CheckCircleOutlined /> },
    { id: "decisions", title: "Decisions", icon: <CheckCircleOutlined /> },
    { id: "delegations", title: "Delegations", icon: <CheckCircleOutlined /> },
    { id: "status", title: "Status", icon: <CheckCircleOutlined /> },
  ];

  const [items, setItems] = useState(
    columnOrder.length ? columnOrder.map((id) => initialItems.find((item) => item.id === id)!) : initialItems
  );

  const [previousOrder, setPreviousOrder] = useState(items); // Track last applied order
  const [isChangesMade, setIsChangesMade] = useState(false);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);
      setIsChangesMade(true);
    }
  };

  const handleApply = () => {
    dispatch(setColumnOrder(items.map((item) => item.id)));
    setPreviousOrder(items); // Save previous order
    setIsChangesMade(false);
    onClose();
  };

  const handleReset = () => {
    setItems(previousOrder);
    setIsChangesMade(true);
  };

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} >
              {item.title}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
        <Button onClick={handleReset} disabled={!isChangesMade}>
          Reset
        </Button>
        <Button type="primary" onClick={handleApply} disabled={!isChangesMade}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default CustomizeList;
