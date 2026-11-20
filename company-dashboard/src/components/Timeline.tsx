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
  const blocks: { geplant: boolean; events: Ereignis[] }[] = [];
  for (const event of events) {
    const geplant = event.geplant === true;
    const last = blocks[blocks.length - 1];
    if (!last || last.geplant !== geplant) blocks.push({ geplant, events: [event] });
    else last.events.push(event);
  }

  return (
    <section className="panel" id="zeit">
      <h2>Zeitleiste</h2>
      {events.length === 0 ? (
        <p className="empty">Noch keine Ereignisse.</p>
      ) : (
        <div className="timeline">
          {blocks.map((block) => (
            <div key={`${block.geplant}-${block.events[0]?.datum}-${block.events[0]?.text}`}>
              {block.geplant ? <h3 className="timeline-kicker">Geplant</h3> : null}
              <Events events={block.events} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
