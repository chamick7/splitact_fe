import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faTimes,
  faCode,
  faUserPlus,
  faUser,
  faCalendarAlt,
  faCheckCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import style from "../../../css/activityModal.module.css";
import { useState } from "react";
import ColorDot from "../../color/ColorDot";
import AddmemberModal from "./AddmemberModal";
import { useEffect } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "moment/locale/en-au";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from "react-day-picker/moment";
import moment from "moment";
import { getAxios } from "../../../utils/axios";
const axios = getAxios();
import Router from "next/router";

export default function EditactivityModal({
  activity,
  setEditActivityModal,
  members,
  setMembers,
}) {
  const [color, setColor] = useState(activity.color);
  const [memberModal, setMemberModal] = useState(false);
  const [date, setDate] = useState();
  const [name, setName] = useState(activity.atName);

  const leaveActivity = () => {
    Router.replace("/dashboard");

    axios
      .post("/activity/leave", { activityId: activity._id })
      .then((result) => {
        Router.replace("/dashboard");
      })
      .catch((err) => {
        Router.replace("/dashboard");
      });
  };

  const onSubmit = () => {
    const activityId = activity._id;
    const atName = name;
    const newColor = color;
    const dueDate = date;

    axios
      .post("/activity/edit", { activityId, atName, color: newColor, dueDate })
      .then((result) => {
        console.log(result);
        Router.reload(window.location.pathname);
      })
      .catch((err) => {});
  };

  return (
    <div className="background_modal">
      <div className={style.modal}>
        <div style={{ backgroundColor: color }} className={style.edit_header}>
          <span>
            <FontAwesomeIcon icon={faCog} />
            Edit - Activity
          </span>
          <span
            onClick={() => {
              setEditActivityModal(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={style.edit_body}>
          <div className={style.edit_top}>
            <input
              style={{ borderBottom: "1px solid " + color }}
              type="text"
              name="activity_name"
              placeholder="Activity name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <ColorDot color={color} setColor={setColor} />
          </div>
          <div className={style.edit_mid}>
            <span
              onClick={() => {
                setMemberModal(true);
              }}
              className={style.addMember_btn}
            >
              {" "}
              <FontAwesomeIcon icon={faUserPlus} /> Add member{" "}
            </span>
            <div
              style={{ border: "1px solid " + color }}
              className={style.edit_view}
            >
              {members.map((member, index) => (
                <span key={index} className={style.view_member}>
                  <img src={member.img} alt="" />
                  {member.username}
                  {activity.atCreaterID == member.id ? (
                    <FontAwesomeIcon style={{ color: color }} icon={faCode} />
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )}
                </span>
              ))}
            </div>
            <div className={style.edit_modal_container}>
              {memberModal && (
                <AddmemberModal
                  activityId={activity._id}
                  color={color}
                  currentMembers={members}
                  setMemberModal={setMemberModal}
                  setOriginalMembers={setMembers}
                />
              )}
            </div>
            <div className={style.edit_date}>
              <span>
                <FontAwesomeIcon
                  style={{ color: color }}
                  icon={faCalendarAlt}
                />
                <DayPickerInput
                  value={date ? moment(date).format("DD/MM/YYYY") : null}
                  style={{ color: color }}
                  format="DD/MM/YYYY"
                  placeholder="Due date"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  onDayChange={(day) => setDate(day)}
                />
              </span>
            </div>
            <div className={style.edit_bottom}>
              <button
                onClick={() => {
                  onSubmit();
                }}
                style={{ backgroundColor: color }}
                className={style.submit_btn}
              >
                <FontAwesomeIcon icon={faCheckCircle} />
                Apply
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              leaveActivity();
            }}
            className={style.leave_container}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Leave Group
          </div>
        </div>
      </div>
    </div>
  );
}
