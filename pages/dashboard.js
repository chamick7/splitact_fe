import { requirePageAuth } from "../utils/Auth";
import Calendar from "../Components/Calendar";
import ActivityModal from "../Components/ActivityModal";
import { accountAtom, AccountAtom } from "../atom";
import { useRecoilState } from "recoil";

export const getServerSideProps = ({ req, res }) => {
  requirePageAuth(res);

  return {
    props: {},
  };
};

import styles from "../css/dashboard.module.css";
import { useState } from "react";

export default function dashboard() {

  const [account, setAccount] = useRecoilState(accountAtom)
  const [activityModal, setActivityModal] = useState(false)

  const onActivityModal = () => {
    setActivityModal(!activityModal);
  }


  return (
    <>
        <Calendar />
        {activityModal && <ActivityModal close={onActivityModal} account={account} />}
        <button onClick={onActivityModal} >Click</button>
     
    </>
  );
}
