export const locales = ['en', 'tr', 'it'] as const;
export type Locale = (typeof locales)[number];

/**
 * The record behind the colophon.
 *
 * This file used to carry the copy for the whole site — a hero, a ticker, a
 * services index, a projects index, an SME page and a four-section methodology
 * page, in three languages. None of those pages exist any more; their content
 * is bound into the seven volumes and lives in `src/lib/content/`. What is left
 * here is the biographical record the colophon renders, and nothing else.
 *
 * Two rules this file follows, and `docs/content-verification.md` explains why:
 *
 *  - **Dates are stated as the record states them.** Every engagement below has
 *    an end date. Nothing says "present", and no title appears that the record
 *    does not carry — the site previously showed three different Alvolo titles
 *    and an affiliation that read as current employment.
 *  - **No unsourced figure.** The "80% reduction in manual review time" that
 *    used to appear in the ImpactScope entry had no baseline, sample, method or
 *    date behind it, and was removed rather than softened.
 */
export interface TranslationType {
  about: {
    /** One paragraph, on the colophon, under the portrait. */
    desc1: string;
  };
  aboutPage: {
    education: string;
    experience: string;
    languages: string;
    /** Label, not a thesis title. */
    thesis: string;
    educationData: {
      school: string;
      degree: string;
      location: string;
      period: string;
      coursework: string[];
      thesis: string;
    }[];
    experienceData: {
      company: string;
      role: string;
      location: string;
      period: string;
      highlights: string[];
    }[];
    languageData: {
      lang: string;
      level: string;
    }[];
  };
}

