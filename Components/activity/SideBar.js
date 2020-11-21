
import style from "../../css/activitySidebar.module.css";

import ChatBTN from "./ChatBTN";
import Hotact from "./Hotact";




export default function SideBar({ activityId, setNewHotActModal, hotAct }) {



    if(hotAct){
        return (
            <div id="sideBar" className={style.sideBar + " resSideBar"  }>
                <Hotact hotAct={hotAct} setNewHotActModal={setNewHotActModal} />
                <ChatBTN activityId={activityId} />
            </div>
        );
    } else {
        return null;
    }
}
