import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">Joinly</Link>
        <nav>
          <Link to="/">Dogodki</Link>
          <Link to="/login">Prijava</Link>
          <Link to="/register">Registracija</Link>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}