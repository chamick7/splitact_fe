import ColorModal from "./ColorModal";
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import style from "../../css/color.module.css";

export default function ColorDot({ color,setColor }) {
    const [colorModal, setColorModal] = useState(false)


    return (
        <>
            <div onClick={() => {setColorModal(!colorModal)}} style={{ backgroundColor: color }} className={style.color_dot}>
            <FontAwesomeIcon icon={faPencilAlt} />
            { colorModal && <ColorModal setColorModal={setColorModal} setColor={setColor} /> }

            </div>

        </>
    )
}
