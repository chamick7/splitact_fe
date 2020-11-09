import React from 'react'
import Footer_min from "../../Components/Footer_min";

import styles from "../../css/newpassword.module.css"
import Progressbar from "../../Components/Progressbar";
import progressstyles from "../../css/progressbar.module.css"

export default function newPassword() {
    return (
        <div className={styles.newpassword_body}>
        <div className={styles.header}>
        <Progressbar
        classWait1={progressstyles.done}
        classWait2={progressstyles.done}
        classWait3={progressstyles.active}
        classWait4={progressstyles.wait}
        />
            <p className={styles.h1}>Reset <span>Password</span></p>
            <p className={styles.h3}>6101xxxx@kmitl.ac.th</p>
        </div>
        <span className={styles.container}>
                <form className={styles.form}>
                    <input type="password" id="pwd1" name="pwd" placeholder="New-password"/>
                    <input type="password" id="pwd2" name="cf_pwd" placeholder="Confirm-password"/>
                    <button type="submit" className={styles.reset}>Reset</button>
                </form>
        </span>
        <img src="/img/newpassword.png" className={styles.img}/>
            <Footer_min />
    </div>
    )
}