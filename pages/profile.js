import React from 'react'

import Footer_min from "../Components/Footer_min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import styles from "../css/profile.module.css"

import Cropper from 'react-easy-crop'

import Link from 'next/link';
import { accountAtom } from '../atom';
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useState,useRef } from 'react';
import { useForm } from "react-hook-form";

export default function profile(){

    const router = useRouter();
    const { handleSubmit, register, errors, watch } = useForm();
    const [account] = useRecoilState(accountAtom);
    const [name, setName] = useState(router.query.name)
    const [email, setEmail] = useState(router.query.email);

    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);

    const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };


    const ChangeName = useRef(null)
    const ChangeEmail = useRef(null)
  

    const handleChangeName = (e) =>{
        const name = e.target.value;
        setName(name)
    }
    const handleChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onSubmit = () =>{

    }


    return (
        

        <div className={styles.profile_body}>
            <div className={styles.top}>{account.name}'s Profile</div>
            <div className={styles.profile_info}>
                <div className={styles.info_left}>
                    <div className={styles.profile_container}>

                    <img 
                    ref={uploadedImage}
                    id="uploadedImage" src={uploadedImage} />

                    </div>

                    <input
                    onChange={handleImageUpload}  
                    ref={imageUploader}        
                    type="file" id="imageUpload" name="profile" accept="image/png,image/jpeg" />
                    
                    <button 
                    onClick= {() => imageUploader.current.click()} >
                    <FontAwesomeIcon icon={faEdit} /></button>
                </div>
                <form className={styles.info_right} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.info_line}>
                        
                        <button

                        onClick= {clickChangeName}>
                        <FontAwesomeIcon icon={faEdit}/>
                        </button>
                        <h2>Name : asff<span>{account.name}</span></h2>

                        <input
                        ref={ChangeName}
                        onChange = {handleChangeName}
                        name="username"
                        type="text"
                        value={account.name}
                        placeholder="Username"
                        />
                        
                    </div>
                    <div className={styles.info_line}>
                        
                        <button
                        onClick= {() => ChangeEmail.onclick()}>
                        <FontAwesomeIcon icon={faEdit}/></button>

                        <h2>Email : {account.email}</h2>
                        
                        
                        <input
                        ref={ChangeEmail}
                        onChange = {handleChangeEmail}
                        name="Email"
                        type="email"
                        value={account.email}
                        placeholder="Email"
                        />

                    </div>
                    <div className={styles.info_line}>
                        <Link href="/resetpassword"><button><FontAwesomeIcon icon={faEdit}/></button></Link>
                        <h2>Password</h2>
                    </div>
                    <button>Apply</button>
                </form>
            </div>
        <Footer_min/>
        </div>
    );
}