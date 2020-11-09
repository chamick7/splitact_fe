import React from 'react'

import styles from "../css/progressbar.module.css"

export default function Progressbar({ classWait1,classWait2,classWait3,classWait4 }){
    

    return(
        <ol className={styles.progress}>
            <li className={classWait1}>
                <span className={styles.step}><span>1</span></span>
            </li>
            <li className={classWait2}>
                <span className={styles.step}><span>2</span></span>
            </li>
            <li className={classWait3}>
                <span className={styles.step}><span>3</span></span>
            </li>
            <li className={classWait4}>
                <span className={styles.step}><span>4</span></span>
            </li>
        </ol>
    )
}
