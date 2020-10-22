import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRecoilValue} from "recoil";
import { accountAtom } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { socket } from "../utils/socket";
import styles from "../css/chat.module.css";


export function getServerSideProps({ query }) {
  let activity;

  activity = query.activity || null;

  return {
    props: {
      activity: activity,
    },
  };
}

export default function chat({ activity }) {
  const { register, handleSubmit } = useForm();
  const [msg, setMsg] = useState([]);
  const [sideBarStyle, setSideBarStyle] = useState(true);
  
  const Account = useRecoilValue(accountAtom);  

  useEffect(() => {
    socket.emit("join", { activity: activity });
    setMsg([]);
  }, [activity]);

  useEffect(() => {
    socket.on("msgToClient", (data) => {
      const newMsg = {
        msg: data.msg,
        sender: data.sender,
        time: data.time,
        activity: data.activity,
      };
      setMsg((msg) => [...msg, newMsg]);
    });

    
  }, []);

  useEffect(() => {
    if(activity){
      const view = document.querySelector("#view");
      view.scrollTop = view.scrollHeight;
    }
  }, [msg]);
  
  
  
  const handleKeypress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (e.target.value !== "") {
        sentToServer({ msg: e.target.value });
      }
      e.target.value = "";
    }
  };

  const sentToServer = (data) => {
    data.activity = activity;
    data.sender = "tester";
    socket.emit("msgToServer", data);
  };

  const onSubmit = (data) => {
    if (data.msg_input !== "") {
      sentToServer({
        msg: data.msg_input,
      });
    }
  };

  function ActTag(props) {
    return (
      <Link href={"/chat?activity=" + props.name}>
        <a onClick={()=>{
          setSideBarStyle(false);
        }} className={styles.actTag}>
          <span className={styles.actColor}></span>
          <span className={styles.actName}> {props.name} </span>
        </a>
      </Link>
    );
  }

  function SideBar() {
    return (
      <section id="sideBar" className={sideBarStyle? styles.sideBar :styles.sideBar+ " " + 'none'} >
        <ActTag name="ACT" />
        <ActTag name="Active" />
      </section>
    );
  }

  function ChatHeader() {
    return (
      <div className={styles.header}>
        <span className={styles.header_navigate}>
          <FontAwesomeIcon onClick={()=>{
            setSideBarStyle(true);
          }} icon={faAngleLeft} />
          <span className={styles.actColor}></span>
          {activity}
        </span>
        <span className={styles.member_span}>
          <FontAwesomeIcon icon={faUsers} />
        </span>
      </div>
    );
  }

  function Inbox() {
    return (
      <div className={styles.inbox}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.inbox_form}>
          <span>Aa</span>
          <textarea
            autoFocus
            name="msg_input"
            id="msg_input"
            onKeyPress={handleKeypress}
            ref={register}
            rows="1"
          ></textarea>
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    );
  }

  function Msg(props) {
    return (
      // <li className={styles.msg_li}>
      Account.name? 
      <li className={styles.msg_li + " me"}>
        <span className={styles.msg_outside}>
          <span className={styles.msg_container}>
            <span className={styles.msg_wrapper}>{props.msg}</span>
            <span className={styles.time}>{props.time}น.</span>
          </span>
        </span>
      </li>
      :
      <li className={styles.msg_li}>
        <span className={styles.msg_outside}>
          {props.sender}
          <span className={styles.msg_container}>
            <span className={styles.msg_wrapper}>{props.msg}</span>
            <span className={styles.time}>{props.time}น.</span>
          </span>
        </span>
      </li>
    );
  }

  function View() {
    return (
      <div className={styles.msg}>
        <ul id="view" className={styles.msg_ul}>
          {msg.map((data, index) => {
            return (
              <Msg
                key={index}
                sender={data.sender}
                msg={data.msg}
                time={data.time}
              />
            );
          })}
        </ul>
      </div>
    );
  }

  function ChatCTN() {
    return activity ? (
      <div id="chatCT" className={sideBarStyle? styles.chatCT+ " " + 'none':styles.chatCT} >
        <ChatHeader />
        <View />
        <Inbox />
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div className={styles.chat}>
      <SideBar />
      <ChatCTN />
    </div>
  );
}
