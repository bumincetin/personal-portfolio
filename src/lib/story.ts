import type { Locale } from './translations';

/**
 * The home page is a single narrative: five chapters of the consultant's
 * background, each of which produces one service of the practice and one
 * piece of work. Everything on the page reads from here, so the story can be
 * re-ordered or re-worded without touching a component.
 *
 * Facts (dates, employers, thesis titles, the 80% figure) are the ones already
 * published on the About page; nothing here is invented.
 */

export type ChapterVisual = 'hemicycle' | 'montecarlo' | 'forecast' | 'attention' | 'corridor';

export interface StoryLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Chapter {
  numeral: string;
  years: string;
  place: string;
  institution: string;
  role: string;
  kicker: string;
  title: string;
  body: string;
  /** What this chapter turned into for a client today. */
  service: { label: string; name: string; href: string };
  /** The piece of work that came out of it. */
  work: { label: string; title: string; desc: string; links: StoryLink[] };
  visual: ChapterVisual;
}

export interface Story {
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    ctaStory: string;
    ctaBook: string;
    scrollCue: string;
    portraitCaption: string;
  };
  marquee: string[];
  index: { label: string; chapters: string; epilogue: string };
  chapters: Chapter[];
  epilogue: {
    kicker: string;
    title: string;
    body: string;
    servicesLabel: string;
    services: { numeral: string; name: string; line: string; href: string }[];
    stats: { value: string; label: string }[];
    cta: string;
    ctaSecondary: string;
  };
  labels: { chapter: string; turnedInto: string; theWork: string; readMore: string };
}

const services = (locale: Locale) => ({
  analytics: `/${locale}/services/financial-analytics`,
  bi: `/${locale}/services/business-intelligence`,
  nlp: `/${locale}/services/ai-nlp`,
  consultancy: `/${locale}/services/financial-consultancy`,
  portal: `/${locale}/portal`,
  research: `/${locale}/assets`,
  about: `/${locale}/about`,
});

const MARQUEE = ['Bocconi University', 'N26 Bank', 'Fedrigoni S.p.A.', 'ImpactScope', 'Alvolo Consulting'];

