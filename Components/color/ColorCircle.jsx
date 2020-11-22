
import React from 'react'

import style from "../../css/color.module.css";

export default function ColorCircle({ color, setColor, setColorModal }) {

    const selectColor = (e) => {
        setColor(e.target.id);
        setColorModal(false)
    };

    return (
        <div
        className={style.color_item}
        style={{ backgroundColor: color }}
        id={ color }
        onClick={selectColor}
        ></div>
    );
    }
