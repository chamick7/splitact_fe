import React from "react";
import Link from "next/link";

import Dropdown from "./Dropdown";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
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
