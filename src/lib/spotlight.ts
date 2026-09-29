import type { MouseEvent } from "react";

/** Posiciona o spotlight de `.card-lift` (ver styles.css) no cursor. */
export function handleSpot(event: MouseEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}
