import React from 'react';

import Footer_min from "../Components/Footer_min";
import { useForm } from "react-hook-form";

import styles from "../css/resetpassword.module.css";

export default function resetpassword() {
    const { register,handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data.email);
    }

    return (
        <div className={styles.reset_body} > 
            <div className={styles.header} >
                <h1 className={styles.h1} >Forgot Password ?</h1>
                <h3 className={styles.h3} >just <span>reset</span> it.</h3>
            </div>
            <span className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
                    <input type="email" name="email" placeholder="E-mail" ref={register} />
                    <input type="submit" value="Reset Password"/>
                </form>
            </span>
            <Footer_min />
        </div>
    )
}
