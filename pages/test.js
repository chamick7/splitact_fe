import React from 'react'


import Footer_min from "../Components/Footer_min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import styles from "../css/profile.module.css"

import Cropper from 'react-easy-crop'

export default function profile(){

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


//   const onCropChange = (crop) => {
//     this.setState({ crop })
//   }

//   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//     console.log(croppedAreaPixels.width / croppedAreaPixels.height)
//   }

//   const onZoomChange = (zoom) => {
//     this.setState({ zoom })
//   }

    return (
        

        <div className={styles.profile_body}>
            <div className={styles.top}>INWZA007's Profile</div>
            <div className={styles.profile_info}>
                <div className={styles.info_left}>
                    <div className={styles.profile_container}>
                    <img 
                    ref={uploadedImage}
                    id="uploadedImage" src="/img/profile.png" />
                    </div>
                    {/* <Cropper
                    image = {this.imageUploader}
                    crop = {this.crop}
                    zoom = {this.zoom}
                    aspect = {this.aspect}
                    cropShape = "round"
                    showGrid = {false}
                    onCropChange = {this.onCropChange}
                    onCropComplete = {this.onCropComplete}
                    onZoomChange = {this.onZoomChange}
                    /> */}
                    <input
                    onChange={handleImageUpload}  
                    ref={imageUploader}        
                    type="file" id="imageUpload" name="profile" accept="image/png,image/jpeg" />
                    <button 
                    onClick= {() => imageUploader.current.click()} >
                    <FontAwesomeIcon icon={faEdit} /></button>
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
    );
}