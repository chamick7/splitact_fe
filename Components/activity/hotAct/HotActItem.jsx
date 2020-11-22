import style from "../../../css/hotAct.module.css";
import moment from "moment";

export default function HotActItem({ hotAct }) {
  return (
    <div className={style.hotAct_item}>
      <div className={style.hotAct_header}>
        <h3>{hotAct.name}</h3>
      </div>
      <div className={style.hotAct_body} >
        { hotAct.info }
      </div>
      <div className={style.hotAct_bottom}>
          { moment(hotAct.dueDate).format("DD/MM/YYYY HH:MM") }
      </div>
    </div>
  );
}
