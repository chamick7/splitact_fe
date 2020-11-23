import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPager,
  faCalendarAlt,
  faDownload,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import update from "immutability-helper";
import style from "../../../css/cardModal.module.css";

import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import UploadModal from "./UploadModal";
import { getAxios } from "../../../utils/axios";
const axios = getAxios();

export default function DataCardModal({
  currentCard,
  setDataCardModal,
  uploadCard,
}) {
  const [fileImg, setFileImg] = useState([]);
  const [fileFile, setFileFile] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);

  const sendToUpload = (files) => {
    setUploadModal(false);
    uploadCard(files);
  };

  const imgType = [".jpg", ".png", ".jpeg"];
  const fileTyle = [".pdf", ".doc", ".docx", ".xls", ".ppt", ".pptx"];
  let cloneImg = fileImg.slice();
  let cloneFile = fileFile.slice();

  useEffect(() => {
    //   console.log(currentCard.files);
    verifyFiles(currentCard.files);
  }, [currentCard]);

  const verifyFiles = (files) => {
    files.map((file) => {
      let fileNameArray = file.toLowerCase().split(".");
      let fileLast = fileNameArray[fileNameArray.length - 1];

      if (imgType.some((type) => type == "." + fileLast)) {
        cloneImg.push(file);
        setFileImg(cloneImg);
      } else if (fileTyle.some((type) => type == "." + fileLast)) {
        cloneFile.push(file);
        setFileFile(cloneFile);
      }
    });
  };

  return (
    <div className="background_modal">
      <div className={style.data_modal}>
        <div
          style={{ backgroundColor: currentCard.color }}
          className={style.data_header}
        >
          <h2>
            {" "}
            <FontAwesomeIcon icon={faPager} /> {currentCard.cardName}
          </h2>
          <span
            onClick={() => {
              setDataCardModal(false);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faTimes} />{" "}
          </span>
        </div>
        <div className={style.data_body}>
          <div className={style.data_top}>
            <p>{currentCard.cardDescription}</p>
          </div>
          <div className={style.data_info}>
            <span
              style={{ color: currentCard.color }}
              className={style.data_date}
            >
              {" "}
              <FontAwesomeIcon icon={faCalendarAlt} />{" "}
              {currentCard.dueDate ? (
                <span>{moment(currentCard.dueDate).format("DD/MM/YYYY")}</span>
              ) : null}
            </span>
            {currentCard.workerId ? (
              <>
                <span className={style.data_worker}>
                  <img src={currentCard.workerId.img} alt="" />
                  <span>{currentCard.workerId.username}</span>
                </span>
              </>
            ) : null}
          </div>
          <div className={style.data_modal_container}>
            {uploadModal && (
              <UploadModal
                sendToUpload={sendToUpload}
                cardId={currentCard._id}
                setUploadModal={setUploadModal}
              />
            )}
          </div>
          <div className={style.data_file}>
            <ul>
              {fileImg.map((file, index) => {
                //   console.log(file);
                const fileName = file.split("/")[file.split("/").length - 1];

                return (
                  <li className={style.file_item} key={index}>
                    <span>
                      -
                      <img src={file} alt="" />
                      <p>{file.split("/")[file.split("/").length - 1]}</p>
                    </span>
                    <a
                      href={
                        "https://api.splitact.com/file/download/" + fileName
                      }
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </a>
                  </li>
                );
              })}
              {fileFile.map((file, index) => {
                const fileName = file.split("/")[file.split("/").length - 1];

                return (
                  <li className={style.file_item} key={index}>
                    <span>
                      -
                      <FontAwesomeIcon icon={faFileAlt} />
                      <p>{file.split("/")[file.split("/").length - 1]}</p>
                    </span>
                    <a
                      href={
                        "https://api.splitact.com/file/download/" + fileName
                      }
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className={style.data_btn_container}>
              {!uploadModal && currentCard.files.length < 5 && (
                <button
                  onClick={() => {
                    setUploadModal(!uploadModal);
                  }}
                >
                  <FontAwesomeIcon icon={faUpload} />
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
