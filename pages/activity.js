import { useEffect } from "react";
import { getAxios } from "../utils/axios";
import ProtectRoute from "../utils/ProtectRoute";

export default function activity() {
  const axios = getAxios();

  useEffect(() => {
    
  }, [])

  return <ProtectRoute>
    <h1>Hello</h1>
  </ProtectRoute>;
}
