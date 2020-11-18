
import Link from "next/link";

import style from "../../css/activity.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";


export default function ChatBTN({ activityId }) {
    return (
        <Link  href={ "/chat/"+activityId }>
            <a style={{ backgroundColor: "#644CC6" }} className={style.chat_btn}>
                Chat
                <span> <FontAwesomeIcon icon={faCommentDots} /> </span>
            </a>
        </Link>
    )
}
