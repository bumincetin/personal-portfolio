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
      methodology: 'Services',
      projects: 'Research',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      title1: 'Bridging the gap',
      title2: 'between code & capital',
      subtitle: 'Data Scientist & AI Specialist',
      cta: 'View Research',
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
      label: 'Focus Areas',
      title: 'Data-Driven Solutions',
      explore: 'View Full Services',
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
      label: 'Research & Projects',
      title: 'Open Source Work',
      viewAll: 'View All Research',
      viewRepo: 'View Repository',
      viewProject: 'View Project',
    },
    about: {
      label: 'About the Consultant',
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
      cta: 'Get in Touch',
      button: 'Contact Me',
      copyright: '© 2025 Bumin Kağan Çetin. All rights reserved.',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
    aboutPage: {
      aboutMe: 'About',
      contact: 'Contact',
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      certifications: 'Certifications',
      languages: 'Languages',
      programming: 'Programming',
      tools: 'Tools & Technologies',
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
      label: 'Research & Projects',
      title: 'Projects & Work',
      subtitle: 'A collection of data science projects, research work, and open source contributions focused on NLP, deep learning, and financial analytics.',
      viewGithub: 'View on GitHub',
      moreGithub: 'More on GitHub',
      moreGithubDesc: 'Explore all my repositories, contributions, and ongoing projects.',
      visitProfile: 'Visit GitHub Profile',
    },
    methodologyPage: {
      label: 'Services & Methodology',
      title: 'Data Science Meets Finance',
      subtitle: 'A systematic approach to delivering data-driven solutions that bridge cutting-edge analytics with real-world financial decision-making.',
      servicesLabel: 'Core Service Areas',
      section1: {
        num: '01.',
        title: 'Financial Analytics & Modeling',
        arch: 'Predictive Models • Risk Quantification • Portfolio Optimization',
        desc1: 'I build robust financial models that transform raw market data into actionable intelligence. From stress-tested LSTM networks for price prediction to Monte Carlo simulations for risk assessment, each model is designed for real-world deployment.',
        desc2: 'My approach combines traditional quantitative finance with modern machine learning, ensuring models are both statistically rigorous and practically applicable to trading strategies, portfolio management, and investment decisions.',
        features: ['Time-Series Forecasting (ARIMA, LSTM, Prophet)', 'Value-at-Risk & Stress Testing', 'Portfolio Optimization & Factor Models', 'Quantitative Trading Signals'],
      },
      section2: {
        num: '02.',
        title: 'NLP & AI Solutions',
        arch: 'Transformer Models • Sentiment Analysis • Document Intelligence',
        desc1: 'Leveraging state-of-the-art NLP architectures like RoBERTa and BERT, I develop custom solutions for extracting insights from unstructured text—financial reports, news feeds, social media, and corporate communications.',
        desc2: 'My greenwashing detection system, built for ImpactScope, demonstrates this capability: fine-tuned transformers analyze sustainability claims, reducing manual review time by 80% through a proprietary Semantic Contradiction Index.',
        features: ['Custom Sentiment Classification', 'ESG & Greenwashing Risk Detection', 'Document Summarization & Extraction', 'Chatbots & Intelligent Automation'],
      },
      section3: {
        num: '03.',
        title: 'Business Intelligence & Dashboards',
        arch: 'PowerBI • Custom Python • Real-Time Analytics',
        desc1: 'Raw data means nothing without proper visualization and storytelling. I design end-to-end BI solutions that transform complex datasets into intuitive dashboards, enabling stakeholders to make informed decisions at a glance.',
        desc2: 'From executive-level KPI tracking to operational drill-downs, each dashboard is tailored to your specific business context, integrating multiple data sources and providing real-time insights.',
        features: ['Executive KPI Dashboards', 'Automated Reporting Pipelines', 'Data Warehouse Design', 'Custom Visualization Development'],
      },
      section4: {
        num: '04.',
        title: 'Financial Consultancy',
        arch: 'Cross-Border Advisory • Regulatory Compliance • Strategic Planning',
        desc1: 'As founder of Alvolo Consulting, I provide comprehensive financial advisory services bridging Italian and international markets. From navigating complex regulatory environments to optimizing cross-border investment structures.',
        desc2: 'My consulting approach combines deep technical expertise with practical business acumen, helping clients understand not just what the data shows, but how to act on it strategically.',
        features: ['Cross-Border Investment Advisory', 'Italian Financial System Navigation', 'Regulatory Compliance Guidance', 'Strategic Financial Planning'],
      },
      processLabel: 'Engagement Process',
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
      stack: 'Technology Stack',
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
      methodology: 'Hizmetler',
      projects: 'Araştırma',
      about: 'Hakkımda',
      contact: 'İletişim',
    },
    hero: {
      title1: 'Kod ile sermaye',
      title2: 'arasında köprü',
      subtitle: 'Veri Bilimci & Yapay Zeka Uzmanı',
      cta: 'Araştırmalarımı İncele',
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
      label: 'Uzmanlık Alanlarım',
      title: 'Veriye Dayalı Çözümler',
      explore: 'Tüm Hizmetlerimi Gör',
      card1Title: 'Finansal Veri Analizi',
      card1Desc: 'Yatırım kararlarınız için tahmine dayalı modeller, risk analizi ve sayısal değerlendirmeler sunuyorum.',
      card2Title: 'Yapay Zeka & Metin Analizi',
      card2Desc: 'Metinlerden anlam çıkarma, duygu analizi ve iş süreçlerini otomatikleştirmek için özel yapay zeka çözümleri.',
      card3Title: 'Raporlama & Görselleştirme',
      card3Desc: 'Karmaşık verileri anlaşılır panolara ve raporlara dönüştürerek stratejik kararlar almanızı kolaylaştırıyorum.',
      card4Title: 'Finansal Danışmanlık',
      card4Desc: 'Uluslararası yatırım danışmanlığı, yasal uyum süreçleri ve stratejik finansal planlama hizmetleri.',
    },
    assets: {
      label: 'Araştırma & Projeler',
      title: 'Açık Kaynak Çalışmalar',
      viewAll: 'Tüm Araştırmaları Gör',
      viewRepo: 'Depoyu Görüntüle',
      viewProject: 'Projeyi Görüntüle',
    },
    about: {
      label: 'Danışman Hakkında',
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
      cta: 'İletişime Geç',
      button: 'Benimle İletişime Geç',
      copyright: '© 2025 Bumin Kağan Çetin. Tüm hakları saklıdır.',
      linkedin: 'LinkedIn',
      email: 'E-posta',
    },
    aboutPage: {
      aboutMe: 'Hakkımda',
      contact: 'İletişim',
      education: 'Eğitim',
      experience: 'Deneyim',
      skills: 'Beceriler',
      certifications: 'Sertifikalar',
      languages: 'Diller',
      programming: 'Programlama',
      tools: 'Araçlar & Teknolojiler',
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
      label: 'Araştırma & Projeler',
      title: 'Projeler & Çalışmalar',
      subtitle: 'NLP, derin öğrenme ve finansal analitik odaklı veri bilimi projeleri, araştırma çalışmaları ve açık kaynak katkıları koleksiyonu.',
      viewGithub: "GitHub'da Görüntüle",
      moreGithub: "GitHub'da Daha Fazlası",
      moreGithubDesc: 'Tüm depolarımı, katkılarımı ve devam eden projelerimi keşfedin.',
      visitProfile: "GitHub Profilini Ziyaret Et",
    },
    methodologyPage: {
      label: 'Hizmetler & Çalışma Yöntemim',
      title: 'Veri Bilimi ve Finans Bir Arada',
      subtitle: 'İleri veri analitiğini gerçek iş kararlarına dönüştüren, sonuç odaklı çözümler sunuyorum.',
      servicesLabel: 'Sunduğum Hizmetler',
      section1: {
        num: '01.',
        title: 'Finansal Veri Analizi ve Modelleme',
        arch: 'Tahmin Modelleri • Risk Hesaplama • Portföy Yönetimi',
        desc1: 'Piyasa verilerini anlamlı öngörülere dönüştüren güçlü finansal modeller kuruyorum. Fiyat tahminleri için yapay sinir ağlarından risk ölçümü için simülasyonlara kadar, her model gerçek hayatta kullanılmak üzere tasarlanıyor.',
        desc2: 'Geleneksel finans bilgisini modern yapay zeka teknikleriyle birleştirerek, hem matematiksel olarak sağlam hem de uygulamada işe yarayan çözümler üretiyorum.',
        features: ['Fiyat ve Trend Tahmini (ARIMA, LSTM, Prophet)', 'Risk Ölçümü ve Stres Testleri', 'Portföy Optimizasyonu', 'Yatırım Sinyalleri Üretimi'],
      },
      section2: {
        num: '02.',
        title: 'Yapay Zeka ve Metin Analizi Çözümleri',
        arch: 'Dil Modelleri • Duygu Analizi • Akıllı Belge İşleme',
        desc1: 'RoBERTa ve BERT gibi son teknoloji yapay zeka modellerini kullanarak metinlerden değerli bilgiler çıkarıyorum. Finansal raporlar, haberler, sosyal medya paylaşımları ve şirket duyurularını analiz ediyorum.',
        desc2: 'ImpactScope için geliştirdiğim "yeşil yıkama" tespit sistemi bu alandaki uzmanlığımı gösteriyor: Yapay zeka ile şirketlerin sürdürülebilirlik iddialarını analiz ederek manuel inceleme süresini %80 azalttım.',
        features: ['Metin Duygu Analizi', 'Sürdürülebilirlik Risk Tespiti', 'Otomatik Belge Özetleme', 'Akıllı Sohbet Botları'],
      },
      section3: {
        num: '03.',
        title: 'İş Zekası ve Görsel Raporlama',
        arch: 'PowerBI • Python Uygulamaları • Anlık Veri Takibi',
        desc1: 'Ham veriler doğru görselleştirilmeden anlam ifade etmez. Karmaşık veri kümelerini herkesin anlayabileceği panolara dönüştürerek hızlı ve doğru kararlar almanızı sağlıyorum.',
        desc2: 'Üst yönetim için özet göstergelerden detaylı operasyonel raporlara kadar, her panoyu sizin ihtiyaçlarınıza göre özelleştiriyorum.',
        features: ['Yönetici Panoları', 'Otomatik Rapor Sistemleri', 'Veri Deposu Tasarımı', 'Özel Görsel Çözümler'],
      },
      section4: {
        num: '04.',
        title: 'Finansal Danışmanlık',
        arch: 'Uluslararası Yatırım • Yasal Uyum • Strateji Geliştirme',
        desc1: 'Alvolo Consulting\'in kurucusu olarak, İtalya ve uluslararası pazarlar arasında köprü kuran danışmanlık hizmetleri sunuyorum. Karmaşık yasal süreçlerde rehberlik etmekten yatırım yapılarını optimize etmeye kadar geniş bir yelpazede destek sağlıyorum.',
        desc2: 'Teknik bilgiyi iş dünyası deneyimiyle birleştirerek, müşterilerime sadece verilerin ne söylediğini değil, nasıl harekete geçmeleri gerektiğini de gösteriyorum.',
        features: ['Uluslararası Yatırım Danışmanlığı', 'İtalya Finans Sistemi Rehberliği', 'Yasal Uyum Desteği', 'Finansal Strateji Planlaması'],
      },
      processLabel: 'Çalışma Sürecim',
      processTitle: 'Birlikte Nasıl Çalışıyoruz',
      process: {
        step1Title: 'Tanışma',
        step1Desc: 'İşinizi, verilerinizi ve hedeflerinizi anlamak için detaylı görüşmeler yapıyoruz.',
        step2Title: 'Planlama',
        step2Desc: 'İhtiyaçlarınıza uygun teknik çözümler ve veri akışları tasarlıyorum.',
        step3Title: 'Geliştirme',
        step3Desc: 'Düzenli geri bildirimlerle projeyi adım adım oluşturuyorum.',
        step4Title: 'Teslim',
        step4Desc: 'Çalışan ürünü dokümantasyon ve eğitimle birlikte teslim ediyorum.',
      },
      stack: 'Kullandığım Teknolojiler',
      stackLangs: 'Programlama Dilleri',
      stackIntel: 'Yapay Zeka Araçları',
      stackDeploy: 'Sistem Kurulumu',
      stackViz: 'Görselleştirme',
      ctaTitle: 'Verilerinizi Değere Dönüştürelim',
      ctaDesc: 'Veri bilimi ve finans uzmanlığımın işinize nasıl katkı sağlayabileceğini konuşalım.',
      ctaButton: 'Görüşme Ayarla',
    },
  },
  it: {
    nav: {
      home: 'Home',
      methodology: 'Servizi',
      projects: 'Ricerca',
      about: 'Chi Sono',
      contact: 'Contatto',
    },
    hero: {
      title1: 'Colmare il divario',
      title2: 'tra codice e capitale',
      subtitle: 'Data Scientist & Specialista AI',
      cta: 'Vedi Ricerca',
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
      label: 'Aree di Focus',
      title: 'Soluzioni Data-Driven',
      explore: 'Vedi Tutti i Servizi',
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
      label: 'Ricerca & Progetti',
      title: 'Lavoro Open Source',
      viewAll: 'Vedi Tutta la Ricerca',
      viewRepo: 'Visualizza Repository',
      viewProject: 'Visualizza Progetto',
    },
    about: {
      label: 'Sul Consulente',
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
      cta: 'Contattami',
      button: 'Contattami',
      copyright: '© 2025 Bumin Kağan Çetin. Tutti i diritti riservati.',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
    aboutPage: {
      aboutMe: 'Chi Sono',
      contact: 'Contatto',
      education: 'Istruzione',
      experience: 'Esperienza',
      skills: 'Competenze',
      certifications: 'Certificazioni',
      languages: 'Lingue',
      programming: 'Programmazione',
      tools: 'Strumenti & Tecnologie',
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
      label: 'Ricerca & Progetti',
      title: 'Progetti & Lavori',
      subtitle: 'Una raccolta di progetti di data science, lavori di ricerca e contributi open source focalizzati su NLP, deep learning e analisi finanziaria.',
      viewGithub: 'Visualizza su GitHub',
      moreGithub: 'Altro su GitHub',
      moreGithubDesc: 'Esplora tutti i miei repository, contributi e progetti in corso.',
      visitProfile: 'Visita Profilo GitHub',
    },
    methodologyPage: {
      label: 'Servizi & Metodologia',
      title: 'Data Science Incontra Finanza',
      subtitle: 'Un approccio sistematico per fornire soluzioni data-driven che collegano analisi all\'avanguardia con il processo decisionale finanziario reale.',
      servicesLabel: 'Aree di Servizio Principali',
      section1: {
        num: '01.',
        title: 'Analisi Finanziaria & Modellazione',
        arch: 'Modelli Predittivi • Quantificazione Rischio • Ottimizzazione Portafoglio',
        desc1: 'Costruisco modelli finanziari robusti che trasformano dati di mercato grezzi in intelligence azionabile. Dalle reti LSTM stress-testate per la previsione dei prezzi alle simulazioni Monte Carlo per la valutazione del rischio, ogni modello è progettato per il deployment reale.',
        desc2: 'Il mio approccio combina finanza quantitativa tradizionale con machine learning moderno, garantendo che i modelli siano sia statisticamente rigorosi che praticamente applicabili a strategie di trading, gestione del portafoglio e decisioni di investimento.',
        features: ['Previsione Serie Temporali (ARIMA, LSTM, Prophet)', 'Value-at-Risk & Stress Testing', 'Ottimizzazione Portafoglio & Modelli Fattoriali', 'Segnali di Trading Quantitativo'],
      },
      section2: {
        num: '02.',
        title: 'Soluzioni NLP & AI',
        arch: 'Modelli Transformer • Analisi Sentiment • Document Intelligence',
        desc1: 'Sfruttando architetture NLP all\'avanguardia come RoBERTa e BERT, sviluppo soluzioni personalizzate per estrarre insight da testo non strutturato—report finanziari, feed di notizie, social media e comunicazioni aziendali.',
        desc2: 'Il mio sistema di rilevamento del greenwashing, costruito per ImpactScope, dimostra questa capacità: transformer ottimizzati analizzano le dichiarazioni di sostenibilità, riducendo i tempi di revisione manuale dell\'80% attraverso un Indice di Contraddizione Semantica proprietario.',
        features: ['Classificazione Sentiment Personalizzata', 'Rilevamento Rischio ESG & Greenwashing', 'Riassunto & Estrazione Documenti', 'Chatbot & Automazione Intelligente'],
      },
      section3: {
        num: '03.',
        title: 'Business Intelligence & Dashboard',
        arch: 'PowerBI • Python Personalizzato • Analisi Real-Time',
        desc1: 'I dati grezzi non significano nulla senza una corretta visualizzazione e storytelling. Progetto soluzioni BI end-to-end che trasformano dataset complessi in dashboard intuitive, permettendo agli stakeholder di prendere decisioni informate a colpo d\'occhio.',
        desc2: 'Dal tracking KPI a livello esecutivo ai drill-down operativi, ogni dashboard è personalizzata sul tuo specifico contesto aziendale, integrando multiple fonti dati e fornendo insight in tempo reale.',
        features: ['Dashboard KPI Esecutive', 'Pipeline di Reporting Automatizzate', 'Design Data Warehouse', 'Sviluppo Visualizzazione Personalizzata'],
      },
      section4: {
        num: '04.',
        title: 'Consulenza Finanziaria',
        arch: 'Advisory Transfrontaliera • Conformità Normativa • Pianificazione Strategica',
        desc1: 'Come fondatore di Alvolo Consulting, fornisco servizi di consulenza finanziaria completi che collegano mercati italiani e internazionali. Dalla navigazione di ambienti normativi complessi all\'ottimizzazione di strutture di investimento transfrontaliere.',
        desc2: 'Il mio approccio consulenziale combina profonda competenza tecnica con acume commerciale pratico, aiutando i clienti a capire non solo cosa mostrano i dati, ma come agire strategicamente.',
        features: ['Advisory Investimenti Transfrontalieri', 'Navigazione Sistema Finanziario Italiano', 'Guida Conformità Normativa', 'Pianificazione Finanziaria Strategica'],
      },
      processLabel: 'Processo di Engagement',
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
      stack: 'Stack Tecnologico',
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
