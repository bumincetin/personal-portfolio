import fs from "node:fs";
import sharp from "sharp";
import { getWorkVolumes } from "../src/lib/content/volumes.ts";
import { getPortfolioUI, workType } from "../src/lib/content/portfolio-ui.ts";
import { getLibraryUI } from "../src/lib/content/library-ui.ts";
const escape = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c],
  );
fs.mkdirSync("public/og", { recursive: true });
for (const locale of ["en", "tr", "it"]) {
  const p = getPortfolioUI(locale),
    c = getLibraryUI(locale);
  const entries = [
    { path: "", title: p.headline, subtitle: p.headlineAccent, label: p.field },
    {
      path: "-front-matter",
      title: "Front Matter",
      subtitle: p.approach,
      label: p.method,
    },
    {
      path: "-chapters",
      title: p.about,
      subtitle: "Chapters / CV",
      label: p.trajectory,
    },
    {
      path: "-contact",
      title: c.contact,
      subtitle: "Bumin Kağan Çetin",
      label: p.field,
    },
    ...getWorkVolumes(locale).map((v, i) => ({
      path: `-volumes-${v.id}`,
      title: v.title,
      subtitle: v.discipline,
      label: `VOL. ${String(i + 1).padStart(2, "0")} / ${p[workType(v.id)]}`,
    })),
  ];
  for (const item of entries) {
    const words = item.title.split(" "),
      lines = [""];
    for (const word of words) {
      if ((lines.at(-1) + " " + word).length > 27) lines.push(word);
      else lines[lines.length - 1] += (lines.at(-1) ? " " : "") + word;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#FFF4E8"/><circle cx="1120" cy="20" r="300" fill="#F2A766"/><path d="M880 630V330h80V250h80V170h80V90h80" fill="none" stroke="#3659D9" stroke-width="3"/><g font-family="Arial, sans-serif" fill="#191715"><text x="64" y="75" font-size="23">BUMİN KAĞAN ÇETİN</text><text x="64" y="160" font-size="19" fill="#A63E2D">${escape(item.label)}</text>${lines.map((line, i) => `<text x="60" y="${280 + i * 82}" font-size="72" letter-spacing="-3">${escape(line)}</text>`).join("")}<text x="64" y="${Math.min(510, 330 + lines.length * 80)}" font-size="24">${escape(item.subtitle)}</text><text x="64" y="577" font-size="18">bumincetin.com / ${locale.toUpperCase()}</text></g></svg>`;
    await sharp(Buffer.from(svg))
      .png()
      .toFile(`public/og/${locale}${item.path}.png`);
  }
}
console.log("Generated 33 localized Open Graph images.");
