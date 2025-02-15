import style from "../../../css/cardModal.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getAxios } from "../../../utils/axios";
import Loader from "../../Loader";
import { useState } from "react";

const axios = getAxios();

export default function UploadModal({ setUploadModal, cardId, sendToUpload }) {
  const [loader, setLoader] = useState(false);

  const getUploadParams = ({ meta }) => {
    // return { url: "http://localhost:5000/file/upload" };
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {};

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    setLoader(true);
    const form = new FormData();
    form.append("cardId", cardId);

    files.map((file) => {
      form.append("file", file.file, Date.now() + "-" + file.meta.name);
    });

    axios
      .post("/file/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (ProgressEvent) => {
          console.log(
            Math.round(100 * ProgressEvent.loaded) / ProgressEvent.total
          );
        },
      })
      .then((result) => {
        sendToUpload(result.data.files);
        setLoader(false);
      })
      .catch((err) => {
      });

    // console.log(allFiles);
    // allFiles.forEach((f) => f.remove());
  };
  return (
    <div className={style.upload_modal}>
      <div className={style.upload_header}>
        <h3>Select File</h3>
        <span
          onClick={() => {
            setUploadModal(false);
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faTimes} />{" "}
        </span>
      </div>
      <div className={style.upload_body}>
        {loader && <Loader />}
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          maxSizeBytes={10485760}
          maxFiles={3}
          accept="image/jpeg,image/png,.pdf,.docx,.doc,.xlsx,.xls"
          submitButtonContent="Upload"
        />
      </div>
    </div>
  );
}
