import React, { useState } from "react";
import Footer_min from "../../Components/Footer_min";
import { getAxios } from "../../utils/axios";
const axios = getAxios();
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Progressbar from "../../Components/Progressbar";
import progressstyles from "../../css/progressbar.module.css";
import styles from "../../css/newpassword.module.css";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  let email = null;
  const rsToken = ctx.query?.rstoken;

  try {
    await axios
      .get("/account/checktoken?rstoken=" + rsToken)
      .then((resp) => {
        email = resp.data.email;
      })
      .catch((err) => {
        if (err.response.status === 406) {
          ctx.res.writeHead(302, { Location: "/resetpassword/failed" });
          ctx.res.end();
        }
      });
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
  }

  return {
    props: {
      email: email,
      rsToken: rsToken,
    },
  };
}

export default function newPassword({ email, rsToken }) {
  const { register, errors, handleSubmit, watch } = useForm();
  const [err, setErr] = useState("");
  const router = useRouter();

  const onSubmit = (pwd) => {
    axios
      .post("/account/resetpassword", {
        rsToken: rsToken,
        newPassword: pwd.pwd,
      })
      .then((result) => {
        if (result.status === 200) {
          router.replace("/resetpassword/complete?email=" + email);
        }
      })
      .catch((err) => {
        console.log(err.response);
        // Router.replace("/resetpassword/failed");
      });
  };

  return (
    <div className={styles.newpassword_body}>
      <div className={styles.header}>
        <Progressbar
          classWait1={progressstyles.done}
          classWait2={progressstyles.done}
          classWait3={progressstyles.active}
          classWait4={progressstyles.wait}
        />
        <p className={styles.h1}>
          Reset <span>Password</span>
        </p>
        <p className={styles.h3}>{email}</p>
      </div>
      <span className={styles.container}>
        {err && <span className="err_msg">{err}</span>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {errors.pwd && errors.pwd.type === "required" && (
            <span className="err_msg">This field is required</span>
          )}
          {errors.pwd && errors.pwd.type === "minLength" && (
            <span className="err_msg">This field required min length 6</span>
          )}
          <input
            type="password"
            id="pwd1"
            name="pwd"
            placeholder="New-password"
            ref={register({
              required: "Required",
              minLength: 6,
            })}
          />
          {errors.cf_pwd && errors.cf_pwd.type === "required" && (
            <span className="err_msg">This field is required</span>
          )}
          {errors.cf_pwd && errors.cf_pwd.type === "validate" && (
            <span className="err_msg">Passwords not match</span>
          )}
          <input
            type="password"
            id="pwd2"
            name="cf_pwd"
            placeholder="Confirm-password"
            ref={register({
              required: "Required",
              validate: (value) => value === watch("pwd"),
            })}
          />
          <button type="submit" className={styles.reset}>
            Reset
          </button>
        </form>
      </span>
      <img src="/img/newpassword.png" className={styles.img} />
      <Footer_min />
    </div>
  );
}
