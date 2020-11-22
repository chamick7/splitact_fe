import Link from "next/link";
import Head from "next/head";
import { getAxios } from "../utils/axios";
const axios = getAxios();
import styles from "../css/home.module.css";
import { useRouter } from "next/router";
import PreventRoute from "../utils/PreventRoute";

// export const getServerSideProps = async () => {

// }

export const getServerSideProps = async (ctx) => {
  try {
    const cookie = ctx.req?.headers.cookie;

    await axios
      .get("/account/auth", {
        headers: {
          cookie: cookie,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          ctx.res.writeHead(302, { Location: "/dashboard" });
          ctx.res.end();
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  } catch (err) {}

  return {
    props: {},
  };
};

export default function Home({}) {
  const router = useRouter();

  const handleEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);

    router.push({
      pathname: "/register",
      query: {
        email: email,
      },
    });
  };

  return (
    <PreventRoute>
      <div className={styles.home_body}>
        <Head>
          <meta name="robots" content="index" />
          <meta name="googlebot" content="index" />
        </Head>
        <div className={styles.home_calendar_container}>
          <section className={styles.calendar_container_left}>
            <section>
              <h1>Calendar</h1>
              <img src="/img/calendar-preview.PNG" alt="" />
            </section>
          </section>
          <section className={styles.calendar_container_right}>
            <h1>
              Welcome to Split <span>A</span>
              <span>C</span>
              <span>T.</span>
            </h1>

            <form
              className={styles.home_email_input}
              onSubmit={handleEmail}
              htmlFor="email"
            >
              {/* <span>Get start</span> */}
              <input type="email" name="email" placeholder="E-mail" />
              <button type="submit">Free - Register</button>
            </form>
          </section>
        </div>

        <div className={styles.bottom_calender}>
          <section className={styles.bottom_calender_left}>
            <button>
              <h3>What's Split</h3>
              <span>ACT ?</span>
            </button>
          </section>
          <section className={styles.bottom_calender_right}>
            <button>
              <h3>Feature in Split</h3>
              <span>ACT</span>
            </button>
          </section>
        </div>

        <div className={styles.recommend_container}>
          <section className={styles.recommend_container_left}>
            <img src="/img/calendar-preview.PNG" alt="" />
          </section>
          <section className={styles.recommend_container_right}>
            <h1>
              <span>Spilt ACT,</span>work with your team just got easier.{" "}
            </h1>
            <h1>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; By dividing work for each
              person and monitoring the work and showing the progess of each
              part that the team members are responsible
            </h1>
          </section>
        </div>

        <div className={styles.recommend_container_two}>
          <section className={styles.recommend_container_two_left}>
            <h1>
              use <span>'filter'</span> to categorize and prioritize you.
            </h1>
            <h1>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You can categorize tasks. And
              organize the sequence of tasks that must be performed according to
              the needs
            </h1>
          </section>
          <section className={styles.recommend_container_two_right}>
            <img src="/img/calendar-preview.PNG" alt="" />
          </section>
        </div>

        <div className={styles.endpage}>
          <section className={styles.calendar_container_right}>
            <h1>
              Join to Split <span>A</span>
              <span>C</span>
              <span>T.</span>
            </h1>
            <form
              className={styles.home_email_input}
              onSubmit={handleEmail}
              htmlFor="email"
            >
              {/* <span>Get start</span> */}
              <input type="email" name="email" placeholder="E-mail" />
              <button type="submit">Free - Register</button>
            </form>
          </section>
          <img src="/img/join2.png" alt="" />
        </div>
      </div>
    </PreventRoute>
  );
}
