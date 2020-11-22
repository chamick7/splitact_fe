import React from "react";
import { useDrag, useDrop } from "react-dnd";
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};
export default function Card({
  card,
  id,
  name,
  moveCard,
  findCard,
  groupIndex,
  changeGroup,
}) {
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", card, id, groupIndex, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const dropValue = monitor.getDropResult();

      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCard(droppedId, originalIndex);
        console.log("Dont drop");
      } else {
        console.log("drop");
        console.log(dropValue);
        if (dropValue.card.groupIndex != dropValue.toGroupIndex) {
          changeGroup(
            groupIndex,
            dropValue.card.originalIndex,
            dropValue.toGroupIndex,
            dropValue.card.card
          );
        }
      }
    },
  });
  const [, drop] = useDrop({
    accept: "card",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { card, index: overIndex } = findCard(id);
        const { card: dragcard, index: overDragIndex } = findCard(draggedId);

        if (typeof dragcard !== "undefined") {
          moveCard(draggedId, overIndex);
        }
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      {name}
    </div>
  );
}
