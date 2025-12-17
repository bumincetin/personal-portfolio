export const locales = ['en', 'tr', 'it'] as const;
export type Locale = (typeof locales)[number];

export interface TranslationType {
  nav: {
    home: string;
    methodology: string;
    projects: string;
    about: string;
    contact: string;
  };
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
  };
  ticker: {
    python: string;
    bloomberg: string;
    sql: string;
    tensorflow: string;
    r: string;
    macro: string;
  };
  methodology: {
    label: string;
    title: string;
    explore: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  assets: {
    label: string;
    title: string;
    viewAll: string;
    viewRepo: string;
    viewProject: string;
  };
  about: {
    label: string;
    title: string;
    desc1: string;
    desc2: string;
    viewBio: string;
    credential1: string;
    credential2: string;
    credential3: string;
    credential4: string;
  };
  footer: {
    cta: string;
    button: string;
    copyright: string;
    linkedin: string;
    email: string;
  };
  aboutPage: {
    aboutMe: string;
    contact: string;
    education: string;
    experience: string;
    skills: string;
    certifications: string;
    languages: string;
    programming: string;
    tools: string;
    coursework: string;
    thesis: string;
    stats: {
      languages: string;
      certifications: string;
      experiences: string;
      degrees: string;
    };
  };
  assetsPage: {
    label: string;
    title: string;
    subtitle: string;
    viewGithub: string;
    moreGithub: string;
    moreGithubDesc: string;
    visitProfile: string;
  };
  methodologyPage: {
    label: string;
    title: string;
    subtitle: string;
    section1: {
      num: string;
      title: string;
      arch: string;
      desc1: string;
      desc2: string;
    };
    section2: {
      num: string;
      title: string;
      arch: string;
      desc1: string;
      desc2: string;
    };
    stack: string;
    stackLangs: string;
    stackIntel: string;
    stackDeploy: string;
    stackViz: string;
  };
}

