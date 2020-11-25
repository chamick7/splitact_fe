import style from "../../css/profile.module.css";
import { getAxios } from "../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const axios = getAxios();
import Router from "next/router";
import { accountAtom } from "../../atom";
import Loader from "../Loader";

import ReactAvatarEditor from "react-avatar-editor";
import { useState } from "react";

export default function ImageModal({ account, setImageModal }) {
  const [accountData, setAccountData] = useState(accountAtom);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState();
  const [editor, setEditor] = useState();
  const [loader, setLoader] = useState(false);
  const [canUpload, setCanUpload] = useState(true);
  const [err, setErr] = useState("");

  const exportImage = async () => {
    setLoader(true);
    if (image) {
      const img = editor.getImageScaledToCanvas();
      const imageName = Date.now() + "-" + account._id + ".jpg";
      img.toBlob(
        (blob) => {
          const data = new FormData();
          data.append("imageName", imageName);
          data.append("file", blob, imageName);

          axios
            .post("/file/img/upload", data, {
              onUploadProgress: (progressEvent) =>
                console.log(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                ),
            })
            .then((result) => {
              Router.reload(window.location.pathname);
            })
            .catch((err) => {
              Router.reload(window.location.pathname);
              s;
            });
        },
        "image/png",
        1
      );
    }
  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  const handlePosition = (position) => {
    setPosition(position);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file.size > 5242880) {
      setCanUpload(false);
      setErr("Please upload a file smaller than 5 MB");
    } else {
      setCanUpload(true);
      setErr();
    }
  };

  const setRef = (editor) => setEditor(editor);

  return (
    <div className="background_modal">
      <div className={style.image_modal}>
        <div className={style.modal_header}>
          <h3>Change Profile Picture</h3>
          <span
            onClick={() => {
              setImageModal(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={style.upload_container}>
          {loader && <Loader />}

          <ReactAvatarEditor
            ref={setRef}
            scale={scale}
            width={500}
            height={500}
            position={position}
            onPositionChange={handlePosition}
            rotate={0}
            borderRadius={500}
            image={image}
            className={style.selection}
          />
          <div className={style.modal_bar}>
            <input
              type="range"
              name="scale"
              min="0.8"
              max="2"
              step="0.01"
              defaultValue="1"
              onChange={handleScale}
              image={image}
              style={{ zIndex: 1 }}
            />
          </div>
          <input
            className={style.Uploader}
            id="file"
            type="file"
            name="image"
            onChange={handleImage}
            accept="image/jpeg, image/png"
          />
          <label className={style.for_Uploader} htmlFor="file">
            Upload
          </label>
          <div style={{ textAlign: "center" }}>
            {err ? <h6 style={{ margin: "0px" }} className="err_msg">{err}</h6> : null}
          </div>
          <div className={style.modal_tail}>
            {canUpload && (
              <button
                onClick={() => {
                  exportImage();
                }}
              >
                Apply
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
