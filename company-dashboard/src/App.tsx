import { useEffect, useState } from "react";
import { Archive } from "./components/Archive.tsx";
import { BusinessCase } from "./components/BusinessCase.tsx";
import { Decisions } from "./components/Decisions.tsx";
import { Organigramm } from "./components/Organigramm.tsx";
import { Questions } from "./components/Questions.tsx";
import { StatusOverview } from "./components/StatusOverview.tsx";
import { Timeline } from "./components/Timeline.tsx";
import { daten } from "./data.ts";

const SECTIONS = [
  ["org", "Organigramm"],
  ["business", "Businesscase"],
  ["entscheidungen", "Entscheidungen"],
  ["fragen", "Offene Fragen"],
  ["archiv", "Vorgeschichte"],
  ["zeit", "Zeitleiste"],
] as const;

export default function App() {
  const [active, setActive] = useState<(typeof SECTIONS)[number][0]>("org");

  useEffect(() => {
    const elements = SECTIONS.map(([id]) => document.getElementById(id)).filter((element) => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as (typeof SECTIONS)[number][0]);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip" href="#inhalt">
        Zum Inhalt
      </a>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <p>{daten.firma}</p>
          <p>{daten.stand}</p>
        </div>
      </div>
      <header className="masthead">
        <div className="wrap">
          <h1>{daten.produkt}</h1>
          <p className="claim">{daten.claim}</p>
        </div>
      </header>
      <nav className="nav" aria-label="Abschnitte">
        <div className="wrap nav-inner">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
              {label}
            </a>
          ))}
        </div>
      </nav>
      <main id="inhalt" className="wrap">
        <StatusOverview />
        <Organigramm />
        <BusinessCase />
        <Decisions />
        <Questions />
        <Archive />
        <Timeline />
      </main>
      <footer className="footer">
        <p>Gepflegt von Keks-Kartograf. Dargestellt sind ausschließlich Inhalte, die über Robby Robotatoe geliefert wurden.</p>
      </footer>
    </>
  );
}
