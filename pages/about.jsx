import React from 'react'
import { useRouter } from "next/router"
import Link from "next/link"

import styles from "../css/about.module.css"
import Footer_min from '../Components/Footer_min';


export default function about(){
    const router = useRouter();

    const handleEmail = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        console.log(email);
    
        router.push({
          pathname:"/register",
          query:{
            email:email,
          }
        })
      }

    function Info(){
        return(
            <div className={styles.about_container}>
            <section className={styles.about_container_block}>
                <img src="/img/about_calender.png" alt=""/>
                <h3>Split-ACT is a web / app developed as a tool to assist in work / activites.</h3>
            </section>
            <section className={styles.about_container_block}>
                <img src="/img/about_activity.png" alt=""/>
                <h3>Split-ACT helps to divide things that need to be meade into parts.</h3>
            </section>
            <section className={styles.about_container_block}>
                <img src="/img/about_chat.png" alt=""/>
                <h3>And make members responsible for their own duties.</h3>
            </section>
            <section className={styles.about_container_block}>
                <img src="/img/about_upload.png" alt=""/>
                <h3>It can also track individual progress.</h3>
            </section>
            </div>
        );
    }

    return(
        <div className={styles.about_body}>
            <h1>About Split <span>A</span><span>C</span>T</h1>
            <Info />
            <hr/>
            <h1>Dev's Split <span>A</span><span>C</span>T</h1>
            <img src="/img/allmember.png" alt="member"/>
        <div className={styles.about_logo}>
            <img src="/img/kmitl-logo.png" alt="kmitl_logo"/>
            <img src="/img/ite-logo.png" alt="ite_logo"/>
            <section><h4>We are students in</h4>
            <h4>King Mongkut's Institute of Technology Ladkrabang,</h4>
            <h4>Faculty of Engineering in Information Engineering,</h4>
            <h4>studying in the 3rd year.</h4></section>
        </div>
            <hr/>
        <div className={styles.about_bottom}>
            <h1>Welcome to Split <span>A</span><span>C</span>T,</h1>
            <h2>Register and Start your ACT.</h2>
            <form className={styles.about_email_input}  onSubmit={handleEmail} htmlFor="email">
            <input type="email" name="email" placeholder="E-mail" />
            <button type="submit" >Free - Register</button>
            <h4>Already have an account?{" "}<Link href="/login"><a>Sign in now</a></Link></h4>
            </form>
        </div>

        </div>
        
    );

}