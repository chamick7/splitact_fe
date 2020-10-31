import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faPowerOff,
  faAddressCard,
  faUsers,
  faExclamationCircle,
  faInfoCircle,
  faPager,
} from "@fortawesome/free-solid-svg-icons";
import {
  faComments,
  faEdit,
  faQuestionCircle,
  faAddressBook,
} from "@fortawesome/free-regular-svg-icons";
import { faUserAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { accountAtom } from "../atom";
import Cookies from "js-cookies";
import { useRecoilState } from "recoil";
import getAxios from "../utils/axios";

import styles from "../css/dropdown.module.css";

export default function Dropdown() {
  const axios = getAxios();
  const node = useRef();
  const router = useRouter();
  const [account, setAccount] = useRecoilState(accountAtom);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    router.replace('/');

    axios
      .get("/account/logout")
      .then((res) => {
        if(res){
          console.log(res.data);
          setAccount({});
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  function DropProfile() {
    if (account.name) {
      return (
        <li className={styles.profile} onClick={() => setOpen(false)}>
          <Link href="/">
            <a>{account.name}</a>
          </Link>
        </li>
      );
    } else {
      return (
        <li className={styles.profile} onClick={() => setOpen(false)}>
          <Link href="/login">
            <a>
              <FontAwesomeIcon icon={faSignInAlt} />
              SignIn or Register
            </a>
          </Link>
        </li>
      );
    }
  }

  function DropItem(props) {
    if (props.type) {
      return (
        <li
          className={styles.dropitem}
          onClick={(e) => {
            handleLogout();
            setOpen(false);
          }}
        >
          <Link href="">
            <a>
              {" "}
              <FontAwesomeIcon icon={props.icon} /> {props.word}
            </a>
          </Link>
        </li>
      );
    } else
      return (
        <li
          className={styles.dropitem}
          onClick={(e) => {
            setOpen(false);
          }}
        >
          <Link href={props.to}>
            <a>
              {" "}
              <FontAwesomeIcon icon={props.icon} /> {props.word}
            </a>
          </Link>
        </li>
      );
  }

  function DropdownMenu() {
    return (
      <div className={styles.dropdown}>
        <ul className={styles.dropmenu}>
          <DropProfile />

          {account.name ? (
            <>
              <DropItem icon={faAddressCard} word="Profile" to="/profile" />
              <DropItem icon={faComments} word="Chat" to="/chat" />
            </>
          ) : (
            <></>
          )}

          <hr className={styles.hr} />

          {account.name ? (
            <>
              <DropItem icon={faEdit} word="Activity" to="/dashboard" />
              <DropItem icon={faUsers} word="Teams" to="/dashboard" />

              <hr className={styles.hr} />
            </>
          ) : (
            <></>
          )}

          <DropItem icon={faQuestionCircle} word="Help" to="/help" />
          <DropItem icon={faExclamationCircle} word="Report" to="/report" />
          <DropItem icon={faAddressBook} word="Contact" to="/contact" />
          <DropItem icon={faPager} word="About" to="/about" />

          {account.name ? (
            <>
              <hr className={styles.hr} />
              <DropItem
                icon={faPowerOff}
                word="Sign out"
                type="logout"
                to="/"
              />
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    );
  }

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <button ref={node} className={styles.btn_nav}>
      <div onClick={() => setOpen(!open)}>
        <FontAwesomeIcon className={styles.nav_icon1} icon={faUserAlt} />
        <span>{account.name ? account.name : "Member"}</span>
        <FontAwesomeIcon className={styles.nav_icon2} icon={faCaretDown} />
      </div>
      {open && <DropdownMenu />}
    </button>
  );
}
