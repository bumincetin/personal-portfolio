import type { Locale } from '@/lib/translations';

/**
 * Chrome labels for the sketchbook.
 *
 * The authored source hard-codes these in English in its markup — "previous
 * page", "zoom in", "Drag the page to turn". Every route on this site exists in
 * three languages, so the book's own furniture is localised alongside the pages
 * it holds. `scripts/check-i18n.mjs` fails the build if one of these goes
 * missing from a locale.
 *
 * Nothing here is a fact. The titles, the folios and the prose come from
 * `volume-pages.ts`; this is only what the controls are called.
 */

export interface SketchbookUI {
  /** Landmark label for the whole reading surface. */
  book: string;
  previousPage: string;
  nextPage: string;
  viewControls: string;
  zoomIn: string;
  zoomOut: string;
  magnifier: string;
  /** Standing hint under the book. Says what the two gestures are. */
  hint: string;
  /** The same, for the single-page book on a phone, which has no magnifier. */
  hintTurn: string;
  /** Heading over the list of spreads. */
  index: string;
  /** Prefix for a folio range in the index and the live region: "Leaf 03–04". */
  leaf: string;
  /** The way back to the shelf. */
  back: string;
}

const UI: Record<Locale, SketchbookUI> = {
  en: {
    book: 'The volume',
    previousPage: 'Previous page',
    nextPage: 'Next page',
    viewControls: 'View controls',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    magnifier: 'Magnifying glass',
    hint: 'Drag the page to turn · Drag the glass across it',
    hintTurn: 'Swipe or drag to turn the page',
    index: 'Contents',
    leaf: 'Leaf',
    back: 'Back to the shelf',
  },
  tr: {
    book: 'Cilt',
    previousPage: 'Önceki sayfa',
    nextPage: 'Sonraki sayfa',
    viewControls: 'Görünüm denetimleri',
    zoomIn: 'Yakınlaştır',
    zoomOut: 'Uzaklaştır',
    magnifier: 'Büyüteç',
    hint: 'Çevirmek için sayfayı sürükleyin · Büyüteci üzerinde gezdirin',
    hintTurn: 'Sayfayı çevirmek için kaydırın veya sürükleyin',
    index: 'İçindekiler',
    leaf: 'Yaprak',
    back: 'Rafa dön',
  },
  it: {
    book: 'Il volume',
    previousPage: 'Pagina precedente',
    nextPage: 'Pagina successiva',
    viewControls: 'Controlli di visualizzazione',
    zoomIn: 'Ingrandisci',
    zoomOut: 'Riduci',
    magnifier: 'Lente d’ingrandimento',
    hint: 'Trascina la pagina per voltarla · Trascina la lente sul foglio',
    hintTurn: 'Scorri o trascina per voltare pagina',
    index: 'Indice',
    leaf: 'Foglio',
    back: 'Torna allo scaffale',
  },
};

export const getSketchbookUI = (locale: Locale): SketchbookUI => UI[locale] ?? UI.en;

export { UI as SKETCHBOOK_UI };
