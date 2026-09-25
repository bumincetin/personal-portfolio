import type { Locale } from '@/lib/translations';

const en = {
  selectVolume: 'Select volume {index}: {title}',
  selectedVolume: 'Selected volume {index} of {total}: {title}. {note}',
  titlePage: 'Title page', plate: 'Plate', notes: 'Notes', system: 'System', colophon: 'Colophon', chapter: 'Chapter', sampleEdition: 'Sample edition',
  closeBook: 'Close book', readingHint: 'Drag pages · Drag cover to close · Background to orbit',
  pageAnnouncement: 'Page {index} of {total}: {title}.',
  bookOpened: '{title} opened. Drag a page or use the arrow controls to read.',
  bookClosed: '{title} closed. Use Open book, click the book, or drag the cover to read.',
  returning: 'Returning {title} to the shelf.', returned: '{title} returned to the shelf.', viewReset: 'Inspection view reset for {title}.',
  contextLost: 'The 3D view lost its graphics context. The complete catalogue remains available below.',
  unavailable: 'WebGL is unavailable in this browser. The complete catalogue remains available below.',
  failed: 'The interactive shelf could not load. The complete catalogue remains available below.',
};
export type ShelfRuntimeUI = typeof en;
const tr: ShelfRuntimeUI = {
  selectVolume: '{index}. cildi seçin: {title}',
  selectedVolume: '{total} ciltten {index}. cilt seçildi: {title}. {note}',
  titlePage: 'Başlık sayfası', plate: 'Levha', notes: 'Notlar', system: 'Sistem', colophon: 'Son söz', chapter: 'Bölüm', sampleEdition: 'Örnek baskı',
  closeBook: 'Kitabı kapat', readingHint: 'Sayfaları sürükleyin · Kapatmak için kapağı sürükleyin · Döndürmek için arka planı kullanın',
  pageAnnouncement: '{total} sayfadan {index}. sayfa: {title}.',
  bookOpened: '{title} açıldı. Okumak için sayfayı sürükleyin veya ok düğmelerini kullanın.',
  bookClosed: '{title} kapalı. Okumak için Kitabı aç düğmesini kullanın, kitaba tıklayın veya kapağı sürükleyin.',
  returning: '{title} rafa geri konuyor.', returned: '{title} rafa geri kondu.', viewReset: '{title} için inceleme görünümü sıfırlandı.',
  contextLost: '3B görünümün grafik bağlantısı kesildi. Katalogun tamamı aşağıda kullanılabilir.',
  unavailable: 'Bu tarayıcıda WebGL kullanılamıyor. Katalogun tamamı aşağıda kullanılabilir.',
  failed: 'Etkileşimli raf yüklenemedi. Katalogun tamamı aşağıda kullanılabilir.',
};
const it: ShelfRuntimeUI = {
  selectVolume: 'Seleziona il volume {index}: {title}',
  selectedVolume: 'Selezionato il volume {index} di {total}: {title}. {note}',
  titlePage: 'Frontespizio', plate: 'Tavola', notes: 'Note', system: 'Sistema', colophon: 'Colophon', chapter: 'Capitolo', sampleEdition: 'Edizione dimostrativa',
  closeBook: 'Chiudi il libro', readingHint: 'Trascina le pagine · Trascina la copertina per chiudere · Usa lo sfondo per ruotare',
  pageAnnouncement: 'Pagina {index} di {total}: {title}.',
  bookOpened: '{title} aperto. Trascina una pagina o usa le frecce per leggere.',
  bookClosed: '{title} chiuso. Usa Apri il libro, clicca il libro o trascina la copertina per leggere.',
  returning: 'Rimetto {title} sullo scaffale.', returned: '{title} è tornato sullo scaffale.', viewReset: 'Vista di ispezione ripristinata per {title}.',
  contextLost: 'La vista 3D ha perso il contesto grafico. Il catalogo completo resta disponibile qui sotto.',
  unavailable: 'WebGL non è disponibile in questo browser. Il catalogo completo resta disponibile qui sotto.',
  failed: 'Lo scaffale interattivo non si è caricato. Il catalogo completo resta disponibile qui sotto.',
};
export const SHELF_RUNTIME: Record<Locale, ShelfRuntimeUI> = { en, tr, it };
