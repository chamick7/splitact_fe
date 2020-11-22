import { useDrop } from "react-dnd";
import style from "../../css/activity.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import update from "immutability-helper";

import Card from "./Card";
import { useState, useEffect } from "react";

export default function ActivityGroup({
  color,
  cardList,
  group,
  groupIndex,
  changeGroup,
  index,
  setNewCardModal,
  moveCardList,
  saveMoveCard,
  openEditList,
  openEditCard,
  openDeleteCard
}) {
  const moveCard = (id, atIndex) => {
    if (true) {
      const { card, index } = findCard(id);
      moveCardList(groupIndex, index, atIndex, card);
    } else return;
  };
  const findCard = (id) => {
    const card = cardList.filter((c) => `${c._id}` === id)[0];
    return {
      card,
      index: cardList.indexOf(card),
    };
  };

  const [{ canDrop, isOver }, drop, dropTarget] = useDrop({
    accept: "card",
    drop: (monitor) => {
      saveMoveCard(monitor.groupIndex, index);

      return {
        card: monitor,
        toGroupIndex: groupIndex,
        method: "changeGroup",
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <div ref={drop} className={style.activity_group}>
      <div style={{ backgroundColor: color }} className={style.group_header}>
        <h2>
          {" "}
          {group.listName} {index === 2 && "(Success)"}{" "}
        </h2>
        {index !== 2 && (
          <span
            onClick={() => {
              openEditList(group);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faCog} />{" "}
          </span>
        )}
      </div>
      <div className={style.group_body}>
        {cardList.map((card, index) => {
          return (
            <Card
              key={card._id}
              card={card}
              id={`${card._id}`}
              name={card.cardName}
              moveCard={moveCard}
              findCard={findCard}
              groupIndex={groupIndex}
              changeGroup={changeGroup}
              openEditCard={openEditCard}
              openDeleteCard={openDeleteCard}
            />
          );
        })}

        {index === 0 && (
          <a
            onClick={() => {
              setNewCardModal(true);
            }}
            style={{ marginTop: "10px" }}
            className={style.addList_btn}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            new Card
          </a>
        )}
      </div>
    </div>
  );
}
