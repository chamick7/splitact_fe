
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCog, faEdit } from "@fortawesome/free-solid-svg-icons";
import style from "../../../css/listModal.module.css";
import { useForm } from "react-hook-form";



export default function EditListModal({ setEditListModal }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (formData) => {
        console.log(formData.list_name);
    }


    return (
        <div className="background_modal">
            <div className={style.list_modal}>
                <div style={{ backgroundColor: "#644CC6" }} className={style.list_header}>
                    <h2> <FontAwesomeIcon icon={ faCog} />  Edit - List </h2>
                    <span onClick={() => {setEditListModal(false) }} ><FontAwesomeIcon icon={ faTimes } /></span>
                </div>
                <div className={style.list_body}>
                <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" name="list_name" placeholder="List Name" ref={register({
                            required: "Required"
                        })} />
                        <button type="submit" style={{ backgroundColor: "#644CC6" }} className={style.cr_btn}>
                            <FontAwesomeIcon icon={faEdit} />
                            Apply
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
