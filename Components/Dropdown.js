import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { faUserAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { accountAtom } from "../atom";
import Cookies from "js-cookies";
import { useRecoilState } from "recoil";

export default function Dropdown() {
  const node = useRef();
  const [account, setAccount] = useRecoilState(accountAtom);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    Cookies.removeItem("token");
    setAccount({});
    localStorage.removeItem("recoil-persist");
  };

  function DropItem(props) {
    return (
      <li className={"dropitem " + props.class}>
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
      <div className="dropdown">
        <ul className="dropmenu">
          {account.name ? (
            //not Login
            <>
              <li className={"dropitem logout-dropitem"} onClick={handleLogout}>
                {" "}
                <FontAwesomeIcon
                  className="logout-icon"
                  icon={faPowerOff}
                />{" "}
                Logout
              </li>
            </>
          ) : (
            //logined
            <>
              <DropItem
                class="login-dropitem"
                to="/login"
                word="Login"
                icon={faSignInAlt}
              />
              <DropItem
                class="register-dropitem"
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
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <button ref={node} className="btn-nav" onClick={(e) => setOpen(!open)}>
      <FontAwesomeIcon className="nav-icon1" icon={faUserAlt} />
      <span>{account.name ? account.name : "Member"}</span>
      <FontAwesomeIcon className="nav-icon2" icon={faCaretDown} />

      {open && <DropdownMenu />}
    </button>
  );
}
