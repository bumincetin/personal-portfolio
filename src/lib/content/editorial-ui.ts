import type { Locale } from "../translations";
const COPY = {
  en: {
    frontMatter: "Front matter",
    staticTitle: "Seven expensive problems.",
    volume: "Volume",
  },
  tr: {
    frontMatter: "Ön söz",
    staticTitle: "Yedi pahalı problem.",
    volume: "Cilt",
  },
  it: {
    frontMatter: "Prefazione",
    staticTitle: "Sette problemi costosi.",
    volume: "Volume",
  },
};
export const getEditorialUI = (locale: Locale) => COPY[locale];
