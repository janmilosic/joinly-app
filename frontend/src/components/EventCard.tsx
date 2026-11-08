import { Link } from "react-router-dom";
import type { EventListItem } from "../types";

export default function EventCard({ event }: { event: EventListItem }) {
  const start = new Date(event.startsAt);
  const date = start.toLocaleDateString("sl-SI");
  const time = start.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" });

  return (
    <Link to={`/events/${event.id}`} className="event-card">
      <div className="event-card-banner">{event.categoryName}</div>

      <div className="event-card-body">
        <span className="tag">{event.categoryName}</span>
        <h3>{event.title}</h3>
        <p className="muted">📅 {date} · {time}</p>
        <p className="muted">📍 {event.locationName}, {event.region}</p>

        <div className="event-card-footer">
          <span className="tag tag-outline">{event.difficulty}</span>
          {event.capacity !== undefined && (
            <span className="free-spots">
              Prosta mesta: {event.capacity - (event.participantCount ?? 0)} / {event.capacity}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}