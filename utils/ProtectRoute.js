import React, { Children } from "react";
import { useEffect, useState } from "react";
import { getAxios } from "./axios";
import { useRouter } from "next/router";
const axios = getAxios();
import Router from "next/router";

export default function ProtectRoute({ children }) {
  const [haveAccount, setHaveAccount] = useState(false);

  useEffect(() => {
    axios
      .get("/account/auth")
      .then((resp) => {
        setHaveAccount(true);
      })
      .catch((err) => {
        Router.replace("/login");
      });
  }, []);

  if (haveAccount) {
    return children;
  } else {
    return <></>;
  }
}
