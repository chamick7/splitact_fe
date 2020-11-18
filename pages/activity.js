import { useEffect, useState } from "react";
import { getAxios } from "../utils/axios";
import ProtectRoute from "../utils/ProtectRoute";
import Router, { useRouter } from "next/router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import style from "../css/activity.module.css";

import ActivityGroup from "../Components/activity/ActivityGroup";
import SideBar from "../Components/activity/SideBar";
import CrListModal from "../Components/activity/ListModal/CrListModal";
import EditListModal from "../Components/activity/ListModal/EditListModal";
import CrCardModal from "../Components/activity/cardModal/crCardModal";
import EditCardModal from "../Components/activity/cardModal/editCardModal";

//modal

export function getServerSideProps(ctx) {
  return {
    props: {},
  };
}

export default function activity() {
  const axios = getAxios();
  const router = useRouter();
  const activityId = router.query.activity;

  //modal open
  const [newListModal, setNewListModal] = useState(false);
  const [editListModal, setEditListModal] = useState(false);
  const [newCardModal, setNewCardModal] = useState(true);
  const [editCardModal, setEditCardModal] = useState(false);

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

  const changeGroup = (card, oldGroup, newGroup) => {
    let newGroupList = groupList.slice();
    const oldGroupIndex = newGroupList.indexOf(oldGroup);
    const newGroupIndex = newGroupList.indexOf(newGroup);
    newGroupList[oldGroupIndex].cardList.splice(
      newGroupList[oldGroupIndex].cardList.indexOf(card),
      1
    );
    newGroupList[newGroupIndex].cardList.push(card);
    setGroupList(newGroupList);
  };

  const moveCard = (group, oldIndex, newIndex, oldCard, newCard) => {
    const { card, index } = findCard(group, oldIndex);
    const oldGroupIndex = groupList.slice().indexOf(group);
    const newGroupIndex = groupList.slice().indexOf();
    const newGroupList = groupList.slice();

    if (typeof oldCard !== "undefined") {
      setGroupList(
        update(newGroupList, {
          [oldGroupIndex]: {
            cardList: {
              $splice: [
                [index, 1],
                [newIndex, 0, card],
              ],
            },
          },
        })
      );
    } else {
      return;
    }
  };

  const findCard = (group, id) => {
    const card = group.cardList.filter((c) => c.id === id)[0];
    return {
      card,
      index: group.cardList.indexOf(card),
    };
  };

  useEffect(() => {}, [Router]);

  return (
    <ProtectRoute>
      <div className={style.body}>
        {newListModal && <CrListModal setNewListModal={setNewListModal} />}
        {editListModal && <EditListModal setEditListModal={setEditListModal} />}
        {newCardModal && <CrCardModal setNewCardModal={setNewCardModal} />}
        {editCardModal && <EditCardModal setEditCardModal={setEditCardModal} />}

        <div style={{ backgroundColor: "#644CC6" }} className={style.header}>
          <span> Activity Name </span>
        </div>
        <div className={style.view}>
          <div className={style.work_table}>
            <DndProvider backend={HTML5Backend}>
              {groupList.map((group, index) => {
                return (
                  <ActivityGroup
                    key={index}
                    index={index}
                    group={group}
                    changeGroup={changeGroup}
                    findCard={findCard}
                    moveCard={moveCard}
                    setEditListModal={setEditListModal}
                    setNewCardModal={setNewCardModal}
                    setEditCardModal={setEditCardModal}
                  />
                );
              })}
              <a
                className={style.addList_btn}
                onClick={() => {
                  setNewListModal(true);
                }}
              >
                {" "}
                <FontAwesomeIcon icon={faPlusCircle} /> New list
              </a>
            </DndProvider>
          </div>
          <SideBar activityId={activityId} />
        </div>
      </div>
    </ProtectRoute>
  );
}
