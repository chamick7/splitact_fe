import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import styles from "../../css/chat.module.css";

export default function Input({ msg, setMsg, sendMessage }) {
  return (
    <form className={styles.inbox_form}>
      <span>Aa</span>
      <textarea
        autoFocus
        name="msg"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
        placeholder="Type a message..."
        id="msg"
        rows="1"
        onKeyPress={(e) => (e.key === "Enter" && e.shiftKey === false ? sendMessage(e) : null)}
      ></textarea>
      <button
        className={styles.submit_btn}
        onClick={(e) => sendMessage(e)}
        type="submit"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </form>
  );
}
