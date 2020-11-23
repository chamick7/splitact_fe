import React from "react";

import Footer_min from "../../Components/Footer_min";

import styles from "../../css/resetpassword_complete.module.css";
import Progressbar from "../../Components/Progressbar";
import progressstyles from "../../css/progressbar.module.css";
import Router from "next/router";
import { useState } from "react";

export function getServerSideProps({ query }) {
  return {
    props: {
      email: query.email,
    },
  };
}

export default function resetpassword_complete({ email }) {
  return (
    <div className={styles.complete_body}>
      <Progressbar
        classWait1={progressstyles.done}
        classWait2={progressstyles.done}
        classWait3={progressstyles.done}
        classWait4={progressstyles.active}
      />
      <h1>
        <span>Reset</span> Password Complete
      </h1>
      <h3>{email}</h3>
      <button
        onClick={() => {
          Router.replace("/login");
        }}
      >
        Continue
      </button>
      <img src="/img/newpassword.png" alt="" />
      <Footer_min />
    </div>
  );
}
