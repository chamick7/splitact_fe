import React from 'react'

import Loader from "../Components/loader"
import styles from "../css/loader.module.css"

export default function test() {

  return(
    <div className={styles.test}>
      <h1>aaaaaaaaaa</h1>
      <h1>aaaaaaaaaa</h1>
      <h1>aaaaaaaaaa</h1>
      <h1>aaaaaaaaaa</h1>
      <h1>aaaaaaaaaa</h1>
      <Loader/>
    </div>
    
  );
}