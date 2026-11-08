import { useLocation } from "react-router-dom";

export default function LoginPage() {
  const location = useLocation();
  const registered = location.state?.registered;

  return (
    <div className="auth-card">
      <h1>Prijava</h1>
      {registered && <p className="success">Registracija uspešna.</p>}
    </div>
  );
}