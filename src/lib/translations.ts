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
    card4Title: string;
    card4Desc: string;
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
    servicesLabel: string;
    section1: {
      num: string;
      title: string;
      arch: string;
      desc1: string;
      desc2: string;
      features: string[];
    };
    section2: {
      num: string;
      title: string;
      arch: string;
      desc1: string;
      desc2: string;
      features: string[];
    };
    section3: {
      num: string;
      title: string;
      arch: string;
      desc1: string;
      desc2: string;
      features: string[];
    };
    section4: {
      num: string;
      title: string;
      arch: string;
      desc1: string;
      desc2: string;
      features: string[];
    };
    processLabel: string;
    processTitle: string;
    process: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
    };
    stack: string;
    stackLangs: string;
    stackIntel: string;
    stackDeploy: string;
    stackViz: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaButton: string;
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
      label: '01 // SERVICES',
      title: 'Data-Driven Solutions',
      explore: 'Explore Full Methodology',
      card1Title: 'Financial Analytics',
      card1Desc: 'Predictive modeling, risk assessment, and quantitative analysis for informed investment decisions.',
      card2Title: 'AI & NLP Solutions',
      card2Desc: 'Custom machine learning pipelines for sentiment analysis, document processing, and automation.',
      card3Title: 'Business Intelligence',
      card3Desc: 'End-to-end dashboards and reporting systems transforming raw data into strategic insights.',
      card4Title: 'Financial Consultancy',
      card4Desc: 'Cross-border advisory, regulatory compliance guidance, and strategic financial planning.',
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
      label: 'METHODOLOGY & SERVICES',
      title: 'Data Science Meets Finance',
      subtitle: 'A systematic approach to delivering data-driven solutions that bridge cutting-edge analytics with real-world financial decision-making.',
      servicesLabel: 'CORE SERVICE AREAS',
      section1: {
        num: '01.',
        title: 'Financial Analytics & Modeling',
        arch: 'PREDICTIVE MODELS // RISK QUANTIFICATION // PORTFOLIO OPTIMIZATION',
        desc1: 'I build robust financial models that transform raw market data into actionable intelligence. From stress-tested LSTM networks for price prediction to Monte Carlo simulations for risk assessment, each model is designed for real-world deployment.',
        desc2: 'My approach combines traditional quantitative finance with modern machine learning, ensuring models are both statistically rigorous and practically applicable to trading strategies, portfolio management, and investment decisions.',
        features: ['Time-Series Forecasting (ARIMA, LSTM, Prophet)', 'Value-at-Risk & Stress Testing', 'Portfolio Optimization & Factor Models', 'Quantitative Trading Signals'],
      },
      section2: {
        num: '02.',
        title: 'NLP & AI Solutions',
        arch: 'TRANSFORMER MODELS // SENTIMENT ANALYSIS // DOCUMENT INTELLIGENCE',
        desc1: 'Leveraging state-of-the-art NLP architectures like RoBERTa and BERT, I develop custom solutions for extracting insights from unstructured text—financial reports, news feeds, social media, and corporate communications.',
        desc2: 'My greenwashing detection system, built for ImpactScope, demonstrates this capability: fine-tuned transformers analyze sustainability claims, reducing manual review time by 80% through a proprietary Semantic Contradiction Index.',
        features: ['Custom Sentiment Classification', 'ESG & Greenwashing Risk Detection', 'Document Summarization & Extraction', 'Chatbots & Intelligent Automation'],
      },
      section3: {
        num: '03.',
        title: 'Business Intelligence & Dashboards',
        arch: 'POWERBI // CUSTOM PYTHON // REAL-TIME ANALYTICS',
        desc1: 'Raw data means nothing without proper visualization and storytelling. I design end-to-end BI solutions that transform complex datasets into intuitive dashboards, enabling stakeholders to make informed decisions at a glance.',
        desc2: 'From executive-level KPI tracking to operational drill-downs, each dashboard is tailored to your specific business context, integrating multiple data sources and providing real-time insights.',
        features: ['Executive KPI Dashboards', 'Automated Reporting Pipelines', 'Data Warehouse Design', 'Custom Visualization Development'],
      },
      section4: {
        num: '04.',
        title: 'Financial Consultancy',
        arch: 'CROSS-BORDER ADVISORY // REGULATORY COMPLIANCE // STRATEGIC PLANNING',
        desc1: 'As founder of Alvolo Consulting, I provide comprehensive financial advisory services bridging Italian and international markets. From navigating complex regulatory environments to optimizing cross-border investment structures.',
        desc2: 'My consulting approach combines deep technical expertise with practical business acumen, helping clients understand not just what the data shows, but how to act on it strategically.',
        features: ['Cross-Border Investment Advisory', 'Italian Financial System Navigation', 'Regulatory Compliance Guidance', 'Strategic Financial Planning'],
      },
      processLabel: 'ENGAGEMENT PROCESS',
      processTitle: 'How We Work Together',
      process: {
        step1Title: 'Discovery',
        step1Desc: 'Deep-dive into your business context, data landscape, and objectives through structured consultations.',
        step2Title: 'Architecture',
        step2Desc: 'Design technical specifications, data pipelines, and model architectures tailored to your requirements.',
        step3Title: 'Development',
        step3Desc: 'Iterative building with regular checkpoints, ensuring alignment with business goals throughout.',
        step4Title: 'Deployment',
        step4Desc: 'Production-ready delivery with documentation, training, and ongoing support options.',
      },
      stack: 'TECHNOLOGY ARSENAL',
      stackLangs: 'Languages',
      stackIntel: 'Intelligence',
      stackDeploy: 'Deployment',
      stackViz: 'Visualization',
      ctaTitle: 'Ready to Transform Your Data?',
      ctaDesc: 'Let\'s discuss how data science and financial expertise can drive your business forward.',
      ctaButton: 'Start a Conversation',
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
      label: '01 // HİZMETLER',
      title: 'Veri Odaklı Çözümler',
      explore: 'Tam Metodolojiyi Keşfet',
      card1Title: 'Finansal Analitik',
      card1Desc: 'Bilinçli yatırım kararları için tahminsel modelleme, risk değerlendirmesi ve kantitatif analiz.',
      card2Title: 'AI & NLP Çözümleri',
      card2Desc: 'Duygu analizi, belge işleme ve otomasyon için özel makine öğrenimi pipeline\'ları.',
      card3Title: 'İş Zekası',
      card3Desc: 'Ham veriyi stratejik içgörülere dönüştüren uçtan uca panolar ve raporlama sistemleri.',
      card4Title: 'Finansal Danışmanlık',
      card4Desc: 'Sınır ötesi danışmanlık, mevzuat uyumu rehberliği ve stratejik finansal planlama.',
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
      label: 'METODOLOJİ & HİZMETLER',
      title: 'Veri Bilimi Finansla Buluşuyor',
      subtitle: 'İleri analitikleri gerçek dünya finansal karar alma süreçleriyle birleştiren veri odaklı çözümler sunmaya yönelik sistematik bir yaklaşım.',
      servicesLabel: 'TEMEL HİZMET ALANLARI',
      section1: {
        num: '01.',
        title: 'Finansal Analitik & Modelleme',
        arch: 'TAHMİNSEL MODELLER // RİSK NİCELEME // PORTFÖY OPTİMİZASYONU',
        desc1: 'Ham piyasa verisini eyleme dönüştürülebilir zekaya dönüştüren sağlam finansal modeller oluşturuyorum. Fiyat tahmini için stres testinden geçmiş LSTM ağlarından risk değerlendirmesi için Monte Carlo simülasyonlarına kadar, her model gerçek dünya uygulaması için tasarlanmıştır.',
        desc2: 'Yaklaşımım, geleneksel kantitatif finansı modern makine öğrenimi ile birleştirerek modellerin hem istatistiksel olarak güçlü hem de ticaret stratejileri, portföy yönetimi ve yatırım kararlarına pratik olarak uygulanabilir olmasını sağlar.',
        features: ['Zaman Serisi Tahmini (ARIMA, LSTM, Prophet)', 'Riske Maruz Değer & Stres Testi', 'Portföy Optimizasyonu & Faktör Modelleri', 'Kantitatif Ticaret Sinyalleri'],
      },
      section2: {
        num: '02.',
        title: 'NLP & AI Çözümleri',
        arch: 'TRANSFORMER MODELLERİ // DUYGU ANALİZİ // BELGE ZEKASI',
        desc1: 'RoBERTa ve BERT gibi son teknoloji NLP mimarilerinden yararlanarak, yapılandırılmamış metinlerden içgörü çıkarmak için özel çözümler geliştiriyorum—finansal raporlar, haber akışları, sosyal medya ve kurumsal iletişimler.',
        desc2: 'ImpactScope için geliştirdiğim greenwashing tespit sistemi bu yeteneği gösteriyor: ince ayarlı transformerlar sürdürülebilirlik iddialarını analiz ederek, özel Semantik Çelişki Endeksi ile manuel inceleme süresini %80 azaltıyor.',
        features: ['Özel Duygu Sınıflandırması', 'ESG & Greenwashing Risk Tespiti', 'Belge Özetleme & Çıkarma', 'Chatbotlar & Akıllı Otomasyon'],
      },
      section3: {
        num: '03.',
        title: 'İş Zekası & Panolar',
        arch: 'POWERBI // ÖZEL PYTHON // GERÇEK ZAMANLI ANALİTİK',
        desc1: 'Ham veri, uygun görselleştirme ve hikaye anlatımı olmadan anlam ifade etmez. Karmaşık veri setlerini sezgisel panolara dönüştüren, paydaşların bir bakışta bilinçli kararlar almasını sağlayan uçtan uca BI çözümleri tasarlıyorum.',
        desc2: 'Yönetici düzeyinde KPI takibinden operasyonel detaylara kadar, her pano sizin özel iş bağlamınıza göre uyarlanmış, birden fazla veri kaynağını entegre ediyor ve gerçek zamanlı içgörüler sağlıyor.',
        features: ['Yönetici KPI Panoları', 'Otomatik Raporlama Pipeline\'ları', 'Veri Ambarı Tasarımı', 'Özel Görselleştirme Geliştirme'],
      },
      section4: {
        num: '04.',
        title: 'Finansal Danışmanlık',
        arch: 'SINIR ÖTESİ DANIŞMANLIK // MEVZUAT UYUMU // STRATEJİK PLANLAMA',
        desc1: 'Alvolo Consulting\'in kurucusu olarak, İtalyan ve uluslararası pazarları birleştiren kapsamlı finansal danışmanlık hizmetleri sunuyorum. Karmaşık düzenleyici ortamlarda yol göstermekten sınır ötesi yatırım yapılarını optimize etmeye kadar.',
        desc2: 'Danışmanlık yaklaşımım, derin teknik uzmanlığı pratik iş zekasıyla birleştirerek müşterilerin yalnızca verinin ne gösterdiğini değil, stratejik olarak nasıl hareket edeceklerini anlamalarına yardımcı oluyor.',
        features: ['Sınır Ötesi Yatırım Danışmanlığı', 'İtalyan Finans Sistemi Navigasyonu', 'Mevzuat Uyumu Rehberliği', 'Stratejik Finansal Planlama'],
      },
      processLabel: 'ÇALIŞMA SÜRECİ',
      processTitle: 'Nasıl Birlikte Çalışıyoruz',
      process: {
        step1Title: 'Keşif',
        step1Desc: 'Yapılandırılmış danışmanlıklar aracılığıyla iş bağlamınıza, veri ortamınıza ve hedeflerinize derinlemesine dalış.',
        step2Title: 'Mimari',
        step2Desc: 'Gereksinimlerinize uygun teknik spesifikasyonlar, veri pipeline\'ları ve model mimarileri tasarımı.',
        step3Title: 'Geliştirme',
        step3Desc: 'Düzenli kontrol noktalarıyla yinelemeli inşa, süreç boyunca iş hedefleriyle uyum sağlama.',
        step4Title: 'Dağıtım',
        step4Desc: 'Dokümantasyon, eğitim ve sürekli destek seçenekleriyle üretime hazır teslimat.',
      },
      stack: 'TEKNOLOJİ CEPHANELIĞI',
      stackLangs: 'Diller',
      stackIntel: 'Zeka',
      stackDeploy: 'Dağıtım',
      stackViz: 'Görselleştirme',
      ctaTitle: 'Verinizi Dönüştürmeye Hazır mısınız?',
      ctaDesc: 'Veri bilimi ve finansal uzmanlığın işinizi nasıl ileriye taşıyabileceğini konuşalım.',
      ctaButton: 'Bir Görüşme Başlat',
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
      label: '01 // SERVIZI',
      title: 'Soluzioni Data-Driven',
      explore: 'Esplora Metodologia Completa',
      card1Title: 'Analisi Finanziaria',
      card1Desc: 'Modellazione predittiva, valutazione del rischio e analisi quantitativa per decisioni di investimento informate.',
      card2Title: 'Soluzioni AI & NLP',
      card2Desc: 'Pipeline di machine learning personalizzate per analisi del sentiment, elaborazione documenti e automazione.',
      card3Title: 'Business Intelligence',
      card3Desc: 'Dashboard e sistemi di reporting end-to-end che trasformano dati grezzi in insight strategici.',
      card4Title: 'Consulenza Finanziaria',
      card4Desc: 'Advisory transfrontaliera, guida alla conformità normativa e pianificazione finanziaria strategica.',
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
      label: 'METODOLOGIA & SERVIZI',
      title: 'Data Science Incontra Finanza',
      subtitle: 'Un approccio sistematico per fornire soluzioni data-driven che collegano analisi all\'avanguardia con il processo decisionale finanziario reale.',
      servicesLabel: 'AREE DI SERVIZIO PRINCIPALI',
      section1: {
        num: '01.',
        title: 'Analisi Finanziaria & Modellazione',
        arch: 'MODELLI PREDITTIVI // QUANTIFICAZIONE RISCHIO // OTTIMIZZAZIONE PORTAFOGLIO',
        desc1: 'Costruisco modelli finanziari robusti che trasformano dati di mercato grezzi in intelligence azionabile. Dalle reti LSTM stress-testate per la previsione dei prezzi alle simulazioni Monte Carlo per la valutazione del rischio, ogni modello è progettato per il deployment reale.',
        desc2: 'Il mio approccio combina finanza quantitativa tradizionale con machine learning moderno, garantendo che i modelli siano sia statisticamente rigorosi che praticamente applicabili a strategie di trading, gestione del portafoglio e decisioni di investimento.',
        features: ['Previsione Serie Temporali (ARIMA, LSTM, Prophet)', 'Value-at-Risk & Stress Testing', 'Ottimizzazione Portafoglio & Modelli Fattoriali', 'Segnali di Trading Quantitativo'],
      },
      section2: {
        num: '02.',
        title: 'Soluzioni NLP & AI',
        arch: 'MODELLI TRANSFORMER // ANALISI SENTIMENT // DOCUMENT INTELLIGENCE',
        desc1: 'Sfruttando architetture NLP all\'avanguardia come RoBERTa e BERT, sviluppo soluzioni personalizzate per estrarre insight da testo non strutturato—report finanziari, feed di notizie, social media e comunicazioni aziendali.',
        desc2: 'Il mio sistema di rilevamento del greenwashing, costruito per ImpactScope, dimostra questa capacità: transformer ottimizzati analizzano le dichiarazioni di sostenibilità, riducendo i tempi di revisione manuale dell\'80% attraverso un Indice di Contraddizione Semantica proprietario.',
        features: ['Classificazione Sentiment Personalizzata', 'Rilevamento Rischio ESG & Greenwashing', 'Riassunto & Estrazione Documenti', 'Chatbot & Automazione Intelligente'],
      },
      section3: {
        num: '03.',
        title: 'Business Intelligence & Dashboard',
        arch: 'POWERBI // PYTHON PERSONALIZZATO // ANALISI REAL-TIME',
        desc1: 'I dati grezzi non significano nulla senza una corretta visualizzazione e storytelling. Progetto soluzioni BI end-to-end che trasformano dataset complessi in dashboard intuitive, permettendo agli stakeholder di prendere decisioni informate a colpo d\'occhio.',
        desc2: 'Dal tracking KPI a livello esecutivo ai drill-down operativi, ogni dashboard è personalizzata sul tuo specifico contesto aziendale, integrando multiple fonti dati e fornendo insight in tempo reale.',
        features: ['Dashboard KPI Esecutive', 'Pipeline di Reporting Automatizzate', 'Design Data Warehouse', 'Sviluppo Visualizzazione Personalizzata'],
      },
      section4: {
        num: '04.',
        title: 'Consulenza Finanziaria',
        arch: 'ADVISORY TRANSFRONTALIERA // CONFORMITÀ NORMATIVA // PIANIFICAZIONE STRATEGICA',
        desc1: 'Come fondatore di Alvolo Consulting, fornisco servizi di consulenza finanziaria completi che collegano mercati italiani e internazionali. Dalla navigazione di ambienti normativi complessi all\'ottimizzazione di strutture di investimento transfrontaliere.',
        desc2: 'Il mio approccio consulenziale combina profonda competenza tecnica con acume commerciale pratico, aiutando i clienti a capire non solo cosa mostrano i dati, ma come agire strategicamente.',
        features: ['Advisory Investimenti Transfrontalieri', 'Navigazione Sistema Finanziario Italiano', 'Guida Conformità Normativa', 'Pianificazione Finanziaria Strategica'],
      },
      processLabel: 'PROCESSO DI ENGAGEMENT',
      processTitle: 'Come Lavoriamo Insieme',
      process: {
        step1Title: 'Discovery',
        step1Desc: 'Deep-dive nel tuo contesto aziendale, panorama dati e obiettivi attraverso consultazioni strutturate.',
        step2Title: 'Architettura',
        step2Desc: 'Design di specifiche tecniche, pipeline dati e architetture modello su misura per i tuoi requisiti.',
        step3Title: 'Sviluppo',
        step3Desc: 'Costruzione iterativa con checkpoint regolari, garantendo allineamento con gli obiettivi di business.',
        step4Title: 'Deployment',
        step4Desc: 'Consegna production-ready con documentazione, formazione e opzioni di supporto continuo.',
      },
      stack: 'ARSENALE TECNOLOGICO',
      stackLangs: 'Linguaggi',
      stackIntel: 'Intelligenza',
      stackDeploy: 'Deployment',
      stackViz: 'Visualizzazione',
      ctaTitle: 'Pronto a Trasformare i Tuoi Dati?',
      ctaDesc: 'Discutiamo come data science e competenza finanziaria possono far progredire il tuo business.',
      ctaButton: 'Inizia una Conversazione',
    },
  },
};

export function getTranslation(locale: Locale): TranslationType {
  return translations[locale] || translations.en;
}

