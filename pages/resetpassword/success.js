import React from 'react'
import { useRouter } from "next/router";
import Footer_min from "../../Components/Footer_min";

import styles from "../../css/resetsuccess.module.css"

export default function resetSuccess() {
    const router = useRouter();
    const email = router.query.email;


    return (
        <div className={styles.resetsuccess_body}>
            <div className={styles.header}>
                <p className={styles.h1}>Password <span>Reset</span> Email Sent</p>
                <p className={styles.h3}>An email has been sent to your rescue email address,
                {email || ''}  Follow the directions in the email to reset password</p>
            </div>
            <div className={styles.container}>
                <button className={styles.done}>Done</button>
            </div>
            <img src="/img/succcesss.png" className={styles.img}/>
            <Footer_min />
        </div>
    )
}
