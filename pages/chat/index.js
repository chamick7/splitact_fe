import { getAxios } from "../../utils/axios";
const axios = getAxios();
import { useState, useEffect } from "react";

import SideBar from "../../Components/chat/SideBar";

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
    },
  };
}


export default function chat() {
  const [sideBarStyle, setSideBarStyle] = useState(true);
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    axios
      .get("/activity/amount")
      .then((resData) => {
        resData.data.activities.forEach((element) => {
          const newActivity = { data: element.atID, msg: {}, noti: 0 };
          setActivityList((activityList) => [...activityList, newActivity]);
        });
      })
      .catch((err) => {});

      
  }, []);

  return (
    <div style={{ height: "calc(100vh - 80px)" }}>
      <SideBar
        sideBarStyle={sideBarStyle}
        activityList={activityList}
        setSideBarStyle={setSideBarStyle}
      />
    </div>
  );
}