export const translations: Record<Locale, TranslationType> = {
  en: {
    nav: {
      home: 'Home',
      methodology: 'Methodology',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      title1: 'Decoding Value',
      title2: 'in a Noisy World',
      subtitle: '// Leveraging advanced analytics for absolute financial clarity.',
      cta: 'View Projects',
    },
    ticker: {
      python: 'PYTHON',
      bloomberg: 'BLOOMBERG TERMINAL',
      sql: 'SQL',
      tensorflow: 'TENSORFLOW',
      r: 'R',
      macro: 'MACRO ECONOMICS',
    },
    methodology: {
      label: '01 // METHODOLOGY',
      title: 'Data Meets Design',
      explore: 'Explore Full Architecture',
      card1Title: 'Financial Modeling',
      card1Desc: 'Building robust, stress-tested models utilizing LSTM and Time-Series analysis.',
      card2Title: 'NLP Pipelines',
      card2Desc: 'Fine-tuned RoBERTa models and Contextual Embeddings for risk detection.',
      card3Title: 'Data Visualization',
      card3Desc: 'Translating raw data into auditable metrics via PowerBI and custom Python dashboards.',
    },
    assets: {
      label: '02 // PROJECTS',
      title: 'Open Source Work',
      viewAll: 'View All Projects',
      viewRepo: 'View Repository',
      viewProject: 'View Project',
    },
    about: {
      label: 'THE HUMAN VARIABLE',
      title: 'Bridging the gap between code and capital.',
      desc1: "I'm a Data Scientist and AI Specialist at Bocconi University, specializing in NLP and deep learning. As CEO & Co-Founder of Alvolo Consulting, I bridge cross-border investment advisory with machine learning solutions.",
      desc2: 'My research focuses on detecting greenwashing risks in corporate communications using fine-tuned transformer models.',
      viewBio: 'View Full Bio',
      credential1: 'M.Sc. Data Science @ Bocconi',
      credential2: 'AI Specialist @ ImpactScope',
      credential3: 'NLP & Deep Learning',
      credential4: 'Founder, Alvolo Consulting',
    },
    footer: {
      cta: 'OPTIMIZE NOW',
      button: 'Initiate Protocol',
      copyright: '© 2025 Bumin Kağan Çetin. All Systems Operational.',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
    aboutPage: {
      aboutMe: 'ABOUT ME',
      contact: 'Contact',
      education: 'Education',
      experience: 'Work Experience',
      skills: 'Skills',
      certifications: 'Certifications',
      languages: 'Languages',
      programming: 'PROGRAMMING',
      tools: 'TOOLS & TECHNOLOGIES',
      coursework: 'Coursework',
      thesis: 'Thesis',
      stats: {
        languages: 'Languages',
        certifications: 'Certifications',
        experiences: 'Work Experiences',
        degrees: 'Degrees',
      },
    },
    assetsPage: {
      label: 'OPEN SOURCE & RESEARCH',
      title: 'Projects & Work',
      subtitle: 'A collection of data science projects, research work, and open source contributions focused on NLP, deep learning, and financial analytics.',
      viewGithub: 'View on GitHub',
      moreGithub: 'More on GitHub',
      moreGithubDesc: 'Explore all my repositories, contributions, and ongoing projects.',
      visitProfile: 'Visit GitHub Profile',
    },
    methodologyPage: {
      label: 'SYSTEM ARCHITECTURE',
      title: 'The Algorithmic Core',
      subtitle: 'Deconstructing the proprietary models driving prediction, risk assessment, and sentiment analysis.',
      section1: {
        num: '01.',
        title: 'Semantic Risk Detection',
        arch: 'ARCH: RoBERTa FINE-TUNING // CONTEXTUAL EMBEDDINGS',
        desc1: 'Utilizing a fine-tuned RoBERTa architecture, this module automatically flags greenwashing risks by analyzing corporate sustainability claims. The system reduces manual review time by 80% through a custom Semantic Contradiction Index (SCI).',
        desc2: 'The SCI leverages stance detection and sentiment drift analysis to cross-reference ESG risk scores with historical controversies, ensuring an auditable metric for clients.',
      },
      section2: {
        num: '02.',
        title: 'Time-Series & Causality',
        arch: 'ARCH: LSTM // GRANGER CAUSALITY // BERT',
        desc1: 'Predicting stock returns requires distinguishing signal from noise. We employ LSTM (Long Short-Term Memory) networks for their ability to learn order dependence in sequence prediction problems.',
        desc2: 'To augment technical data, we integrate alternative datasets. Using BERT for sentiment classification on Twitter feeds, we run Granger causality tests to mathematically validate the predictive relationship between public sentiment volume and market volatility.',
      },
      stack: 'FULL TECHNOLOGY STACK',
      stackLangs: 'Languages',
      stackIntel: 'Intelligence',
      stackDeploy: 'Deployment',
      stackViz: 'Visualization',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      methodology: 'Metodoloji',
      projects: 'Projeler',
      about: 'Hakkımda',
      contact: 'İletişim',
    },
    hero: {
      title1: 'Değeri Çözümlemek',
      title2: 'Gürültülü Bir Dünyada',
      subtitle: '// Mutlak finansal netlik için gelişmiş analitiği kullanmak.',
      cta: 'Projeleri Gör',
    },
    ticker: {
      python: 'PYTHON',
      bloomberg: 'BLOOMBERG TERMİNAL',
      sql: 'SQL',
      tensorflow: 'TENSORFLOW',
      r: 'R',
      macro: 'MAKRO EKONOMİ',
    },
    methodology: {
      label: '01 // METODOLOJİ',
      title: 'Veri Tasarımla Buluşuyor',
      explore: 'Tam Mimariyi Keşfet',
      card1Title: 'Finansal Modelleme',
      card1Desc: 'LSTM ve Zaman Serisi analizi kullanarak sağlam, stres testinden geçmiş modeller oluşturma.',
      card2Title: 'NLP Pipeline\'ları',
      card2Desc: 'Risk tespiti için ince ayarlı RoBERTa modelleri ve Bağlamsal Gömüler.',
      card3Title: 'Veri Görselleştirme',
      card3Desc: 'Ham veriyi PowerBI ve özel Python panolarıyla denetlenebilir metriklere dönüştürme.',
    },
    assets: {
      label: '02 // PROJELER',
      title: 'Açık Kaynak Çalışmalar',
      viewAll: 'Tüm Projeleri Gör',
      viewRepo: 'Depoyu Görüntüle',
      viewProject: 'Projeyi Görüntüle',
    },
    about: {
      label: 'İNSAN DEĞİŞKENİ',
      title: 'Kod ile sermaye arasında köprü kurmak.',
      desc1: "Bocconi Üniversitesi'nde NLP ve derin öğrenme konularında uzmanlaşmış bir Veri Bilimci ve Yapay Zeka Uzmanıyım. Alvolo Consulting'in CEO'su ve Kurucu Ortağı olarak, sınır ötesi yatırım danışmanlığını makine öğrenimi çözümleriyle birleştiriyorum.",
      desc2: 'Araştırmam, ince ayarlı transformer modelleri kullanarak kurumsal iletişimlerdeki greenwashing risklerini tespit etmeye odaklanıyor.',
      viewBio: 'Tam Biyografiyi Gör',
      credential1: 'Veri Bilimi Y.L. @ Bocconi',
      credential2: 'YZ Uzmanı @ ImpactScope',
      credential3: 'NLP & Derin Öğrenme',
      credential4: 'Kurucu, Alvolo Consulting',
    },
    footer: {
      cta: 'ŞİMDİ OPTİMİZE ET',
      button: 'Protokolü Başlat',
      copyright: '© 2025 Bumin Kağan Çetin. Tüm Sistemler Çalışır Durumda.',
      linkedin: 'LinkedIn',
      email: 'E-posta',
    },
    aboutPage: {
      aboutMe: 'HAKKIMDA',
      contact: 'İletişim',
      education: 'Eğitim',
      experience: 'İş Deneyimi',
      skills: 'Beceriler',
      certifications: 'Sertifikalar',
      languages: 'Diller',
      programming: 'PROGRAMLAMA',
      tools: 'ARAÇLAR & TEKNOLOJİLER',
      coursework: 'Dersler',
      thesis: 'Tez',
      stats: {
        languages: 'Dil',
        certifications: 'Sertifika',
        experiences: 'İş Deneyimi',
        degrees: 'Diploma',
      },
    },
    assetsPage: {
      label: 'AÇIK KAYNAK & ARAŞTIRMA',
      title: 'Projeler & Çalışmalar',
      subtitle: 'NLP, derin öğrenme ve finansal analitik odaklı veri bilimi projeleri, araştırma çalışmaları ve açık kaynak katkıları koleksiyonu.',
      viewGithub: "GitHub'da Görüntüle",
      moreGithub: "GitHub'da Daha Fazlası",
      moreGithubDesc: 'Tüm depolarımı, katkılarımı ve devam eden projelerimi keşfedin.',
      visitProfile: "GitHub Profilini Ziyaret Et",
    },
    methodologyPage: {
      label: 'SİSTEM MİMARİSİ',
      title: 'Algoritmik Çekirdek',
      subtitle: 'Tahmin, risk değerlendirmesi ve duygu analizini yönlendiren tescilli modellerin yapısökümü.',
      section1: {
        num: '01.',
        title: 'Semantik Risk Tespiti',
        arch: 'MİMARİ: RoBERTa İNCE AYAR // BAĞLAMSAL GÖMÜLER',
        desc1: "İnce ayarlı RoBERTa mimarisi kullanarak, bu modül kurumsal sürdürülebilirlik iddialarını analiz ederek greenwashing risklerini otomatik olarak işaretler. Sistem, özel Semantik Çelişki Endeksi (SCI) aracılığıyla manuel inceleme süresini %80 azaltır.",
        desc2: 'SCI, ESG risk puanlarını tarihsel tartışmalarla çapraz referans yaparak duygu algılama ve duygu kayması analizinden yararlanır ve müşteriler için denetlenebilir bir metrik sağlar.',
      },
      section2: {
        num: '02.',
        title: 'Zaman Serisi & Nedensellik',
        arch: 'MİMARİ: LSTM // GRANGER NEDENSELLİK // BERT',
        desc1: 'Hisse senedi getirilerini tahmin etmek, sinyali gürültüden ayırt etmeyi gerektirir. Sıra bağımlılığını öğrenme yetenekleri nedeniyle LSTM (Uzun Kısa Süreli Bellek) ağlarını kullanıyoruz.',
        desc2: "Teknik verileri desteklemek için alternatif veri setlerini entegre ediyoruz. Twitter akışlarında duygu sınıflandırması için BERT kullanarak, kamuoyu duygu hacmi ile piyasa oynaklığı arasındaki öngörücü ilişkiyi matematiksel olarak doğrulamak için Granger nedensellik testleri yapıyoruz.",
      },
      stack: 'TAM TEKNOLOJİ YIĞINI',
      stackLangs: 'Diller',
      stackIntel: 'Zeka',
      stackDeploy: 'Dağıtım',
      stackViz: 'Görselleştirme',
    },
  },
  it: {
    nav: {
      home: 'Home',
      methodology: 'Metodologia',
      projects: 'Progetti',
      about: 'Chi Sono',
      contact: 'Contatto',
    },
    hero: {
      title1: 'Decodificare il Valore',
      title2: 'in un Mondo Rumoroso',
      subtitle: '// Sfruttare analisi avanzate per una chiarezza finanziaria assoluta.',
      cta: 'Vedi Progetti',
    },
    ticker: {
      python: 'PYTHON',
      bloomberg: 'TERMINALE BLOOMBERG',
      sql: 'SQL',
      tensorflow: 'TENSORFLOW',
      r: 'R',
      macro: 'MACROECONOMIA',
    },
    methodology: {
      label: '01 // METODOLOGIA',
      title: 'Dati Incontra Design',
      explore: 'Esplora Architettura Completa',
      card1Title: 'Modellazione Finanziaria',
      card1Desc: 'Costruire modelli robusti e testati utilizzando LSTM e analisi delle serie temporali.',
      card2Title: 'Pipeline NLP',
      card2Desc: 'Modelli RoBERTa ottimizzati ed Embedding Contestuali per il rilevamento del rischio.',
      card3Title: 'Visualizzazione Dati',
      card3Desc: 'Tradurre dati grezzi in metriche verificabili tramite PowerBI e dashboard Python personalizzate.',
    },
    assets: {
      label: '02 // PROGETTI',
      title: 'Lavoro Open Source',
      viewAll: 'Vedi Tutti i Progetti',
      viewRepo: 'Visualizza Repository',
      viewProject: 'Visualizza Progetto',
    },
    about: {
      label: 'LA VARIABILE UMANA',
      title: 'Colmare il divario tra codice e capitale.',
      desc1: "Sono un Data Scientist e Specialista AI all'Università Bocconi, specializzato in NLP e deep learning. Come CEO e Co-Fondatore di Alvolo Consulting, collego la consulenza sugli investimenti transfrontalieri con soluzioni di machine learning.",
      desc2: 'La mia ricerca si concentra sul rilevamento dei rischi di greenwashing nelle comunicazioni aziendali utilizzando modelli transformer ottimizzati.',
      viewBio: 'Vedi Biografia Completa',
      credential1: 'M.Sc. Data Science @ Bocconi',
      credential2: 'Specialista AI @ ImpactScope',
      credential3: 'NLP & Deep Learning',
      credential4: 'Fondatore, Alvolo Consulting',
    },
    footer: {
      cta: 'OTTIMIZZA ORA',
      button: 'Avvia Protocollo',
      copyright: '© 2025 Bumin Kağan Çetin. Tutti i Sistemi Operativi.',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
    aboutPage: {
      aboutMe: 'CHI SONO',
      contact: 'Contatto',
      education: 'Istruzione',
      experience: 'Esperienza Lavorativa',
      skills: 'Competenze',
      certifications: 'Certificazioni',
      languages: 'Lingue',
      programming: 'PROGRAMMAZIONE',
      tools: 'STRUMENTI & TECNOLOGIE',
      coursework: 'Corsi',
      thesis: 'Tesi',
      stats: {
        languages: 'Lingue',
        certifications: 'Certificazioni',
        experiences: 'Esperienze Lavorative',
        degrees: 'Lauree',
      },
    },
    assetsPage: {
      label: 'OPEN SOURCE & RICERCA',
      title: 'Progetti & Lavori',
      subtitle: 'Una raccolta di progetti di data science, lavori di ricerca e contributi open source focalizzati su NLP, deep learning e analisi finanziaria.',
      viewGithub: 'Visualizza su GitHub',
      moreGithub: 'Altro su GitHub',
      moreGithubDesc: 'Esplora tutti i miei repository, contributi e progetti in corso.',
      visitProfile: 'Visita Profilo GitHub',
    },
    methodologyPage: {
      label: 'ARCHITETTURA DI SISTEMA',
      title: 'Il Nucleo Algoritmico',
      subtitle: 'Decostruire i modelli proprietari che guidano previsione, valutazione del rischio e analisi del sentiment.',
      section1: {
        num: '01.',
        title: 'Rilevamento Rischio Semantico',
        arch: 'ARCH: RoBERTa FINE-TUNING // EMBEDDING CONTESTUALI',
        desc1: "Utilizzando un'architettura RoBERTa ottimizzata, questo modulo segnala automaticamente i rischi di greenwashing analizzando le dichiarazioni di sostenibilità aziendale. Il sistema riduce i tempi di revisione manuale dell'80% attraverso un Indice di Contraddizione Semantica (SCI) personalizzato.",
        desc2: "L'SCI sfrutta il rilevamento della posizione e l'analisi della deriva del sentiment per confrontare i punteggi di rischio ESG con le controversie storiche, garantendo una metrica verificabile per i clienti.",
      },
      section2: {
        num: '02.',
        title: 'Serie Temporali & Causalità',
        arch: 'ARCH: LSTM // CAUSALITÀ DI GRANGER // BERT',
        desc1: 'Prevedere i rendimenti azionari richiede di distinguere il segnale dal rumore. Utilizziamo reti LSTM (Long Short-Term Memory) per la loro capacità di apprendere la dipendenza sequenziale nei problemi di previsione.',
        desc2: 'Per aumentare i dati tecnici, integriamo dataset alternativi. Utilizzando BERT per la classificazione del sentiment sui feed Twitter, eseguiamo test di causalità di Granger per validare matematicamente la relazione predittiva tra il volume del sentiment pubblico e la volatilità del mercato.',
      },
      stack: 'STACK TECNOLOGICO COMPLETO',
      stackLangs: 'Linguaggi',
      stackIntel: 'Intelligenza',
      stackDeploy: 'Deployment',
      stackViz: 'Visualizzazione',
    },
  },
};

export function getTranslation(locale: Locale): TranslationType {
  return translations[locale] || translations.en;
}

