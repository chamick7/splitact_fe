import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAxios } from "../utils/axios";
const axios = getAxios();

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

import styles from "../css/contact.module.css";
import { useState } from "react";

export default function contact() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const email = router.query.email;
  const [status, setStatus] = useState();

  const onSubmitSend = (data) => {
    setStatus();
    axios
      .post("/contact", {
        email: data.email,
        name: data.name,
        subject: data.subject,
        data: data.data,
      })
      .then((result) => {
        reset();
        setStatus("success");
      })
      .catch((err) => {
        reset();
        setStatus("error");
      });
  };

  return (
    <div className={styles.contact_body}>
      <h1>
        Contact <span>u</span>
        <span>s</span>
      </h1>
      {status === "success" && (
        <div className={styles.status_container + " " + styles.status_success}>
          Your problem / feedback has been sent.
        </div>
      )}

      {status === "error" && (
        <div className={styles.status_container + " " + styles.status_error}>
          Something went wrong, please try again later.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmitSend)} className={styles.form}>
        <input
          type="email"
          name="email"
          id="c_email"
          placeholder="E-mail"
          ref={register({
            required: "Required",
          })}
        />
        <input
          type="text"
          name="name"
          id="c_name"
          placeholder="Name"
          ref={register({
            required: "Required",
          })}
        />
        <input
          type="text"
          name="subject"
          id="c_subject"
          placeholder="Subject"
          ref={register({
            required: "Required",
          })}
        />
        <input
          type="text"
          name="data"
          id="c_body"
          placeholder="Body"
          ref={register({
            required: "Required",
          })}
        />
        <div className={styles.bt}>
        <button type="submit">Send</button>
        </div>
      </form>

      <h2>
        <span> or </span>
      </h2>
      <div className={styles.link}>
        <Link href="https://www.facebook.com/Split-ACT-103106474975162">
          <a>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </Link>
        <Link href="https://www.instagram.com/splitact/">
          <a>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </Link>
        <Link href="https://twitter.com/Split_ACT">
          <a>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </Link>
        <a href="mailto: splitact.contact@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} />
        </a>
      </div>
    </div>
  );
}
