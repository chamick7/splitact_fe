import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { faUserAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { accountAtom } from "../atom";
import Cookies from "js-cookies";
import { useRecoilState } from "recoil";

import styles from "../css/dropdown.module.css";


export default function Dropdown() {
  const node = useRef();
  const [account, setAccount] = useRecoilState(accountAtom);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    Cookies.removeItem("token");
    setAccount({});
  };

  function DropItem(props) {
    return (
      <li className={styles.dropitem+" "+props.class} onClick={(e) => {setOpen(false)}} >
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
          {account.name ? (
            //not Login
            <>
              <li className={styles.dropitem,styles.logout_dropitem} onClick={handleLogout}>
                {" "}
                <FontAwesomeIcon
                  className={styles.logout_icon}
                  icon={faPowerOff}
                />{" "}
                Logout
              </li>
            </>
          ) : (
            //logined
            <>
              <DropItem
                class={styles.login_dropitem}
                to="/login"
                word="Login"
                icon={faSignInAlt}
              />
              <DropItem
                class={styles.register_dropitem}
                to="/register"
                word="Register"
                icon={faAddressBook}
              />
            </>
          )}
        </ul>
      </div>
    );
  }

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      console.log('click');
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
    <button ref={node} className={styles.btn_nav}  >
      <div  onClick={() => setOpen(!open)}  >
        <FontAwesomeIcon className={styles.nav_icon1} icon={faUserAlt} />
        <span>{account.name ? account.name : "Member"}</span>
        <FontAwesomeIcon className={styles.nav_icon2} icon={faCaretDown} />
      </div>
      {open && <DropdownMenu />}
    </button>
  );
}
