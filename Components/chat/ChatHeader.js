import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUsers } from "@fortawesome/free-solid-svg-icons";

import styles from "../../css/chat.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { activityAtom } from "../../atom";

export default function ChatHeader({ setSideBarStyle }) {
  const [activity, setActivity] = useRecoilState(activityAtom);
  if(!(Object.keys(activity).length === 0 && activity.constructor === Object)){
    return (
      <div className={styles.header}>
        <span className={styles.header_navigate}>
          <FontAwesomeIcon
            onClick={() => {
              setSideBarStyle(true);
            }}
            icon={faAngleLeft}
          />
          <span
            style={{ backgroundColor: activity.color }}
            className={styles.actColor}
          ></span>
          {activity.atName}
        </span>
        <span className={styles.member_span}>
          <FontAwesomeIcon icon={faUsers} />
        </span>
      </div>
    );
  } else return null;
}
