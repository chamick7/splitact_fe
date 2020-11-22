import style from "../../css/profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Profile({ account, setImageModal }) {
  return (
    <div className={style.profile1_body}>
      <div className={style.profile1_img}>
        <div className={style.img_container}>
          <img
            draggable="false"
            src={account.img}
            alt=""
          />
        </div>
        <button
          onClick={() => {
            setImageModal(true);
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
      <div className={style.profile1_data}>
        <h1>Profile</h1>
        <div className={style.profile1_data_body}>
          <div className={style.data_item}>
            <h3>Username</h3>
            <div className={style.current}>{account.username}</div>
          </div>
          <div className={style.data_item}>
            <h3>Name</h3>
            <div className={style.current}>{account.name}</div>
          </div>
          <div className={style.data_item}>
            <h3>Tel.</h3>
            <div className={style.current}>{account.tel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
