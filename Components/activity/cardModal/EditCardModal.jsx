import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlusCircle,
  faCalendarAlt,
  faCheckCircle,
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
import moment from "moment";

import "moment/locale/en-au";

export default function EditCardModal({
  setEditCardModal,
  currentCard,
  editCard,
  members,
}) {
  const [worker, setWorker] = useState({
    img: currentCard.workerId.img,
    username: currentCard.workerId.username,
    id: currentCard.workerId._id,
  });
  const [name, setName] = useState(currentCard.cardName);
  const [description, setDescription] = useState(currentCard.cardDescription);
  const [date, setDate] = useState(currentCard.dueDate);
  const [color, setColor] = useState(currentCard.color);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    data.dueDate = date;
    data.workerId = worker ? worker.id : null;
    data.color = color;
    data.listId = currentCard.listId;

    editCard(currentCard._id, data);
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
              setEditCardModal(false);
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
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
                  value={date ? moment(date).format("DD/MM/YYYY") : null}
                />
              </span>
            </div>
            <div className={style.submit_container}>
              <button style={{ backgroundColor: color }} type="submit">
                {" "}
                <FontAwesomeIcon icon={faCheckCircle} />
                Apply{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
