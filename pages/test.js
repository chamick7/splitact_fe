import Axios from "axios";
import { useEffect } from "react";
import { getAxios } from "../utils/axios";
import ChatModule from "../Components/ChatModule";
import Link from "next/link";
import ProtectRoute from "../utils/ProtectRoute";

const axios = getAxios();

export default function Test() {
  return (
    <ProtectRoute>
      <h1>Hello</h1>
    </ProtectRoute>
  );
}
