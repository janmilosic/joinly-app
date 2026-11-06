import { useEffect, useState } from "react";

export default function EventsPage() {
  const [status, setStatus] = useState("preverjam ...");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("backend ni dosegljiv"));
  }, []);

  return (
    <div>
      <h1>Dogodki</h1>
      <p>Stanje backenda: {status}</p>
    </div>
  );
}