import React from 'react'


import Footer_min from "../Components/Footer_min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import styles from "../css/profile.module.css"

import Cropper from 'react-easy-crop'

import Link from 'next/link';
import { accountAtom } from '../atom';
import { useRecoilState } from "recoil";




export default function profile(){


    const [account] = useRecoilState(accountAtom);



    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

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

    return (
        

        <div className={styles.profile_body}>
            <div className={styles.top}>{account.name}'s Profile</div>
            <div className={styles.profile_info}>
                <div className={styles.info_left}>
                    <div className={styles.profile_container}>
                    <img 
                    ref={uploadedImage}
                    id="uploadedImage" src="/img/profile.png" />
                    </div>
                    <input
                    onChange={handleImageUpload}  
                    ref={imageUploader}        
                    type="file" id="imageUpload" name="profile" accept="image/png,image/jpeg" />
                    <button 
                    onClick= {() => imageUploader.current.click()} >
                    <FontAwesomeIcon icon={faEdit} /></button>
                </div>
                <form className={styles.info_right}>
                    <div className={styles.info_line}>
                        <button>
                        <FontAwesomeIcon icon={faEdit}/></button>
                        <h2>Name : <span>{account.name}</span></h2>
                    </div>
                    <div className={styles.info_line}>
                        <button>
                        <FontAwesomeIcon icon={faEdit}/></button>
                        <h2>Email : {account.email}</h2>
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