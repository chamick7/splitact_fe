import React, { Children } from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { accountAtom } from "../atom";
import { getAxios } from "./axios";
import { useRouter } from "next/router";
const axios = getAxios();

export default function ProtectRoute({ children }) {
  const router = useRouter();
  const [haveAccount, setHaveAccount] = useState(false);

  useEffect(() => {
    axios
      .get("/account/auth")
      .then((resp) => {
        setHaveAccount(true);
      })
      .catch((err) => {
        router.replace("/login");
      });
  }, []);

  if (haveAccount) {
    return children;
  } else {
    return <></>;
  }
}
