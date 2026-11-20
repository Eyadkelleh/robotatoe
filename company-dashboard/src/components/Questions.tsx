import { Badge } from "./Badge.tsx";
import { Quelle } from "./Quelle.tsx";
import { daten } from "../data.ts";

export function Questions() {
  const questions = daten.fragen;
  return (
    <section className="panel" id="fragen">
      <h2>Offene Fragen</h2>
      {questions.length === 0 ? (
        <p className="empty">Keine offenen Fragen.</p>
      ) : (
        <ul className="plain-list">
          {questions.map((question) => (
            <li key={question.frage}>
              <p>
                {question.frage}
                <Badge status="offen" />
              </p>
              {question.wer ? <p className="quelle">Zuständig: {question.wer}</p> : null}
              <Quelle>{question.quelle}</Quelle>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
