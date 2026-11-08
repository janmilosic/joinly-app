import { useEffect, useState } from "react";
import { formatDate, formatTime } from "../utils/format";

interface Participant {
  name: string;
  registeredAt: string;
}

export default function ParticipantsList({ eventId }: { eventId: string }) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    fetch(`/api/events/${eventId}/participants`)
      .then((res) => res.json())
      .then((data) => setParticipants(data));
  }, [eventId]);

  return (
    <div className="participants">
      <h2>Prijavljeni udeleženci ({participants.length})</h2>

      {participants.length === 0 ? (
        <p className="muted">Za ta dogodek še ni prijav.</p>
      ) : (
        <ul>
          {participants.map((p, index) => (
            <li key={index}>
              <span className="participant-name">{p.name}</span>
              <span className="muted">
                {formatDate(p.registeredAt)} ob {formatTime(p.registeredAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}