import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faPowerOff,
  faAddressCard,
  faExclamationCircle,
  faInfoCircle,
  faPager,
} from "@fortawesome/free-solid-svg-icons";
import {
  faComments,
  faEdit,
  faAddressBook,
} from "@fortawesome/free-regular-svg-icons";
import { faUserAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { accountAtom } from "../atom";
import { useRecoilState } from "recoil";
import { getAxios } from "../utils/axios";

import styles from "../css/dropdown.module.css";

export default function Dropdown() {
  const axios = getAxios();
  const node = useRef();
  const router = useRouter();
  const [account, setAccount] = useRecoilState(accountAtom);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    axios
      .get("/account/logout")
      .then((res) => {
        if (res) {
          setAccount({});
          router.replace("/");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  function DropProfile() {
    if (account.username) {
      return (
        <li className={styles.profile} onClick={() => setOpen(false)}>
          <Link href="/profile/me">
            <a>{account.username}</a>
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

          {account.username ? (
            <>
              <DropItem icon={faAddressCard} word="Profile" to="/profile/me" />
              <DropItem icon={faComments} word="Chat" to="/chat" />
            </>
          ) : (
            <></>
          )}

          <hr className={styles.hr} />

          {account.username ? (
            <>
              <DropItem icon={faEdit} word="Activity" to="/dashboard" />

              <hr className={styles.hr} />
            </>
          ) : (
            <></>
          )}

          <DropItem icon={faAddressBook} word="Contact" to="/contact" />
          <DropItem icon={faInfoCircle} word="About" to="/about" />

          {account.username ? (
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
      <div
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => setOpen(!open)}
      >
        {account.username ? (
          <img
            style={{
              width: "30px",
              height: "30px",
              margin: "0 5px",
              borderRadius: "50%",
              
            }}
            src={account.img}
            alt=""
            draggable="false"
          />
        ) : (
          <FontAwesomeIcon className={styles.nav_icon1} icon={faUserAlt} />
        )}
        <span>{account.username ? account.username : "Member"}</span>
        <FontAwesomeIcon className={styles.nav_icon2} icon={faCaretDown} />
      </div>
      {open && <DropdownMenu />}
    </button>
  );
}