export const translations: Record<Locale, TranslationType> = {
  en: {
    about: {
      desc1: "I build applied AI and financial analytics for finance and operations teams — document review, forecasting, and reporting people can act on. I studied economics, management and computer science at Bocconi, then data science and business analytics, and founded Alvolo Consulting for advisory work in the Italy-Türkiye corridor.",
    },
    aboutPage: {
      education: "Education",
      experience: "Experience",
      languages: "Languages",
      thesis: "Thesis",
      educationData: [
        {
          school: "Bocconi University",
          degree: "Master of Science in Data Science and Business Analytics",
          location: "Milan, Italy",
          period: "2023 - 2025",
          coursework: ["Deep Learning for Computer Vision", "Simulation & Modeling", "Natural Language Processing"],
          thesis: "Auditable Detection of Greenwashing Risk in Corporate Communications",
        },
        {
          school: "Bocconi University",
          degree: "Bachelor of Science in Economics, Management, and Computer Science",
          location: "Milan, Italy",
          period: "2020 - 2023",
          coursework: ["Econometrics", "Big Data and Databases", "Programming", "IT Law", "Machine Learning"],
          thesis: "A Study of Predictive Techniques for Parliamentary Elections: A Case Study of Turkish Parliament",
        },
      ],
      experienceData: [
        {
          company: "IMPACTSCOPE",
          role: "AI Specialist | NLP Researcher",
          location: "Remote, Switzerland",
          period: "December 2024 - December 2025",
          highlights: [
            "Built a data product that scores greenwashing risk in corporate sustainability claims, so reviewers can triage a queue instead of reading it in order",
            "Developed a semantic contradiction index (SCI) using stance detection and sentiment drift",
            "Cross-referenced sentiment-based ESG risk scores with historical greenwashing controversies",
          ],
        },
        {
          company: "ALVOLO CONSULTING",
          role: "Founder",
          location: "Milan, Italy",
          period: "March 2025 - November 2025",
          highlights: [
            "Founded financial advisory hub in Italy helping clients achieve their financial goals",
            "Mastered Italian financial system to provide accurate information and guidance",
            "Managed full customer lifecycle from acquisition to retention",
          ],
        },
        {
          company: "FEDRIGONI SPA",
          role: "Junior Data Scientist",
          location: "Milan, Italy",
          period: "April 2024 - October 2024",
          highlights: [
            "Developed time-series algorithms and custom predictive models utilizing LSTM",
            "Developed custom AI model incorporating unsupervised models and NLP to optimize pricing",
            "Utilized Knime and PowerBI to develop new analytical prototypes",
          ],
        },
        {
          company: "N26 BANK AG",
          role: "Risk Management Intern",
          location: "Berlin, Germany",
          period: "November 2022 - February 2023",
          highlights: [
            "Supported Internal Control System (ICS), loss database, risk register and reporting",
            "Interacted with stakeholders supporting New Product Process (NPP)",
            "Helped in identifying, assessing, mitigating and monitoring non-financial risks",
          ],
        },
      ],
      languageData: [
        { lang: "Turkish", level: "Native" },
        { lang: "English", level: "Native" },
        { lang: "Italian", level: "Advanced (C1)" },
        { lang: "German", level: "Intermediate (B1)" },
      ],
    },
  },
  tr: {
    about: {
      desc1: "Finans ve operasyon ekipleri için uygulamalı yapay zekâ ve finansal analitik kuruyorum — belge incelemesi, tahmin ve üzerine karar verilebilecek raporlama. Bocconi'de ekonomi, yönetim ve bilgisayar bilimi, ardından veri bilimi ve iş analitiği okudum; İtalya-Türkiye koridorundaki danışmanlık işi için Alvolo Consulting'i kurdum.",
    },
    aboutPage: {
      education: "Eğitim",
      experience: "Deneyim",
      languages: "Diller",
      thesis: "Tez",
      educationData: [
        {
          school: "Bocconi Üniversitesi",
          degree: "Veri Bilimi ve İş Analitiği Yüksek Lisansı",
          location: "Milano, İtalya",
          period: "2023 - 2025",
          coursework: ["Bilgisayarlı Görü için Derin Öğrenme", "Simülasyon ve Modelleme", "Doğal Dil İşleme"],
          thesis: "Kurumsal İletişimlerde Greenwashing Riskinin Denetlenebilir Tespiti",
        },
        {
          school: "Bocconi Üniversitesi",
          degree: "Ekonomi, Yönetim ve Bilgisayar Bilimleri Lisansı",
          location: "Milano, İtalya",
          period: "2020 - 2023",
          coursework: ["Ekonometri", "Büyük Veri ve Veritabanları", "Programlama", "Bilişim Hukuku", "Makine Öğrenmesi"],
          thesis: "Parlamento Seçimleri için Analitik Tahmin Teknikleri: 2023 Türkiye Genel Seçimleri Örneği",
        },
      ],
      experienceData: [
        {
          company: "IMPACTSCOPE",
          role: "Yapay Zeka Uzmanı & NLP Araştırmacısı",
          location: "Uzaktan, İsviçre",
          period: "Aralık 2024 - Aralık 2025",
          highlights: [
            "Kurumsal sürdürülebilirlik iddialarındaki greenwashing riskini puanlayan bir veri ürünü geliştirdim; böylece inceleyiciler bir kuyruğu sırayla okumak yerine önceliklendirebiliyor",
            "Duruş tespiti ve duygu kayması kullanarak anlamsal çelişki endeksi (SCI) geliştirdim",
            "Duygu tabanlı ESG risk puanlarını geçmiş \"greenwashing\" tartışmalarıyla çapraz referanslayarak, kamuoyu duygu kutupluluğu ile greenwashing suçlamaları arasında güçlü bir korelasyon olduğunu gösterdim.",
          ],
        },
        {
          company: "ALVOLO CONSULTING",
          role: "Kurucu",
          location: "Milano, İtalya",
          period: "Mart 2025 - Kasım 2025",
          highlights: [
            "İtalya'da, Türkiye-İtalya koridorunda çalışan işletmeler için bir danışmanlık pratiği kurdum",
            "Hangi adımların lisanslı meslek mensubu gerektirdiğini belirleyerek İtalyan finansal ve idari sistemini kapsamlandırmayı öğrendim",
            "Edinimden sürdürmeye kadar müşteri ilişkisini yönettim ve tarafların doğru uzmanlara ulaşmasını koordine ettim",
          ],
        },
        {
          company: "FEDRIGONI SPA",
          role: "Junior Veri Bilimci",
          location: "Milano, İtalya",
          period: "Nisan 2024 - Ekim 2024",
          highlights: [
            "İş içgörüleri ve önerileri sunmak için en son derin öğrenme yöntemlerini (LSTM) kullanarak zaman serisi algoritmaları ve özel tahmin modelleri geliştirdim.",
            "Fiyatlamayı optimize etmek için denetimsiz modeller ve Doğal Dil İşleme (NLP) içeren özel yapay zeka modeli geliştirdim.",
            "Yeni analitik prototipler geliştirmek için Knime ve PowerBI gibi araçları kullanarak, verileri daha iyi anlamlandırıp, müşterilerimize daha iyi hizmet sunmak için çalıştım.",
          ],
        },
        {
          company: "N26 BANK AG",
          role: "Risk Yönetimi Stajyeri",
          location: "Berlin, Almanya",
          period: "Kasım 2022 - Şubat 2023",
          highlights: [
            "İç Kontrol Sistemi (İKS), kayıp veritabanı, risk kaydı ve raporlamayı destekledim",
            "Yeni Ürün Sürecini (NPP) destekleyen paydaşlarla etkileşim kurdum",
            "Finansal olmayan risklerin belirlenmesi, değerlendirilmesi, azaltılması ve izlenmesine yardımcı oldum",
          ],
        },
      ],
      languageData: [
        { lang: "Türkçe", level: "Ana Dil" },
        { lang: "İngilizce", level: "Ana Dil" },
        { lang: "İtalyanca", level: "İleri (C1)" },
        { lang: "Almanca", level: "Orta (B1)" },
      ],
    },
  },
  it: {
    about: {
      desc1: "Costruisco AI applicata e analisi finanziaria per team di finanza e operations — revisione documentale, previsione e reporting su cui si possa davvero decidere. Ho studiato economia, management e informatica alla Bocconi, poi data science e business analytics, e ho fondato Alvolo Consulting per la consulenza sul corridoio Italia-Turchia.",
    },
    aboutPage: {
      education: "Istruzione",
      experience: "Esperienza",
      languages: "Lingue",
      thesis: "Tesi",
      educationData: [
        {
          school: "Università Bocconi",
          degree: "Laurea Magistrale in Data Science and Business Analytics",
          location: "Milano, Italia",
          period: "2023 - 2025",
          coursework: ["Deep Learning per Computer Vision", "Simulazione e Modellazione", "Elaborazione del Linguaggio Naturale"],
          thesis: "Rilevamento Verificabile del Rischio di Greenwashing nelle Comunicazioni Aziendali",
        },
        {
          school: "Università Bocconi",
          degree: "Laurea Triennale in Economia, Management e Informatica",
          location: "Milano, Italia",
          period: "2020 - 2023",
          coursework: ["Econometria", "Big Data e Database", "Programmazione", "Diritto Informatico", "Machine Learning"],
          thesis: "Studio delle Tecniche Predittive per le Elezioni Parlamentari: Caso Studio del Parlamento Turco",
        },
      ],
      experienceData: [
        {
          company: "IMPACTSCOPE",
          role: "Specialista AI | Ricercatore NLP",
          location: "Remoto, Svizzera",
          period: "Dicembre 2024 - Dicembre 2025",
          highlights: [
            "Sviluppato un prodotto dati che valuta il rischio di greenwashing nelle dichiarazioni di sostenibilità aziendali, così chi rivede può dare priorità invece di leggere una coda in ordine",
            "Sviluppato indice di contraddizione semantica (SCI) utilizzando rilevamento di posizione e deriva del sentiment",
            "Confrontato punteggi di rischio ESG basati sul sentiment con storiche controversie di greenwashing",
          ],
        },
        {
          company: "ALVOLO CONSULTING",
          role: "Fondatore",
          location: "Milano, Italia",
          period: "Marzo 2025 - Novembre 2025",
          highlights: [
            "Fondato hub di consulenza finanziaria in Italia aiutando i clienti a raggiungere i loro obiettivi finanziari",
            "Padroneggiato il sistema finanziario italiano per fornire informazioni e guida accurate",
            "Gestito l'intero ciclo di vita del cliente dall'acquisizione alla fidelizzazione",
          ],
        },
        {
          company: "FEDRIGONI SPA",
          role: "Junior Data Scientist",
          location: "Milano, Italia",
          period: "Aprile 2024 - Ottobre 2024",
          highlights: [
            "Sviluppato algoritmi di serie temporali e modelli predittivi personalizzati utilizzando LSTM",
            "Sviluppato modello AI personalizzato incorporando modelli non supervisionati e NLP per ottimizzare i prezzi",
            "Utilizzato Knime e PowerBI per sviluppare nuovi prototipi analitici",
          ],
        },
        {
          company: "N26 BANK AG",
          role: "Stagista Risk Management",
          location: "Berlino, Germania",
          period: "Novembre 2022 - Febbraio 2023",
          highlights: [
            "Supportato il Sistema di Controllo Interno (ICS), database perdite, registro rischi e reporting",
            "Interagito con stakeholder supportando il New Product Process (NPP)",
            "Aiutato nell'identificazione, valutazione, mitigazione e monitoraggio dei rischi non finanziari",
          ],
        },
      ],
      languageData: [
        { lang: "Turco", level: "Madrelingua" },
        { lang: "Inglese", level: "Madrelingua" },
        { lang: "Italiano", level: "Avanzato (C1)" },
        { lang: "Tedesco", level: "Intermedio (B1)" },
      ],
    },
  },
};

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const getTranslation = (locale: Locale): TranslationType => translations[locale];
