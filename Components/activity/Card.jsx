import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import style from "../../css/activity.module.css";
import { useState, useEffect, useRef } from "react";
import MenuCardModal from "./cardModal/MenuCardModal";
import moment from "moment";

export default function Card({
  card,
  id,
  name,
  moveCard,
  findCard,
  groupIndex,
  changeGroup,
  openEditCard,
  openDeleteCard,
  openCard,
}) {
  const [menuModal, setMenuModal] = useState(false);
  const node = useRef();

  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: "card",
      card,
      id,
      groupIndex,
      originalIndex,
      name: card.cardName,
      color: card.color,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const dropValue = monitor.getDropResult();

      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCard(droppedId, originalIndex);
        //   console.log("Dont drop");
      } else {
        //   console.log("drop");
        //   console.log(dropValue);
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

  const editCard = () => {
    setMenuModal(false);
    openEditCard(card);
  };

  const deleteCard = () => {
    openDeleteCard(card);
    setMenuModal(false);
  };

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setMenuModal(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const opacity = isDragging ? 0 : 1;
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
      className={style.card}
      onClick={() => {
        openCard(card);
      }}
    >
      <div
        style={{ backgroundColor: card.color }}
        className={style.card_header}
      >
        <span className={style.card_name}>
          <h4>{card.cardName}</h4>
          <span>
            {" "}
            {card.dueDate
              ? moment(card.dueDate).format("DD/MM/YYYY")
              : null}{" "}
          </span>
        </span>
        <span style={{ display: "flex" }}>
          <FontAwesomeIcon style={{ cursor: "move" }} icon={faArrowsAlt} />
          <span ref={node} style={{ position: "relative" }}>
            <span
              onClick={() => {
                setMenuModal(!menuModal);
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </span>
            {menuModal && (
              <MenuCardModal editCard={editCard} deleteCard={deleteCard} />
            )}
          </span>
        </span>
      </div>
      <div className={style.card_body}>
        {card.workerId ? (
          <span className={style.worker}>{card.workerId.username}</span>
        ) : null}
      </div>
    </div>
  );
}
