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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function me() {
  const [pageNum, setPageNum] = useState(1);
  const [account, setAccount] = useState({});
  const [imageModal, setImageModal] = useState(false);

  const pageList = [
    { id: 1, name: "Profile" },
    { id: 2, name: "Account & Security" },
  ];

  const toggleSideBar = () => {
    const sideBar = document.querySelector("#sideBar");

    sideBar.classList.toggle("resSideBarProfile");
  };

  useEffect(() => {
    axios
      .get("/account/me")
      .then((result) => {
        setAccount(result.data.account);
      })
      .catch((err) => {});
  }, []);

  return (
    <ProtectRoute>
      <div className={style.body}>
        {imageModal && (
          <ImageModal account={account} setImageModal={setImageModal} />
        )}
        <div className={style.navbar}>
          <span
            onClick={() => {
              toggleSideBar();
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </span>
          <h2>{account.username}'s Profile</h2>
        </div>
        <div className={style.container}>
          <SideBar
            pageList={pageList}
            pageNum={pageNum}
            setPageNum={setPageNum}
            account={account}
            toggleSideBar={toggleSideBar}
          />
          <div className={style.page + " resProfile"}>
            {pageNum == 1 && (
              <Profile account={account} setImageModal={setImageModal} />
            )}
            {pageNum == 2 && <Security account={account}  />}
          </div>
        </div>
      </div>
    </ProtectRoute>
  );
}
