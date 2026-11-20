import { Badge } from "./Badge.tsx";
import { Quelle } from "./Quelle.tsx";
import { daten } from "../data.ts";
import type { OrgPerson } from "../types.ts";

function affiliation(person: OrgPerson): string {
  const who = person.mensch ? "Mensch" : person.besitzer ? `Bot von ${person.besitzer}` : "";
  const color = person.farbname ? `Farbe: ${person.farbname}` : "";
  return [who, color].filter(Boolean).join(" · ");
}

function groupName(person: OrgPerson): string | undefined {
  if (person.subbots.length < 3) return undefined;
  const prefixes = person.subbots.map((sub) => sub.rolle.split(":")[0]?.trim() ?? "");
  const first = prefixes[0];
  if (!first || prefixes.some((prefix) => prefix !== first)) return undefined;
  return first;
}

function PersonCard({ person, ceo = false }: { person: OrgPerson; ceo?: boolean }) {
  const meta = affiliation(person);
  return (
    <article className={ceo ? "node node-ceo" : "node"} style={{ borderTopColor: person.farbe }}>
      <h3 className="node-name">{person.name}</h3>
      <p className="node-role">{person.rolle}</p>
      {meta ? <p className="node-meta">{meta}</p> : null}
      {person.hinweis ? <p className="node-note">{person.hinweis}</p> : null}
    </article>
  );
}

function SubBots({ person }: { person: OrgPerson }) {
  if (person.subbots.length === 0) return null;
  const label = groupName(person);
  return (
    <ul className="kids">
      {label ? (
        <li className="kids-label">
          <span>{label}</span>
        </li>
      ) : null}
      {person.subbots.map((sub) => (
        <li key={sub.name}>
          <article className="sub">
            <div className="sub-head">
              <h4>{sub.name}</h4>
              <Badge status={sub.status} text={sub.statusText} />
            </div>
            {sub.rolle ? <p className="sub-role">{sub.rolle}</p> : null}
          </article>
        </li>
      ))}
    </ul>
  );
}

export function Organigramm() {
  const { mission, orgStatus, org, spielregeln } = daten;
  const lead = org.filter((person) => person.ebene === 0);
  const reports = org.filter((person) => person.ebene !== 0);

  return (
    <section className="panel" id="org">
      <h2>Organigramm</h2>
      {org.length === 0 ? (
        <p className="empty">Noch keine Rollen vergeben.</p>
      ) : (
        <>
          <blockquote className="mission">
            <div className="block-head">
              <h3>Mission</h3>
              <Badge status={mission.status} text={mission.statusText} />
            </div>
            <p>{mission.text}</p>
            <Quelle>{mission.quelle}</Quelle>
          </blockquote>

          <div className="callout">
            <div className="block-head">
              <h3>Führung</h3>
              <Badge status={orgStatus.status} text={orgStatus.text} />
            </div>
            <p>{orgStatus.hinweis}</p>
          </div>

          <div className="org">
            <div className="org-root">
              {lead.map((person) => (
                <PersonCard key={person.name} person={person} ceo />
              ))}
            </div>
            <div className="org-tier">
              {reports.map((person) => (
                <div key={person.name} className="org-col">
                  <PersonCard person={person} />
                  <SubBots person={person} />
                </div>
              ))}
            </div>
          </div>

          <div className="subhead block-head">
            <h3>Spielregeln</h3>
            <Badge status={spielregeln.status} text={spielregeln.statusText} />
          </div>
          <ol className="rules">
            {spielregeln.regeln.map((rule) => (
              <li key={rule.titel}>
                <strong>{rule.titel}.</strong> {rule.text}
              </li>
            ))}
          </ol>
          <Quelle>{spielregeln.quelle}</Quelle>
        </>
      )}
    </section>
  );
}
