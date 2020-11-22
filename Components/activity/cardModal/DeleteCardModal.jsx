import style from "../../../css/cardModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function DeleteCardModal({
  currentCard,
  setDeleteCardModal,
  deleteCard,
}) {
  const onDeleteCard = () => {
    deleteCard(currentCard._id);
  };

  return (
    <div className="background_modal">
      <div className={style.delete_modal}>
        <div className={style.delete_header}>
          <h2>
            {" "}
            <FontAwesomeIcon icon={faTrashAlt} /> Delete - Card
          </h2>
          <span
            onClick={() => {
              setDeleteCardModal(false);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faTimes} />{" "}
          </span>
        </div>
        <div className={style.delete_body}>
          <h3>
            {" "}
            Do you really want to delete{" "}
            <span style={{ color: "red" }}>"{currentCard.cardName}"</span> ?
          </h3>
          <div className={style.confirm}>
            <button
              onClick={() => {
                onDeleteCard();
              }}
              className={style.delete_btn}
            >
              Delete
            </button>
            <button
              onClick={() => {
                setDeleteCardModal(false);
              }}
              className={style.keep_btn}
            >
              Keep
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
