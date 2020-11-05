import ChatHeader from "./ChatHeader";
import View from "./View";
import Input from "./Input";
import { chatAxios } from "../../utils/axios";
import styles from "../../css/chat.module.css";
import { useEffect } from "react";

const axios = chatAxios();

export default function ChatCTN({
  atID,
  sideBarStyle,
  setSideBarStyle,
  messages,
  setMessages,
  msg,
  setMsg,
  sendMessage,
}) {
  useEffect(() => {
    axios
      .get("/getchat?activity=" + atID)
      .then((resData) => {
          setMessages(resData.data.msg);
      })
      .catch();
  }, [atID]);

  return (
    <div
      className={sideBarStyle ? styles.chatCT + " " + "none" : styles.chatCT}
    >
      <ChatHeader setSideBarStyle={setSideBarStyle} />
      <View messages={messages} />
      <Input msg={msg} setMsg={setMsg} sendMessage={sendMessage} />
    </div>
  );
}
