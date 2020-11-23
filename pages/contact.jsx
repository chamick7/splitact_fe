import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF,faInstagram,faTwitter} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import styles from "../css/contact.module.css"

export default function contact() {
    const router = useRouter();
    const email = router.query.email;


    return (
        <div className={styles.contact_body}>
            <h1>Contact <span>u</span><span>s</span></h1>
            <form className={styles.form}>
                <input type="Email" name="Email" id="c_email" placeholder="E-mail" />
                <input type="text" name="Name" id="c_name" placeholder="Name" />
            </form>
            <form className={styles.form}>
                <input type="text" name="Subject" id="c_subject" placeholder="Subject" />
                <input type="text" name="Body" id="c_body" placeholder="Body" />
            </form>
            <button type="submit" >Send</button>
            <h2><span> or </span></h2>
            <div className={styles.link}>
            <Link href="/"><a><FontAwesomeIcon icon={faFacebookF} /></a></Link>
            <Link href="/"><a><FontAwesomeIcon icon={faInstagram} /></a></Link>
            <Link href="/"><a><FontAwesomeIcon icon={faTwitter} /></a></Link>
            <Link href="/"><a><FontAwesomeIcon icon={faEnvelope} /></a></Link>
            </div>
        </div>
    )
}

