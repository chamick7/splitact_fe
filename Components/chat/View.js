import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import { css } from "emotion";

import styles from "../../css/chat.module.css";

export default function View({ messages }) {
  const ROOT_CSS = css(
    ` width: 100%; padding: 10px 10px;height: calc(100% - 100px); 
    max-height: 90vh; list-style:none;`
  );

  return (
    <ScrollToBottom className={ROOT_CSS}>
      {messages.map((item, i) => (
        <Message key={i} data={item} />
      ))}
    </ScrollToBottom>
  );
}
