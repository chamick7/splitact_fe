import React from 'react';

import Footer_min from "../../Components/Footer_min";
import { useForm } from "react-hook-form";

import styles from "../../css/resetpassword.module.css";

export default function resetpassword() {
    const { register,handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data.email);
    }

    return (
        <div className={styles.reset_body} > 
            <div className={styles.header} >
                <p className={styles.h1} >Forgot Password ?</p>
                <p className={styles.h3} >just <span>reset</span> it.</p>
            </div>
            <span className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
                    <input type="email" name="email" placeholder="E-mail" ref={register} />
                    <input type="submit" value="Reset Password"/>
                </form>
            </span>
            <img src="/img/resetpassword.png" className={styles.img}/>
            <Footer_min />
        </div>
    )
}
