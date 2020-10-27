import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPen,
  faUserPlus,
  faUserTimes,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../css/activityModal.module.css";
import Autosuggest from "react-autosuggest";
import { useState, useEffect } from "react";

const users = [
  {
    name: "Mick",
    acID: "2zxv4123124124",
  },
  {
    name: "Supkit",
    acID: "asdf214121512314",
  },
];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : users.filter(
        (user) => user.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const renderSuggestion = (suggestion) => {
  return <div>{suggestion.name}</div>;
};

const getSuggestionValue = (suggestion) => {
  return suggestion.name;
};

export default function ActivityModal(props) {
  const account = props.account;
  const [color, setColor] = useState("#FF672B");
  const [colorModal, setColorModal] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [members, setMembers] = useState([
    { name: account.name, acID: account.acID },
  ]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionsSelected = (event, { suggestion }) => {
    const newMember = { name: suggestion.name, acID: suggestion.acID };
    if (!members.some((member) => member.acID === newMember.acID)) {
      setMembers((members) => [...members, newMember]);
    }
    setValue("");
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Member",
    value,
    onChange: onChange,
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
      console.log('haha');
      const id = e.target.id; 
      return setMembers(members.filter(member => member.acID !== id));
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
      <form className={styles.modal}>
        <span onClick={props.close} className={styles.close}>
          <FontAwesomeIcon icon={faTimes} />
        </span>

        <div className={styles.top}>
          <input
            type="text"
            placeholder="Activity name"
            name="atName"
            className={styles.input_name}
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
                  name={member.name}
                  acID={member.acID}
                />
              );
            })}
          </ul>
        </div>
      </form>
    </div>
  );
}
