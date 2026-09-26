import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getFrontMatter, getVolume, volumeSlugs } from "./volume-pages";
import { getWorkVolumes } from "./volumes";
import { workType, PORTFOLIO_UI } from "./portfolio-ui";
import type { Locale } from "../translations";
import { OPTIMIZER_COPY } from "@/app/components/optimizer/copy";
import { REGIMES } from "../optimizer/blackLitterman";
import { PROFILES } from "../optimizer/engine";
import { ASSETS } from "../optimizer/universe";

test("optimizer descriptions and controls cover both translated locales", () => {
  const labels = [
    ...REGIMES.flatMap((r) => [
      r.name,
      r.summary,
      ...r.views.map((v) => v.label),
    ]),
    ...PROFILES.flatMap((p) => [p.name, p.summary]),
    ...ASSETS.flatMap((a) => [a.name, a.description]),
  ];
  for (const label of labels) {
    assert.equal(OPTIMIZER_COPY[label]?.length, 2, label);
  }
  for (const values of Object.values(OPTIMIZER_COPY)) {
    assert.ok(
      values.every((value) => value.trim() && !/[a-z]\?[a-z]/i.test(value)),
    );
  }
});

const baseline = JSON.parse(
  readFileSync("artifacts/evolution/before/content.json", "utf8"),
);
for (const locale of ["en", "tr", "it"] as Locale[]) {
  test(`${locale}: every original long-form block, source, metric and limitation is preserved`, () => {
    const current = [
      getFrontMatter(locale),
      ...volumeSlugs.map((slug) => getVolume(locale, slug)!),
    ].map((v) => ({ id: v.spine.id, title: v.title, pages: v.pages }));
    assert.deepEqual(JSON.parse(JSON.stringify(current)), baseline[locale]);
  });
  test(`${locale}: work is classified without invented client outcomes`, () => {
    const volumes = getWorkVolumes(locale);
    assert.equal(volumes.filter((v) => workType(v.id) === "service").length, 4);
    assert.equal(
      volumes.filter((v) => workType(v.id) === "research").length,
      2,
    );
    assert.equal(volumes.filter((v) => workType(v.id) === "demo").length, 1);
    assert.ok(PORTFOLIO_UI[locale].noEvidenceNote);
    assert.deepEqual(
      Object.keys(PORTFOLIO_UI[locale]).sort(),
      Object.keys(PORTFOLIO_UI.en).sort(),
    );
  });
}
