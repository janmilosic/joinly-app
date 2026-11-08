import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EventForm from "../components/EventForm";
import type { EventFormValues } from "../types";

const EMPTY_FORM: EventFormValues = {
  title: "",
  description: "",
  categoryId: "",
  locationName: "",
  region: "",
  startsAt: "",
  endsAt: "",
  difficulty: "",
  capacity: "",
};

export default function CreateEventPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="form-card">
      <h1>Ustvari dogodek</h1>
      <EventForm
        initialValues={EMPTY_FORM}
        method="POST"
        url="/api/events"
        submitLabel="Objavi dogodek"
        onSuccess={(id) => navigate(`/events/${id}`)}
      />
    </div>
  );
}