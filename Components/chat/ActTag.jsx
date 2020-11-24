import styles from "../../css/chat.module.css";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";

export default function ActTag({ name, color, link, setSideBarStyle }) {
  const handleChangeActivity = () => {
    Router.replace({ pathname: "/chat/" + link });
  };

  const handleRedirect = () => {
    Router.push("/activity?activity=" + link);
  };

  return (
    <div className={styles.actTag_container}>
      <span
        onClick={() => {
          handleRedirect();
        }}
        style={{ color: color }}
        className={styles.actTag_link}
      >
        {" "}
        <FontAwesomeIcon icon={faDesktop} />{" "}
      </span>
      <div
        onClick={() => {
          setSideBarStyle(false);
          handleChangeActivity();
        }}
        className={styles.actTag}
      >
        <span
          style={{ backgroundColor: color }}
          className={styles.actColor}
        ></span>
        <span className={styles.actName}>
          {" "}
          {+name.length <= 15
            ? name.substring(0, 15)
            : name.substring(0, 15) + "..."}{" "}
        </span>
      </div>
    </div>
  );
}
