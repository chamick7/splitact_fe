

import style from "../../../css/worker.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function WorkerItem({ member, setWorker, setWorkerModal }) {

    const selectWorker = () => {
        setWorker(member);
        setWorkerModal(false);
    }

    return (
        <li className={style.member_container}>
            <span className={style.member_item}>
                {member.username}
            </span>
            <span onClick={() => selectWorker()} className={style.select}><FontAwesomeIcon icon={faCheck} /></span>
        </li>
    )
}
