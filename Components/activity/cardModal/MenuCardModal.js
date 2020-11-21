import styel from "../../../css/activity.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function MenuCardModal({ editCard, deleteCard }) {
  return (
    <div className={styel.menuCard_modal}>
      <div
        onClick={() => {
          editCard();
        }}
      >
        <FontAwesomeIcon icon={faCog} />
        Edit
      </div>
      <div
        onClick={() => {
          deleteCard();
        }}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
        Delete
      </div>
    </div>
  );
}
