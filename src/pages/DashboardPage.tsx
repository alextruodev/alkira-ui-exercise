import { useNavigate } from "react-router";

import { useAuth } from "../auth/useAuth";

export default function DashboardPage() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  if (!user) {
    return null;
  }

  const canEdit = user.role === "read-write";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>Account Dashboard</h1>
            <p>Signed in as {user.name}</p>
          </div>

          <button
            className="secondary-button"
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </header>

        <div className="role-badge">
          {user.role === "read-write"
            ? "Read / Write"
            : "Read Only"}
        </div>

        <section className="dashboard-card">
          <h2>Network Configuration</h2>

          <dl className="details-list">
            <div className="details-row">
              <dt>Environment</dt>
              <dd>Production</dd>
            </div>

            <div className="details-row">
              <dt>Region</dt>
              <dd>US West</dd>
            </div>

            <div className="details-row">
              <dt>Connection Status</dt>
              <dd>Active</dd>
            </div>
          </dl>

          <button
            className="edit-button"
            type="button"
            disabled={!canEdit}
          >
            Edit Configuration
          </button>

          {!canEdit && (
            <p className="permission-message">
              Your account has read-only access.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}