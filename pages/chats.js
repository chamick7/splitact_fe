import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue, useRecoilState, atom } from "recoil";
import { accountAtom, activityListAtom, allMsgAtom } from "../atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import moment from "moment";
import styles from "../css/chat.module.css";
import { getAxios, chatAxios } from "../utils/axios";
import ChatModule from "../Components/ChatModule";
import {getSocket} from "../utils/socket";
import UIfx from "uifx";

const axios = getAxios();
const chataxios = chatAxios();
const socket = getSocket();

export async function getServerSideProps(ctx) {
  try {
    const cookie = ctx.req?.headers.cookie;

    await axios
      .get("/account/auth", {
        headers: {
          cookie: cookie,
        },
      })
      .then()
      .catch((err) => {
        if (err.response.status === 401) {
          ctx.res.writeHead(302, { Location: "/login" });
          ctx.res.end();
        }
      });
  } catch (err) {}

  return {
    props: {
      query: ctx.query,
    },
  };
}

export default function chat({ query }) {
  const { register, handleSubmit } = useForm();

  const router = useRouter();
  const [msg, setMsg] = useState([]);
  const [sideBarStyle, setSideBarStyle] = useState(true);
  const [activityList, setActivityList] = useRecoilState(activityListAtom);
  const [allMsg, setAllMsg] = useRecoilState(allMsgAtom);
  const viewRef = useRef()

  //data,msg
  const [currentActivity, setCurrentActivity] = useState({});
  const Account = useRecoilValue(accountAtom);
 

  useEffect( async () => {
    const activityStorage = JSON.parse(localStorage.getItem("activityList"));
    // socket.emit("join", ["5f9fb014d63763997e993043","5f9fb02cd63763997e993045"]);
    setMsg([]);
    if (activityStorage) {
      if (query.activity) {
        setCurrentActivity(
          activityStorage.find((element) => element.data._id == query.activity)
            .data
        );

        // หา ประวัติแชท ที่เก็บไว้
        const index = allMsg.findIndex(
          (allMsg) => allMsg.acID == query.activity
        );
        console.log(index);
        if (index >= 0) {
          const storedMsg = allMsg[index].msg;
          setMsg(storedMsg);
        } else {
          console.log('fetch');
          await chataxios.get("/getchat?activity=" + query.activity).then((data) => {
            setMsg(data.data.msg);
            // document.querySelector('#view').scrollTop = document.querySelector('#view').scrollHeight
          });
        }
      }
    } else {
      router.replace("/chat");
    }
  }, [query.activity]);

  useEffect(() => {
    socket.on("msgToClient", (data) => {
      console.log(data);
      const newMsg = {
        msg: data.msg,
        sender: data.sender,
        senderID: data.senderID,
        time: data.time,
        activity: data.activity,
      };
      setMsg((msg) => [...msg, newMsg]);
    });
    
    
  }, []);

  useEffect(() => {
    if (query.activity) {
      // viewRef.current.scrollIntoView
      const view = document.querySelector('#view');
      view.scrollTop = view.scrollHeight - view.clientHeight;
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
    data.activity = query.activity;
    data.sender = Account.username;
    data.senderID = Account.acID;
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
    const handleChangeActivity = (link) => {
      if (query.activity) {
        //เก็บประวัติการแชทของ act  ก่อนเปลี่ยน
        let saveChat = { atID: query.activity, msg: msg };
        let index = allMsg.findIndex(
          (oneMsg) => oneMsg.atID == saveChat.atID
        );
        if (index >= 0 && allMsg.length > 0) {
          let allMsgCopy = allMsg.slice();
          allMsgCopy[index] = saveChat;
          setAllMsg(allMsgCopy);
        } else {
          setAllMsg((allMsg) => [...allMsg, saveChat]);
        }
      }
      router.replace({ pathname: "/chat", query: { activity: link } });
    };

    return (
      <div
        onClick={() => {
          setSideBarStyle(false);
          handleChangeActivity(props.link);
        }}
        className={styles.actTag}
      >
        <span
          style={{ backgroundColor: props.color }}
          className={styles.actColor}
        ></span>
        <span className={styles.actName}>
          {" "}
          {+props.name.length <= 15
            ? props.name.substring(0, 15)
            : props.name.substring(0, 15) + "..."}{" "}
        </span>

            
      </div>
    );
  }

  function SideBar() {
    return (
      <section
        id="sideBar"
        className={
          sideBarStyle ? styles.sideBar : styles.sideBar + " " + "none"
        }
      >
        {activityList.map((activityFE, index) => {
          const activity = activityFE.data;
          return (
            <ActTag
              key={index}
              name={activity.atName}
              color={activity.color}
              link={activity._id}
            />
          );
        })}
      </section>
    );
  }

  function ChatHeader() {
    return (
      <div className={styles.header}>
        <span className={styles.header_navigate}>
          <FontAwesomeIcon
            onClick={() => {
              setSideBarStyle(true);
            }}
            icon={faAngleLeft}
          />
          <span
            style={{ backgroundColor: currentActivity.color }}
            className={styles.actColor}
          ></span>
          {currentActivity.atName}
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
    // console.log(props.senderID + " -- " + Account.acID);
    const msg = props.msg;
    return props.senderID === Account.acID ? (
      <li className={styles.msg_li + " me"}>
        <span className={styles.msg_outside}>
          <span className={styles.msg_container}>
            <span className={styles.time}>{props.time}น.</span>
            <span className={styles.msg_wrapper}>
              <p>{props.msg}</p>
            </span>
          </span>
        </span>
      </li>
    ) : (
      <li className={styles.msg_li}>
        <span className={styles.msg_outside}>
          {props.sender}
          <span className={styles.msg_container}>
            <span
              style={{ backgroundColor: currentActivity.color }}
              className={styles.msg_wrapper}
            >
              {msg}
            </span>
            <span className={styles.time}>{props.time}น.</span>
          </span>
        </span>
      </li>
    );
  }

  function View() {



    const scrollToTop = (e) =>{
      if(viewRef.current.scrollTop === 0){
        console.log('load');
      }      
    }

    return (
      <div className={styles.msg}>
        <ul ref={viewRef} id="view" onScroll={scrollToTop} className={styles.msg_ul}>
          {msg.map((data, index) => {
            return (
              <Msg
                key={index}
                sender={data.sender}
                senderID={data.senderID}
                msg={data.msg}
                time={moment(data.time).format("HH:mm")}
              />
            );
          })}
        </ul>
      </div>
    );
  }

  function ChatCTN() {
    // return <View />
    return query.activity ? (
      <div
        id="chatCT"
        className={sideBarStyle ? styles.chatCT + " " + "none" : styles.chatCT}
      >
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
      {activityList.length === 0 ? <ChatModule socket={socket} /> : <></>}

      <SideBar />
      <ChatCTN />
    </div>
  );
}
