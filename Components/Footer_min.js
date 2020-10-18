import React from 'react';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle,faExclamationTriangle,faAddressBook,faInfoCircle } from "@fortawesome/free-solid-svg-icons";


import styles from "../css/footer_min.module.css";

export default function Footer_min() {
    return (
        <footer className={styles.footer} >
            <Link href="/help" ><a><FontAwesomeIcon icon={faQuestionCircle} /> <span>Help</span></a></Link>
            <Link href="/report" ><a><FontAwesomeIcon icon={faExclamationTriangle} /> <span>Report</span></a></Link>
            <Link href="/contact" ><a><FontAwesomeIcon icon={faAddressBook} /> <span>Contact</span></a></Link>
            <Link href="/about" ><a><FontAwesomeIcon icon={faInfoCircle} /> <span>About</span></a></Link>
        </footer>
    )
}
