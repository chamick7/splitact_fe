import React from "react";
import Link from "next/link";
import { useMemo,useEffect } from "react";
import { useRecoilState } from "recoil";
import getAxios from "../utils/axios";

import { accountAtom } from "../atom";

import Dropdown from "./Dropdown";

export default function Navbar() {

  const axios = getAxios();
  const [account, setAccount] = useRecoilState(accountAtom)

  useEffect(() => {
    axios.get('/account/auth')
    .then(res => {
        setAccount(res.data.account);
    })
    .catch(err => {
    })
}, [])
  return (
    <nav className="navbar">
      <Link href={account.name? "/dashboard":"/"} >
        <a>
          <img src="/img/S_A_logo.png" alt="Loading LOGO" />{" "}
          <span>
            Split <span>A</span>
            <span>C</span>
            <span>T</span>
          </span>
        </a>
      </Link>
      <Dropdown />
    </nav>
  );
}
