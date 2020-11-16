import React from 'react'


import Footer_min from "../Components/Footer_min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import styles from "../css/profile.module.css"



export default function profile(){

    return(
    
        <div className={styles.profile_body}>
            <div className={styles.top}>INWZA007's Profile</div>
            <div className={styles.profile_info}>
                <div className={styles.info_left}>
                    <div className={styles.profile_container}>
                    <img id="profileImage" src="/img/miku_profile.jpg" />
                    </div>
                    <input type="file" id="imageUpload" name="profile" required="" capture/>
                    <button><FontAwesomeIcon icon={faEdit} /></button>
                </div>
                <div className={styles.info_right}>
                    <h2><span><FontAwesomeIcon icon={faEdit} /></span> Name : INWZA007</h2>
                    <h2><span><FontAwesomeIcon icon={faEdit} /></span> Email : INWZA007@splitact.com</h2>
                    <h2><span><FontAwesomeIcon icon={faEdit} /></span> Password</h2>
                    <button>Apply</button>
                </div>
            </div>
        <Footer_min/>
        </div>
    )
}