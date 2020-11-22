import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUsers } from "@fortawesome/free-solid-svg-icons";

import style from "../../../css/addMemberModal.module.css";
import { useState } from "react";
import Autosuggest from "react-autosuggest";
import { getAxios } from "../../../utils/axios.js";
import { useEffect } from "react";
import update from "immutability-helper";
const axios = getAxios();

let users = [];

axios
  .get("/account/users")
  .then((data) => {
    // console.log(data.data)
    if (data.data.users.length > 0) {
      users = data.data.users;
    }
  })
  .catch((err) => {});

const getSuggestions = (value) => {
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
    <div className={style.user_item}>
      <img src={suggestion.img} alt="" />
      {suggestion.username}
    </div>
  );
};

const getSuggestionValue = (suggestion) => {
  return suggestion.username;
};

export default function AddmemberModal({
  activityId,
  color,
  setMemberModal,
  currentMembers,
  setOriginalMembers,
}) {
  const [members, setMembers] = useState([]);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const filterMember = users.filter(
      (user_el) =>
        currentMembers.filter((member_el) => member_el.id == user_el._id)
          .length == 0
    );

    users = filterMember;
  }, []);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionsSelected = (event, { suggestion }) => {
    const newMember = { username: suggestion.username, acID: suggestion._id, img: suggestion.img };

    console.log(currentMembers);
    console.log(newMember);
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
    onKeyPress: (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    },
  };

  const onSubmit = () => {
    if (members.length > 0) {
      axios
        .post("/activity/member", {
          activityId: activityId,
          newMembers: members,
        })
        .then((result) => {
          const memberList = result.data.members.map((member) => ({
            id: member.acId._id,
            username: member.acId.username,
          }));

          setOriginalMembers(
            update(currentMembers, {
              $push: memberList,
            })
          );

          setMemberModal(false);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  return (
    <div className={style.member_modal}>
      <div
        style={{ backgroundColor: color }}
        className={style.member_modal_header}
      >
        <h4>
          <FontAwesomeIcon icon={faUsers} /> Add member
        </h4>
        <span
          onClick={() => {
            setMemberModal(false);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
      <div className={style.member_modal_body}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionsSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />

        <ul className={style.member_view}>
          {members.map((member, index) => (
            <li key={index}> - <img src={member.img} alt=""/> {member.username}</li>
          ))}
        </ul>

        <button
          onClick={() => {
            onSubmit();
          }}
          type="submit"
          style={{ backgroundColor: color }}
          className={style.submit_btn}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
