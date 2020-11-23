import Calendar from "../Components/Calendar";
import ActivityModal from "../Components/ActivityModal";
import Link from "next/link";
import { accountAtom, AccountAtom } from "../atom";
import ProtectRoute from "../utils/ProtectRoute";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useRouter } from "next/router";
import "react-circular-progressbar/dist/styles.css";
import moment from "moment";
import {
  faFileSignature,
  faPencilAlt,
  faEllipsisV,
  faUsers,
  faDesktop,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import styles from "../css/dashboard.module.css";
import { useState, useEffect } from "react";
import { getAxios } from "../utils/axios";
const axios = getAxios();

export const getServerSideProps = async (ctx) => {
  try {
    const cookie = ctx.req?.headers.cookie;

    // await axios
    //   .get("/account/auth", {
    //     headers: {
    //       cookie: cookie,
    //     },
    //   })
    //   .then()
    //   .catch((err) => {
    //     if (err.response.status === 401) {
    //       console.log(err.response.status);
    //       // ctx.res.writeHead(302, { Location: "/login" });
    //       // ctx.res.end();
    //     }
    //   });
  } catch (err) {}

  return {
    props: {},
  };
};

export default function dashboard() {
  const [account, setAccount] = useRecoilState(accountAtom);
  const [activityModal, setActivityModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [searchActivities, setSearchActivities] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/activity/amount")
      .then((resp) => {
        setActivities(resp.data.activities);
        setSearchActivities(resp.data.activities);
      })
      .catch((err) => {});
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
            <Link href={"/activity?activity=" + props.link}>
              <a>
                {props.name.length > 22
                  ? props.name.substring(0, 22) + "..."
                  : props.name.substring(0, 22)}
              </a>
            </Link>
          </span>
          <button className={styles.act_menu}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>

        <Link href={"/activity?activity=" + props.link}>
          <a>
            <div className={styles.act_body}>
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
                  value={props.percent}
                  text={`${props.percent}%`}
                />
              </div>
            </div>

            <div
              style={{ backgroundColor: props.color }}
              className={styles.act_bottom}
            >
              <span>
                <span className={styles.duedate_header}>Due Date: </span>
                {props.dueDate != "Invalid date" ? props.dueDate : " - "}
              </span>
              <span>
                <FontAwesomeIcon icon={faUsers} />
                {props.amount}
              </span>
            </div>
          </a>
        </Link>
      </li>
    );
  }

  const onSubmitSearch = (e) => {
    e.preventDefault();
    setSearchActivities(
      activities.filter((act) => {
        return act.atId.atName.toLowerCase().includes(search.toLowerCase());
      })
    );
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <ProtectRoute>
      <Calendar />
      {activityModal && (
        <ActivityModal close={onActivityModal} account={account} />
      )}

      <div className={styles.body}>
        <div className={styles.activity}>
          <div className={styles.search_container}>
            <form onSubmit={onSubmitSearch} className={styles.form_search}>
              <input
                type="text"
                name="search"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
          <div className={styles.header}>
            <h1>
              {" "}
              <FontAwesomeIcon icon={faDesktop} /> Activity
            </h1>
          </div>
          <ul className={styles.activity_container}>
            <span className={styles.plus_container}>
              <FontAwesomeIcon onClick={onActivityModal} icon={faPlusSquare} />
            </span>

            {searchActivities.map((activityRes, index) => {
              const activity = activityRes.atId;
              let allCard = 0;
              let successCard = 0;

              activity.list.map((list, index) => {
                allCard = allCard + list.cards.length;
                if (index == 2) {
                  successCard = successCard + list.cards.length;
                }
              });

              const percent = Math.round(100 / (allCard / successCard));

              return (
                <ActivityItem
                  key={index}
                  link={activity._id}
                  name={activity.atName}
                  dueDate={moment(activity.dueDate).format("DD/MM/YYYY")}
                  amount={5}
                  color={activity.color}
                  percent={percent}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </ProtectRoute>
  );
}
