import type { Locale } from "@/lib/translations";

const copy = {
  en: {
    label: "The working room",
    hint: "Seven objects. Seven ways into the work.",
    explore: "Choose an object to look closer, or browse the work below.",
    overview: "Whole room",
    read: "Explore this work",
    select: "Inspect",
    still: "Still view",
    live: "Explore in 3D",
    loading: "Opening the room…",
    fallback: "Still view · all work is available below",
    ready: "Interactive room",
  },
  tr: {
    label: "Çalışma odası",
    hint: "Yedi nesne. Çalışmalara açılan yedi kapı.",
    explore:
      "Yakından bakmak için bir nesne seçin veya aşağıdaki çalışmalara göz atın.",
    overview: "Odanın tamamı",
    read: "Çalışmayı incele",
    select: "İncele",
    still: "Durağan görünüm",
    live: "3B olarak keşfet",
    loading: "Oda açılıyor…",
    fallback: "Durağan görünüm · tüm çalışmalar aşağıda",
    ready: "Etkileşimli oda",
  },
  it: {
    label: "La stanza di lavoro",
    hint: "Sette oggetti. Sette modi di esplorare il lavoro.",
    explore:
      "Scegli un oggetto per osservarlo da vicino o esplora i lavori qui sotto.",
    overview: "Intera stanza",
    read: "Esplora il lavoro",
    select: "Esamina",
    still: "Vista statica",
    live: "Esplora in 3D",
    loading: "Apertura della stanza…",
    fallback: "Vista statica · tutti i lavori sono disponibili qui sotto",
    ready: "Stanza interattiva",
  },
};
export const getWorldCopy = (locale: Locale) => copy[locale];