const en = (locale: Locale): Story => {
  const s = services(locale);
  return {
    hero: {
      eyebrow: 'Data Scientist · AI Specialist · Founder, Alvolo Consulting',
      titleLine1: 'Bridging the gap',
      titleLine2: 'between code & capital.',
      lede: 'I build the models that read markets, contracts and balance sheets — and the advisory practice that turns what they find into decisions. Below is the story of how the two became one.',
      ctaStory: 'Read the story',
      ctaBook: 'Book a consultation',
      scrollCue: 'Chapter I begins below',
      portraitCaption: 'Bumin Kağan Çetin — Milan',
    },
    marquee: MARQUEE,
    index: { label: 'Contents', chapters: 'Chapters', epilogue: 'Today' },
    labels: { chapter: 'Chapter', turnedInto: 'What it became', theWork: 'The work', readMore: 'Explore' },
    chapters: [
      {
        numeral: 'I',
        years: '2020 — 2023',
        place: 'Milan',
        institution: 'Bocconi University',
        role: 'B.Sc. Economics, Management & Computer Science',
        kicker: 'Foundations',
        title: 'An economist who learned to code, at a school that taught both.',
        body: 'Bocconi put econometrics and programming in the same week, every week. I left with a thesis that treated a national election as a forecasting problem — and the habit of asking what a model is for before asking how it works.',
        service: { label: 'Seeds', name: 'Quantitative thinking', href: s.about },
        work: {
          label: 'Bachelor thesis',
          title: 'Predicting the Turkish Parliament, 2023',
          desc: 'Predictive techniques for seat distribution in a general election, built on historical voting data.',
          links: [{ label: 'Repository', href: 'https://github.com/bumincetin/TurkishElection2023', external: true }],
        },
        visual: 'hemicycle',
      },
      {
        numeral: 'II',
        years: '2022 — 2023',
        place: 'Berlin',
        institution: 'N26 Bank AG',
        role: 'Risk Management Intern',
        kicker: 'Risk',
        title: 'Inside a bank, risk is not a chart. It is a register, a control, a decision.',
        body: 'In N26’s risk team I worked on the internal control system, the loss database and the risk register, and sat in the new-product process where every launch is weighed against what could go wrong. An elegant model only matters if it survives contact with a committee.',
        service: { label: 'Became', name: 'Financial Analytics & Modeling', href: s.analytics },
        work: {
          label: 'Live instrument',
          title: 'Geopolitical portfolio optimizer',
          desc: 'Black–Litterman allocation with Monte Carlo stress paths, running entirely in your browser on the service page.',
          links: [{ label: 'Open the optimizer', href: s.analytics }],
        },
        visual: 'montecarlo',
      },
      {
        numeral: 'III',
        years: '2024',
        place: 'Milan',
        institution: 'Fedrigoni S.p.A.',
        role: 'Junior Data Scientist',
        kicker: 'Industry',
        title: 'A century-old paper maker, and the first models I shipped to a factory floor.',
        body: 'At Fedrigoni I built LSTM time-series models for demand, a pricing model that combined unsupervised learning with NLP, and the Knime and PowerBI prototypes that let the business see them. Manufacturing does not care about your architecture; it cares whether the number on the dashboard is right on Monday morning.',
        service: { label: 'Became', name: 'Business Intelligence & Dashboards', href: s.bi },
        work: {
          label: 'Method',
          title: 'Forecast, then explain',
          desc: 'Every model I deploy ships with the dashboard that shows where its confidence ends.',
          links: [{ label: 'How I build dashboards', href: s.bi }],
        },
        visual: 'forecast',
      },
      {
        numeral: 'IV',
        years: '2023 — 2025',
        place: 'Milan & Switzerland',
        institution: 'Bocconi University · ImpactScope',
        role: 'M.Sc. Data Science · AI Specialist, NLP Researcher',
        kicker: 'Research',
        title: 'Teaching a language model to tell a promise from a plan.',
        body: 'My master’s thesis and my work at ImpactScope converged on one question: can a model audit what companies claim about sustainability? Fine-tuning RoBERTa on corporate disclosures and building a Semantic Contradiction Index cut manual review time by 80% — and made the verdicts auditable, not just accurate.',
        service: { label: 'Became', name: 'AI & NLP Solutions', href: s.nlp },
        work: {
          label: 'Thesis & data product',
          title: 'Auditable greenwashing detection',
          desc: 'Fine-tuned transformers scoring the gap between what a company promises and what it mechanically commits to.',
          links: [
            { label: 'Repository', href: 'https://github.com/bumincetin/greenwashing-detection', external: true },
            { label: 'All research', href: s.research },
          ],
        },
        visual: 'attention',
      },
      {
        numeral: 'V',
        years: '2025 —',
        place: 'Milan',
        institution: 'Alvolo Consulting',
        role: 'Founder',
        kicker: 'Founding',
        title: 'Then I built the firm I would have wanted to hire.',
        body: 'Alvolo Consulting is a financial advisory practice for businesses crossing between Turkey and Italy: company formation, tax structuring, banking, negotiation. Founding it meant learning the Italian financial system from the inside — and it is where the models and the advisory finally sit at the same table.',
        service: { label: 'Became', name: 'Financial Consultancy', href: s.consultancy },
        work: {
          label: 'Live instrument',
          title: 'IFRS statement analyst',
          desc: 'Upload a trial balance; receive an executive summary, ratio analysis and an IFRS balance sheet in seconds.',
          links: [
            { label: 'Open the demo portal', href: s.portal },
            { label: 'MaliBot, accounting agent', href: 'https://github.com/bumincetin/MaliBot-Agent', external: true },
          ],
        },
        visual: 'corridor',
      },
    ],
    epilogue: {
      kicker: 'Today',
      title: 'One partner who reads the balance sheet and writes the model.',
      body: 'Most data scientists don’t read a P&L. Most advisors don’t write code. I do both — for owners and executives who want a decision, not a dashboard.',
      servicesLabel: 'The practice',
      services: [
        { numeral: '01', name: 'Financial Analytics & Modeling', line: 'Forecasting, Value-at-Risk, portfolio optimisation', href: s.analytics },
        { numeral: '02', name: 'AI & NLP Solutions', line: 'Transformers, document intelligence, automation', href: s.nlp },
        { numeral: '03', name: 'Business Intelligence', line: 'Executive dashboards, reporting pipelines', href: s.bi },
        { numeral: '04', name: 'Financial Consultancy', line: 'Turkey–Italy corridor, formation, tax, banking', href: s.consultancy },
      ],
      stats: [
        { value: '2', label: 'Bocconi degrees' },
        { value: '4', label: 'Languages' },
        { value: '7', label: 'Certifications' },
        { value: '3', label: 'Countries worked in' },
      ],
      cta: 'Start a conversation',
      ctaSecondary: 'Full biography',
    },
  };
};

