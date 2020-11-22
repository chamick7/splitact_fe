

import ActTag from "./ActTag";

import styles from "../../css/chat.module.css";

export default function SideBar({ sideBarStyle, activityList, setSideBarStyle }) {
  

  return (
    <section
      id="sideBar"
      className={sideBarStyle ? styles.sideBar : styles.sideBar + " " + "none"}
    >
      {activityList.map((activityFE, index) => {
        const activity = activityFE.data;
        return (
          <ActTag
            key={index}
            name={activity.atName}
            color={activity.color}
            link={activity._id}
            setSideBarStyle={setSideBarStyle}
          />
        );
      })}
    </section>
  );
}
