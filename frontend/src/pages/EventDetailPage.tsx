import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { EventDetail } from "../types";
import { formatDate, formatTime } from "../utils/format";

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="detail-row">
      <span className="detail-icon">{icon}</span>
      <div>
        <div className="detail-label">{label}</div>
        <div className="detail-value">{value}</div>
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${id}`).then(async (res) => {
      if (!res.ok) {
        setNotFound(true);
        return;
      }
      setEvent(await res.json());
    });
  }, [id, user]);

  if (notFound) return <div className="empty-state">Dogodek ne obstaja.</div>;
  if (!event) return <p className="muted">Nalagam ...</p>;

  const isGuest = event.capacity === undefined;
  const capacity = event.capacity ?? 0;
  const participants = event.participantCount ?? 0;
  const freeSpots = capacity - participants;
  const isFull = freeSpots <= 0;

  return (
    <div>
      <Link to="/" className="back-link">← Nazaj na dogodke</Link>

      <div className="detail-layout">
        <div>
          <div className="detail-banner">{event.categoryName}</div>

          <div className="detail-tags">
            <span className="tag">{event.categoryName}</span>
            {event.difficulty && <span className="tag tag-outline">{event.difficulty}</span>}
          </div>

          <h1>{event.title}</h1>

          {isGuest ? (
            <div className="login-prompt">
              <p>Za ogled opisa, organizatorja in prostih mest se prijavite ali registrirajte.</p>
              <div className="actions">
                <Link to="/login" className="btn">Prijava</Link>
                <Link to="/register" className="btn btn-primary">Registracija</Link>
              </div>
            </div>
          ) : (
            <>
              <h2>Opis dogodka</h2>
              <p className="description">{event.description}</p>
            </>
          )}
        </div>

        <aside className="detail-side">
          <h2>Podrobnosti dogodka</h2>
          <DetailRow icon="" label="Datum" value={formatDate(event.startsAt)} />
          <DetailRow icon="" label="Čas" value={`${formatTime(event.startsAt)} – ${formatTime(event.endsAt)}`} />
          <DetailRow icon="" label="Lokacija" value={event.locationName} />
          <DetailRow icon="" label="Regija" value={event.region} />
          {!isGuest && <DetailRow icon="" label="Organizator" value={event.organizerName ?? ""} />}

          {!isGuest && (
            <div className="occupancy">
              <div className="occupancy-header">
                <strong>Zasedenost</strong>
                <span>{participants} / {capacity}</span>
              </div>
              <div className="progress">
                <div className="progress-fill" style={{ width: `${(participants / capacity) * 100}%` }} />
              </div>
              {isFull ? (
                <p className="full-label">Dogodek je poln</p>
              ) : (
                <p className="muted">Prosta mesta: {freeSpots}</p>
              )}
            </div>
          )}

        </aside>
      </div>
    </div>
  );
}