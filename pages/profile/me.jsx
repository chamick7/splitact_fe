import { useState } from "react";
import ProtectRoute from "../../utils/ProtectRoute";

import style from "../../css/profile.module.css";
import SideBar from "../../Components/profile/SideBar";
import Profile from "../../Components/profile/Profile";
import Security from "../../Components/profile/Security";

export default function me() {
  const [pageNum, setPageNum] = useState(2);

  const pageList = [
    { id: 1, name: "Profile" },
    { id: 2, name: "Account & Security" },
  ];

  return (
    <ProtectRoute>
      <div className={style.body}>
        <div className={style.navbar}>
          <h1>Person's Profile</h1>
        </div>
        <div className={style.container}>
          <SideBar pageList={pageList} pageNum={pageNum} setPageNum={setPageNum} />
          <div className={style.page}>
            { pageNum == 1 && <Profile /> }
            { pageNum == 2 && <Security /> }
          </div>
        </div>
      </div>
    </ProtectRoute>
  );
}
