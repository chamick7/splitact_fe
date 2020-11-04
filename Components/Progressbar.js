import React from 'react'


import styles from "../css/progressbar.module.css"

export default function Progressbar(){
    


    return(
        <ol className={styles.progress}>
            <li className={styles.done}>
                <span className={styles.step}><span>1</span></span>
            </li>
            <li className={styles.done}>
                <span className={styles.step}><span>2</span></span>
            </li>
            <li className={styles.active}>
                <span className={styles.step}><span>3</span></span>
            </li>
            <li>
                <span className={styles.step}><span>4</span></span>
            </li>
        </ol>


    )
}