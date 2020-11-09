import React from 'react'

import styles from "../../css/resetpassword_failed.module.css"

export default function resetpassword_failed(){

    return(
    <div className={styles.failed_body}>
        <h1>Password Reset <span>Failed</span></h1>
        <h3>it was not possible to reset your password.</h3>
        <h3>This may happen if your token is invalid or expired.</h3>
        <button></button>
    </div>
    
    );
}