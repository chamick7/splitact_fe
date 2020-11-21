import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import style from "../../../css/worker.module.css";
import WorkerItem from "./WorkerItem";

export default function WorkerModal({ members, setWorker, setWorkerModal }) {
  return (
    <div className={style.worker_modal}>
      <div style={{ backgroundColor: "#FF672B" }} className={style.worker_header}>
        <h3>Select</h3>
        <span
          onClick={() => {
            setWorkerModal(false);
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faTimes} />{" "}
        </span>
      </div>
      <div className={style.worker_body}>
        <ul className={style.view}>
          { members.map((member, index) => {
            return <WorkerItem key={index} member={member} setWorker={setWorker} setWorkerModal={setWorkerModal} />
          }) }
        </ul>
      </div>
      <button></button>
    </div>
  );
}
