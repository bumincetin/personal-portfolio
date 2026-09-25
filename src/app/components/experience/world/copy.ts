import type { Locale } from "@/lib/translations";
const copy = {
  en: {
    archive: "The decision archive",
    hint: "Select an object to explore",
    back: "Return to the room",
    inspect: "Inspect",
    loading: "Opening the archive",
    unavailable: "Explore the volumes below",
    position: "Volume",
    next: "Next volume",
    previous: "Previous volume",
  },
  tr: {
    archive: "Karar arşivi",
    hint: "Keşfetmek için bir nesne seçin",
    back: "Odaya dön",
    inspect: "İncele",
    loading: "Arşiv açılıyor",
    unavailable: "Aşağıdaki ciltleri keşfedin",
    position: "Cilt",
    next: "Sonraki cilt",
    previous: "Önceki cilt",
  },
  it: {
    archive: "L’archivio delle decisioni",
    hint: "Seleziona un oggetto da esplorare",
    back: "Torna alla sala",
    inspect: "Esplora",
    loading: "Apertura dell’archivio",
    unavailable: "Esplora i volumi qui sotto",
    position: "Volume",
    next: "Volume successivo",
    previous: "Volume precedente",
  },
};
export const getWorldCopy = (locale: Locale) => copy[locale];
