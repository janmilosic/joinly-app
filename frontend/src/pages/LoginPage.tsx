import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const registered = location.state?.registered;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const loginError = await login(email, password);
    if (loginError) {
      setError(loginError);
      return;
    }

    navigate("/");
  }

  return (
    <div className="auth-card">
      <h1>Prijava</h1>

      {registered && <p className="success">Registracija uspešna. Zdaj se lahko prijavite.</p>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Epoštni naslov
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Geslo
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn btn-primary">Prijava</button>
      </form>

      <p className="muted">
        Še nimate računa? <Link to="/register">Registracija</Link>
      </p>
    </div>
  );
}