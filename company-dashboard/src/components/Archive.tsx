import { Badge } from "./Badge.tsx";
import { daten } from "../data.ts";
import { STATUS_LABEL } from "../status.ts";

export function Archive() {
  const entries = daten.archiv;
  return (
    <section className="panel" id="archiv">
      <details>
        <summary>
          <h2>
            <span>
              Abgelöst / Vorgeschichte <span className="hint">(zum Aufklappen)</span>
            </span>
            <span className="fold-icon" aria-hidden="true">
              ▾
            </span>
          </h2>
        </summary>
        {entries.length === 0 ? (
          <p className="empty">Nichts abgelöst.</p>
        ) : (
          <ul className="plain-list archive-list">
            {entries.map((entry) => (
              <li key={entry.titel}>
                <p>
                  <strong>{entry.titel}</strong> <Badge status="abgeloest" />{" "}
                  <span className="quelle">
                    ({entry.datum}, damals: {STATUS_LABEL[entry.warStatus]})
                  </span>
                </p>
                <p>{entry.text}</p>
              </li>
            ))}
          </ul>
        )}
      </details>
    </section>
  );
}
