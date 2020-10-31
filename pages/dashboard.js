import { requirePageAuth } from "../utils/Auth";
import Calendar from "../Components/Calendar";
import ActivityModal from "../Components/ActivityModal";
import { accountAtom, AccountAtom } from "../atom";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Router, { useRouter } from "next/router";
import "react-circular-progressbar/dist/styles.css";
import {
  faFileSignature,
  faPencilAlt,
  faEllipsisV,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import styles from "../css/dashboard.module.css";
import { useState, useEffect } from "react";
import getAxios from "../utils/axios";
const axios = getAxios();

export const getServerSideProps = async (ctx) => {
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
};

export default function dashboard() {
  const [account, setAccount] = useRecoilState(accountAtom);
  const [activityModal, setActivityModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/activity/amount").then((resp) => {
      console.log(resp.data);
      setActivities(resp.data.activities)
    });
  }, []);

  const onActivityModal = () => {
    setActivityModal(!activityModal);
  };

  function ActivityItem(props) {
    return (
      <li className={styles.activity_item}>
        <div
          style={{ backgroundColor: props.color }}
          className={styles.act_header}
        >
          <span>
            <FontAwesomeIcon icon={faPencilAlt} />
            {props.name.substring(0, 22) + "..."}
          </span>
          <button className={styles.act_menu}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>

        <div className={styles.act_body}>
          Body
          <div className={styles.progress_container}>
            <CircularProgressbar
              className={styles.progressbar}
              styles={buildStyles({
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",

                // Text size
                textSize: "30px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: props.color,
                textColor: props.color,
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
              value={80}
              text={`${80}%`}
            />
          </div>
        </div>

        <div
          style={{ backgroundColor: props.color }}
          className={styles.act_bottom}
        >
          <span>
            <span className={styles.duedate_header}>Due Date: </span>
            {props.dueDate}
          </span>
          <span>
            <FontAwesomeIcon icon={faUsers} />
            {props.amount}
          </span>
        </div>
      </li>
    );
  }

  return (
    <>
      <Calendar />
      {activityModal && (
        <ActivityModal close={onActivityModal} account={account} />
      )}

      <div className={styles.body}>
        <div className={styles.activity}>
          <div className={styles.header}>
            <h1>
              {" "}
              <FontAwesomeIcon icon={faFileSignature} /> Activity
            </h1>
          </div>
          <ul className={styles.activity_container}>
            <span className={styles.plus_container}>
              <FontAwesomeIcon onClick={onActivityModal} icon={faPlusSquare} />
            </span>
            <ActivityItem
              name="Test act"
              dueDate="10/11/2020"
              amount={8}
              color="#644CC6"
            />
          </ul>
        </div>
      </div>
    </>
  );
}

// dashboard.getInitialProps = async (ctx) => {
//   const cookie = ctx.req?.headers.cookie;
//   const ac = {}

//   const resp = await axios.get('/account/auth',{
//     headers:{
//       cookie:cookie
//     }
//   })

//   if(resp.status === 401 && !ctx.req){
//     Router.replace('/login')
//   }

//   if(resp.status === 401 && ctx.req){
//     ctx.resp?.writeHead(302, {
//       Location: '/login'
//     })
//   }

//   return ac
// }
