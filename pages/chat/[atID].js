import { getAxios } from "../../utils/axios";
const axios = getAxios();
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSocket } from "../../utils/socket";
import SideBar from "../../Components/chat/SideBar";
import ChatCTN from "../../Components/chat/ChatCTN";
import styles from "../../css/chat.module.css";
import ProtectRoute from "../../utils/ProtectRoute";
import { useRecoilState } from "recoil";
import { activityListAtom, activityAtom, accountAtom } from "../../atom";

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
    props: {},
  };
}

export default function chatPage() {
  const [sideBarStyle, setSideBarStyle] = useState(false);
  const [activityList, setActivityList] = useRecoilState(activityListAtom);
  const [activity, setActivity] = useRecoilState(activityAtom);
  const [account, setAccount] = useRecoilState(accountAtom);

  const [messages, setMessages] = useState([]);

  const [msg, setMsg] = useState("");
  const router = useRouter();
  const atID = router.query.atID;

  useEffect(() => {
    axios
      .get("/activity/amount")
      .then((resData) => {
        if (activityList.length > 0) setActivityList([]);
        resData.data.activities.forEach((element) => {
          const newActivity = { data: element.atID, msg: {}, noti: 0 };
          setActivityList((activityList) => [...activityList, newActivity]);
        });
        const room = resData.data.activities.map(
          (activity) => activity.atID._id
        );
        socket.emit("join", room);
      })
      .catch((err) => {});

    socket.on("msgToClient", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, []);

  useEffect(() => {
    if (activityList.length > 0) {
      setActivity(
        activityList.find((element) => element.data._id == atID).data
      );
    } else {
      axios
        .get("/activity/amount")
        .then((resData) => {
          const statData = resData.data.activities.find(
            (element) => element.atID._id == atID
          );
          const newData = statData.atID;
          setActivity(newData);
        })
        .catch((err) => {
          router.replace("/dashboard");
        });
    }
  }, [atID]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (msg !== "") {
      const activity = atID;
      const sender = account.username;
      const senderID = account.acID;

      socket.emit("msgToServer", { activity, sender, senderID, msg });

      setMsg("");
    }
  };

  return (
    <ProtectRoute>
      <div className={styles.chat}>
        <SideBar
          sideBarStyle={sideBarStyle}
          activityList={activityList}
          setSideBarStyle={setSideBarStyle}
        />
        <ChatCTN
          atID={atID}
          sideBarStyle={sideBarStyle}
          setSideBarStyle={setSideBarStyle}
          msg={msg}
          setMsg={setMsg}
          setMessages={setMessages}
          messages={messages}
          sendMessage={sendMessage}
        />
      </div>
    </ProtectRoute>
  );
}
