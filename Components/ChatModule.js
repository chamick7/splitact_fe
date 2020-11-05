import { useEffect } from "react";
import {getAxios }from "../utils/axios.js";
import { useRecoilState } from "recoil";
import { activityListAtom } from "../atom";

const axios = getAxios();

export default function ChatModule(props) {
  const [activityList, setActivityList] = useRecoilState(activityListAtom);

  useEffect(() => {
    const activityStorage = []
    console.log("load");
    axios
      .get("/activity/amount")
      .then((resp) => {
        console.log(resp.data.activities);
        resp.data.activities.map((element) => {
          const newActivity = { data: element.atID, msg: {}, noti:0 };
          console.log(newActivity);
          activityStorage.push(newActivity);
          setActivityList((activity) => [...activity, newActivity]);
        });
        // setActivityList(resp.data.activities);
        
        localStorage.setItem('activityList',JSON.stringify(activityStorage));
        const room = resp.data.activities.map((activity) => activity.atID._id);
        props.socket.emit("join", room);
        console.log(
          resp.data.activities.find(
            (element) => element.atID._id == query.activity
          )
        );
      })
      .catch((err) => {});
  }, []);

  return <>{/* {children} */}</>;
}
