import React, { Children } from "react";
import { useEffect, useState } from "react";
import { getAxios } from "./axios";
import { useRouter } from "next/router";
const axios = getAxios();

export default function PreventRoute({ children }) {
  const router = useRouter();
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios
      .get("/account/auth")
      .then((resp) => {
        router.replace("/dashboard");
      })
      .catch((err) => {
        setRender(true);     
      });
  }, []);

  if (render) {
    return children;
  } else {
    return <></>;
  }
}
