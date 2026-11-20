export function Quelle({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="quelle">Quelle: {children}</p>;
}
