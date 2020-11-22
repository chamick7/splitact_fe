import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import update from "immutability-helper";
import { useEffect } from "react";
const style = {
  width: 400,
  margin: "20px",
};

export default function Container({ cards, groupIndex, changeGroup }) {
  const [cardList, setCardList] = useState(cards);

  useEffect(() => {
    setCardList(cards);
  }, [cards]);

  const moveCard = (id, atIndex) => {
    console.log(atIndex);
    if (true) {
      const { card, index } = findCard(id);
      setCardList(
        update(cardList, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    } else return;
  };
  const findCard = (id) => {
    const card = cardList.filter((c) => `${c.id}` === id)[0];
    return {
      card,
      index: cardList.indexOf(card),
    };
  };

  const [{ canDrop, isOver }, drop, dropTarget] = useDrop({
    accept: "card",
    drop: (monitor) => ({
      card: monitor,
      toGroupIndex: groupIndex, 
      method: "changeGroup",
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <>
      <div ref={drop} style={style}>
        {cardList.map((card) => (
          <Card
            key={card.id}
            card={card}
            id={`${card.id}`}
            name={card.cardName}
            moveCard={moveCard}
            findCard={findCard}
            groupIndex={groupIndex}
            changeGroup={changeGroup}
          />
        ))}
      </div>
    </>
  );
}
