import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlusCircle,
  faCalendarAlt,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import style from "../../../css/cardModal.module.css";
import ColorDot from "../../color/ColorDot";
import WorkerInput from "../worker/WorkerInput";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from "react-day-picker/moment";
import { useForm } from "react-hook-form";
import { getAxios } from "../../../utils/axios";
const axios = getAxios();

import "moment/locale/en-au";

export default function CrCardModal({
  createCard,
  members,
  worker,
  setWorker,
  listId,
  setNewCardModal,
  activityId
}) {
  const [date, setDate] = useState(null);
  const [color, setColor] = useState("#FF672B");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    data.dueDate = date;
    data.workerId = worker ? worker.id : null;
    data.listId = listId;
    data.color = color;
    data.activityId = activityId;

    console.log(data.dueDate);
    axios
      .post("/activity/card", data)
      .then((resData) => {
        setWorker(null)
        createCard(resData.data.card)
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="background_modal">
      <div className={style.card_modal}>
        <div style={{ backgroundColor: color }} className={style.card_header}>
          <h2>
            {" "}
            <FontAwesomeIcon icon={faPlusCircle} /> Create - Card
          </h2>
          <span
            onClick={() => {
              setNewCardModal(false);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faTimes} />{" "}
          </span>
        </div>
        <div className={style.card_body}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.card_body_top}>
              <input
                style={{ borderBottom: "1px solid " + color }}
                type="text"
                name="card_name"
                placeholder="Card name"
                ref={register({
                  required: "Required",
                })}
              />
              <ColorDot color={color} setColor={setColor} />
            </div>
            <div className={style.card_body_mid}>
              <textarea
                style={{ border: "1px solid " + color }}
                name="card_description"
                cols="30"
                rows="4"
                ref={register}
              ></textarea>
            </div>
            <div className={style.card_body_bottom}>
              <WorkerInput
                color={color}
                worker={worker}
                setWorker={setWorker}
                members={members}
              />

              <span className={style.date_input} style={{ padding: "0 10px" }}>
                <FontAwesomeIcon
                  style={{ color: color }}
                  icon={faCalendarAlt}
                />
                <DayPickerInput
                  style={{ color: color }}
                  format="DD/MM/YYYY"
                  placeholder="Due date"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  onDayChange={(day) => setDate(day)}
                />
              </span>
            </div>
            <div className={style.submit_container}>
              <button style={{ backgroundColor: color }} type="submit">
                {" "}
                <FontAwesomeIcon icon={faPlusCircle} />
                Create{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
