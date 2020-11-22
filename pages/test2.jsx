import Container from "../Components/testCard/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import update from "immutability-helper";



export default function Test2() {
  const [groupList, setGroupList] = useState([
    {
      name: "test1",
      cardList: [
        { cardName: "hello (1)", id: "2214123f" },
        { cardName: "My name is (1)", id: "12ga4123f" },
        { cardName: "mick (1)", id: "53zxvd123f" },
      ],
    },
    {
      name: "test2",
      cardList: [
        { cardName: "WOW (2)", id: "98zfvbd123f" },
        { cardName: "Yes!! (2)", id: "43asqwd123f" },
      ],
    },
  ]);

  const changeGroup = (oldGroupIndex, oldIndex, toGroupIndex, card) => {
    setGroupList(
      update(groupList, {
        [oldGroupIndex]: {
          cardList: {
            $splice: [[oldIndex, 1]],
          },
        },
        [toGroupIndex]: {
          cardList: {
            $push: [
              card
            ],
          },
        },
      })
    );
    console.log(card);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex" }}>
        {groupList.map((group, index) => (
          <Container
            key={index}
            cards={group.cardList}
            groupIndex={index}
            changeGroup={changeGroup}
          />
        ))}
      </div>
    </DndProvider>
  );
}
