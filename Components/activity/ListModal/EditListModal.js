import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCog,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import style from "../../../css/listModal.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function EditListModal({ setEditListModal, editList, currentList, color }) {
  const { register, handleSubmit } = useForm();
  const [name, setName] = useState(currentList.listName);
  const onSubmit = (formData) => {
    editList(currentList._id, name)
  };

  return (
    <div className="background_modal">
      <div className={style.list_modal}>
        <div
          style={{ backgroundColor: color }}
          className={style.list_header}
        >
          <h2>
            {" "}
            <FontAwesomeIcon icon={faCog} /> Edit - List{" "}
          </h2>
          <span
            onClick={() => {
              setEditListModal(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className={style.list_body}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              name="list_name"
              placeholder="List Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={register({
                required: "Required",
              })}
            />
            <button
              type="submit"
              style={{ backgroundColor: color }}
              className={style.cr_btn}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              Apply
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
