import type { Locale } from './translations';

/**
 * The biographical record, as the colophon prints it.
 *
 * One entry per stage of the background, in order. Each is dated exactly as the
 * record states it — every engagement has an end date, nothing says "present",
 * and no title appears that the record does not carry. That is deliberate: the
 * site previously showed three different titles for the same engagement and an
 * affiliation that read as current employment. See docs/content-verification.md.
 *
 * This file holds no figures and no claims about outcomes. Where the work
 * produced a number worth quoting, the number lives in
 * `src/lib/content/evidence.ts` with its source, method and limits attached,
 * and is rendered on the volume it belongs to.
 */

export interface Chapter {
  /** Roman numeral, for ordering and for the printed marker. */
  numeral: string;
  years: string;
  place: string;
  institution: string;
  role: string;
  title: string;
  body: string;
}

export interface Story {
  /** Heading above the record. */
  chaptersLabel: string;
  chapters: Chapter[];
}

const STORIES: Record<Locale, Story> = {
  en: {
    chaptersLabel: "Chapters",
    chapters: [
      {
        numeral: "I",
        years: "2020 — 2023",
        place: "Milan",
        institution: "Bocconi University",
        role: "B.Sc. Economics, Management & Computer Science",
        title: "An economist who learned to code, at a school that taught both.",
        body: "Bocconi put econometrics and programming in the same week, every week. I left with a thesis that treated a national election as a forecasting problem — and the habit of asking what a model is for before asking how it works.",
      },
      {
        numeral: "II",
        years: "2022 — 2023",
        place: "Berlin",
        institution: "N26 Bank AG",
        role: "Risk Management Intern",
        title: "Inside a bank, risk is not a chart. It is a register, a control, a decision.",
        body: "In N26’s risk team I worked on the internal control system, the loss database and the risk register, and sat in the new-product process where every launch is weighed against what could go wrong. An elegant model only matters if it survives contact with a committee.",
      },
      {
        numeral: "III",
        years: "2024",
        place: "Milan",
        institution: "Fedrigoni S.p.A.",
        role: "Junior Data Scientist",
        title: "A century-old paper maker, and the first models I shipped to a factory floor.",
        body: "At Fedrigoni I built LSTM time-series models for demand, a pricing model that combined unsupervised learning with NLP, and the Knime and PowerBI prototypes that let the business see them. Manufacturing does not care about your architecture; it cares whether the number on the dashboard is right on Monday morning.",
      },
      {
        numeral: "IV",
        years: "2023 — 2025",
        place: "Milan & Switzerland",
        institution: "Bocconi University · ImpactScope",
        role: "M.Sc. Data Science · AI Specialist, NLP Researcher",
        title: "Teaching a language model to tell a promise from a plan.",
        body: "My master’s thesis and my work at ImpactScope converged on one question: can a model audit what companies claim about sustainability? The answer that survived evaluation was narrower and more useful than the one I set out to find — a detector that tracks expert judgement closely enough to rank a reading queue, and nowhere near well enough to replace the reader.",
      },
      {
        numeral: "V",
        years: "2025",
        place: "Milan",
        institution: "Alvolo Consulting",
        role: "Founder",
        title: "Then I built the firm I would have wanted to hire.",
        body: "Alvolo Consulting is a financial advisory practice for businesses crossing between Turkey and Italy: company formation, tax structuring, banking, negotiation. Founding it meant learning the Italian financial system from the inside — and it is where the models and the advisory finally sit at the same table.",
      },
    ],
  },
  tr: {
    chaptersLabel: "Bölümler",
    chapters: [
      {
        numeral: "I",
        years: "2020 — 2023",
        place: "Milano",
        institution: "Bocconi Üniversitesi",
        role: "Ekonomi, Yönetim ve Bilgisayar Bilimleri Lisansı",
        title: "Kod yazmayı öğrenen bir ekonomist, ikisini birden öğreten bir okulda.",
        body: "Bocconi ekonometri ile programlamayı her hafta aynı haftaya koydu. Oradan, bir genel seçimi tahmin problemi olarak ele alan bir tezle — ve bir modelin nasıl çalıştığını sormadan önce ne için olduğunu sorma alışkanlığıyla ayrıldım.",
      },
      {
        numeral: "II",
        years: "2022 — 2023",
        place: "Berlin",
        institution: "N26 Bank AG",
        role: "Risk Yönetimi Stajyeri",
        title: "Bir bankanın içinde risk bir grafik değildir. Bir kayıt, bir kontrol, bir karardır.",
        body: "N26’nın risk ekibinde iç kontrol sistemi, kayıp veritabanı ve risk sicili üzerinde çalıştım; her lansmanın neyin ters gidebileceğine karşı tartıldığı yeni ürün sürecinde yer aldım. Zarif bir model ancak bir komiteyle temastan sağ çıkarsa önemlidir.",
      },
      {
        numeral: "III",
        years: "2024",
        place: "Milano",
        institution: "Fedrigoni S.p.A.",
        role: "Junior Veri Bilimci",
        title: "Yüz yıllık bir kâğıt üreticisi ve fabrika sahasına gönderdiğim ilk modeller.",
        body: "Fedrigoni’de talep için LSTM zaman serisi modelleri, denetimsiz öğrenmeyle NLP’yi birleştiren bir fiyatlama modeli ve işin bunları görmesini sağlayan Knime ile PowerBI prototiplerini geliştirdim. Üretim mimarinizi umursamaz; pazartesi sabahı panodaki sayının doğru olup olmadığını umursar.",
      },
      {
        numeral: "IV",
        years: "2023 — 2025",
        place: "Milano ve İsviçre",
        institution: "Bocconi Üniversitesi · ImpactScope",
        role: "Veri Bilimi Yüksek Lisansı · Yapay Zekâ Uzmanı, NLP Araştırmacısı",
        title: "Bir dil modeline vaat ile planı ayırt etmeyi öğretmek.",
        body: "Yüksek lisans tezim ve ImpactScope’taki çalışmam tek bir soruda birleşti: bir model, şirketlerin sürdürülebilirlik iddialarını denetleyebilir mi? Değerlendirmeden sağ çıkan cevap, aradığımdan daha dar ve daha kullanışlıydı — bir okuma kuyruğunu sıralayacak kadar uzman yargısını izleyen, okuyucunun yerini almaya ise hiç yaklaşmayan bir dedektör.",
      },
      {
        numeral: "V",
        years: "2025",
        place: "Milano",
        institution: "Alvolo Consulting",
        role: "Kurucu",
        title: "Sonra, kendim işe almak isteyeceğim firmayı kurdum.",
        body: "Alvolo Consulting, Türkiye ile İtalya arasında iş yapan şirketler için bir finansal danışmanlık pratiği: şirket kuruluşu, vergi yapılandırması, bankacılık, müzakere. Onu kurmak İtalyan finans sistemini içeriden öğrenmek demekti — ve modellerle danışmanlığın nihayet aynı masaya oturduğu yer burası.",
      },
    ],
  },
  it: {
    chaptersLabel: "Capitoli",
    chapters: [
      {
        numeral: "I",
        years: "2020 — 2023",
        place: "Milano",
        institution: "Università Bocconi",
        role: "Laurea in Economia, Management e Informatica",
        title: "Un economista che ha imparato a programmare, in una scuola che insegnava entrambi.",
        body: "La Bocconi metteva econometria e programmazione nella stessa settimana, ogni settimana. Ne sono uscito con una tesi che trattava un’elezione nazionale come un problema di previsione — e con l’abitudine di chiedere a cosa serve un modello prima di chiedere come funziona.",
      },
      {
        numeral: "II",
        years: "2022 — 2023",
        place: "Berlino",
        institution: "N26 Bank AG",
        role: "Stagista Risk Management",
        title: "Dentro una banca il rischio non è un grafico. È un registro, un controllo, una decisione.",
        body: "Nel team rischio di N26 ho lavorato al sistema di controllo interno, al database delle perdite e al registro dei rischi, e ho seguito il processo nuovi prodotti, dove ogni lancio viene pesato contro ciò che potrebbe andare storto. Un modello elegante conta solo se sopravvive al contatto con un comitato.",
      },
      {
        numeral: "III",
        years: "2024",
        place: "Milano",
        institution: "Fedrigoni S.p.A.",
        role: "Junior Data Scientist",
        title: "Una cartiera centenaria, e i primi modelli che ho portato in fabbrica.",
        body: "In Fedrigoni ho costruito modelli LSTM per la domanda, un modello di pricing che univa apprendimento non supervisionato e NLP, e i prototipi Knime e PowerBI che permettevano al business di vederli. La manifattura non si cura della tua architettura; si cura che il numero sul cruscotto sia giusto il lunedì mattina.",
      },
      {
        numeral: "IV",
        years: "2023 — 2025",
        place: "Milano e Svizzera",
        institution: "Università Bocconi · ImpactScope",
        role: "M.Sc. Data Science · AI Specialist, ricercatore NLP",
        title: "Insegnare a un modello linguistico a distinguere una promessa da un piano.",
        body: "La mia tesi magistrale e il lavoro in ImpactScope sono convergiti su una domanda: un modello può verificare ciò che le aziende dichiarano sulla sostenibilità? La risposta sopravvissuta alla valutazione era più stretta e più utile di quella che cercavo — un rilevatore che segue il giudizio esperto abbastanza da ordinare una coda di lettura, e per nulla abbastanza da sostituire chi legge.",
      },
      {
        numeral: "V",
        years: "2025",
        place: "Milano",
        institution: "Alvolo Consulting",
        role: "Fondatore",
        title: "Poi ho costruito la società che avrei voluto assumere.",
        body: "Alvolo Consulting è una pratica di consulenza finanziaria per le imprese che attraversano Turchia e Italia: costituzione societaria, strutturazione fiscale, banche, negoziazione. Fondarla ha significato imparare il sistema finanziario italiano dall’interno — ed è il luogo dove modelli e consulenza siedono finalmente allo stesso tavolo.",
      },
    ],
  },
};

export const getStory = (locale: Locale): Story => STORIES[locale] ?? STORIES.en;
