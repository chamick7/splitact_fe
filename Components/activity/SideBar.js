
import style from "../../css/activity.module.css";

import ChatBTN from "./ChatBTN";
import Hotact from "./Hotact";




export default function SideBar({ activityId }) {
    return (
        <div className={style.sideBar}>
            <Hotact />
            <ChatBTN activityId={activityId} />
        </div>
    );
}
