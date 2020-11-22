import { useState } from "react";
import ProtectRoute from "../../utils/ProtectRoute";
import { getAxios } from "../../utils/axios";
const axios = getAxios();

import style from "../../css/profile.module.css";
import SideBar from "../../Components/profile/SideBar";
import Profile from "../../Components/profile/Profile";
import Security from "../../Components/profile/Security";
import { useEffect } from "react";
import ImageModal from "../../Components/profile/ImageModal";

export default function me() {
  const [pageNum, setPageNum] = useState(1);
  const [account, setAccount] = useState({});
  const [imageModal, setImageModal] = useState(false)

  const pageList = [
    { id: 1, name: "Profile" },
    { id: 2, name: "Account & Security" },
  ];

  useEffect(() => {
    axios
      .get("/account/me")
      .then((result) => {
        setAccount(result.data.account);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className={style.body}>
        { imageModal && <ImageModal account={account} setImageModal={setImageModal} /> }
        <div className={style.navbar}>
          <h1>{account.username}'s Profile</h1>
        </div>
        <div className={style.container}>
          <SideBar
            pageList={pageList}
            pageNum={pageNum}
            setPageNum={setPageNum}
            account={account}
          />
          <div className={style.page}>
            {pageNum == 1 && <Profile account={account} setImageModal={setImageModal} />}
            {pageNum == 2 && <Security account={account} />}
          </div>
        </div>
      </div>
    </>
  );
}
