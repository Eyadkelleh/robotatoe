import { useState } from "react";
import { Badge } from "./Badge.tsx";
import { Quelle } from "./Quelle.tsx";
import { daten } from "../data.ts";
import { BADGE_ORDER, STATUS_LABEL, badgeText, type BadgeStatus } from "../status.ts";
import type { DataStatus } from "../types.ts";

function haystack(status: DataStatus, statusText: string | undefined, parts: Array<string | undefined>): string {
  return [badgeText(status, statusText), STATUS_LABEL[status], ...parts].filter(Boolean).join(" ").toLocaleLowerCase("de");
}

export function Decisions() {
  const decisions = daten.entscheidungen;
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<DataStatus | "alle">("alle");

  const present = BADGE_ORDER.filter((status): status is DataStatus =>
    decisions.some((decision) => decision.status === status),
  );

  const needle = query.trim().toLocaleLowerCase("de");
  const visible = decisions.filter((decision) => {
    if (filter !== "alle" && decision.status !== filter) return false;
    if (!needle) return true;
    const text = haystack(decision.status, decision.statusText, [
      decision.titel,
      decision.text,
      decision.datum,
      decision.quelle,
      ...(decision.kette ?? []),
    ]);
    return text.includes(needle);
  });

  const narrowed = query.trim().length > 0 || filter !== "alle";

  return (
    <section className="panel" id="entscheidungen">
      <h2>Entscheidungen</h2>
      {decisions.length === 0 ? (
        <p className="empty">Noch nichts entschieden.</p>
      ) : (
        <>
          <div className="toolbar">
            <input
              className="search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Titel, Text oder Quelle"
              aria-label="Entscheidungen durchsuchen"
            />
            <div className="filters" role="group" aria-label="Status filtern">
              <button type="button" className="filter" aria-pressed={filter === "alle"} onClick={() => setFilter("alle")}>
                Alle
              </button>
              {present.map((status) => (
                <button
                  key={status}
                  type="button"
                  className="filter"
                  aria-pressed={filter === status}
                  onClick={() => setFilter(status)}
                >
                  {STATUS_LABEL[status as BadgeStatus]}
                </button>
              ))}
            </div>
            {narrowed ? (
              <p className="result-count">
                {visible.length} von {decisions.length}
              </p>
            ) : null}
          </div>
          {visible.length === 0 ? (
            <p className="empty">Keine Entscheidungen für diese Auswahl.</p>
          ) : (
            <div className="decisions">
              {visible.map((decision) => (
                <article key={decision.titel} className="decision">
                  <div className="block-head">
                    <h3>{decision.titel}</h3>
                    <Badge status={decision.status} text={decision.statusText} />
                    <span className="quelle">({decision.datum})</span>
                  </div>
                  <p>{decision.text}</p>
                  {decision.kette ? (
                    <div className="chain">
                      {decision.kette.map((link, index) => (
                        <span key={link} className="chain-item">
                          {index > 0 ? (
                            <span className="chain-arrow" aria-hidden="true">
                              →
                            </span>
                          ) : null}
                          <span className="chain-link">{link}</span>
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <Quelle>{decision.quelle}</Quelle>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
