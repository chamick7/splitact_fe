
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import style from "../../../css/listModal.module.css";
import { useForm } from "react-hook-form";

export default function CrListModal({ setNewListModal }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (formData) => {
        console.log(formData.list_name);
    }

    return (
        <div className="background_modal">
            <div className={style.list_modal}>
                <div style={{ backgroundColor: "#644CC6" }} className={style.list_header}>
                    <h2> <FontAwesomeIcon icon={ faPlusCircle } />  Create - List </h2>
                    <span onClick={() => {setNewListModal(false) }} ><FontAwesomeIcon icon={ faTimes } /></span>
                </div>
                <div className={style.list_body}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" name="list_name" placeholder="List Name" ref={register({
                            required: "Required"
                        })} />
                        <button type="submit" style={{ backgroundColor: "#644CC6" }} className={style.cr_btn}>
                            <FontAwesomeIcon icon={faPlus} />
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
