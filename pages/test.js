import Axios from "axios";
import { useEffect } from "react";
import {getAxios} from "../utils/axios";
import ChatModule from "../Components/ChatModule";
import Link from "next/link"

const axios = getAxios();

export default function Test() {
  return <ChatModule>
     <h1>Hello my test1</h1>
     <Link  href="/test2"><a>Test2</a></Link>
  </ChatModule>;
}
