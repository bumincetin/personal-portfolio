import type { Locale } from '@/lib/translations';

/**
 * Chrome labels for the shelf.
 *
 * The authored source is English-only and hard-codes these in its markup. This
 * site is trilingual and every route exists in all three languages, so the
 * shelf's own furniture — button labels, hints, the static catalogue, the
 * accessible names the engine never touches — is localised alongside the rest.
 */

export interface ShelfUI {
  collection: string;
  identity: string;
  identityNote: string;
  volume: string;
  /** The front matter is not a volume, so it is not numbered as one. */
  frontMatter: string;
  shelfNavigation: string;
  previousVolume: string;
  nextVolume: string;
  open: string;
  volumeIndex: string;
  chooseVolume: string;
  wheelHint: string;
  returnVolume: string;
  /** Back out of the front matter, which was never on the shelf. */
  returnShelf: string;
  metaBinding: string;
  metaFormat: string;
  metaTheme: string;
  metaMotif: string;
  readFullPage: string;
  browsePages: string;
  previousPage: string;
  nextPage: string;
  /** Standing hint under the reader. The arrow glyphs are added in markup. */
  pageHint: string;
  closed: string;
  clickToOpen: string;
  dragHint: string;
  openBook: string;
  resetView: string;
  staticCatalog: string;
  staticTitle: string;
  staticStatus: string;
  staticGridLabel: string;
  fallbackNote: string;
  loading: string;
  skipToReading: string;
  continueBelow: string;
}

const UI: Record<Locale, ShelfUI> = {
  en: {
    collection: 'Collection',
    identity: 'Working Volumes',
    identityNote: 'Seven expensive problems, and what I do about them',
    volume: 'Volume',
    frontMatter: 'Front matter',
    shelfNavigation: 'Shelf navigation',
    previousVolume: 'Previous volume',
    nextVolume: 'Next volume',
    open: 'Open',
    volumeIndex: 'Volume index',
    chooseVolume: 'Choose a volume',
    wheelHint: 'Wheel · arrows · select',
    returnVolume: 'Return volume to shelf',
    returnShelf: 'Back to the shelf',
    metaBinding: 'Kind of work',
    metaFormat: 'What you receive',
    metaTheme: 'What it costs to leave alone',
    metaMotif: 'Shape of the answer',
    readFullPage: 'Read the full page',
    browsePages: 'Browse sample pages',
    previousPage: 'Previous sample page',
    nextPage: 'Next sample page',
    pageHint: 'Turn pages with the arrow keys',
    closed: 'Closed',
    clickToOpen: 'Click book to open',
    dragHint: 'Drag cover or click once to open · Background to orbit',
    openBook: 'Open book',
    resetView: 'Reset view',
    staticCatalog: 'Working Volumes · Static catalogue',
    staticTitle: 'Seven expensive problems.',
    staticStatus: 'The full catalogue stays readable whether or not the interactive shelf loads.',
    staticGridLabel: 'Seven volumes',
    fallbackNote:
      'The shelf presentation is an original Three.js work by ThreeUI, used under licence. The problems, evidence and figures in it are this practice’s own.',
    loading: 'Binding the collection',
    skipToReading: 'Skip the shelf and read the page',
    continueBelow: 'About the practice',
  },
  tr: {
    collection: 'Koleksiyon',
    identity: 'Çalışma Ciltleri',
    identityNote: 'Yedi pahalı problem ve onlar için ne yaptığım',
    volume: 'Cilt',
    frontMatter: 'Ön söz',
    shelfNavigation: 'Raf gezinmesi',
    previousVolume: 'Önceki cilt',
    nextVolume: 'Sonraki cilt',
    open: 'Aç',
    volumeIndex: 'Cilt dizini',
    chooseVolume: 'Bir cilt seçin',
    wheelHint: 'Tekerlek · oklar · seç',
    returnVolume: 'Cildi rafa geri koy',
    returnShelf: 'Rafa dön',
    metaBinding: 'İşin türü',
    metaFormat: 'Elinize ne geçiyor',
    metaTheme: 'Dokunmamanın maliyeti',
    metaMotif: 'Cevabın biçimi',
    readFullPage: 'Tam sayfayı okuyun',
    browsePages: 'Örnek sayfalara göz atın',
    previousPage: 'Önceki örnek sayfa',
    nextPage: 'Sonraki örnek sayfa',
    pageHint: 'Sayfaları ok tuşlarıyla çevirin',
    closed: 'Kapalı',
    clickToOpen: 'Açmak için kitaba tıklayın',
    dragHint: 'Kapağı sürükleyin veya bir kez tıklayın · Yörünge için arka plan',
    openBook: 'Kitabı aç',
    resetView: 'Görünümü sıfırla',
    staticCatalog: 'Çalışma Ciltleri · Statik katalog',
    staticTitle: 'Yedi pahalı problem.',
    staticStatus: 'Etkileşimli raf yüklensin ya da yüklenmesin, katalogun tamamı okunabilir kalır.',
    staticGridLabel: 'Yedi cilt',
    fallbackNote:
      'Raf sunumu, lisans altında kullanılan, ThreeUI’ye ait özgün bir Three.js çalışmasıdır. İçindeki problemler, kanıtlar ve rakamlar bu pratiğe aittir.',
    loading: 'Koleksiyon ciltleniyor',
    skipToReading: 'Rafı atlayıp sayfayı okuyun',
    continueBelow: 'Çalışma yaklaşımım',
  },
  it: {
    collection: 'Collezione',
    identity: 'Working Volumes',
    identityNote: 'Sette problemi costosi, e cosa ci faccio',
    volume: 'Volume',
    frontMatter: 'Prefazione',
    shelfNavigation: 'Navigazione dello scaffale',
    previousVolume: 'Volume precedente',
    nextVolume: 'Volume successivo',
    open: 'Apri',
    volumeIndex: 'Indice dei volumi',
    chooseVolume: 'Scegli un volume',
    wheelHint: 'Rotella · frecce · seleziona',
    returnVolume: 'Rimetti il volume sullo scaffale',
    returnShelf: 'Torna allo scaffale',
    metaBinding: 'Tipo di lavoro',
    metaFormat: 'Cosa ricevi',
    metaTheme: 'Quanto costa lasciarlo stare',
    metaMotif: 'Forma della risposta',
    readFullPage: 'Leggi la pagina completa',
    browsePages: 'Sfoglia le pagine di esempio',
    previousPage: 'Pagina di esempio precedente',
    nextPage: 'Pagina di esempio successiva',
    pageHint: 'Sfoglia con i tasti freccia',
    closed: 'Chiuso',
    clickToOpen: 'Clicca il libro per aprirlo',
    dragHint: 'Trascina la copertina o clicca una volta · Sfondo per orbitare',
    openBook: 'Apri il libro',
    resetView: 'Reimposta la vista',
    staticCatalog: 'Working Volumes · Catalogo statico',
    staticTitle: 'Sette problemi costosi.',
    staticStatus: 'Il catalogo completo resta leggibile che lo scaffale interattivo si carichi o meno.',
    staticGridLabel: 'Sette volumi',
    fallbackNote:
      'La presentazione dello scaffale è un’opera Three.js originale di ThreeUI, usata su licenza. I problemi, le prove e i numeri al suo interno sono di questo studio.',
    loading: 'Rilegatura della collezione',
    skipToReading: 'Salta lo scaffale e leggi la pagina',
    continueBelow: 'Il mio approccio',
  },
};

export const getShelfUI = (locale: Locale): ShelfUI => UI[locale] ?? UI.en;

export { UI as SHELF_UI };

