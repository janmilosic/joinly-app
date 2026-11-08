import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/EventForm";
import type { EventDetail, EventFormValues } from "../types";
import { toDateTimeInput } from "../utils/format";

export default function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<EventFormValues | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data: EventDetail) => {
        if (!data.isOrganizer) {
          setError("Urejate lahko samo svoje dogodke.");
          return;
        }
        setInitialValues({
          title: data.title,
          description: data.description ?? "",
          categoryId: data.categoryId,
          locationName: data.locationName,
          region: data.region,
          startsAt: toDateTimeInput(data.startsAt),
          endsAt: toDateTimeInput(data.endsAt),
          difficulty: data.difficulty ?? "",
          capacity: String(data.capacity ?? ""),
        });
      });
  }, [id]);

  if (error) return <div className="empty-state">{error}</div>;
  if (!initialValues) return <p className="muted">Nalagam ...</p>;

  return (
    <div className="form-card">
      <h1>Uredi dogodek</h1>
      <EventForm
        initialValues={initialValues}
        method="PUT"
        url={`/api/events/${id}`}
        submitLabel="Shrani spremembe"
        onSuccess={() => navigate(`/events/${id}`)}
      />
    </div>
  );
}