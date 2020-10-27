import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";
import React from "react";
require("react-big-calendar/lib/css/react-big-calendar.css");

import styles from "../css/calendar.module.css";

export default function Calendar(props) {
  const localizer = momentLocalizer(moment);

  function evee(event, start, end, isSelected) {
    

    var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',       
        fontFamily : 'Itim',
        
    };
    return {
        style: style
    };
}

  return (
    <div className={styles.calendar_container}>
      <center>
        <BigCalendar
          className={styles.calendar}
          selectable
          style={{ height: 400, width: "90%", }}
          localizer={localizer}
          defaultView="month"
          eventPropGetter = {evee}
          
          events={[
            {
              id: 0,
              title: "All Day Event very long title",
              allDay: true,
              isMe:true,
              hexColor: "FF672B",
              start: new Date(2020, 9, 13),
              end: new Date(2020, 9, 14),
            },
            {
                id: 1,
                title: "Test day",
                allDay: false,
                isMe:true,
                hexColor: "FF672B",
                start: new Date(2020, 9, 17,8,0,0),
                end: new Date(2020, 9, 17,11,0,0),
              },
          ]}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
        />
      </center>
    </div>
  );
}
