import React from 'react';
import Link from "next/link";


import styles from "../css/footer_min.module.css";

export default function Footer_min() {
    return (
        <footer className={styles.footer} >
            <Link href="" ><a>Help</a></Link>
            <Link href="" ><a>Report</a></Link>
            <Link href="" ><a>Contact</a></Link>
            <Link href="" ><a>About</a></Link>
        </footer>
    )
}
