// Gera public/textures/guilloche.svg — textura guilloché (linhas finas
// entrelaçadas, como em papel-moeda ou títulos gravados).
//
// Determinística: só senos e cossenos, sem Math.random. O resultado é sempre
// o mesmo ficheiro. O SVG é usado como `mask-image` (ver `Guilloche` em
// src/components/site/Brand.tsx), por isso o traço é preto e a cor final
// vem do token --gold.
//
//   node scripts/generate-guilloche.mjs

import { mkdirSync, writeFileSync } from "node:fs";

const W = 1440;
const H = 900;

// Cada roseta é um feixe de curvas fechadas
//   r(t) = R + A·sin(m·t + φᵢ) + B·sin(m2·t − φᵢ)
// com φᵢ distribuído por uma volta completa: as curvas cruzam-se umas com as
// outras e formam a trança típica do guilloché.
const ROSETTES = [
  { cx: 1140, cy: 260, R: 350, A: 38, B: 12, m: 24, m2: 5, n: 10 },
  { cx: 1140, cy: 260, R: 205, A: 24, B: 8, m: 16, m2: 3, n: 8 },
  { cx: 140, cy: 880, R: 290, A: 32, B: 10, m: 20, m2: 4, n: 9 },
];

function rosettePath({ cx, cy, R, A, B, m, m2, n }, i) {
  const phase = (i / n) * Math.PI * 2;
  const samples = m * 8;
  const pts = [];
  for (let k = 0; k < samples; k++) {
    const t = (k / samples) * Math.PI * 2;
    const r = R + A * Math.sin(m * t + phase) + B * Math.sin(m2 * t - phase);
    pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]);
  }
  // Curva suave: quadráticas entre pontos médios.
  const f = (v) => Math.round(v * 2) / 2;
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const start = mid(pts[samples - 1], pts[0]);
  let d = `M${f(start[0])} ${f(start[1])}`;
  for (let k = 0; k < samples; k++) {
    const p = pts[k];
    const q = mid(p, pts[(k + 1) % samples]);
    d += `Q${f(p[0])} ${f(p[1])} ${f(q[0])} ${f(q[1])}`;
  }
  return `${d}Z`;
}

// Filetes finos em losango ao longo da base, como a barra de um título.
function latticePath() {
  const y0 = H - 70;
  const h = 26;
  const step = 36;
  let d = "";
  for (let x = -step; x <= W + step; x += step) {
    d += `M${x} ${y0}L${x + step / 2} ${y0 - h / 2}L${x + step} ${y0}L${x + step / 2} ${y0 + h / 2}Z`;
  }
  return d;
}

const paths = ROSETTES.flatMap((ro) => Array.from({ length: ro.n }, (_, i) => rosettePath(ro, i)));

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
  `<g fill="none" stroke="#000" stroke-width="1">` +
  paths.map((d) => `<path d="${d}"/>`).join("") +
  `<path d="${latticePath()}" stroke-width="0.75"/>` +
  `</g></svg>\n`;

mkdirSync(new URL("../public/textures/", import.meta.url), { recursive: true });
writeFileSync(new URL("../public/textures/guilloche.svg", import.meta.url), svg);
console.log(`guilloche.svg: ${paths.length} curvas, ${(svg.length / 1024).toFixed(1)} KB`);
