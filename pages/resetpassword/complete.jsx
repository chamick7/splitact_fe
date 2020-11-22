import React from 'react'

import Footer_min from "../../Components/Footer_min";

import styles from "../../css/resetpassword_complete.module.css"
import Progressbar from "../../Components/Progressbar";
import progressstyles from "../../css/progressbar.module.css"

export default function resetpassword_complete() {

    return(
        <div className={styles.complete_body}>
            <Progressbar
            classWait1={progressstyles.done}
            classWait2={progressstyles.done}
            classWait3={progressstyles.done}
            classWait4={progressstyles.active}
            />
            <h1><span>Reset</span> Password Complete</h1>
            <h3>6101xxxx@kmitl.ac.th</h3>
            <button>Continue</button>
            <img src="/img/newpassword.png" alt=""/>
            <Footer_min/>
        </div>
    );
}