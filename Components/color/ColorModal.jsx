
import style from "../../css/color.module.css";

import ColorCircle from "./ColorCircle";

export default function ColorModal({ setColorModal, setColor }) {
    

    return (
    <div className={style.color_modal + " noselect"}>
        <h4>Color tag</h4>
        <div className={style.color_box}>
            <ColorCircle setColor={setColor} setColorModal={setColorModal} color="#FF0000" />
            <ColorCircle setColor={setColor} setColorModal={setColorModal} color="#FF672B" />
            <ColorCircle setColor={setColor} setColorModal={setColorModal} color="#FAAF00" />
            <ColorCircle setColor={setColor} setColorModal={setColorModal} color="#48A346" />
            <ColorCircle setColor={setColor} setColorModal={setColorModal} color="#4A90E2" />
            <ColorCircle setColor={setColor} setColorModal={setColorModal} color="#1C3AA9" />
            <ColorCircle setColor={setColor} setColorModal={setColorModal} color="#644CC6" />
            <ColorCircle setColor={setColor} setColorModal={setColorModal} color="#AF2DDD" />
        </div>
    </div>
    );
}
