import styles from "../../css/chat.module.css";
import { useRecoilState } from "recoil";
import { activityAtom, accountAtom } from "../../atom";
import moment from "moment";
import ReactEmoji from "react-emoji"

export default function Message({ data }) {
  const [account, setAccount] = useRecoilState(accountAtom);
  const [activity, setActivity] = useRecoilState(activityAtom);


  return data.senderID == account.acID ? (
    <li className={styles.msg_li + " me"}>
      <span className={styles.msg_outside}>
        <span className={styles.msg_container}>
          <span className={styles.time}>{moment(data.time).format("HH:mm")}น.</span>
          <span className={styles.msg_wrapper}>
            <p>{ReactEmoji.emojify(data.msg)}</p>
          </span>
        </span>
      </span>
    </li>
  ) : (
    <li className={styles.msg_li}>
      <span className={styles.msg_outside}>
        {data.sender}
        <span className={styles.msg_container}>
          <span
            style={{ backgroundColor: activity.color }}
            className={styles.msg_wrapper}
          >
            {ReactEmoji.emojify(data.msg)}
          </span>
          <span className={styles.time}>{moment(data.time).format("HH:mm")}น.</span>
        </span>
      </span>
    </li>
  );
}
