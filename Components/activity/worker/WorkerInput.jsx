import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

import style from "../../../css/worker.module.css";
import WorkerModal from "./WorkerModal";

export default function WorkerInput({ color, worker, setWorker, members }) {
  const [workerModal, setWorkerModal] = useState(false);


  return (
    <div className={style.worker_container + " noselect"}>
      {workerModal && (
        <WorkerModal
          members={members}
          setWorker={setWorker}
          setWorkerModal={setWorkerModal}
        />
      )}
      <span className={style.worker_wrapper}>
        <FontAwesomeIcon style={{ color: color }} icon={faUserTie} />
        <a
          onClick={() => {
            setWorkerModal(!workerModal);
          }}
          className={style.worker_btn}
        >
          {worker ? worker.username : <> Worker </>}
        </a>
      </span>
    </div>
  );
}
