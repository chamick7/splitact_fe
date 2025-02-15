import React, { useState } from "react";

import Footer_min from "../../Components/Footer_min";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { getAxios } from "../../utils/axios";

import styles from "../../css/resetpassword.module.css";
import Progressbar from "../../Components/Progressbar";
import progressstyles from "../../css/progressbar.module.css"

export default function resetpassword() {
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState("");
  const axios = getAxios();
  const router = useRouter();

  const sendMail = (email) => {
    console.log(email);
    axios
      .post("/account/forgotpw", { email: email })
      .then((res) => {
        if (res.data.status === "Success") {
          router.push({
            pathname: "/resetpassword/success",
            query: { email: email },
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setErr("No email address registered");
        }
      });
  };

  const onSubmit = (data) => {
    sendMail(data.email);
  };

  return (
    <div className={styles.reset_body}>
      <Progressbar
        classWait1={progressstyles.active}
        classWait2={progressstyles.wait}
        classWait3={progressstyles.wait}
        classWait4={progressstyles.wait}
        /> 
      <div className={styles.header}>
        <p className={styles.h1}>Forgot Password ?</p>
        <p className={styles.h3}>
          just <span>reset</span> it.
        </p>
      </div>
      <span className={styles.container}>
          {err && <div className={styles.err_msg} style={{ textAlign: "center"}}><span>{err}</span></div> }
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            ref={register}
          />
          <input type="submit" value="Reset Password" />
        </form>
      </span>
      <img src="/img/resetpassword.png" className={styles.img} />
      <Footer_min />
    </div>
  );
}
