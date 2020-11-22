import style from "../../css/profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  return (
    <div className={style.profile1_body}>
      <div className={style.profile1_img}>
        <div className={style.img_container}>
          <img
            draggable="false"
            src="https://www.w3schools.com/w3images/avatar6.png"
            alt=""
          />
        </div>
        <button>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
      <div className={style.profile1_data}>
        <h1>Profile</h1>
        <div className={style.profile1_data_body}>
          <div className={style.data_item}>
            <h3>Username</h3>
            <div className={style.current}>Person</div>
          </div>
          <div className={style.data_item}>
            <h3>Name</h3>
            <div className={style.current}></div>
          </div>
          <div className={style.data_item}>
            <h3>Tel.</h3>
            <div className={style.current}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
