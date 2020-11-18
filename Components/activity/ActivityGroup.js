import { useDrop } from "react-dnd";

import style from "../../css/activity.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Card from "./Card";

export default function ActivityGroup({
  index,
  group,
  changeGroup,
  findCard,
  moveCard,
  setEditListModal,
  setNewCardModal,
  setEditCardModal,
}) {
  const [{ canDrop, isOver }, drop, dropTarget] = useDrop({
    accept: "card",
    drop: (monitor) => ({
      card: monitor.card,
      method: "changeGroup",
      group: group,
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className={style.activity_group}>
      <div
        style={{ backgroundColor: "#644CC6" }}
        className={style.group_header}
      >
        <h2> What to do? </h2>
        <span
          onClick={() => {
            setEditListModal(true);
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faCog} />{" "}
        </span>
      </div>
      <div className={style.group_body}>
        {group.cardList.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              group={group}
              changeGroup={changeGroup}
              findCard={findCard}
              moveCard={moveCard}
            />
          );
        })}

        {index === 0 && (
          <a onClick={() => {setNewCardModal(true)}} style={{ marginTop: "10px" }} className={style.addList_btn}>
            <FontAwesomeIcon icon={faPlusCircle} />
            new Card
          </a>
        )}
      </div>
    </div>
  );
}
