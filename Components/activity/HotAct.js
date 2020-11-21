import style from "../../css/activity.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import HotActItem from "./hotAct/HotActItem";

export default function Hotact({ setNewHotActModal, hotAct }) {
  return (
    <div className={style.hotact_container}>
      <div
        style={{ backgroundColor: "#644CC6" }}
        className={style.hotact_container_header}
      >
        <h3>Hot Activity</h3>
        <span>
          {" "}
          <FontAwesomeIcon icon={faBullhorn} />{" "}
        </span>
      </div>
      <div className={style.hotact_container_body}>
        {hotAct.map((hot, index) => (
            <HotActItem key={index} hotAct={hot} />
        ))}

        <span
          onClick={() => {
            setNewHotActModal(true);
          }}
          className={style.hotact_add_btn}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          Add Hot Activity
        </span>
      </div>
    </div>
  );
}
