import { Quelle } from "./Quelle.tsx";
import { daten } from "../data.ts";
import type { Ereignis } from "../types.ts";

function Events({ events }: { events: Ereignis[] }) {
  return (
    <ol className="events">
      {events.map((event) => (
        <li key={`${event.datum}-${event.text}`} className={event.geplant ? "geplant" : undefined}>
          <p className="when">{event.datum}</p>
          <p>{event.text}</p>
          <Quelle>{event.quelle}</Quelle>
        </li>
      ))}
    </ol>
  );
}

export function Timeline() {
  const events = daten.zeitleiste;
  const past = events.filter((event) => !event.geplant);
  const planned = events.filter((event) => event.geplant);

  return (
    <section className="panel" id="zeit">
      <h2>Zeitleiste</h2>
      {events.length === 0 ? (
        <p className="empty">Noch keine Ereignisse.</p>
      ) : (
        <div className="timeline">
          {past.length > 0 ? <Events events={past} /> : null}
          {planned.length > 0 ? (
            <>
              <h3 className="timeline-kicker">Geplant</h3>
              <Events events={planned} />
            </>
          ) : null}
        </div>
      )}
    </section>
  );
}
