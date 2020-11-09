import React from 'react'

import Footer_min from "../../Components/Footer_min";

import styles from "../../css/resetpassword_failed.module.css"

export default function resetpassword_failed(){

    return(
    <div className={styles.failed_body}>
        <h1>Password Reset <span>Failed</span></h1>
        <h3>it was not possible to reset your password.</h3>
        <h3>This may happen if your token is invalid or expired.</h3>
        <div className={styles.button_container}>
            <button>Do it again</button>
            <button>Back to login</button>
        </div>
        <img src="/img/504error.png" alt=""/>
        <Footer_min/>
    </div>
    
    );
}