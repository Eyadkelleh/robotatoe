import { daten } from "../data.ts";
import { BADGE_ORDER, STATUS_LABEL, countBadges } from "../status.ts";

export function StatusOverview() {
  const counts = countBadges(daten);

  return (
    <section className="status-strip" aria-label="Status">
      <div className="strip-head">
        <h2>Status</h2>
        <p>Gezählt wird jede Status-Markierung auf der Seite.</p>
      </div>
      <ul className="stats">
        {BADGE_ORDER.map((status) => (
          <li key={status} className={`stat stat-${status}`}>
            <span className="stat-count">{counts[status]}</span>
            <span className="stat-label">
              <span className="stat-dot" aria-hidden="true" />
              {STATUS_LABEL[status]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
