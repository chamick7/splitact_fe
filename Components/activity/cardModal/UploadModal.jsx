import style from "../../../css/cardModal.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getAxios } from "../../../utils/axios";
const axios = getAxios();

export default function UploadModal({ setUploadModal, cardId, sendToUpload }) {
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {};

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
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
      })
      .then((result) => {
        sendToUpload(result.data.files)
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
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          maxSizeBytes={10485760}
          maxFiles={5}
          accept="image/jpeg,image/png,.pdf,.docx,.doc,.xlsx,.xls"
          submitButtonContent="Upload"
        />
      </div>
    </div>
  );
}
