import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPen,
  faUserPlus,
  faUserTimes,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import styles from "../css/activityModal.module.css";
import Autosuggest from "react-autosuggest";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { getAxios } from "../utils/axios.js";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from "react-day-picker/moment";

import "moment/locale/en-au";
const axios = getAxios();

let users = [];

axios
  .get("/account/users")
  .then((data) => {
    console.log(data.data);
    users = data.data.users;
  })
  .catch((err) => {});

const getSuggestions = (value) => {
  // console.log(users);
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : users.length > 0
    ? users.filter(
        (user) =>
          user.username.toLowerCase().slice(0, inputLength) === inputValue
      )
    : [];
};

const renderSuggestion = (suggestion) => {
  return (
    <div className={styles.user_item}>
      <img src={suggestion.img} alt="" />
      {suggestion.username}
    </div>
  );
};

const getSuggestionValue = (suggestion) => {
  return suggestion.username;
};

export default function ActivityModal(props) {
  const account = props.account;
  const [color, setColor] = useState("#FF672B");
  const router = useRouter();
  const [colorModal, setColorModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const [dateState, setDateState] = useState(false);
  const [date, setDate] = useState(null);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [members, setMembers] = useState([
    { username: account.username, acID: account.acID },
  ]);
  ``;

  useEffect(() => {}, []);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionsSelected = (event, { suggestion }) => {
    const newMember = { username: suggestion.username, acID: suggestion._id };
    console.log(newMember);
    if (!members.some((member) => member.acID === newMember.acID)) {
      setMembers((members) => [...members, newMember]);
    }
    setValue("");
  };

  const onSubmit = (data) => {
    let allData = {};

    console.log(data);

    if (dateState) {
      allData = {
        atName: data.atName,
        color: color,
        members: members,
        dueDate: date,
      };
    } else {
      allData = {
        atName: data.atName,
        color: color,
        members: members,
      };
    }

    axios
      .post("/activity", allData)
      .then((res) => {
        if (res.data.status === "Success")
          router.push("/activity?activity=" + res.data.atID);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Member",
    value,
    onChange: onChange,
    onKeyPress: (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    },
  };

  function ColorModal() {
    const selectColor = (e) => {
      setColor(e.target.id);
      setColorModal(false);
    };

    function ColorCircle(props) {
      return (
        <div
          className={styles.colorItem}
          style={{ backgroundColor: props.color }}
          id={props.color}
          onClick={selectColor}
        ></div>
      );
    }

    return (
      <div className={styles.color_modal}>
        <h4>Color tag</h4>
        <div className={styles.color_box}>
          <ColorCircle color="#FF0000" />
          <ColorCircle color="#FF672B" />
          <ColorCircle color="#FAAF00" />
          <ColorCircle color="#48A346" />
          <ColorCircle color="#4A90E2" />
          <ColorCircle color="#1C3AA9" />
          <ColorCircle color="#644CC6" />
          <ColorCircle color="#AF2DDD" />
        </div>
      </div>
    );
  }

  function MemberItem(props) {
    const delMember = (e) => {
      const id = e.target.id;
      return setMembers(members.filter((member) => member.acID !== id));
    };

    //user ปัจจุบัน
    if (props.acID === account.acID) {
      return (
        <li id={props.acID} className={styles.member_item + " noselect"}>
          {props.name}
          <FontAwesomeIcon style={{ color: "#644CC6" }} icon={faCode} />
        </li>
      );
    } else {
      return (
        <li className={styles.member_item + " noselect"}>
          {props.name}
          <span id={props.acID} onClick={delMember}>
            -
          </span>
        </li>
      );
    }
  }

  return (
    <div className={styles.modal_container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modal}>
        <span onClick={props.close} className={styles.close}>
          <FontAwesomeIcon icon={faTimes} />
        </span>

        <div className={styles.top}>
          <input
            type="text"
            placeholder="Activity name"
            name="atName"
            className={styles.input_name}
            ref={register}
            required
          />

          <div
            style={{ backgroundColor: color }}
            className={styles.color_select + " noselect"}
            draggable="false"
          >
            {colorModal && <ColorModal />}
            <span
              className={styles.colorWrapper}
              onClick={() => {
                setColorModal(!colorModal);
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </span>
          </div>
        </div>
        <div className={styles.mid}>
          <div>
            <FontAwesomeIcon icon={faUserPlus} />
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onSuggestionSelected={onSuggestionsSelected}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </div>
          <ul className={styles.member_container}>
            {members.map((member, index) => {
              return (
                <MemberItem
                  key={index}
                  index={index}
                  name={member.username}
                  acID={member.acID}
                />
              );
            })}
          </ul>

          <div className={styles.date_container + " noselect"}>
            <label htmlFor="date_select">
              <input
                type="checkbox"
                id="date_select"
                name="date_select"
                onClick={() => {
                  setDateState(!dateState);
                }}
                className={styles.date_select}
              />
              Add due date
            </label>
            {dateState && (
              <div className={styles.day_picker}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <DayPickerInput
                  format="DD/MM/YYYY"
                  placeholder="Due date"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  onDayChange={(day) => setDate(day)}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <button type="input" className={styles.btn_submit}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
