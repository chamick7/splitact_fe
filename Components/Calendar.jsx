import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";
import React, { useEffect, useState } from "react";
require("react-big-calendar/lib/css/react-big-calendar.css");
import { getAxios } from "../utils/axios";
const axios = getAxios();
import Link from "next/link";

import styles from "../css/calendar.module.css";

export default function Calendar(props) {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  function evee(event, start, end, isSelected) {
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
      fontFamily: "Itim",
    };
    return {
      style: style,
    };
  }

  const eventComponents = ({ event }) => {
    return (
      <Link href={"/activity?activity=" + event.activityId}>
        <a>
          <h4>{event.title}</h4>
        </a>
      </Link>
    );
  };

  useEffect(() => {
    axios
      .get("/activity/card/calendar")
      .then((result) => {
        setEvents(
          result.data.cards.map((card, index) => ({
            id: card._id,
            title: card.cardName,
            allDay: true,
            isMe: true,
            hexColor: card.color.substring(1, 100),
            start: card.dueDate,
            end: card.dueDate,
            activityId: card.atId,
          }))
        );
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={styles.calendar_container}>
      <center>
        <BigCalendar
          className={styles.calendar}
          selectable
          style={{ height: 400, width: "90%" }}
          localizer={localizer}
          defaultView="month"
          eventPropGetter={evee}
          events={events}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          components={{
            event: eventComponents,
          }}
        />
      </center>
    </div>
  );
}
