import React from 'react'

import styles from "../css/loader.module.css"


export default function Loader() {

  return(
    <div className={styles.load_body}>
        <div className={styles.loader}></div>
    </div>
  );
}