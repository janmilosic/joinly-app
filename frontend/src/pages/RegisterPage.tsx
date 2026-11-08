import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate(): string {
    if (!form.displayName || !form.email || !form.password || !form.passwordConfirm)
      return "Izpolnite vsa polja.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Epoštni naslov ni veljaven.";
    if (form.password.length < 8) return "Geslo mora imeti vsaj 8 znakov.";
    if (form.password !== form.passwordConfirm) return "Gesli se ne ujemata.";
    return "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    navigate("/login", { state: { registered: true } });
  }

  return (
    <div className="auth-card">
      <h1>Registracija</h1>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Ime
          <input name="displayName" value={form.displayName} onChange={handleChange} />
        </label>
        <label>
          Epoštni naslov
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </label>
        <label>
          Geslo
          <input name="password" type="password" value={form.password} onChange={handleChange} />
        </label>
        <label>
          Ponovitev gesla
          <input name="passwordConfirm" type="password" value={form.passwordConfirm} onChange={handleChange} />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn btn-primary">Registriraj se</button>
      </form>

      <p className="muted">
        Že imate račun? <Link to="/login">Prijava</Link>
      </p>
    </div>
  );
}