import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DIFFICULTIES, REGIONS } from "../constants";

interface Category {
  id: string;
  name: string;
}

export default function CreateEventPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    locationName: "",
    region: "",
    startsAt: "",
    endsAt: "",
    difficulty: "",
    capacity: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate(): string {
    if (Object.values(form).some((value) => value.trim() === "")) return "Izpolnite vsa polja.";
    if (new Date(form.startsAt) <= new Date()) return "Začetek dogodka ne sme biti v preteklosti.";
    if (new Date(form.endsAt) <= new Date(form.startsAt)) return "Konec dogodka mora biti po začetku.";
    if (Number(form.capacity) < 1) return "Število udeležencev mora biti vsaj 1.";
    return "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        startsAt: new Date(form.startsAt).toISOString(),
        endsAt: new Date(form.endsAt).toISOString(),
        capacity: Number(form.capacity),
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    navigate("/");
  }

  return (
    <div className="form-card">
      <h1>Ustvari dogodek</h1>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Naslov
          <input name="title" value={form.title} onChange={handleChange} />
        </label>

        <label>
          Opis
          <textarea name="description" rows={5} value={form.description} onChange={handleChange} />
        </label>

        <div className="form-row">
          <label>
            Kategorija
            <select name="categoryId" value={form.categoryId} onChange={handleChange}>
              <option value="">Izberi kategorijo</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>

          <label>
            Težavnost
            <select name="difficulty" value={form.difficulty} onChange={handleChange}>
              <option value="">Izberi težavnost</option>
              {DIFFICULTIES.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Lokacija
            <input name="locationName" value={form.locationName} onChange={handleChange} />
          </label>

          <label>
            Regija
            <select name="region" value={form.region} onChange={handleChange}>
              <option value="">Izberi regijo</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Začetek
            <input name="startsAt" type="datetime-local" value={form.startsAt} onChange={handleChange} />
          </label>

          <label>
            Konec
            <input name="endsAt" type="datetime-local" value={form.endsAt} onChange={handleChange} />
          </label>
        </div>

        <label>
          Največje število udeležencev
          <input name="capacity" type="number" min={1} value={form.capacity} onChange={handleChange} />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn btn-primary">Objavi dogodek</button>
      </form>
    </div>
  );
}