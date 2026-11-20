import { badgeText, type BadgeStatus } from "../status.ts";

export function Badge({ status, text }: { status: BadgeStatus; text?: string }) {
  return <span className={`badge badge-${status}`}>{badgeText(status, text)}</span>;
}
