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
    ctaTitle: string;
    ctaDesc: string;
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
    ctaTitle: string;
    ctaDesc: string;
    ctaButton: string;
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
      expandedDesc: string;
      useCases: {
        title: string;
        scenarios: {
          title: string;
          scenario: string;
          solution: string;
          benefit: string;
        }[];
      };
      closingMessage: string;
    };
    section2: {
      num: string;
      title: string;
      arch: string;
      desc1: string;
      desc2: string;
      features: string[];
      expandedDesc: string;
      useCases: {
        title: string;
        scenarios: {
          title: string;
          problem: string;
          solution: string;
          benefit: string;
        }[];
      };
      closingMessage: string;
    };
    section3: {
      num: string;
      title: string;
      arch: string;
      desc1: string;
      desc2: string;
      features: string[];
      expandedDesc: string;
      useCases: {
        title: string;
        scenarios: {
          title: string;
          problem: string;
          solution: string;
          benefit: string;
        }[];
      };
      closingMessage: string;
    };
    section4: {
      num: string;
      title: string;
      arch: string;
      desc1: string;
      desc2: string;
      features: string[];
      expandedDesc: string;
      useCases: {
        title: string;
        scenarios: {
          title: string;
          problem: string;
          solution: string;
          benefit: string;
        }[];
      };
      closingMessage: string;
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
    keyCapabilities: string;
    viewDetails: string;
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
      ctaTitle: 'Ready to transform your data into insights?',
      ctaDesc: 'Whether you need financial analytics, AI solutions, or strategic consulting—let\'s discuss how we can work together.',
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
      ctaTitle: 'Interested in working together?',
      ctaDesc: 'Whether you need data science expertise, financial consulting, or AI solutions—let\'s discuss your project.',
      ctaButton: 'Get in Touch',
      educationData: [
        {
          school: "Bocconi University",
          degree: "Master of Science in Data Science and Business Analytics",
          location: "Milan, Italy",
          period: "2023 - 2025",
          coursework: ["Deep Learning for Computer Vision", "Simulation & Modeling", "Natural Language Processing"],
          thesis: "Auditable Detection of Greenwashing Risk in Corporate Communications"
        },
        {
          school: "Bocconi University",
          degree: "Bachelor of Science in Economics, Management, and Computer Science",
          location: "Milan, Italy",
          period: "2020 - 2023",
          coursework: ["Econometrics", "Big Data and Databases", "Programming", "IT Law", "Machine Learning"],
          thesis: "A Study of Predictive Techniques for Parliamentary Elections: A Case Study of Turkish Parliament"
        }
      ],
      experienceData: [
        {
          company: "IMPACTSCOPE",
          role: "AI Specialist | NLP Researcher",
          location: "Remote, Switzerland",
          period: "December 2024 - December 2025",
          highlights: [
            "Developed Data Product by fine-tuning RoBERTa to flag greenwashing risk, reducing manual review time by 80%",
            "Developed semantic contradiction index (SCI) utilizing stance detection and sentiment drift",
            "Cross-referenced sentiment-based ESG risk scores with historical greenwashing controversies"
          ]
        },
        {
          company: "ALVOLO CONSULTING",
          role: "Founder",
          location: "Milan, Italy",
          period: "March 2025 - November 2025",
          highlights: [
            "Founded financial advisory hub in Italy helping clients achieve their financial goals",
            "Mastered Italian financial system to provide accurate information and guidance",
            "Managed full customer lifecycle from acquisition to retention"
          ]
        },
        {
          company: "FEDRIGONI SPA",
          role: "Junior Data Scientist",
          location: "Milan, Italy",
          period: "April 2024 - October 2024",
          highlights: [
            "Developed time-series algorithms and custom predictive models utilizing LSTM",
            "Developed custom AI model incorporating unsupervised models and NLP to optimize pricing",
            "Utilized Knime and PowerBI to develop new analytical prototypes"
          ]
        },
        {
          company: "N26 BANK AG",
          role: "Risk Management Intern",
          location: "Berlin, Germany",
          period: "November 2022 - February 2023",
          highlights: [
            "Supported Internal Control System (ICS), loss database, risk register and reporting",
            "Interacted with stakeholders supporting New Product Process (NPP)",
            "Helped in identifying, assessing, mitigating and monitoring non-financial risks"
          ]
        }
      ],
      languageData: [
        { lang: "Turkish", level: "Native" },
        { lang: "English", level: "Native" },
        { lang: "Italian", level: "Advanced (C1)" },
        { lang: "German", level: "Intermediate (B1)" }
      ],
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
        expandedDesc: 'Financial data analysis is the art of finding order within the chaos of markets. Just as advanced meteorological models track pressure changes in the atmosphere to predict storms in advance; we analyze historical data, market sentiment, and visual signals to model the financial climate.\n\nThe solution I offer processes complex mathematical algorithms and multi-layered datasets (text, image, numerical data) to "separate signal from noise". My goal is not to overwhelm you with data; it is to provide the compass that will transform these complex calculations into clear, strategic, and profitable investment decisions.',
        useCases: {
          title: 'Use Cases',
          scenarios: [
            {
              title: 'News & Sentiment Analysis (NLP for Market Pulse)',
              scenario: 'Markets move not just with numbers, but with news.',
              solution: 'My NLP models scan central bank minutes, CEO statements, or tens of thousands of news headlines in seconds, measuring the market\'s "sentiment".',
              benefit: 'Provides early warning by detecting negative news waves about a stock before it begins to decline.',
            },
            {
              title: 'Internal Financial Data Analysis & Business Intelligence',
              scenario: 'Your company generates vast amounts of financial data daily—sales, expenses, cash flow, inventory—but extracting actionable insights from this data requires specialized data science expertise.',
              solution: 'I apply advanced analytics and machine learning to your internal financial data, building predictive models for revenue forecasting, cost optimization, and cash flow management. From identifying spending patterns to detecting anomalies, I transform your financial data into strategic intelligence.',
              benefit: 'Enables data-driven decision making by revealing hidden patterns in your financial operations, optimizing costs, and improving profitability through predictive insights.',
            },
            {
              title: 'Computer Vision for "Alternative Data" Analysis',
              scenario: 'How do you measure a retail chain\'s or factory\'s performance before financial statements are released?',
              solution: 'Algorithms processing satellite images count parking lot occupancy rates of retail stores or analyze container movement activity in ports.',
              benefit: 'You gain leading indicators about a company\'s operational performance months before official financial reports are published.',
            },
            {
              title: 'Algorithmic Risk Management & Portfolio Optimization',
              scenario: 'Knowing which assets are correlated with each other and where hidden risks lie.',
              solution: 'Deep learning models that simulate historical price movements and volatility test how your portfolio would be affected in "Black Swan" (unexpected crisis) scenarios.',
              benefit: 'Protects your capital by establishing the return-risk balance most suitable to your risk appetite.',
            },
          ],
        },
        closingMessage: 'Data is the new oil; but it doesn\'t turn into fuel until it\'s processed. I help you chart your course in uncertain markets by transforming raw data into strategic intelligence.',
      },
      section2: {
        num: '02.',
        title: 'NLP & AI Solutions',
        arch: 'Transformer Models • Sentiment Analysis • Document Intelligence',
        desc1: 'Leveraging state-of-the-art NLP architectures like RoBERTa and BERT, I develop custom solutions for extracting insights from unstructured text—financial reports, news feeds, social media, and corporate communications.',
        desc2: 'My greenwashing detection system, built for ImpactScope, demonstrates this capability: fine-tuned transformers analyze sustainability claims, reducing manual review time by 80% through a proprietary Semantic Contradiction Index.',
        features: ['Custom Sentiment Classification', 'ESG & Greenwashing Risk Detection', 'Document Summarization & Extraction', 'Chatbots & Intelligent Automation'],
        expandedDesc: 'AI-Powered Text Analysis (NLP) is the technology that transforms unstructured data piles (emails, reports, news) into meaningful and manageable information. Artificial intelligence combines the ability to understand the complexity, nuances, and context of human language with the super processing speed of machines.\n\nThis technology processes the vast information pool (Dark Data) that your company owns but cannot use, completing analyses that would take months manually in seconds. We don\'t just "read" words; we analyze between the lines to reveal the "big picture" necessary for your strategic decisions.',
        useCases: {
          title: 'Use Cases',
          scenarios: [
            {
              title: 'Due Diligence & Contract Analysis',
              problem: 'In merger and acquisition (M&A) processes or major investments, thousands of pages of legal and financial documents need to be reviewed.',
              solution: 'Our NLP models scan thousands of contracts in seconds; automatically flagging critical clauses, hidden risks, maturity dates, and non-standard obligations.',
              benefit: 'Reduces legal review costs by up to 70% and minimizes risks overlooked due to human error.',
            },
            {
              title: 'Brand Reputation & Market Sentiment Analysis',
              problem: 'Understanding what customers or the market think about your brand requires reading thousands of tweets or news articles.',
              solution: 'Our systems analyze tens of thousands of comments on social media, news sites, and forums, not just making "positive/negative" distinctions; they categorize the root causes of complaints (price, quality, customer service).',
              benefit: 'Enables you to detect crises before they grow and proactively intervene in customer dissatisfaction.',
            },
            {
              title: 'Automatic Information Extraction & Classification',
              problem: 'Manually entering documents like incoming invoices, CVs, or customer request forms into the system is a waste of time.',
              solution: 'AI automatically extracts critical data such as names, dates, amounts, IBANs from PDFs or scanned images (OCR + NLP) and processes them into your database.',
              benefit: 'Increases operational efficiency and allows your qualified employees to focus on value-added work instead of data entry.',
            },
            {
              title: 'Greenwashing & Compliance Auditing (Your Expertise)',
              problem: 'Manually auditing the accuracy and consistency of corporate sustainability reports is difficult.',
              solution: 'Our custom transformer models detect exaggerated, ambiguous, or contradictory statements (greenwashing signals) in corporate communications.',
              benefit: 'Provides transparency for investors and accelerates the compliance process for companies.',
            },
          ],
        },
        closingMessage: 'In business, information is power, but only when it\'s accessible. We liberate data trapped within texts and make your business smarter, faster, and more predictive.',
      },
      section3: {
        num: '03.',
        title: 'Business Intelligence & Dashboards',
        arch: 'PowerBI • Custom Python • Real-Time Analytics',
        desc1: 'Raw data means nothing without proper visualization and storytelling. I design end-to-end BI solutions that transform complex datasets into intuitive dashboards, enabling stakeholders to make informed decisions at a glance.',
        desc2: 'From executive-level KPI tracking to operational drill-downs, each dashboard is tailored to your specific business context, integrating multiple data sources and providing real-time insights.',
        features: ['Executive KPI Dashboards', 'Automated Reporting Pipelines', 'Data Warehouse Design', 'Custom Visualization Development'],
        expandedDesc: 'Business Intelligence (BI) is the process of collecting data fragments scattered across different departments of your company and transforming them into a "Single Source of Truth".\n\nWe liberate data from static and hard-to-manage Excel files, moving it to living and breathing dynamic dashboards. This is not just about getting "beautiful reports"; it\'s about eliminating corporate blindness by seeing your company\'s past and present with X-ray precision. BI doesn\'t just tell you "how much you sold"; it shows you "why you sold there" and "where profitability comes from".',
        useCases: {
          title: 'Use Cases',
          scenarios: [
            {
              title: 'Real-Time Performance Tracking (Escape from Excel Chaos)',
              problem: 'Waiting for end-of-month reports, manually merging data in Excel, and dealing with formula errors slows down your decision-making speed.',
              solution: 'We integrate all your sales, marketing, and financial data into a single live screen (dashboard). Data is updated through automatic API connections, not manual entry.',
              benefit: 'Keeps your company\'s pulse in real-time, allowing you to correct your course without waiting for month-end. You spend time "making decisions" rather than "preparing data".',
            },
            {
              title: 'Profitability & Regional Analysis (Deep Dive)',
              problem: 'You see total revenue increasing, but you can\'t see which region or product is actually eroding your profit margin.',
              solution: 'With interactive maps and drill-down analyses, you can go from the overall table down to the smallest store or product detail.',
              benefit: 'You use your resources efficiently by identifying which region needs marketing support or which product is creating inventory costs.',
            },
            {
              title: 'Cross-Department Integration (Silo Breaker)',
              problem: 'While the marketing department increases advertising spending, they may be unaware that warehouse stocks are insufficient.',
              solution: 'BI breaks down walls between departments. It reveals correlations by visualizing marketing data and inventory data in the same chart.',
              benefit: 'Predicts operational bottlenecks before they form, ensuring departments work in sync rather than in isolation from each other.',
            },
            {
              title: 'Customer Segmentation & Loyalty Analysis',
              problem: 'Answering "Who are our best customers?" based only on revenue can be misleading.',
              solution: 'We identify the most valuable customer segments by visualizing customer behavior through metrics such as purchase frequency, basket value, and payment patterns.',
              benefit: 'Allows you to focus your marketing budget on the audience with the highest conversion rate, not everyone.',
            },
          ],
        },
        closingMessage: 'Stop driving in the dark. With our Business Intelligence solutions, we transform your company\'s data from a rearview mirror into a powerful navigation system.',
      },
      section4: {
        num: '04.',
        title: 'Financial Consultancy',
        arch: 'Cross-Border Advisory • Regulatory Compliance • Strategic Planning',
        desc1: 'As founder of Alvolo Consulting, I provide comprehensive financial advisory services bridging Italian and international markets. From navigating complex regulatory environments to optimizing cross-border investment structures.',
        desc2: 'My consulting approach combines deep technical expertise with practical business acumen, helping clients understand not just what the data shows, but how to act on it strategically.',
        features: ['Cross-Border Investment Advisory', 'Italian Financial System Navigation', 'Regulatory Compliance Guidance', 'Strategic Financial Planning'],
        expandedDesc: 'Cross-Border Financial Consultancy is a strategic compass that guides you in uncharted waters. Doing business in a different country requires not just capital, but mastery of that country\'s regulations, tax system, and business culture.\n\nAs the Founder of Alvolo Consulting, I provide end-to-end guidance to businesses in the Turkey-Italy trade corridor. By managing language barriers, complex bureaucracy, and cultural differences on your behalf, I move your investment process from "problem-solving mode" to "value-creation mode". For those who want to incorporate, invest, or benefit from tax advantages in the Italian market, I work like a local partner.',
        useCases: {
          title: 'Use Cases',
          scenarios: [
            {
              title: 'Turnkey Company Formation & Market Entry',
              problem: 'Establishing a company in Italy involves complex, multilingual bureaucracy including notary procedures, tax office registrations, and bank account openings.',
              solution: 'We manage the entire process from determining the company type (S.r.l, S.p.A, etc.) to completing registration procedures.',
              benefit: 'While you focus on your business plan, we set up the legal infrastructure flawlessly, preventing time and cost losses.',
            },
            {
              title: 'Tax Optimization & Incentive Advisory',
              problem: 'Double Taxation Prevention Agreements between Italy and Turkey and local incentives (e.g., R&D incentives, Start-up visas) are complex.',
              solution: 'We structure the tax framework most suitable for your business model and identify government incentives and grants you can benefit from.',
              benefit: 'Minimizes your tax burden within the legal framework while strengthening your working capital with government support.',
            },
            {
              title: 'Cultural & Commercial Negotiation Management',
              problem: 'In Italian business culture, trust, relationships, and communication style are as important as contracts. A wrong communication can break the deal on the table.',
              solution: 'We translate not just the language, but also the way of doing business. We build cultural bridges in meetings with local suppliers, banks, or partners.',
              benefit: 'Eliminates misunderstandings and enables you to build trust-based, long-term commercial relationships with local stakeholders.',
            },
            {
              title: 'Real Estate & Asset Management Investments',
              problem: 'Investment property purchases or asset management in Italy are subject to complex property and inheritance laws.',
              solution: 'We provide end-to-end financial and legal support from investment return (ROI) calculations to property transfer procedures.',
              benefit: 'Ensures the legal security of your investments and preserves the value of your assets in Italy.',
            },
          ],
        },
        closingMessage: 'You don\'t need to speak Italian to do business in Italy; you need a partner who speaks the language of business. With Alvolo Consulting, we remove borders and shorten the trade route between Turkey and Italy for you.',
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
      keyCapabilities: 'Key Capabilities',
      viewDetails: 'View Details',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      methodology: 'Hizmetler',
      projects: 'Araştırmalarım',
      about: 'Hakkımda',
      contact: 'İletişim',
    },
    hero: {
      title1: 'Kod ile sermaye',
      title2: 'arasında köprü',
      subtitle: 'Veri Bilimci & Yapay Zeka Uzmanı',
      cta: 'Hizmetlerimi Görüntüle',
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
      desc1: "Alvolo Consulting'in CEO'su olarak, sınır ötesi yatırımları yapay zeka ile yeniden tanımlıyorum. Bocconi Üniversitesi'ndeki çalışmalarım ışığında, NLP ve Derin Öğrenme yetkinliklerimi Bilgisayarlı Görü ile birleştirerek finansal verileri bütüncül bir yaklaşımla analiz ediyorum.",
      desc2: 'Araştırma odağım, sürdürülebilirlik raporlarındaki greenwashing girişimlerini tespit eden dil modellerinden, karmaşık finansal veri setlerini ve görsel verileri işleyen çok modlu (multimodal) analiz sistemlerine kadar uzanmaktadır.',
      viewBio: 'Tam Biyografiyi Gör',
      credential1: 'Veri Bilimi Y.L. @ Bocconi',
      credential2: 'Yapay Zeka Uzmanı & NLP Araştırmacısı @ ImpactScope',
      credential3: 'NLP & Derin Öğrenme',
      credential4: 'Kurucu, Alvolo Consulting',
    },
    footer: {
      cta: 'İletişime Geç',
      ctaTitle: 'Verilerinizi değere dönüştürmeye hazır mısınız?',
      ctaDesc: 'Finansal analitik, yapay zeka çözümleri veya stratejik danışmanlık—nasıl birlikte çalışabileceğimizi konuşalım.',
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
      ctaTitle: 'Birlikte çalışmak ister misiniz?',
      ctaDesc: 'Veri bilimi, finansal danışmanlık veya yapay zeka çözümleri—projenizi konuşalım.',
      ctaButton: 'İletişime Geç',
      educationData: [
        {
          school: "Bocconi Üniversitesi",
          degree: "Veri Bilimi ve İş Analitiği Yüksek Lisansı",
          location: "Milano, İtalya",
          period: "2023 - 2025",
          coursework: ["Bilgisayarlı Görü için Derin Öğrenme", "Simülasyon ve Modelleme", "Doğal Dil İşleme"],
          thesis: "Kurumsal İletişimlerde Greenwashing Riskinin Denetlenebilir Tespiti"
        },
        {
          school: "Bocconi Üniversitesi",
          degree: "Ekonomi, Yönetim ve Bilgisayar Bilimleri Lisansı",
          location: "Milano, İtalya",
          period: "2020 - 2023",
          coursework: ["Ekonometri", "Büyük Veri ve Veritabanları", "Programlama", "Bilişim Hukuku", "Makine Öğrenmesi"],
          thesis: "Parlamento Seçimleri için Analitik Tahmin Teknikleri: 2023 Türkiye Genel Seçimleri Örneği"
        }
      ],
      experienceData: [
        {
          company: "IMPACTSCOPE",
          role: "Yapay Zeka Uzmanı & NLP Araştırmacısı",
          location: "Uzaktan, İsviçre",
          period: "Aralık 2024 - Aralık 2025",
          highlights: [
            "Kurumsal sürdürülebilirlik iddialarını analiz ederek greenwashing riskini otomatikleştirmek için RoBERTa'ya ince ayar yaparak bir ürün geliştirdim, bu sayede inceleme süresini %80 azalttım ve müşteriler için bir denetlenebilir metrik sağladım.",
            "Duruş tespiti ve duygu kayması kullanarak anlamsal çelişki endeksi (SCI) geliştirdim",
            "Duygu tabanlı ESG risk puanlarını geçmiş \"greenwashing\" tartışmalarıyla çapraz referanslayarak, kamuoyu duygu kutupluluğu ile greenwashing suçlamaları arasında güçlü bir korelasyon olduğunu gösterdim."
          ]
        },
        {
          company: "ALVOLO CONSULTING",
          role: "Kurucu",
          location: "Milano, İtalya",
          period: "Mart 2025 - Kasım 2025",
          highlights: [
            "Müşterilerin finansal hedeflerine ulaşmalarına yardımcı olan, İtalya'daki bir finansal danışmanlık merkezi. İtalyan sisteminde uzmanlaşarak, müşterilerimize en doğru bilgileri sağlamaya ve başarı hikayelerinin bir parçası olmaya kendimizi adadık. Geri bildirimlere dayalı olarak kendimizi yineleyerek, edinimden tutundurmaya kadar tüm müşteri yaşam döngüsünü yönettik."
          ]
        },
        {
          company: "FEDRIGONI SPA",
          role: "Junior Veri Bilimci",
          location: "Milano, İtalya",
          period: "Nisan 2024 - Ekim 2024",
          highlights: [
            "İş içgörüleri ve önerileri sunmak için en son derin öğrenme yöntemlerini (LSTM) kullanarak zaman serisi algoritmaları ve özel tahmin modelleri geliştirdim.",
            "Fiyatlamayı optimize etmek için denetimsiz modeller ve Doğal Dil İşleme (NLP) içeren özel yapay zeka modeli geliştirdim.",
            "Yeni analitik prototipler geliştirmek için Knime ve PowerBI gibi araçları kullanarak, verileri daha iyi anlamlandırıp, müşterilerimize daha iyi hizmet sunmak için çalıştım."
          ]
        },
        {
          company: "N26 BANK AG",
          role: "Risk Yönetimi Stajyeri",
          location: "Berlin, Almanya",
          period: "Kasım 2022 - Şubat 2023",
          highlights: [
            "İç Kontrol Sistemi (İKS), kayıp veritabanı, risk kaydı ve raporlamayı destekledim",
            "Yeni Ürün Sürecini (NPP) destekleyen paydaşlarla etkileşim kurdum",
            "Finansal olmayan risklerin belirlenmesi, değerlendirilmesi, azaltılması ve izlenmesine yardımcı oldum"
          ]
        }
      ],
      languageData: [
        { lang: "Türkçe", level: "Ana Dil" },
        { lang: "İngilizce", level: "Ana Dil" },
        { lang: "İtalyanca", level: "İleri (C1)" },
        { lang: "Almanca", level: "Orta (B1)" }
      ],
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
        expandedDesc: 'Finansal veri analizi, piyasaların kaosunun içinde bir düzen bulma sanatıdır. Tıpkı gelişmiş meteorolojik modellerin atmosferdeki basınç değişimlerini izleyerek fırtınayı önceden haber vermesi gibi; biz de geçmiş verileri, piyasa duyarlılığını ve görsel sinyalleri analiz ederek finansal iklimi modelliyoruz.\n\nSize sunduğum çözüm, karmaşık matematiksel algoritmaları ve çok katmanlı veri setlerini (metin, görüntü, sayısal veri) işleyerek "gürültüden sinyali ayırır". Amacım, sizi veri yığınına boğmak değil; bu karmaşık hesaplamaları net, stratejik ve kârlı yatırım kararlarına dönüştürecek pusulayı sağlamaktır.',
        useCases: {
          title: 'Kullanım Senaryoları',
          scenarios: [
            {
              title: 'Haber ve Duygu Analizi (NLP ile Piyasa Nabzı)',
              scenario: 'Piyasa sadece rakamlarla değil, haberlerle hareket eder.',
              solution: 'Merkez bankası tutanaklarını, CEO açıklamalarını veya on binlerce haber başlığını saniyeler içinde tarayan NLP modellerim, piyasanın "duygusunu" (sentiment) ölçer.',
              benefit: 'Bir hisse senedi düşüşe geçmeden önce, hakkında çıkan olumsuz haber dalgasını tespit ederek erken uyarı (early warning) sağlar.',
            },
            {
              title: 'İç Finansal Veri Analizi & İş Zekası',
              scenario: 'Şirketiniz her gün muazzam miktarda finansal veri üretiyor—satışlar, giderler, nakit akışı, envanter—ancak bu verilerden eyleme dönüştürülebilir içgörüler çıkarmak özel veri bilimi uzmanlığı gerektirir.',
              solution: 'İç finansal verilerinize gelişmiş analitik ve makine öğrenmesi uygulayarak, gelir tahmini, maliyet optimizasyonu ve nakit akışı yönetimi için tahmine dayalı modeller oluşturuyorum. Harcama kalıplarını belirlemekten anormallikleri tespit etmeye kadar, finansal verilerinizi stratejik zekaya dönüştürüyorum.',
              benefit: 'Finansal operasyonlarınızdaki gizli kalıpları ortaya çıkararak, maliyetleri optimize ederek ve tahmine dayalı içgörüler aracılığıyla karlılığı artırarak veri odaklı karar vermeyi sağlar.',
            },
            {
              title: 'Bilgisayarlı Görü ile "Alternatif Veri" Analizi',
              scenario: 'Bilançolar açıklanmadan önce bir perakende zincirinin veya fabrikanın performansını nasıl ölçersiniz?',
              solution: 'Uydu görüntülerini işleyen algoritmalarımız, perakende mağazalarının otopark doluluk oranlarını sayar veya limanlardaki konteyner hareketliliğini analiz eder.',
              benefit: 'Resmi finansal raporlar yayınlanmadan aylar önce, şirketin operasyonel performansı hakkında öncü verilere (leading indicators) sahip olursunuz.',
            },
            {
              title: 'Algoritmik Risk Yönetimi ve Portföy Optimizasyonu',
              scenario: 'Hangi varlıkların birbiriyle korelasyon içinde olduğunu ve gizli risklerin nerede yattığını bilmek.',
              solution: 'Geçmiş fiyat hareketlerini ve volatiliteyi simüle eden derin öğrenme modelleri, "Siyah Kuğu" (beklenmedik kriz) senaryolarında portföyünüzün nasıl etkileneceğini test eder.',
              benefit: 'Risk iştahınıza en uygun getiri-risk dengesini kurarak sermayenizi korur.',
            },
          ],
        },
        closingMessage: 'Veri, yeni petroldür; ancak işlenmediği sürece yakıta dönüşmez. Ben, ham veriyi stratejik zekaya dönüştürerek belirsiz piyasalarda rotanızı çizmenize yardımcı oluyorum.',
      },
      section2: {
        num: '02.',
        title: 'Yapay Zeka ve Metin Analizi Çözümleri',
        arch: 'Dil Modelleri • Duygu Analizi • Akıllı Belge İşleme',
        desc1: 'RoBERTa ve BERT gibi son teknoloji yapay zeka modellerini kullanarak metinlerden değerli bilgiler çıkarıyorum. Finansal raporlar, haberler, sosyal medya paylaşımları ve şirket duyurularını analiz ediyorum.',
        desc2: 'ImpactScope için geliştirdiğim "yeşil yıkama" tespit sistemi bu alandaki uzmanlığımı gösteriyor: Yapay zeka ile şirketlerin sürdürülebilirlik iddialarını analiz ederek manuel inceleme süresini %80 azalttım.',
        features: ['Metin Duygu Analizi', 'Sürdürülebilirlik Risk Tespiti', 'Otomatik Belge Özetleme', 'Akıllı Sohbet Botları'],
        expandedDesc: 'AI Destekli Metin Analizi (NLP), yapılandırılmamış veri yığınlarını (e-postalar, raporlar, haberler) anlamlı ve yönetilebilir bilgilere dönüştürme teknolojisidir. Yapay zeka, insan dilinin karmaşıklığını, nüanslarını ve bağlamını anlama yeteneğini, makinelerin süper işlem hızıyla birleştirir.\n\nBu teknoloji, şirketinizin sahip olduğu ancak kullanamadığı devasa bilgi havuzunu (Dark Data) işleyerek, manuel olarak aylar sürecek analizleri saniyeler içinde tamamlar. Biz, kelimeleri sadece "okumuyoruz"; satır aralarını analiz ederek stratejik kararlarınız için gerekli olan "büyük resmi" ortaya çıkarıyoruz.',
        useCases: {
          title: 'Kullanım Senaryoları',
          scenarios: [
            {
              title: 'Due Diligence (Durum Tespiti) ve Sözleşme Analizi',
              problem: 'Birleşme ve satın alma süreçlerinde (M&A) veya büyük yatırımlarda, binlerce sayfalık yasal ve finansal belgenin incelenmesi gerekir.',
              solution: 'NLP modellerimiz, binlerce sözleşmeyi saniyeler içinde tarar; kritik maddeleri, gizli riskleri, vade tarihlerini ve standart dışı yükümlülükleri otomatik olarak işaretler.',
              benefit: 'Hukuki inceleme maliyetlerini %70\'e varan oranlarda düşürür ve insan hatasından kaynaklı gözden kaçan riskleri minimize eder.',
            },
            {
              title: 'Marka İtibarı ve Piyasa Duyarlılığı (Sentiment Analysis)',
              problem: 'Müşterilerin veya piyasanın markanız hakkında ne düşündüğünü anlamak, binlerce tweet veya haberi okumayı gerektirir.',
              solution: 'Sistemlerimiz, sosyal medya, haber siteleri ve forumlardaki on binlerce yorumu analiz ederek, sadece "olumlu/olumsuz" ayrımı yapmaz; şikayetlerin kök nedenlerini (fiyat, kalite, müşteri hizmetleri) kategorize eder.',
              benefit: 'Krizleri büyümeden tespit etmenizi ve müşteri memnuniyetsizliğine proaktif müdahale etmenizi sağlar.',
            },
            {
              title: 'Otomatik Bilgi Çıkarımı ve Sınıflandırma (IE)',
              problem: 'Gelen faturalar, CV\'ler veya müşteri talep formları gibi dokümanların manuel olarak sisteme girilmesi zaman kaybıdır.',
              solution: 'Yapay zeka, PDF\'ler veya taranmış görseller (OCR + NLP) içindeki isim, tarih, tutar, IBAN gibi kritik verileri otomatik olarak çeker ve veritabanınıza işler.',
              benefit: 'Operasyonel verimliliği artırır ve nitelikli çalışanlarınızın veri girişi yerine katma değerli işlere odaklanmasını sağlar.',
            },
            {
              title: 'Greenwashing ve Uyumluluk Denetimi (Sizin Uzmanlığınız)',
              problem: 'Kurumsal sürdürülebilirlik raporlarının doğruluğunu ve tutarlılığını manuel olarak denetlemek zordur.',
              solution: 'Geliştirdiğimiz özel transformer modelleri, kurumsal iletişimdeki abartılı, belirsiz veya çelişkili ifadeleri (greenwashing sinyalleri) tespit eder.',
              benefit: 'Yatırımcılar için şeffaflık sağlar, şirketler için ise regülasyonlara uyum sürecini hızlandırır.',
            },
          ],
        },
        closingMessage: 'İş dünyasında bilgi güçtür, ancak sadece erişilebilir olduğunda. Biz, metinlerin içine hapsolmuş veriyi özgürleştiriyor ve işletmenizi daha akıllı, daha hızlı ve daha öngörülü hale getiriyoruz.',
      },
      section3: {
        num: '03.',
        title: 'İş Zekası ve Görsel Raporlama',
        arch: 'PowerBI • Python Uygulamaları • Anlık Veri Takibi',
        desc1: 'Ham veriler doğru görselleştirilmeden anlam ifade etmez. Karmaşık veri kümelerini herkesin anlayabileceği panolara dönüştürerek hızlı ve doğru kararlar almanızı sağlıyorum.',
        desc2: 'Üst yönetim için özet göstergelerden detaylı operasyonel raporlara kadar, her panoyu sizin ihtiyaçlarınıza göre özelleştiriyorum.',
        features: ['Yönetici Panoları', 'Otomatik Rapor Sistemleri', 'Veri Deposu Tasarımı', 'Özel Görsel Çözümler'],
        expandedDesc: 'İş Zekası (Business Intelligence), şirketinizin farklı departmanlarına dağılmış veri parçalarını toplayıp, onları "Tek Bir Hakikat Kaynağına" (Single Source of Truth) dönüştürme sürecidir.\n\nBiz, veriyi statik ve yönetimi zor Excel dosyalarından kurtarıp, yaşayan ve nefes alan dinamik panolara taşıyoruz. Bu sadece "güzel raporlar" almakla ilgili değildir; bu, şirketinizin geçmişini ve bugününü röntgen hassasiyetinde görerek, kurumsal körlüğü ortadan kaldırmakla ilgilidir. BI, size sadece "ne kadar sattığınızı" söylemez; "neden orada sattığınızı" ve "kârlılığın nereden geldiğini" gösterir.',
        useCases: {
          title: 'Kullanım Senaryoları',
          scenarios: [
            {
              title: 'Gerçek Zamanlı Performans Takibi (Excel Kaosundan Kaçış)',
              problem: 'Ay sonu raporlarını beklemek, verileri Excel\'de manuel olarak birleştirmek ve formül hatalarıyla uğraşmak, karar alma hızınızı yavaşlatır.',
              solution: 'Tüm satış, pazarlama ve finans verilerinizi tek bir canlı ekrana (dashboard) entegre ediyoruz. Veriler manuel girişle değil, otomatik API bağlantılarıyla güncellenir.',
              benefit: 'Şirketin nabzını anlık olarak tutar, ay sonunu beklemeden rotanızı düzeltebilirsiniz. "Veri hazırlamakla" değil, "karar vermekle" zaman harcarsınız.',
            },
            {
              title: 'Kârlılık ve Bölgesel Analiz (Derinlemesine Bakış)',
              problem: 'Toplam cironun arttığını görüyorsunuz ama hangi bölgenin veya ürünün aslında kâr marjınızı erittiğini göremiyorsunuz.',
              solution: 'İnteraktif haritalar ve kırılımlı (drill-down) analizlerle, genel tablodan en küçük mağaza veya ürün detayına kadar inebilirsiniz.',
              benefit: 'Hangi bölgenin pazarlama desteğine ihtiyacı olduğunu veya hangi ürünün stok maliyeti yarattığını tespit ederek kaynaklarınızı verimli kullanırsınız.',
            },
            {
              title: 'Çapraz Departman Entegrasyonu (Silo Yıkıcı)',
              problem: 'Pazarlama departmanı reklam harcamalarını artırırken, depo stoklarının yetersiz olduğundan habersiz olabilir.',
              solution: 'BI, departmanlar arası duvarları yıkar. Pazarlama verileri ile stok verilerini aynı grafikte görselleştirerek korelasyonları ortaya koyar.',
              benefit: 'Operasyonel darboğazları oluşmadan öngörür, departmanların birbirinden habersiz değil, senkronize çalışmasını sağlar.',
            },
            {
              title: 'Müşteri Segmentasyonu ve Sadakat Analizi',
              problem: '"En iyi müşterilerimiz kimler?" sorusuna sadece ciro bazlı cevap vermek yanıltıcı olabilir.',
              solution: 'Müşteri davranışlarını; satın alma sıklığı, sepet tutarı ve ödeme düzeni gibi metriklerle görselleştirerek en değerli müşteri segmentlerini belirleriz.',
              benefit: 'Pazarlama bütçenizi herkese değil, dönüşüm oranı en yüksek kitleye odaklamanızı sağlar.',
            },
          ],
        },
        closingMessage: 'Karanlıkta araba kullanmayı bırakın. İş Zekası çözümlerimizle, şirketinizin verilerini dikiz aynasına değil, güçlü bir navigasyon sistemine dönüştürüyoruz.',
      },
      section4: {
        num: '04.',
        title: 'Finansal Danışmanlık',
        arch: 'Uluslararası Yatırım • Yasal Uyum • Strateji Geliştirme',
        desc1: 'Alvolo Consulting\'in kurucusu olarak, İtalya ve uluslararası pazarlar arasında köprü kuran danışmanlık hizmetleri sunuyorum. Karmaşık yasal süreçlerde rehberlik etmekten yatırım yapılarını optimize etmeye kadar geniş bir yelpazede destek sağlıyorum.',
        desc2: 'Teknik bilgiyi iş dünyası deneyimiyle birleştirerek, müşterilerime sadece verilerin ne söylediğini değil, nasıl harekete geçmeleri gerektiğini de gösteriyorum.',
        features: ['Uluslararası Yatırım Danışmanlığı', 'İtalya Finans Sistemi Rehberliği', 'Yasal Uyum Desteği', 'Finansal Strateji Planlaması'],
        expandedDesc: 'Sınır Ötesi Finansal Danışmanlık, bilmediğiniz sularda size rehberlik eden stratejik bir pusuladır. Farklı bir ülkede iş yapmak; sadece sermaye değil, o ülkenin mevzuatına, vergi sistemine ve iş kültürüne hakimiyet gerektirir.\n\nAlvolo Consulting\'in Kurucusu olarak, Türkiye ve İtalya ticaret koridorunda işletmelere uçtan uca rehberlik ediyorum. Dil bariyerlerini, karmaşık bürokrasiyi ve kültürel farkları sizin adınıza yöneterek, yatırım sürecinizi "sorun çözme" modundan "değer yaratma" moduna taşıyorum. İtalya pazarında şirketleşmek, yatırım yapmak veya vergi avantajlarından yararlanmak isteyenler için yerel bir ortak gibi çalışıyorum.',
        useCases: {
          title: 'Kullanım Senaryoları',
          scenarios: [
            {
              title: 'Anahtar Teslim Şirket Kuruluşu ve Pazar Girişi',
              problem: 'İtalya\'da şirket kurmak; noter işlemleri, vergi dairesi kayıtları ve banka hesap açılışları gibi karmaşık ve çok dilli bir bürokrasi içerir.',
              solution: 'Şirket türünün belirlenmesinden (S.r.l, S.p.A vb.) tescil işlemlerinin tamamlanmasına kadar tüm süreci yönetiyoruz.',
              benefit: 'Siz iş planınıza odaklanırken, biz yasal altyapıyı hatasız bir şekilde kurarak zaman ve maliyet kaybını önleriz.',
            },
            {
              title: 'Vergi Optimizasyonu ve Teşvik Danışmanlığı',
              problem: 'İtalya ve Türkiye arasındaki Çifte Vergilendirmeyi Önleme Anlaşmaları ve yerel teşvikler (Örn: AR-GE teşvikleri, Start-up vizeleri) karmaşıktır.',
              solution: 'İş modelinize en uygun vergi yapısını kurguluyor, yararlanabileceğiniz devlet teşviklerini ve hibeleri belirliyoruz.',
              benefit: 'Yasal çerçevede vergi yükünüzü minimize ederken, işletme sermayenizi devlet destekleriyle güçlendirmenizi sağlar.',
            },
            {
              title: 'Kültürel ve Ticari Müzakere Yönetimi',
              problem: 'İtalyan iş kültüründe güven, ilişkiler ve iletişim tarzı, en az sözleşmeler kadar önemlidir. Yanlış bir iletişim, masadaki anlaşmayı bozabilir.',
              solution: 'Sadece dili değil, iş yapış biçimini de tercüme ediyoruz. Yerel tedarikçiler, bankalar veya ortaklarla yapılan görüşmelerde kültürel köprü kuruyoruz.',
              benefit: 'Yanlış anlaşılmaları ortadan kaldırır, yerel paydaşlarla güvene dayalı, uzun vadeli ticari ilişkiler kurmanızı sağlar.',
            },
            {
              title: 'Gayrimenkul ve Varlık Yönetimi Yatırımları',
              problem: 'İtalya\'da yatırım amaçlı mülk alımı veya varlık yönetimi, karmaşık tapu ve veraset yasalarına tabidir.',
              solution: 'Yatırım geri dönüş (ROI) hesaplamalarından tapu devir işlemlerine kadar uçtan uca finansal ve hukuki destek sunuyoruz.',
              benefit: 'Yatırımlarınızın hukuki güvenliğini sağlar ve İtalya\'daki varlıklarınızın değerini korur.',
            },
          ],
        },
        closingMessage: 'İtalya\'da iş yapmak için İtalyanca bilmenize gerek yok; işin dilini bilen bir ortağa ihtiyacınız var. Alvolo Consulting ile sınırları kaldırıyor, Türkiye ve İtalya arasındaki ticaret yolunu sizin için kısaltıyoruz.',
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
      keyCapabilities: 'Temel Yetenekler',
      viewDetails: 'Detayları Gör',
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
      ctaTitle: 'Pronto a trasformare i vostri dati in insight?',
      ctaDesc: 'Che tu abbia bisogno di analisi finanziaria, soluzioni AI o consulenza strategica—parliamo di come possiamo lavorare insieme.',
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
      ctaTitle: 'Interessato a lavorare insieme?',
      ctaDesc: 'Che tu abbia bisogno di competenze in data science, consulenza finanziaria o soluzioni AI—parliamo del vostro progetto.',
      ctaButton: 'Contattami',
      educationData: [
        {
          school: "Università Bocconi", 
          degree: "Laurea Magistrale in Data Science and Business Analytics",
          location: "Milano, Italia",
          period: "2023 - 2025",
          coursework: ["Deep Learning per Computer Vision", "Simulazione e Modellazione", "Elaborazione del Linguaggio Naturale"],
          thesis: "Rilevamento Verificabile del Rischio di Greenwashing nelle Comunicazioni Aziendali"
        },
        {
          school: "Università Bocconi",
          degree: "Laurea Triennale in Economia, Management e Informatica",
          location: "Milano, Italia",
          period: "2020 - 2023",
          coursework: ["Econometria", "Big Data e Database", "Programmazione", "Diritto Informatico", "Machine Learning"],
          thesis: "Studio delle Tecniche Predittive per le Elezioni Parlamentari: Caso Studio del Parlamento Turco"
        }
      ],
      experienceData: [
        {
          company: "IMPACTSCOPE",
          role: "Specialista AI | Ricercatore NLP",
          location: "Remoto, Svizzera",
          period: "Dicembre 2024 - Dicembre 2025",
          highlights: [
            "Sviluppato prodotto dati tramite fine-tuning di RoBERTa per segnalare il rischio di greenwashing, riducendo i tempi di revisione manuale dell'80%",
            "Sviluppato indice di contraddizione semantica (SCI) utilizzando rilevamento di posizione e deriva del sentiment",
            "Confrontato punteggi di rischio ESG basati sul sentiment con storiche controversie di greenwashing"
          ]
        },
        {
          company: "ALVOLO CONSULTING",
          role: "Fondatore",
          location: "Milano, Italia",
          period: "Marzo 2025 - Novembre 2025",
          highlights: [
            "Fondato hub di consulenza finanziaria in Italia aiutando i clienti a raggiungere i loro obiettivi finanziari",
            "Padroneggiato il sistema finanziario italiano per fornire informazioni e guida accurate",
            "Gestito l'intero ciclo di vita del cliente dall'acquisizione alla fidelizzazione"
          ]
        },
        {
          company: "FEDRIGONI SPA",
          role: "Junior Data Scientist",
          location: "Milano, Italia",
          period: "Aprile 2024 - Ottobre 2024",
          highlights: [
            "Sviluppato algoritmi di serie temporali e modelli predittivi personalizzati utilizzando LSTM",
            "Sviluppato modello AI personalizzato incorporando modelli non supervisionati e NLP per ottimizzare i prezzi",
            "Utilizzato Knime e PowerBI per sviluppare nuovi prototipi analitici"
          ]
        },
        {
          company: "N26 BANK AG",
          role: "Stagista Risk Management",
          location: "Berlino, Germania",
          period: "Novembre 2022 - Febbraio 2023",
          highlights: [
            "Supportato il Sistema di Controllo Interno (ICS), database perdite, registro rischi e reporting",
            "Interagito con stakeholder supportando il New Product Process (NPP)",
            "Aiutato nell'identificazione, valutazione, mitigazione e monitoraggio dei rischi non finanziari"
          ]
        }
      ],
      languageData: [
        { lang: "Turco", level: "Madrelingua" },
        { lang: "Inglese", level: "Madrelingua" },
        { lang: "Italiano", level: "Avanzato (C1)" },
        { lang: "Tedesco", level: "Intermedio (B1)" }
      ],
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
        expandedDesc: 'L\'analisi dei dati finanziari è l\'arte di trovare ordine nel caos dei mercati. Proprio come i modelli meteorologici avanzati tracciano i cambiamenti di pressione nell\'atmosfera per prevedere le tempeste in anticipo; noi analizziamo dati storici, sentiment di mercato e segnali visivi per modellare il clima finanziario.\n\nLa soluzione che offro elabora algoritmi matematici complessi e dataset multistrato (testo, immagine, dati numerici) per "separare il segnale dal rumore". Il mio obiettivo non è sommergervi con i dati; è fornire la bussola che trasformerà questi calcoli complessi in decisioni di investimento chiare, strategiche e redditizie.',
        useCases: {
          title: 'Casi d\'Uso',
          scenarios: [
            {
              title: 'Analisi di Notizie e Sentiment (NLP per il Polso del Mercato)',
              scenario: 'I mercati si muovono non solo con i numeri, ma con le notizie.',
              solution: 'I miei modelli NLP scansionano verbali delle banche centrali, dichiarazioni dei CEO o decine di migliaia di titoli di notizie in secondi, misurando il "sentiment" del mercato.',
              benefit: 'Fornisce un allarme precoce rilevando onde di notizie negative su un titolo prima che inizi a scendere.',
            },
            {
              title: 'Analisi Dati Finanziari Interni & Business Intelligence',
              scenario: 'La vostra azienda genera enormi quantità di dati finanziari quotidianamente—vendite, spese, flusso di cassa, inventario—ma estrarre insight azionabili da questi dati richiede competenza specializzata in data science.',
              solution: 'Applico analisi avanzate e machine learning ai vostri dati finanziari interni, costruendo modelli predittivi per la previsione dei ricavi, l\'ottimizzazione dei costi e la gestione del flusso di cassa. Dall\'identificazione di pattern di spesa al rilevamento di anomalie, trasformo i vostri dati finanziari in intelligence strategica.',
              benefit: 'Consente il processo decisionale basato sui dati rivelando pattern nascosti nelle vostre operazioni finanziarie, ottimizzando i costi e migliorando la redditività attraverso insight predittivi.',
            },
            {
              title: 'Computer Vision per l\'Analisi di "Dati Alternativi"',
              scenario: 'Come si misura la performance di una catena di vendita al dettaglio o di una fabbrica prima che vengano pubblicati i bilanci?',
              solution: 'Algoritmi che elaborano immagini satellitari contano i tassi di occupazione dei parcheggi dei negozi al dettaglio o analizzano l\'attività di movimento dei container nei porti.',
              benefit: 'Ottenete indicatori anticipatori sulla performance operativa di un\'azienda mesi prima che vengano pubblicati i rapporti finanziari ufficiali.',
            },
            {
              title: 'Gestione del Rischio Algoritmica e Ottimizzazione del Portafoglio',
              scenario: 'Sapere quali asset sono correlati tra loro e dove si nascondono i rischi nascosti.',
              solution: 'Modelli di deep learning che simulano movimenti di prezzo storici e volatilità testano come il vostro portafoglio sarebbe influenzato in scenari di "Cigno Nero" (crisi inaspettata).',
              benefit: 'Protegge il vostro capitale stabilendo l\'equilibrio rendimento-rischio più adatto alla vostra propensione al rischio.',
            },
          ],
        },
        closingMessage: 'I dati sono il nuovo petrolio; ma non si trasformano in carburante finché non vengono elaborati. Vi aiuto a tracciare la vostra rotta in mercati incerti trasformando dati grezzi in intelligence strategica.',
      },
      section2: {
        num: '02.',
        title: 'Soluzioni NLP & AI',
        arch: 'Modelli Transformer • Analisi Sentiment • Document Intelligence',
        desc1: 'Sfruttando architetture NLP all\'avanguardia come RoBERTa e BERT, sviluppo soluzioni personalizzate per estrarre insight da testo non strutturato—report finanziari, feed di notizie, social media e comunicazioni aziendali.',
        desc2: 'Il mio sistema di rilevamento del greenwashing, costruito per ImpactScope, dimostra questa capacità: transformer ottimizzati analizzano le dichiarazioni di sostenibilità, riducendo i tempi di revisione manuale dell\'80% attraverso un Indice di Contraddizione Semantica proprietario.',
        features: ['Classificazione Sentiment Personalizzata', 'Rilevamento Rischio ESG & Greenwashing', 'Riassunto & Estrazione Documenti', 'Chatbot & Automazione Intelligente'],
        expandedDesc: 'L\'Analisi del Testo Assistita dall\'AI (NLP) è la tecnologia che trasforma pile di dati non strutturati (email, report, notizie) in informazioni significative e gestibili. L\'intelligenza artificiale combina la capacità di comprendere la complessità, le sfumature e il contesto del linguaggio umano con la super velocità di elaborazione delle macchine.\n\nQuesta tecnologia elabora l\'enorme pool di informazioni (Dark Data) che la vostra azienda possiede ma non può utilizzare, completando analisi che richiederebbero mesi manualmente in pochi secondi. Noi non "leggiamo" semplicemente le parole; analizziamo tra le righe per rivelare il "quadro generale" necessario per le vostre decisioni strategiche.',
        useCases: {
          title: 'Casi d\'Uso',
          scenarios: [
            {
              title: 'Due Diligence & Analisi Contratti',
              problem: 'Nei processi di fusione e acquisizione (M&A) o negli investimenti importanti, migliaia di pagine di documenti legali e finanziari devono essere esaminate.',
              solution: 'I nostri modelli NLP scansionano migliaia di contratti in secondi; segnalando automaticamente clausole critiche, rischi nascosti, date di scadenza e obblighi non standard.',
              benefit: 'Riduce i costi di revisione legale fino al 70% e minimizza i rischi trascurati a causa di errori umani.',
            },
            {
              title: 'Reputazione del Brand & Analisi Sentiment di Mercato',
              problem: 'Comprendere cosa pensano i clienti o il mercato del vostro brand richiede la lettura di migliaia di tweet o articoli di notizie.',
              solution: 'I nostri sistemi analizzano decine di migliaia di commenti su social media, siti di notizie e forum, non solo facendo distinzioni "positive/negative"; categorizzano le cause alla radice dei reclami (prezzo, qualità, servizio clienti).',
              benefit: 'Vi consente di rilevare le crisi prima che crescano e intervenire proattivamente nell\'insoddisfazione del cliente.',
            },
            {
              title: 'Estrazione Automatica delle Informazioni & Classificazione',
              problem: 'Inserire manualmente documenti come fatture in arrivo, CV o moduli di richiesta clienti nel sistema è una perdita di tempo.',
              solution: 'L\'AI estrae automaticamente dati critici come nomi, date, importi, IBAN da PDF o immagini scansionate (OCR + NLP) e li elabora nel vostro database.',
              benefit: 'Aumenta l\'efficienza operativa e consente ai vostri dipendenti qualificati di concentrarsi su lavori a valore aggiunto invece che sull\'inserimento dati.',
            },
            {
              title: 'Greenwashing & Audit di Conformità (Vostra Competenza)',
              problem: 'Auditare manualmente l\'accuratezza e la coerenza dei report di sostenibilità aziendale è difficile.',
              solution: 'I nostri modelli transformer personalizzati rilevano dichiarazioni esagerate, ambigue o contraddittorie (segnali di greenwashing) nelle comunicazioni aziendali.',
              benefit: 'Fornisce trasparenza per gli investitori e accelera il processo di conformità per le aziende.',
            },
          ],
        },
        closingMessage: 'Nel business, l\'informazione è potere, ma solo quando è accessibile. Noi liberiamo i dati intrappolati nei testi e rendiamo la vostra azienda più intelligente, più veloce e più predittiva.',
      },
      section3: {
        num: '03.',
        title: 'Business Intelligence & Dashboard',
        arch: 'PowerBI • Python Personalizzato • Analisi Real-Time',
        desc1: 'I dati grezzi non significano nulla senza una corretta visualizzazione e storytelling. Progetto soluzioni BI end-to-end che trasformano dataset complessi in dashboard intuitive, permettendo agli stakeholder di prendere decisioni informate a colpo d\'occhio.',
        desc2: 'Dal tracking KPI a livello esecutivo ai drill-down operativi, ogni dashboard è personalizzata sul vostro specifico contesto aziendale, integrando multiple fonti dati e fornendo insight in tempo reale.',
        features: ['Dashboard KPI Esecutive', 'Pipeline di Reporting Automatizzate', 'Design Data Warehouse', 'Sviluppo Visualizzazione Personalizzata'],
        expandedDesc: 'La Business Intelligence (BI) è il processo di raccogliere frammenti di dati sparsi tra i diversi dipartimenti della vostra azienda e trasformarli in una "Fonte Unica di Verità" (Single Source of Truth).\n\nNoi liberiamo i dati da file Excel statici e difficili da gestire, spostandoli su dashboard dinamiche vive e funzionanti. Non si tratta solo di ottenere "report belli"; si tratta di eliminare la cecità aziendale vedendo il passato e il presente della vostra azienda con precisione radiografica. La BI non vi dice solo "quanto avete venduto"; vi mostra "perché avete venduto lì" e "da dove proviene la redditività".',
        useCases: {
          title: 'Casi d\'Uso',
          scenarios: [
            {
              title: 'Monitoraggio Performance Real-Time (Fuga dal Caos Excel)',
              problem: 'Aspettare i report di fine mese, unire manualmente i dati in Excel e affrontare errori di formula rallenta la velocità delle vostre decisioni.',
              solution: 'Integriamo tutti i vostri dati di vendita, marketing e finanza in un\'unica schermata live (dashboard). I dati vengono aggiornati tramite connessioni API automatiche, non inserimento manuale.',
              benefit: 'Mantiene il polso della vostra azienda in tempo reale, permettendovi di correggere la rotta senza aspettare la fine del mese. Passate tempo "prendendo decisioni" piuttosto che "preparando dati".',
            },
            {
              title: 'Analisi Redditività & Regionale (Approfondimento)',
              problem: 'Vedete il fatturato totale aumentare, ma non riuscite a vedere quale regione o prodotto sta effettivamente erodendo il vostro margine di profitto.',
              solution: 'Con mappe interattive e analisi drill-down, potete scendere dalla tabella generale fino al dettaglio del negozio o prodotto più piccolo.',
              benefit: 'Utilizzate le vostre risorse in modo efficiente identificando quale regione ha bisogno di supporto marketing o quale prodotto sta creando costi di inventario.',
            },
            {
              title: 'Integrazione Cross-Dipartimentale (Demolitore di Silos)',
              problem: 'Mentre il dipartimento marketing aumenta la spesa pubblicitaria, potrebbe essere inconsapevole che le scorte del magazzino sono insufficienti.',
              solution: 'La BI abbatte i muri tra i dipartimenti. Rivela correlazioni visualizzando dati di marketing e dati di inventario nello stesso grafico.',
              benefit: 'Predice i colli di bottiglia operativi prima che si formino, assicurando che i dipartimenti lavorino in sincronia piuttosto che isolati l\'uno dall\'altro.',
            },
            {
              title: 'Segmentazione Clienti & Analisi Fedeltà',
              problem: 'Rispondere a "Chi sono i nostri migliori clienti?" basandosi solo sul fatturato può essere fuorviante.',
              solution: 'Identifichiamo i segmenti di clienti più preziosi visualizzando il comportamento dei clienti attraverso metriche come frequenza di acquisto, valore del carrello e pattern di pagamento.',
              benefit: 'Vi consente di concentrare il vostro budget marketing sul pubblico con il tasso di conversione più alto, non su tutti.',
            },
          ],
        },
        closingMessage: 'Smettete di guidare al buio. Con le nostre soluzioni di Business Intelligence, trasformiamo i dati della vostra azienda da uno specchietto retrovisore in un potente sistema di navigazione.',
      },
      section4: {
        num: '04.',
        title: 'Consulenza Finanziaria',
        arch: 'Advisory Transfrontaliera • Conformità Normativa • Pianificazione Strategica',
        desc1: 'Come fondatore di Alvolo Consulting, fornisco servizi di consulenza finanziaria completi che collegano mercati italiani e internazionali. Dalla navigazione di ambienti normativi complessi all\'ottimizzazione di strutture di investimento transfrontaliere.',
        desc2: 'Il mio approccio consulenziale combina profonda competenza tecnica con acume commerciale pratico, aiutando i clienti a capire non solo cosa mostrano i dati, ma come agire strategicamente.',
        features: ['Advisory Investimenti Transfrontalieri', 'Navigazione Sistema Finanziario Italiano', 'Guida Conformità Normativa', 'Pianificazione Finanziaria Strategica'],
        expandedDesc: 'La Consulenza Finanziaria Transfrontaliera è una bussola strategica che vi guida in acque sconosciute. Fare business in un paese diverso richiede non solo capitale, ma padronanza delle normative, del sistema fiscale e della cultura aziendale di quel paese.\n\nCome Fondatore di Alvolo Consulting, fornisco guida end-to-end alle aziende nel corridoio commerciale Turchia-Italia. Gestendo barriere linguistiche, burocrazia complessa e differenze culturali per vostro conto, sposto il vostro processo di investimento dalla modalità "risoluzione problemi" alla modalità "creazione di valore". Per coloro che vogliono incorporare, investire o beneficiare di vantaggi fiscali nel mercato italiano, lavoro come un partner locale.',
        useCases: {
          title: 'Casi d\'Uso',
          scenarios: [
            {
              title: 'Costituzione Aziendale Chiavi in Mano & Ingresso nel Mercato',
              problem: 'Costituire un\'azienda in Italia comporta una burocrazia complessa e multilingue che include procedure notarili, registrazioni presso l\'ufficio fiscale e aperture di conti bancari.',
              solution: 'Gestiamo l\'intero processo dalla determinazione del tipo di azienda (S.r.l, S.p.A, ecc.) al completamento delle procedure di registrazione.',
              benefit: 'Mentre vi concentrate sul vostro business plan, noi configuriamo l\'infrastruttura legale senza errori, prevenendo perdite di tempo e costi.',
            },
            {
              title: 'Ottimizzazione Fiscale & Consulenza Incentivi',
              problem: 'Gli Accordi di Prevenzione della Doppia Imposizione tra Italia e Turchia e gli incentivi locali (es. incentivi R&S, visti Start-up) sono complessi.',
              solution: 'Strutturiamo il quadro fiscale più adatto al vostro modello di business e identifichiamo incentivi governativi e sovvenzioni di cui potete beneficiare.',
              benefit: 'Minimizza il vostro onere fiscale nel quadro legale rafforzando il vostro capitale operativo con il supporto governativo.',
            },
            {
              title: 'Gestione Negoziazioni Culturali & Commerciali',
              problem: 'Nella cultura aziendale italiana, fiducia, relazioni e stile di comunicazione sono importanti quanto i contratti. Una comunicazione sbagliata può rompere l\'accordo sul tavolo.',
              solution: 'Traduciamo non solo la lingua, ma anche il modo di fare business. Costruiamo ponti culturali negli incontri con fornitori locali, banche o partner.',
              benefit: 'Elimina malintesi e vi consente di costruire relazioni commerciali a lungo termine basate sulla fiducia con gli stakeholder locali.',
            },
            {
              title: 'Investimenti Immobiliari & Gestione Patrimoniale',
              problem: 'L\'acquisto di proprietà per investimento o la gestione patrimoniale in Italia sono soggetti a leggi complesse su proprietà e successione.',
              solution: 'Forniamo supporto finanziario e legale end-to-end dai calcoli del ritorno sull\'investimento (ROI) alle procedure di trasferimento della proprietà.',
              benefit: 'Garantisce la sicurezza legale dei vostri investimenti e preserva il valore dei vostri asset in Italia.',
            },
          ],
        },
        closingMessage: 'Non avete bisogno di parlare italiano per fare business in Italia; avete bisogno di un partner che parla la lingua del business. Con Alvolo Consulting, rimuoviamo i confini e accorciamo la rotta commerciale tra Turchia e Italia per voi.',
      },
      processLabel: 'Processo di Engagement',
      processTitle: 'Come Lavoriamo Insieme',
      process: {
        step1Title: 'Discovery',
        step1Desc: 'Deep-dive nel vostro contesto aziendale, panorama dati e obiettivi attraverso consultazioni strutturate.',
        step2Title: 'Architettura',
        step2Desc: 'Design di specifiche tecniche, pipeline dati e architetture modello su misura per i vostri requisiti.',
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
      ctaTitle: 'Pronto a Trasformare i Vostri Dati?',
      ctaDesc: 'Discutiamo come data science e competenza finanziaria possono far progredire il vostro business.',
      ctaButton: 'Inizia una Conversazione',
      keyCapabilities: 'Capacità Chiave',
      viewDetails: 'Vedi Dettagli',
    },
  },
};

export function getTranslation(locale: Locale): TranslationType {
  return translations[locale] || translations.en;
}
