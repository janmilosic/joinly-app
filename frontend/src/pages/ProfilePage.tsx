import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Profile, ProfileEvent } from "../types";
import { formatDate, formatTime } from "../utils/format";

type TabKey = "upcoming" | "history" | "organized";

const TABS: { key: TabKey; label: string; empty: string }[] = [
  { key: "upcoming", label: "Prihajajoče prijave", empty: "Nimate prihajajočih prijav." },
  { key: "history", label: "Zgodovina udeležbe", empty: "Niste se še udeležili nobenega dogodka." },
  { key: "organized", label: "Organizirani dogodki", empty: "Niste še organizirali nobenega dogodka." },
];

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!user) return;
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [user, reloadKey]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (!profile) return <p className="muted">Nalagam profil ...</p>;

  async function handleLeave(eventId: string) {
    const res = await fetch(`/api/events/${eventId}/participation`, { method: "DELETE" });
    if (res.ok) setReloadKey((key) => key + 1);
  }

  const currentTab = TABS.find((tab) => tab.key === activeTab)!;
  const events: ProfileEvent[] = profile[activeTab];

  return (
    <div>
      <div className="profile-card">
        <span className="avatar avatar-large">{profile.displayName.charAt(0).toUpperCase()}</span>
        <div>
          <h1>{profile.displayName}</h1>
          <p className="muted">{profile.email}</p>
          <p className="muted">Registriran od {formatDate(profile.createdAt)}</p>
        </div>
      </div>

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label} ({profile[tab.key].length})
          </button>
        ))}
      </div>
      {events.length === 0 ? (
        <div className="empty-state">
          <p>{currentTab.empty}</p>
          <Link to="/" className="btn btn-primary">Poglej dogodke</Link>
        </div>
      ) : (
        <div className="profile-list">
          {events.map((event) => (
            <div key={event.id} className="profile-item">
              <div className="date-box">
                {new Date(event.startsAt).toLocaleDateString("sl-SI", { day: "numeric", month: "short" })}
              </div>

              <div className="profile-item-info">
                <h3>{event.title}</h3>
                <p className="muted">{event.locationName} · {formatTime(event.startsAt)}</p>
              </div>

              <span className="tag">{event.categoryName}</span>

              <div className="actions">
                <Link to={`/events/${event.id}`} className="btn">Podrobnosti</Link>
                {activeTab === "upcoming" && (
                  <button className="btn btn-danger" onClick={() => handleLeave(event.id)}>
                    Odjavi se
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}