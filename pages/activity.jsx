import { useEffect, useState } from "react";
import { getAxios } from "../utils/axios";
import ProtectRoute from "../utils/ProtectRoute";
import Router, { useRouter } from "next/router";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { usePreview } from "react-dnd-preview";
import update from "immutability-helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faPlusCircle,
  faBars,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";

import style from "../css/activity.module.css";

import ActivityGroup from "../Components/activity/ActivityGroup";
import SideBar from "../Components/activity/SideBar";
import CrListModal from "../Components/activity/ListModal/CrListModal";
import EditListModal from "../Components/activity/ListModal/EditListModal";
import CrCardModal from "../Components/activity/cardModal/CrCardModal";
import EditCardModal from "../Components/activity/cardModal/EditCardModal";
import EditactivityModal from "../Components/activity/editActivity/EditactivityModal";
import CrHotActModal from "../Components/activity/hotAct/CrHotActModal";
import DeleteCardModal from "../Components/activity/cardModal/DeleteCardModal";
import DataCardModal from "../Components/activity/cardModal/DataCardModal";

//modal

export function getServerSideProps() {
  return {
    props: {},
  };
}

export default function activity() {
  const axios = getAxios();
  const router = useRouter();
  const activityId = router.query.activity;

  //modal open
  const [editActivityModal, setEditActivityModal] = useState(false);
  const [newListModal, setNewListModal] = useState(false);
  const [editListModal, setEditListModal] = useState(false);
  const [newCardModal, setNewCardModal] = useState(false);
  const [editCardModal, setEditCardModal] = useState(false);
  const [deleteCardModal, setDeleteCardModal] = useState(false);
  const [newHotActModal, setNewHotActModal] = useState(false);
  const [dataCardModal, setDataCardModal] = useState(false);

  const [canMove, setCanMove] = useState(true);
  const [worker, setWorker] = useState(null);
  const [activity, setActivity] = useState({});
  const [groupList, setGroupList] = useState([]);
  const [members, setMembers] = useState([]);
  const [sendGroup, setSendGroup] = useState();
  const [hotAct, setHotAct] = useState([]);

  const [currentCard, setCurrentCard] = useState({});
  const [currentList, setCurrentList] = useState({});

  //card

  const saveMoveCard = (groupIndex, toGroupIndex) => {
    //moveCard
    if (groupIndex === toGroupIndex) {
      axios
        .post("/activity/card/move", {
          listId: groupList[groupIndex]._id,
          cards: groupList[groupIndex].cards,
        })
        .then()
        .catch((err) => {
          router.push("/dashboard");
        });
    }
  };

  useEffect(() => {
    if (sendGroup) {
      saveChangeGroup(sendGroup.groupIndex, sendGroup.toGroupIndex);
    }
  }, [sendGroup]);

  const saveChangeGroup = (groupIndex, toGroupIndex) => {
    axios
      .post("/activity/card/changelist", {
        oldListId: groupList[groupIndex]._id,
        oldCards: groupList[groupIndex].cards,
        newListId: groupList[toGroupIndex]._id,
        newCards: groupList[toGroupIndex].cards,
      })
      .then(() => {})
      .catch((err) => {
        router.push("/dashboard");
      });
  };

  const setCoolDown = () => {
    setCanMove(false);
    setTimeout(() => {
      setCanMove(true);
    }, 1000);
  };

  const changeGroup = (oldGroupIndex, oldIndex, toGroupIndex, card) => {
    try {
      if (canMove) {
        setGroupList(
          update(groupList, {
            [oldGroupIndex]: {
              cards: {
                $splice: [[oldIndex, 1]],
              },
            },
            [toGroupIndex]: {
              cards: {
                $push: [card],
              },
            },
          })
        );
        setSendGroup({ groupIndex: oldGroupIndex, toGroupIndex: toGroupIndex });
        setCoolDown();
      }
    } catch (error) {
      console.log(error);
      // router.push("/dashboard");
    }
  };

  const moveCardList = (groupIndex, oldIndex, atIndex, card) => {
    try {
      if (canMove) {
        setGroupList(
          update(groupList, {
            [groupIndex]: {
              cards: {
                $splice: [
                  [oldIndex, 1],
                  [atIndex, 0, card],
                ],
              },
            },
          })
        );
      }
    } catch (error) {
      router.push("/dashboard");
    }
  };

  const createCard = (card) => {
    console.log(groupList[0].cards[0]);
    console.log(card);
    setGroupList(
      update(groupList, {
        [0]: {
          cards: {
            $push: [card],
          },
        },
      })
    );
    setNewCardModal(false);
  };

  useEffect(() => {
    axios
      .get("/activity?activity=" + activityId)
      .then((resData) => {
        console.log(resData.data.activity);
        setActivity(resData.data.activity);
        setGroupList(resData.data.activity.list);
        setMembers(resData.data.members);
        setHotAct(resData.data.hotAct);
      })
      .catch((err) => {});
  }, [Router]);

  const openEditCard = (card) => {
    setCurrentCard(card);
    setEditCardModal(true);
  };

  const editCard = (cardId, newCard) => {
    axios
      .post("/activity/card/edit", {
        cardId: cardId,
        card_name: newCard.card_name,
        card_description: newCard.card_description,
        color: newCard.color,
        dueDate: newCard.dueDate,
        workerId: newCard.workerId,
      })
      .then((result) => {
        const listId = newCard.listId;

        // console.log(result.data.card);

        const listIndex = groupList.findIndex((list) => list._id == listId);
        const cardIndex = groupList[listIndex].cards.findIndex(
          (card) => card._id == cardId
        );

        setGroupList(
          update(groupList, {
            [listIndex]: {
              cards: {
                [cardIndex]: {
                  $set: result.data.card,
                },
              },
            },
          })
        );
      })
      .catch((err) => {});

    setEditCardModal(false);
  };

  const openDeleteCard = (card) => {
    setCurrentCard(card);
    setDeleteCardModal(true);
  };

  const deleteCard = (cardId) => {
    setDeleteCardModal(false);
    axios
      .post("/activity/card/del", { cardId: cardId })
      .then((result) => {
        const cardId = result.data.cardId;
        const listId = result.data.listId;

        const listIndex = groupList.findIndex((group) => group._id == listId);
        const cardIndex = groupList[listIndex].cards.findIndex(
          (card) => card._id == cardId
        );

        setGroupList(
          update(groupList, {
            [listIndex]: {
              cards: {
                $splice: [[cardIndex, 1]],
              },
            },
          })
        );
      })
      .catch((err) => {});
  };

  const openCard = (card) => {
    setCurrentCard(card);
    setDataCardModal(true);
  };

  // upload files

  const uploadCard = (filesRes) => {
    console.log(currentCard);
    const listIndex = activity.list.findIndex(
      (list) => list._id == currentCard.listId
    );
    const cardIndex = activity.list[listIndex].cards.findIndex(
      (card) => card._id == currentCard._id
    );

    setCurrentCard(update(currentCard, {
      files:{
        $set: filesRes
      }
    }))

    setActivity(
      update(activity, {
        list: {
          [listIndex]: {
            cards: {
              [cardIndex]: {
                files: {
                  $set: filesRes,
                },
              },
            },
          },
        },
      })
    );

    
  };

  //list

  const openEditList = (list) => {
    setCurrentList(list);
    setEditListModal(true);
  };

  const editList = (listId, newName) => {
    axios
      .post("/activity/list/edit", { listId, newName })
      .then((result) => {
        const index = groupList.findIndex((list) => list._id == listId);
        setGroupList(
          update(groupList, {
            [index]: {
              $set: result.data.list,
            },
          })
        );
        // setGroupList(

        // );
      })
      .catch((err) => {});

    setEditListModal(false);
  };

  const toggleSideBar = () => {
    const sideBar = document.querySelector("#sideBar");

    sideBar.classList.toggle("resSideBar");
  };

  const addHotAct = (hotact) => {
    setHotAct(
      update(hotAct, {
        $push: [hotact],
      })
    );

    setNewHotActModal(false);
  };

  const MyPreview = () => {
    const { display, itemType, item, style } = usePreview();
    if (!display) {
      return null;
    }

    return (
      <div className="preview_card" style={style}>
        {item.name}
      </div>
    );
  };

  return (
    <ProtectRoute>
      <div className={style.body}>
        {editActivityModal && (
          <EditactivityModal
            activity={activity}
            setEditActivityModal={setEditActivityModal}
            members={members}
            setMembers={setMembers}
          />
        )}
        {newListModal && <CrListModal setNewListModal={setNewListModal} />}
        {editListModal && (
          <EditListModal
            color={activity.color}
            currentList={currentList}
            editList={editList}
            setEditListModal={setEditListModal}
          />
        )}
        {dataCardModal && (
          <DataCardModal
            currentCard={currentCard}
            setDataCardModal={setDataCardModal}
            uploadCard={uploadCard}
          />
        )}
        {newCardModal && (
          <CrCardModal
            worker={worker}
            setWorker={setWorker}
            members={members}
            createCard={createCard}
            setNewCardModal={setNewCardModal}
            listId={groupList[0]._id}
          />
        )}
        {editCardModal && (
          <EditCardModal
            members={members}
            worker={worker}
            currentCard={currentCard}
            setWorker={setWorker}
            setEditCardModal={setEditCardModal}
            editCard={editCard}
          />
        )}

        {deleteCardModal && (
          <DeleteCardModal
            currentCard={currentCard}
            setDeleteCardModal={setDeleteCardModal}
            deleteCard={deleteCard}
          />
        )}

        {newHotActModal && (
          <CrHotActModal
            activity={activity}
            setNewHotActModal={setNewHotActModal}
            addHotAct={addHotAct}
          />
        )}

        <div
          style={{ backgroundColor: activity.color }}
          className={style.header}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <FontAwesomeIcon
              style={{ fontSize: "24px", margin: "5px 15px" }}
              icon={faDesktop}
            />{" "}
            {activity.atName}{" "}
          </span>
          <span className={style.header_right}>
            <span
              onClick={() => {
                setEditActivityModal(true);
              }}
            >
              <FontAwesomeIcon icon={faCog} />
            </span>
            <span>
              <span
                onClick={() => {
                  toggleSideBar();
                }}
                className={style.toggleMenu}
              >
                <FontAwesomeIcon icon={faBars} />
              </span>
            </span>
          </span>
        </div>
        <div className={style.view}>
          <div className={style.work_table + " resAct"}>
            <DndProvider
              backend={TouchBackend}
              options={{ enableMouseEvents: true }}
            >
              {groupList.map((group, index) => {
                return (
                  <ActivityGroup
                    key={index}
                    index={index}
                    group={group}
                    color={activity.color}
                    cardList={group.cards}
                    groupIndex={index}
                    changeGroup={changeGroup}
                    openEditList={openEditList}
                    setNewCardModal={setNewCardModal}
                    moveCardList={moveCardList}
                    saveMoveCard={saveMoveCard}
                    openEditCard={openEditCard}
                    openDeleteCard={openDeleteCard}
                    openCard={openCard}
                  />
                );
              })}
              {/* <a
                className={style.addList_btn}
                onClick={() => {
                  setNewListModal(true);
                }}
              >
                {" "}
                <FontAwesomeIcon icon={faPlusCircle} /> New list
              </a> */}
              <MyPreview />
            </DndProvider>
          </div>
          <SideBar
            activityId={activityId}
            setNewHotActModal={setNewHotActModal}
            hotAct={hotAct}
          />
        </div>
      </div>
    </ProtectRoute>
  );
}
