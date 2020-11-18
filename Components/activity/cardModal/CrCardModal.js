import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlusCircle } from "@fortawesome/free-solid-svg-icons";


import style from "../../../css/cardModal.module.css";
import ColorDot from "../../color/ColorDot";

export default function CrCardModal({ setNewCardModal }) {

    const [color, setColor] = useState("#FF672B")


    return (
        <div className="background_modal">
            <div className={style.card_modal}>
                <div style={{ backgroundColor: color }} className={style.card_header}>
                    <h2> <FontAwesomeIcon icon={faPlusCircle} /> Create - Card</h2>
                    <span onClick={() => { setNewCardModal(false) }} > <FontAwesomeIcon icon={faTimes} /> </span>
                </div>
                <div className={style.card_body}>
                    <form>
                        <div className={style.card_body_top}>
                            <input style={{ borderBottom: "1px solid "+color }} type="text" name="card_name" placeholder="Card name" />
                            <ColorDot color={color} setColor={setColor} />
                        </div>
                        <div className={style.card_body_mid}>
                            <textarea style={{ border: "1px solid "+ color }} name="card_description" cols="30" rows="4"></textarea>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