const tr = (locale: Locale): Story => {
  const s = services(locale);
  return {
    hero: {
      eyebrow: 'Veri Bilimci · Yapay Zekâ Uzmanı · Alvolo Consulting Kurucusu',
      titleLine1: 'Kod ile sermaye',
      titleLine2: 'arasındaki köprü.',
      lede: 'Piyasaları, sözleşmeleri ve bilançoları okuyan modelleri kuruyorum — ve bulduklarını karara dönüştüren danışmanlık pratiğini. Aşağıda ikisinin nasıl tek bir iş hâline geldiğinin hikâyesi var.',
      ctaStory: 'Hikâyeyi okuyun',
      ctaBook: 'Görüşme planlayın',
      scrollCue: 'Bölüm I aşağıda başlıyor',
      portraitCaption: 'Bumin Kağan Çetin — Milano',
    },
    marquee: MARQUEE,
    index: { label: 'İçindekiler', chapters: 'Bölümler', epilogue: 'Bugün' },
    labels: { chapter: 'Bölüm', turnedInto: 'Neye dönüştü', theWork: 'Çalışma', readMore: 'Keşfedin' },
    chapters: [
      {
        numeral: 'I',
        years: '2020 — 2023',
        place: 'Milano',
        institution: 'Bocconi Üniversitesi',
        role: 'Ekonomi, Yönetim ve Bilgisayar Bilimleri Lisansı',
        kicker: 'Temeller',
        title: 'Kod yazmayı öğrenen bir ekonomist, ikisini birden öğreten bir okulda.',
        body: 'Bocconi ekonometri ile programlamayı her hafta aynı haftaya koydu. Oradan, bir genel seçimi tahmin problemi olarak ele alan bir tezle — ve bir modelin nasıl çalıştığını sormadan önce ne için olduğunu sorma alışkanlığıyla ayrıldım.',
        service: { label: 'Tohum', name: 'Nicel düşünce', href: s.about },
        work: {
          label: 'Lisans tezi',
          title: 'TBMM 2023 Seçim Tahmini',
          desc: 'Tarihsel oy verileri üzerine kurulu, sandalye dağılımı için öngörü teknikleri.',
          links: [{ label: 'Depo', href: 'https://github.com/bumincetin/TurkishElection2023', external: true }],
        },
        visual: 'hemicycle',
      },
      {
        numeral: 'II',
        years: '2022 — 2023',
        place: 'Berlin',
        institution: 'N26 Bank AG',
        role: 'Risk Yönetimi Stajyeri',
        kicker: 'Risk',
        title: 'Bir bankanın içinde risk bir grafik değildir. Bir kayıt, bir kontrol, bir karardır.',
        body: 'N26’nın risk ekibinde iç kontrol sistemi, kayıp veritabanı ve risk sicili üzerinde çalıştım; her lansmanın neyin ters gidebileceğine karşı tartıldığı yeni ürün sürecinde yer aldım. Zarif bir model ancak bir komiteyle temastan sağ çıkarsa önemlidir.',
        service: { label: 'Dönüştü', name: 'Finansal Analitik ve Modelleme', href: s.analytics },
        work: {
          label: 'Canlı araç',
          title: 'Jeopolitik portföy optimizasyonu',
          desc: 'Monte Carlo stres yollarıyla Black–Litterman dağılımı; hizmet sayfasında tamamen tarayıcınızda çalışır.',
          links: [{ label: 'Optimizasyonu açın', href: s.analytics }],
        },
        visual: 'montecarlo',
      },
      {
        numeral: 'III',
        years: '2024',
        place: 'Milano',
        institution: 'Fedrigoni S.p.A.',
        role: 'Junior Veri Bilimci',
        kicker: 'Sanayi',
        title: 'Yüz yıllık bir kâğıt üreticisi ve fabrika sahasına gönderdiğim ilk modeller.',
        body: 'Fedrigoni’de talep için LSTM zaman serisi modelleri, denetimsiz öğrenmeyle NLP’yi birleştiren bir fiyatlama modeli ve işin bunları görmesini sağlayan Knime ile PowerBI prototiplerini geliştirdim. Üretim mimarinizi umursamaz; pazartesi sabahı panodaki sayının doğru olup olmadığını umursar.',
        service: { label: 'Dönüştü', name: 'İş Zekâsı ve Panolar', href: s.bi },
        work: {
          label: 'Yöntem',
          title: 'Önce tahmin et, sonra açıkla',
          desc: 'Devreye aldığım her model, güveninin nerede bittiğini gösteren panosuyla birlikte gelir.',
          links: [{ label: 'Panoları nasıl kuruyorum', href: s.bi }],
        },
        visual: 'forecast',
      },
      {
        numeral: 'IV',
        years: '2023 — 2025',
        place: 'Milano ve İsviçre',
        institution: 'Bocconi Üniversitesi · ImpactScope',
        role: 'Veri Bilimi Yüksek Lisansı · Yapay Zekâ Uzmanı, NLP Araştırmacısı',
        kicker: 'Araştırma',
        title: 'Bir dil modeline vaat ile planı ayırt etmeyi öğretmek.',
        body: 'Yüksek lisans tezim ve ImpactScope’taki çalışmam tek bir soruda birleşti: bir model, şirketlerin sürdürülebilirlik iddialarını denetleyebilir mi? Kurumsal raporlar üzerinde RoBERTa’yı ince ayarlamak ve bir Semantik Çelişki Endeksi kurmak manuel inceleme süresini %80 azalttı — ve kararları yalnızca doğru değil, denetlenebilir kıldı.',
        service: { label: 'Dönüştü', name: 'Yapay Zekâ ve NLP Çözümleri', href: s.nlp },
        work: {
          label: 'Tez ve veri ürünü',
          title: 'Denetlenebilir yeşil aklama tespiti',
          desc: 'Bir şirketin vaat ettiği ile mekanik olarak taahhüt ettiği arasındaki farkı puanlayan ince ayarlı transformer modelleri.',
          links: [
            { label: 'Depo', href: 'https://github.com/bumincetin/greenwashing-detection', external: true },
            { label: 'Tüm araştırmalar', href: s.research },
          ],
        },
        visual: 'attention',
      },
      {
        numeral: 'V',
        years: '2025 —',
        place: 'Milano',
        institution: 'Alvolo Consulting',
        role: 'Kurucu',
        kicker: 'Kuruluş',
        title: 'Sonra, kendim işe almak isteyeceğim firmayı kurdum.',
        body: 'Alvolo Consulting, Türkiye ile İtalya arasında iş yapan şirketler için bir finansal danışmanlık pratiği: şirket kuruluşu, vergi yapılandırması, bankacılık, müzakere. Onu kurmak İtalyan finans sistemini içeriden öğrenmek demekti — ve modellerle danışmanlığın nihayet aynı masaya oturduğu yer burası.',
        service: { label: 'Dönüştü', name: 'Finansal Danışmanlık', href: s.consultancy },
        work: {
          label: 'Canlı araç',
          title: 'UFRS mali tablo analisti',
          desc: 'Bir mizan yükleyin; saniyeler içinde yönetici özeti, oran analizi ve UFRS bilançosu alın.',
          links: [
            { label: 'Demo portalı açın', href: s.portal },
            { label: 'MaliBot, muhasebe ajanı', href: 'https://github.com/bumincetin/MaliBot-Agent', external: true },
          ],
        },
        visual: 'corridor',
      },
    ],
    epilogue: {
      kicker: 'Bugün',
      title: 'Bilançoyu okuyan ve modeli yazan tek bir ortak.',
      body: 'Çoğu veri bilimci gelir tablosu okumaz. Çoğu danışman kod yazmaz. Ben ikisini de yapıyorum — pano değil, karar isteyen sahipler ve yöneticiler için.',
      servicesLabel: 'Pratik',
      services: [
        { numeral: '01', name: 'Finansal Analitik ve Modelleme', line: 'Tahmin, riske maruz değer, portföy optimizasyonu', href: s.analytics },
        { numeral: '02', name: 'Yapay Zekâ ve NLP Çözümleri', line: 'Transformer modelleri, belge zekâsı, otomasyon', href: s.nlp },
        { numeral: '03', name: 'İş Zekâsı', line: 'Yönetici panoları, raporlama hatları', href: s.bi },
        { numeral: '04', name: 'Finansal Danışmanlık', line: 'Türkiye–İtalya koridoru, kuruluş, vergi, bankacılık', href: s.consultancy },
      ],
      stats: [
        { value: '2', label: 'Bocconi diploması' },
        { value: '4', label: 'Dil' },
        { value: '7', label: 'Sertifika' },
        { value: '3', label: 'Çalışılan ülke' },
      ],
      cta: 'Görüşme başlatın',
      ctaSecondary: 'Tam özgeçmiş',
    },
  };
};

