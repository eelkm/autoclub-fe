import styles from "./ProfileEvent.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { BackendURL } from "../../../utils/Constants";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

const ProfileEvents = () => {
  const { token } = useGlobalContext();
  const [events, setEvents] = useState();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const response = await axios.get(`${BackendURL}/events/get_events`, {
        headers: {
          Authorization: token,
        },
      });
      const data = response.data;
      if (data.success) {
        setEvents(data.events);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  return (
    <>
      {events && (
        <>
          {events.map((event) => {
            return (
              <Link
                key={event.id_event}
                to={`/event/${event.id_event}`}
                className={styles.link}
              >
                <div className={`${styles.event} ${styles.box}`}>
                  <div className={styles.event_wrapper}>
                    <img src={event.img_url} className={styles.event_img} />
                    <div className={styles.event_date}>
                      <div className={styles.event_month}>
                        {moment(event.event_date).format("MMM")}
                      </div>
                      <div className={styles.event_day}>
                        {moment(event.event_date).format("DD")}
                      </div>
                    </div>
                    <div className={styles.event_title}>{event.title}</div>
                    <div className={styles.event_subtitle}>
                      {moment(event.event_date).format("DD MMM, YYYY HH:mm")}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </>
      )}
    </>
  );
};

export default ProfileEvents;
