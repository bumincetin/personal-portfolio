import type { Locale } from "../translations";

const en = {
  hero: "Applied AI and financial analytics for clearer business decisions.",
  intro:
    "I help finance and operations teams turn document queues, forecasts, and fragmented reports into workflows they can check and use.",
  directory: "Services & work",
  about: "About / CV",
  approach: "Approach",
  home: "Home",
  service: "Service offering",
  research: "Research project",
  synthetic: "Synthetic demonstration",
  browse: "Browse the work",
  contact: "Discuss your project",
  read: "Read this volume",
  takeaway: "What you receive / learn",
  collection: "A working library",
  collectionNote:
    "Four services, two research projects, and one synthetic demonstration. Open any volume to examine its scope, evidence, and limitations.",

  boundary:
    "Italy–Turkey commercial coordination is a separate, scoped service. Regulated legal, tax, accounting, and investment work remains with licensed professionals.",
  contents: "In this volume",
  print: "Print / save article",
  offered: "What is in scope",
  launchOptimizer: "Open the synthetic optimizer",
  optimizerFailed:
    "The instrument could not load. Its methods, examples, and limitations remain in this article.",
  simple: "Write a message",
  guided: "Use guided questions",
  topic: "Topic",
  timing: "Timing",
  regenerate: "Replace draft with current answers",
  email: "Open email draft",
  whatsapp: "Open WhatsApp draft",
  outlook: "Open Outlook draft",
  contactIntro:
    "Describe the problem or outcome you have in mind. You can write directly, or use a few optional questions to shape your message.",
  messageRequired: "Please add a message.",
  copyFallback:
    "If your email app does not open, copy your message and paste it into your preferred app.",
  longDraft:
    "This draft is long for an app link. Copy it and paste it into your email or WhatsApp app.",
  optionalDetails: "Name, topic & timing (optional)",
};
export type LibraryUI = typeof en;
const tr: LibraryUI = {
  hero: "Daha net iş kararları için uygulamalı yapay zekâ ve finansal analitik.",
  intro:
    "Finans ve operasyon ekiplerinin belge kuyruklarını, tahminlerini ve dağınık raporlarını kontrol edebilecekleri, kullanışlı iş akışlarına dönüştürmelerine yardımcı oluyorum.",
  directory: "Hizmetler ve çalışmalar",
  about: "Hakkımda / CV",
  approach: "Yaklaşım",
  home: "Ana sayfa",
  service: "Hizmet",
  research: "Araştırma projesi",
  synthetic: "Sentetik gösterim",
  browse: "Çalışmaları inceleyin",
  contact: "Projenizi konuşalım",
  read: "Bu cildi okuyun",
  takeaway: "Çıktı / öğrenilecekler",
  collection: "Bir çalışma kütüphanesi",
  collectionNote:
    "Dört hizmet, iki araştırma projesi ve bir sentetik gösterim. Kapsamı, kanıtları ve sınırlamaları incelemek için bir cilt açın.",

  boundary:
    "İtalya–Türkiye ticari koordinasyonu, kapsamı belirlenmiş ayrı bir hizmettir. Düzenlemeye tabi hukuk, vergi, muhasebe ve yatırım işleri yetkili uzmanların sorumluluğundadır.",
  contents: "Bu ciltte",
  print: "Makaleyi yazdır / kaydet",
  offered: "Kapsama dahil olanlar",
  launchOptimizer: "Sentetik optimizasyon aracını aç",
  optimizerFailed:
    "Araç yüklenemedi. Yöntemler, örnekler ve sınırlamalar bu makalede yer alıyor.",
  simple: "Mesaj yazın",
  guided: "Rehber soruları kullanın",
  topic: "Konu",
  timing: "Zamanlama",
  regenerate: "Taslağı güncel yanıtlarla değiştir",
  email: "E-posta taslağını aç",
  whatsapp: "WhatsApp taslağını aç",
  outlook: "Outlook taslağını aç",
  contactIntro:
    "Aklınızdaki sorunu veya hedeflediğiniz sonucu anlatın. Doğrudan yazabilir veya mesajınızı şekillendirmek için isteğe bağlı birkaç sorudan yararlanabilirsiniz.",
  messageRequired: "Lütfen bir mesaj yazın.",
  copyFallback:
    "E-posta uygulamanız açılmazsa mesajınızı kopyalayıp tercih ettiğiniz uygulamaya yapıştırın.",
  longDraft:
    "Bu taslak, uygulama bağlantısı için uzun. Kopyalayıp e-posta veya WhatsApp uygulamanıza yapıştırın.",
  optionalDetails: "Ad, konu ve zamanlama (isteğe bağlı)",
};
const it: LibraryUI = {
  hero: "AI applicata e analisi finanziaria per decisioni aziendali più chiare.",
  intro:
    "Aiuto i team finanziari e operativi a trasformare code di documenti, previsioni e report frammentati in flussi di lavoro verificabili e utilizzabili.",
  directory: "Servizi e progetti",
  about: "Profilo / CV",
  approach: "Approccio",
  home: "Home",
  service: "Servizio",
  research: "Progetto di ricerca",
  synthetic: "Dimostrazione sintetica",
  browse: "Esplora i progetti",
  contact: "Parliamo del tuo progetto",
  read: "Leggi questo volume",
  takeaway: "Cosa ricevi / impari",
  collection: "Una biblioteca di lavoro",
  collectionNote:
    "Quattro servizi, due progetti di ricerca e una dimostrazione sintetica. Apri un volume per esaminarne ambito, prove e limiti.",

  boundary:
    "Il coordinamento commerciale Italia–Turchia è un servizio separato con un ambito definito. Le attività regolamentate in materia legale, fiscale, contabile e di investimento restano affidate a professionisti abilitati.",
  contents: "In questo volume",
  print: "Stampa / salva articolo",
  offered: "Cosa è incluso",
  launchOptimizer: "Apri l’ottimizzatore sintetico",
  optimizerFailed:
    "Lo strumento non si è caricato. Metodi, esempi e limiti restano disponibili in questo articolo.",
  simple: "Scrivi un messaggio",
  guided: "Usa le domande guidate",
  topic: "Argomento",
  timing: "Tempistiche",
  regenerate: "Sostituisci la bozza con le risposte attuali",
  email: "Apri bozza email",
  whatsapp: "Apri bozza WhatsApp",
  outlook: "Apri bozza Outlook",
  contactIntro:
    "Descrivi il problema o il risultato che hai in mente. Puoi scrivere direttamente o usare alcune domande facoltative per formulare il messaggio.",
  messageRequired: "Aggiungi un messaggio.",
  copyFallback:
    "Se l’app email non si apre, copia il messaggio e incollalo nell’app che preferisci.",
  longDraft:
    "Questa bozza è lunga per un collegamento all’app. Copiala e incollala nella tua app email o WhatsApp.",
  optionalDetails: "Nome, argomento e tempistiche (facoltativi)",
};
export const LIBRARY_UI: Record<Locale, LibraryUI> = { en, tr, it };
export const getLibraryUI = (locale: Locale) => LIBRARY_UI[locale];
