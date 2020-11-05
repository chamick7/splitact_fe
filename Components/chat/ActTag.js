import styles from "../../css/chat.module.css";
import Router from "next/router";

export default function ActTag({ name, color, link, setSideBarStyle }) {
  const handleChangeActivity = () => {
    Router.replace({ pathname: "/chat/" + link });
  };

  return (
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
  );
}
