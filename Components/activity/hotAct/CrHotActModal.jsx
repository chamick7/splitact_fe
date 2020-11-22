import { useState } from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import style from "../../../css/hotAct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTimes,
  faCalendarAlt,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import { getAxios } from "../../../utils/axios";
const axios = getAxios();

export default function CrHotActModal({ activity, setNewHotActModal, addHotAct }) {
  const [color, setColor] = useState(activity.color);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState(new Date());

  const onSubmit = () => {
    axios
      .post("/activity/hotact", {
        activityId: activity._id,
        hotActName: name,
        info: info,
        dueDate: date,
      })
      .then((result) => {
          addHotAct(result.data.hotAct)
      })
      .catch((err) => {
          
      });
  };

  return (
    <div className="background_modal">
      <div className={style.hotact_modal}>
        <div
          style={{ backgroundColor: color }}
          className={style.hotact_modal_header}
        >
          <span>
            <FontAwesomeIcon icon={faPlusCircle} />
            Create - Hot Activity
          </span>
          <span
            onClick={() => {
              setNewHotActModal(false);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faTimes} />{" "}
          </span>
        </div>
        <div className={style.hotact_modal_body}>
          <div className={style.hotact_top}>
            <input
              style={{ borderBottom: "1px solid " + color }}
              placeholder="Hot Activity Name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className={style.hotact_mid}>
            <textarea
              style={{ border: "1px solid " + color }}
              placeholder="Hot Activity info"
              value={info}
              onChange={(e) => {
                setInfo(e.target.value);
              }}
              rows="3"
            ></textarea>

            <MuiPickersUtilsProvider utils={MomentUtils}>
              <span>
                <FontAwesomeIcon
                  style={{ color: color }}
                  icon={faCalendarAlt}
                />
                <DateTimePicker
                  value={date}
                  onChange={setDate}
                  format="DD/MM/YYYY HH:MM"
                />
              </span>
            </MuiPickersUtilsProvider>
          </div>

          <div className={style.hotact_bottom}>
            <button onClick={() => {onSubmit()}} style={{ backgroundColor: color }}>
              {" "}
              <FontAwesomeIcon icon={faBullhorn} /> Announce
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
