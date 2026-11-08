import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import type { EventListItem } from "../types";

export default function EventsPage() {
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/events?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events);
        setTotalPages(data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <h1>Dogodki</h1>

      {loading ? (
        <p className="muted">Nalagam dogodke ...</p>
      ) : events.length === 0 ? (
        <div className="empty-state">Trenutno ni objavljenih dogodkov.</div>
      ) : (
        <>
          <div className="event-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
                ← Prejšnja
              </button>
              <span>Stran {page} od {totalPages}</span>
              <button className="btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                Naslednja →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}