

import style from "../../css/activity.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

export default function Hotact() {
    return (
        <div className={style.hotact_container}>
            <div style={{ backgroundColor: "#644CC6" }} className={style.hotact_container_header}>
                <h3>Hot Activity</h3>
                <span> <FontAwesomeIcon icon={faBullhorn} /> </span>
            </div>
            <div className={style.hotact_container_body}>
                
            </div>

            
        </div>
    )
}
