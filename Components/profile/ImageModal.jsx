import style from "../../css/profile.module.css";
import { getAxios } from "../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const axios = getAxios();

import ReactAvatarEditor from "react-avatar-editor";
import { useState } from "react";

export default function ImageModal({ account, setImageModal }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [image, setImage] = useState("/img/mikusan.jpg");
  const [newImage, setNewImage] = useState();
  const [editor, setEditor] = useState();

  const exportImage = async () => {
    if (image) {
      const img = editor.getImageScaledToCanvas();
      img.toBlob(
        (blob) => {
          const data = new FormData();

          data.append("file", blob, account.acID + ".jpg");

          axios.post("/file/img/upload", data);
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
    setImage(e.target.files[0]);
  };

  const setRef = (editor) => setEditor(editor);

  return (
    <div className="background_modal">
      <div className={style.image_modal}>
        <div className={style.modal_header}>
          <h3>Upload image</h3>
          <span
            onClick={() => {
              setImageModal(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <img src={newImage} alt="" />
        <ReactAvatarEditor
          ref={setRef}
          scale={scale}
          width={500}
          height={500}
          position={position}
          onPositionChange={handlePosition}
          rotate={0}
          borderRadius={100}
          image={image}
          className={style.selection}
        />
        <input
          type="range"
          name="scale"
          min="0.8"
          max="2"
          step="0.01"
          defaultValue="1"
          onChange={handleScale}
          image={image}
        />

        <input
          type="file"
          name="image"
          onChange={handleImage}
          accept="image/jpeg, image/png"
        />

        <button
          onClick={() => {
            exportImage();
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
