import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/" className="logo">Joinly</Link>
          <nav>
            <NavLink to="/" end>Dogodki</NavLink>
            {user && <NavLink to="/events/new">Ustvari dogodek</NavLink>}
            {user && <NavLink to="/profile">Moj profil</NavLink>}
          </nav>
        </div>

        {!loading && (
          <div className="header-right">
            {user ? (
              <>
                <Link to="/profile" className="header-user">
                  <span className="avatar">{user.displayName.charAt(0).toUpperCase()}</span>
                  <span className="user-name">{user.displayName}</span>
                </Link>
                <button className="btn" onClick={handleLogout}>Odjava</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">Prijava</Link>
                <Link to="/register" className="btn btn-primary">Registracija</Link>
              </>
            )}
          </div>
        )}
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}