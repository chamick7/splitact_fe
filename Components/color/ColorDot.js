import ColorModal from "./ColorModal";
import { useState } from 'react'


import style from "../../css/color.module.css";

export default function ColorDot({ color,setColor }) {
    const [colorModal, setColorModal] = useState(false)


    return (
        <>
            <div onClick={() => {setColorModal(!colorModal)}} style={{ backgroundColor: color }} className={style.color_dot}>
            { colorModal && <ColorModal setColorModal={setColorModal} setColor={setColor} /> }

            </div>

        </>
    )
}