const it = (locale: Locale): Story => {
  const s = services(locale);
  return {
    hero: {
      eyebrow: 'Data Scientist · AI Specialist · Fondatore, Alvolo Consulting',
      titleLine1: 'Un ponte tra',
      titleLine2: 'codice e capitale.',
      lede: 'Costruisco i modelli che leggono mercati, contratti e bilanci — e la pratica di consulenza che trasforma ciò che trovano in decisioni. Qui sotto, la storia di come le due cose sono diventate una.',
      ctaStory: 'Leggi la storia',
      ctaBook: 'Prenota una consulenza',
      scrollCue: 'Il Capitolo I inizia qui sotto',
      portraitCaption: 'Bumin Kağan Çetin — Milano',
    },
    marquee: MARQUEE,
    index: { label: 'Indice', chapters: 'Capitoli', epilogue: 'Oggi' },
    labels: { chapter: 'Capitolo', turnedInto: 'Cosa è diventato', theWork: 'Il lavoro', readMore: 'Esplora' },
    chapters: [
      {
        numeral: 'I',
        years: '2020 — 2023',
        place: 'Milano',
        institution: 'Università Bocconi',
        role: 'Laurea in Economia, Management e Informatica',
        kicker: 'Fondamenta',
        title: 'Un economista che ha imparato a programmare, in una scuola che insegnava entrambi.',
        body: 'La Bocconi metteva econometria e programmazione nella stessa settimana, ogni settimana. Ne sono uscito con una tesi che trattava un’elezione nazionale come un problema di previsione — e con l’abitudine di chiedere a cosa serve un modello prima di chiedere come funziona.',
        service: { label: 'Seme', name: 'Pensiero quantitativo', href: s.about },
        work: {
          label: 'Tesi triennale',
          title: 'Prevedere il Parlamento turco, 2023',
          desc: 'Tecniche predittive per la distribuzione dei seggi in un’elezione generale, costruite su dati di voto storici.',
          links: [{ label: 'Repository', href: 'https://github.com/bumincetin/TurkishElection2023', external: true }],
        },
        visual: 'hemicycle',
      },
      {
        numeral: 'II',
        years: '2022 — 2023',
        place: 'Berlino',
        institution: 'N26 Bank AG',
        role: 'Stagista Risk Management',
        kicker: 'Rischio',
        title: 'Dentro una banca il rischio non è un grafico. È un registro, un controllo, una decisione.',
        body: 'Nel team rischio di N26 ho lavorato al sistema di controllo interno, al database delle perdite e al registro dei rischi, e ho seguito il processo nuovi prodotti, dove ogni lancio viene pesato contro ciò che potrebbe andare storto. Un modello elegante conta solo se sopravvive al contatto con un comitato.',
        service: { label: 'È diventato', name: 'Analisi e modellazione finanziaria', href: s.analytics },
        work: {
          label: 'Strumento live',
          title: 'Ottimizzatore di portafoglio geopolitico',
          desc: 'Allocazione Black–Litterman con percorsi di stress Monte Carlo, interamente nel tuo browser sulla pagina del servizio.',
          links: [{ label: 'Apri l’ottimizzatore', href: s.analytics }],
        },
        visual: 'montecarlo',
      },
      {
        numeral: 'III',
        years: '2024',
        place: 'Milano',
        institution: 'Fedrigoni S.p.A.',
        role: 'Junior Data Scientist',
        kicker: 'Industria',
        title: 'Una cartiera centenaria, e i primi modelli che ho portato in fabbrica.',
        body: 'In Fedrigoni ho costruito modelli LSTM per la domanda, un modello di pricing che univa apprendimento non supervisionato e NLP, e i prototipi Knime e PowerBI che permettevano al business di vederli. La manifattura non si cura della tua architettura; si cura che il numero sul cruscotto sia giusto il lunedì mattina.',
        service: { label: 'È diventato', name: 'Business Intelligence e dashboard', href: s.bi },
        work: {
          label: 'Metodo',
          title: 'Prevedere, poi spiegare',
          desc: 'Ogni modello che rilascio arriva con il cruscotto che mostra dove finisce la sua fiducia.',
          links: [{ label: 'Come costruisco le dashboard', href: s.bi }],
        },
        visual: 'forecast',
      },
      {
        numeral: 'IV',
        years: '2023 — 2025',
        place: 'Milano e Svizzera',
        institution: 'Università Bocconi · ImpactScope',
        role: 'M.Sc. Data Science · AI Specialist, ricercatore NLP',
        kicker: 'Ricerca',
        title: 'Insegnare a un modello linguistico a distinguere una promessa da un piano.',
        body: 'La mia tesi magistrale e il lavoro in ImpactScope sono convergiti su una domanda: un modello può verificare ciò che le aziende dichiarano sulla sostenibilità? Il fine-tuning di RoBERTa sulle comunicazioni aziendali e un Indice di Contraddizione Semantica hanno ridotto dell’80% il tempo di revisione manuale — rendendo i verdetti verificabili, non solo accurati.',
        service: { label: 'È diventato', name: 'Soluzioni AI e NLP', href: s.nlp },
        work: {
          label: 'Tesi e prodotto dati',
          title: 'Rilevamento verificabile del greenwashing',
          desc: 'Transformer affinati che misurano il divario tra ciò che un’azienda promette e ciò a cui si impegna concretamente.',
          links: [
            { label: 'Repository', href: 'https://github.com/bumincetin/greenwashing-detection', external: true },
            { label: 'Tutta la ricerca', href: s.research },
          ],
        },
        visual: 'attention',
      },
      {
        numeral: 'V',
        years: '2025 —',
        place: 'Milano',
        institution: 'Alvolo Consulting',
        role: 'Fondatore',
        kicker: 'Fondazione',
        title: 'Poi ho costruito la società che avrei voluto assumere.',
        body: 'Alvolo Consulting è una pratica di consulenza finanziaria per le imprese che attraversano Turchia e Italia: costituzione societaria, strutturazione fiscale, banche, negoziazione. Fondarla ha significato imparare il sistema finanziario italiano dall’interno — ed è il luogo dove modelli e consulenza siedono finalmente allo stesso tavolo.',
        service: { label: 'È diventato', name: 'Consulenza finanziaria', href: s.consultancy },
        work: {
          label: 'Strumento live',
          title: 'Analista di bilancio IFRS',
          desc: 'Carica un bilancio di verifica; ricevi in pochi secondi executive summary, analisi degli indici e stato patrimoniale IFRS.',
          links: [
            { label: 'Apri il portale demo', href: s.portal },
            { label: 'MaliBot, agente contabile', href: 'https://github.com/bumincetin/MaliBot-Agent', external: true },
          ],
        },
        visual: 'corridor',
      },
    ],
    epilogue: {
      kicker: 'Oggi',
      title: 'Un solo partner che legge il bilancio e scrive il modello.',
      body: 'La maggior parte dei data scientist non legge un conto economico. La maggior parte dei consulenti non scrive codice. Io faccio entrambe le cose — per titolari e dirigenti che vogliono una decisione, non una dashboard.',
      servicesLabel: 'La pratica',
      services: [
        { numeral: '01', name: 'Analisi e modellazione finanziaria', line: 'Previsione, Value-at-Risk, ottimizzazione di portafoglio', href: s.analytics },
        { numeral: '02', name: 'Soluzioni AI e NLP', line: 'Transformer, document intelligence, automazione', href: s.nlp },
        { numeral: '03', name: 'Business Intelligence', line: 'Dashboard direzionali, pipeline di reporting', href: s.bi },
        { numeral: '04', name: 'Consulenza finanziaria', line: 'Corridoio Turchia–Italia, costituzione, fisco, banche', href: s.consultancy },
      ],
      stats: [
        { value: '2', label: 'Lauree Bocconi' },
        { value: '4', label: 'Lingue' },
        { value: '7', label: 'Certificazioni' },
        { value: '3', label: 'Paesi di lavoro' },
      ],
      cta: 'Inizia una conversazione',
      ctaSecondary: 'Biografia completa',
    },
  };
};

const BUILDERS: Record<Locale, (locale: Locale) => Story> = { en, tr, it };

export function getStory(locale: Locale): Story {
  return (BUILDERS[locale] ?? en)(locale);
}
