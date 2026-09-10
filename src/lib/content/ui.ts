import type { Locale } from '../translations';
import type { Maturity } from './case-studies';

/**
 * UI vocabulary for the surfaces this redesign adds or rebuilds: navigation,
 * the home page, the evidence library, the contact journey and the demo
 * portal.
 *
 * It sits beside the existing `translations.ts` rather than inside it because
 * that file is a page-shaped object built for the old information architecture
 * (`methodologyPage.section1.useCases.scenarios[]`), and the new surfaces are
 * component-shaped. Both are exported through `getTranslation`/`getUI` and
 * neither is allowed to hold a fact — facts live in `profile.ts`,
 * `evidence.ts` and `case-studies.ts`.
 *
 * Every key here exists in all three locales. `scripts/check-i18n.mjs` fails
 * the build if that stops being true, which is the fallback policy: there is no
 * silent English leak, because there is no gap to leak through.
 */

export interface UIStrings {
  nav: {
    /** Landmark label for the top bar. */
    mainLabel: string;
    /** The home page: the shelf itself. */
    shelf: string;
    /** The seven volumes, behind one disclosure. */
    volumes: string;
    /** The argument the shelf rests on, read as pages. Not a volume. */
    frontMatter: string;
    contact: string;
    primaryCta: string;
    menu: string;
    closeMenu: string;
    language: string;
    skipToContent: string;
  };
  home: {
    /** Page title for search results. The brand is appended by the SEO helper. */
    metaTitle: string;
    heroEyebrow: string;
    heroLede: string;
    brandLine: string;
    ctaPrimary: string;
    ctaSecondary: string;
    locationLine: string;
    evidenceLabel: string;
    evidenceTitle: string;
    evidenceLede: string;
    problemsLabel: string;
    problemsTitle: string;
    problemsLede: string;
    featuredLabel: string;
    processLabel: string;
    processTitle: string;
    processLede: string;
    /** Four stages, each with the tangible thing it ends in. */
    process: { stage: string; body: string; output: string }[];
    /** The thesis: what these problems cost while they go unfixed. */
    costLabel: string;
    costTitle: string;
    costLede: string;
    costPoints: { cost: string; body: string }[];
    storyLabel: string;
    storyTitle: string;
    storyLede: string;
    storyCta: string;
    contactTitle: string;
    contactLede: string;
  };
  work: {
    readCaseStudy: string;
    sections: {
      problem: string;
      context: string;
      role: string;
      audience: string;
      data: string;
      constraints: string;
      approach: string;
      decisions: string;
      baseline: string;
      evaluation: string;
      results: string;
      deliverables: string;
      consequences: string;
      limitations: string;
      humanReview: string;
      evidence: string;
      links: string;
    };
    evidenceIntro: string;
    evidenceSource: string;
    evidenceMethod: string;
    evidenceBaseline: string;
    evidenceAsOf: string;
    evidenceLimits: string;
    noResults: string;
    relatedService: string;
    repository: string;
    report: string;
    figureLabel: string;
    nextStepTitle: string;
    nextStepLede: string;
  };
  maturity: Record<Maturity, { label: string; description: string }>;
  contact: {
    label: string;
    title: string;
    lede: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyOptional: string;
    companyPlaceholder: string;
    topicLabel: string;
    topicPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    messageHint: string;
    submit: string;
    submitting: string;
    required: string;
    invalidEmail: string;
    tooShort: string;
    tooLong: string;
    errorSummary: string;
    successTitle: string;
    successBody: string;
    failureTitle: string;
    failureBody: string;
    disabledTitle: string;
    disabledBody: string;
    whatHappensNext: string;
    nextSteps: string[];
    privacyTitle: string;
    privacyBody: string;
    directTitle: string;
    directBody: string;
    whatsappDirect: string;
    noScheduling: string;
    charactersRemaining: string;
  };
  labels: {
    /** Footer disclaimer. Applies to the whole site, not to one demo. */
    disclaimer: string;
    synthetic: string;
    syntheticHint: string;
    interactiveCalculation: string;
    interactiveHint: string;
    recordedExample: string;
    liveData: string;
  };
}

const en: UIStrings = {
  nav: {
    mainLabel: 'Main navigation',
    shelf: 'The shelf',
    volumes: 'Volumes',
    frontMatter: 'Front matter',
    contact: 'Contact',
    primaryCta: 'Discuss your project',
    menu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    skipToContent: 'Skip to content',
  },
  home: {
    metaTitle: 'Applied AI & Financial Analytics Consulting',
    heroEyebrow: 'Applied AI and financial analytics',
    heroLede:
      'I help finance and operations teams build forecasting models, automate document review, and create reporting systems they can actually use.',
    brandLine: 'Bridging the gap between code & capital',
    ctaPrimary: 'Discuss your project',
    ctaSecondary: 'Open the first volume',
    locationLine: 'Milan, Italy · working in English, Italian and Turkish',
    evidenceLabel: 'Evidence',
    evidenceTitle: 'What the work looks like when you check it',
    evidenceLede:
      'Three things I can show you rather than assert. Each links to the artefact and the numbers behind it, including where they fall short.',
    problemsLabel: 'Problems',
    problemsTitle: 'Three problems I am usually called about',
    problemsLede:
      'If one of these is the reason you are reading this page, the linked service explains how the engagement is scoped and what you would receive.',
    featuredLabel: 'Case study',
    processLabel: 'Process',
    processTitle: 'How an engagement runs',
    costLabel: 'The problem',
    costTitle: 'The expensive part is never the work. It is the delay, the rework, and the decision taken without the number.',
    costLede:
      'Every problem on the shelf above has the same shape. Something that should take an afternoon takes a week; something that should be checkable is taken on trust; and a decision that will cost real money gets made before the figure that should inform it arrives. None of that shows up as a line item, which is exactly why it persists.',
    costPoints: [
      {
        cost: 'Skilled time spent assembling, not deciding',
        body: 'A finance lead spending the first week of every month reconciling four systems is the most expensive data pipeline in the company, and the least maintained one.',
      },
      {
        cost: 'Decisions made before the number arrives',
        body: 'When the pack lands after the meeting, the decision was made on instinct and the reporting became a record of what already happened rather than an input to what happens next.',
      },
      {
        cost: 'Numbers nobody will stand behind',
        body: 'A figure two departments compute differently is worse than no figure: it gets argued about instead of acted on, and the argument recurs every month.',
      },
      {
        cost: 'The clause found after it renewed',
        body: 'Documents read by one person, under time pressure, produce misses that surface as a cost months later — with no record of why that document was treated the way it was.',
      },
    ],
    processLede: 'Four stages, each ending in something you can hold rather than a status update.',
    process: [
      {
        stage: 'Discovery',
        body: 'We look at the actual decision and the actual data, and agree what a good outcome would be before anything is built. Often this is where a project gets smaller.',
        output: 'A written problem statement, and an honest view of whether it is worth doing.',
      },
      {
        stage: 'Bounded pilot',
        body: 'One workflow, one document type, one forecast. Small enough that finding out it does not work is a cheap answer rather than a sunk cost.',
        output: 'A working prototype and an evaluation on your own data.',
      },
      {
        stage: 'Delivery',
        body: 'The thing that survived the pilot gets built where the work actually happens, with the review step in place from the first day rather than added later.',
        output: 'The deployed workflow, its documentation, and the checks that show when it drifts.',
      },
      {
        stage: 'Handover',
        body: 'Your team runs it without me. That includes knowing how to re-evaluate it when the inputs change, because they will.',
        output: 'Documentation, the evaluation harness, and a walkthrough with whoever owns it next.',
      },
    ],
    storyLabel: 'Background',
    storyTitle: 'Why a data scientist keeps reading balance sheets',
    storyLede:
      'I trained in economics and computer science at Bocconi, worked in bank risk, shipped forecasting models on a factory floor, and spent two years teaching models to read corporate disclosures. The through-line is that a model only matters once someone has to sign off on what it says.',
    storyCta: 'Read the full background',
    contactTitle: 'What decision or workflow are you trying to improve?',
    contactLede:
      'Tell me the problem in a few sentences. I reply personally, usually within a couple of working days, and I will say plainly if it is not something I should take on.',
  },
  work: {
    readCaseStudy: 'Read the case study',
    sections: {
      problem: 'The problem',
      context: 'Context',
      role: 'My role',
      audience: 'Who it is for',
      data: 'Data provenance',
      constraints: 'Constraints',
      approach: 'Approach',
      decisions: 'Decisions that mattered',
      baseline: 'Baseline',
      evaluation: 'How it was evaluated',
      results: 'Results',
      deliverables: 'What was delivered',
      consequences: 'What it changes in practice',
      limitations: 'Limitations',
      humanReview: 'Human review',
      evidence: 'Evidence record',
      links: 'Source material',
    },
    evidenceIntro:
      'Every figure quoted above, with its source and what it does not tell you.',
    evidenceSource: 'Source',
    evidenceMethod: 'Method',
    evidenceBaseline: 'Compared with',
    evidenceAsOf: 'As of',
    evidenceLimits: 'Limitations',
    noResults: 'No performance figure is published for this project, so none is claimed.',
    relatedService: 'Related service',
    repository: 'Repository',
    report: 'Performance report',
    figureLabel: 'Figure',
    nextStepTitle: 'Have a problem shaped like this?',
    nextStepLede: 'Tell me what you are trying to decide and I will tell you whether this approach fits.',
  },
  maturity: {
    research: {
      label: 'Research',
      description: 'Investigative work with a published artefact. Not deployed, and not in use by anyone.',
    },
    prototype: {
      label: 'Prototype',
      description: 'Built to test whether an approach works. Not hardened for regular use.',
    },
    'internal-deployment': {
      label: 'Internal deployment',
      description: 'Running inside an organisation for its own staff.',
    },
    'client-engagement': {
      label: 'Client engagement',
      description: 'Commissioned and delivered for a client.',
    },
    'maintained-product': {
      label: 'Maintained product',
      description: 'In continuous use and actively maintained.',
    },
    'synthetic-demo': {
      label: 'Synthetic demonstration',
      description:
        'Built for this site on invented data to show a method. Not an engagement, not a client result, and not in use by anyone.',
    },
  },
  contact: {
    label: 'Contact',
    title: 'What decision or workflow are you trying to improve?',
    lede:
      'A few sentences is enough to start. I reply personally, and I will say plainly if your problem is better served by someone else.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@company.com',
    companyLabel: 'Company',
    companyOptional: 'optional',
    companyPlaceholder: 'Where you work',
    topicLabel: 'What is this about?',
    topicPlaceholder: 'Select a topic',
    messageLabel: 'What are you trying to improve?',
    messagePlaceholder:
      'For example: our monthly reporting is assembled by hand from four systems and takes a week, and nobody trusts the numbers by the time it lands.',
    messageHint: 'The problem, roughly. No need to prepare a brief.',
    submit: 'Send inquiry',
    submitting: 'Sending…',
    required: 'This field is required',
    invalidEmail: 'Enter an email address that can receive a reply',
    tooShort: 'A sentence or two, so I know what you need',
    tooLong: 'Please shorten this a little',
    errorSummary: 'Your message has not been sent. Please check the fields marked below.',
    successTitle: 'Received',
    successBody:
      'Your inquiry reached my inbox. I read these myself and reply to the address you gave, usually within a couple of working days.',
    failureTitle: 'That did not go through',
    failureBody:
      'Nothing was sent. Your message is still in the form — you can try again, or email it directly using the address below.',
    disabledTitle: 'Start a conversation by email',
    disabledBody:
      'The inquiry form is currently unavailable. Send me a few sentences about your project by email; your message reaches me directly.',
    whatHappensNext: 'What happens next',
    nextSteps: [
      'I read your message myself. Nothing is routed through an assistant or an autoresponder.',
      'You get a reply at the address you gave — normally within two working days — saying whether I think I can help.',
      'If it looks like a fit, we spend thirty minutes on the actual problem before anyone discusses scope or a proposal.',
    ],
    privacyTitle: 'What happens to what you send',
    privacyBody:
      'Your name, email, company and message are sent to my email provider so I can reply, and are kept in that inbox. They are not added to a mailing list, not passed to anyone else, and the contents are never sent to analytics. Ask at any time and I will delete the thread.',
    directTitle: 'Or reach me directly',
    directBody: 'If a form is not how you want to start, either of these reaches me.',
    whatsappDirect: 'WhatsApp',
    noScheduling:
      'There is no calendar link here on purpose: I do not keep a public booking calendar, so a time gets agreed in the first reply.',
    charactersRemaining: 'characters remaining',
  },
  labels: {
    disclaimer: 'Nothing on this site is accounting, audit, tax, legal or investment advice, and no figure here is a promise of a result. Where a number appears, its source and its limits appear with it.',
    synthetic: 'Synthetic illustration',
    syntheticHint: 'Invented data, used to demonstrate a method. Not a real result.',
    interactiveCalculation: 'Interactive calculation',
    interactiveHint: 'Computed in your browser from the stated assumptions. No external data.',
    recordedExample: 'Recorded example',
    liveData: 'Live data',
  },
};

const tr: UIStrings = {
  nav: {
    mainLabel: 'Ana gezinme',
    shelf: 'Raf',
    volumes: 'Ciltler',
    frontMatter: 'Ön söz',
    contact: 'İletişim',
    primaryCta: 'Projenizi konuşalım',
    menu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    language: 'Dil',
    skipToContent: 'İçeriğe geç',
  },
  home: {
    metaTitle: 'Uygulamalı Yapay Zekâ ve Finansal Analitik Danışmanlığı',
    heroEyebrow: 'Uygulamalı yapay zekâ ve finansal analitik',
    heroLede:
      'Finans ve operasyon ekiplerinin tahmin modelleri kurmasına, belge incelemesini otomatikleştirmesine ve gerçekten kullanabilecekleri raporlama sistemleri oluşturmasına yardım ediyorum.',
    brandLine: 'Kod ile sermaye arasında köprü',
    ctaPrimary: 'Projenizi konuşalım',
    ctaSecondary: 'İlk cildi açın',
    locationLine: 'Milano, İtalya · İngilizce, İtalyanca ve Türkçe çalışıyorum',
    evidenceLabel: 'Kanıt',
    evidenceTitle: 'Denetlediğinizde çalışma neye benziyor',
    evidenceLede:
      'İddia etmek yerine gösterebileceğim üç şey. Her biri, eksik kaldıkları yerler dâhil olmak üzere arkasındaki ürüne ve sayılara bağlanıyor.',
    problemsLabel: 'Problemler',
    problemsTitle: 'Genellikle bunlar için aranıyorum',
    problemsLede:
      'Bu sayfayı okuma nedeniniz bunlardan biriyse, bağlantılı hizmet işin nasıl kapsamlandığını ve size ne teslim edileceğini anlatıyor.',
    featuredLabel: 'Vaka çalışması',
    processLabel: 'Süreç',
    processTitle: 'Bir iş nasıl yürüyor',
    costLabel: 'Problem',
    costTitle: 'Pahalı olan asla işin kendisi değildir. Gecikme, yeniden yapım ve sayı olmadan verilen karardır.',
    costLede:
      'Yukarıdaki raftaki her problem aynı biçime sahip. Bir öğleden sonra sürmesi gereken bir iş bir hafta sürüyor; denetlenebilir olması gereken bir şey güvene dayanıyor; ve gerçek para maliyeti olan bir karar, onu besleyecek rakam gelmeden veriliyor. Bunların hiçbiri bir gider kalemi olarak görünmez — tam da bu yüzden sürer.',
    costPoints: [
      {
        cost: 'Karar vermeye değil, derlemeye harcanan nitelikli zaman',
        body: 'Her ayın ilk haftasını dört sistemi mutabakata getirerek geçiren bir finans yöneticisi, şirketteki en pahalı ve en bakımsız veri hattıdır.',
      },
      {
        cost: 'Sayı gelmeden verilen kararlar',
        body: 'Rapor toplantıdan sonra masaya geldiğinde karar sezgiyle verilmiştir; raporlama da bundan sonra ne olacağının girdisi değil, çoktan olanın kaydı hâline gelir.',
      },
      {
        cost: 'Kimsenin arkasında duramayacağı sayılar',
        body: 'İki departmanın farklı hesapladığı bir rakam, hiç rakam olmamasından kötüdür: üzerinde işlem yapılmak yerine tartışılır ve tartışma her ay tekrarlanır.',
      },
      {
        cost: 'Yenilendikten sonra bulunan madde',
        body: 'Zaman baskısı altında tek kişi tarafından okunan belgeler, aylar sonra maliyet olarak ortaya çıkan atlamalar üretir — üstelik o belgenin neden öyle değerlendirildiğine dair hiçbir kayıt olmadan.',
      },
    ],
    processLede: 'Dört aşama; her biri bir durum güncellemesiyle değil, elinize geçen bir çıktıyla bitiyor.',
    process: [
      {
        stage: 'Keşif',
        body: 'Asıl karara ve asıl veriye bakarız; hiçbir şey inşa edilmeden önce iyi bir sonucun ne olacağını kararlaştırırız. Projeler çoğu zaman burada küçülür.',
        output: 'Yazılı bir problem tanımı ve yapmaya değip değmeyeceğine dair dürüst bir görüş.',
      },
      {
        stage: 'Sınırlanmış pilot',
        body: 'Tek iş akışı, tek belge türü, tek tahmin. İşe yaramadığını öğrenmenin batık maliyet değil, ucuz bir cevap olacağı kadar küçük.',
        output: 'Çalışan bir prototip ve kendi verileriniz üzerinde bir değerlendirme.',
      },
      {
        stage: 'Teslim',
        body: 'Pilotu geçen şey, işin gerçekten yapıldığı yerde kurulur; inceleme adımı sonradan eklenmek yerine ilk günden yerindedir.',
        output: 'Devreye alınmış iş akışı, dokümantasyonu ve ne zaman saptığını gösteren kontroller.',
      },
      {
        stage: 'Devir',
        body: 'Ekibiniz onu bensiz çalıştırır. Buna, girdiler değiştiğinde nasıl yeniden değerlendirileceğini bilmek de dâhildir; çünkü değişecekler.',
        output: 'Dokümantasyon, değerlendirme düzeneği ve sonraki sahibiyle bir gözden geçirme.',
      },
    ],
    storyLabel: 'Arka plan',
    storyTitle: 'Bir veri bilimci neden bilanço okumayı sürdürüyor',
    storyLede:
      'Bocconi’de ekonomi ve bilgisayar bilimi okudum, banka riskinde çalıştım, bir fabrikada tahmin modelleri devreye aldım ve iki yıl boyunca modellere kurumsal raporları okumayı öğrettim. Ortak çizgi şu: bir model, ancak birinin söylediğini imzalaması gerektiğinde önem kazanır.',
    storyCta: 'Tüm geçmişi okuyun',
    contactTitle: 'Hangi kararı veya iş akışını iyileştirmeye çalışıyorsunuz?',
    contactLede:
      'Problemi birkaç cümleyle anlatın. Yanıtları bizzat ben yazıyorum, genelde birkaç iş günü içinde; üstlenmemem gereken bir işse bunu açıkça söylerim.',
  },
  work: {
    readCaseStudy: 'Vaka çalışmasını okuyun',
    sections: {
      problem: 'Problem',
      context: 'Bağlam',
      role: 'Benim rolüm',
      audience: 'Kimin için',
      data: 'Verinin kaynağı',
      constraints: 'Kısıtlar',
      approach: 'Yaklaşım',
      decisions: 'Önem taşıyan kararlar',
      baseline: 'Kıyas noktası',
      evaluation: 'Nasıl değerlendirildi',
      results: 'Sonuçlar',
      deliverables: 'Teslim edilenler',
      consequences: 'Pratikte neyi değiştiriyor',
      limitations: 'Sınırlar',
      humanReview: 'İnsan incelemesi',
      evidence: 'Kanıt kaydı',
      links: 'Kaynak malzeme',
    },
    evidenceIntro: 'Yukarıda geçen her rakam; kaynağı ve size söylemedikleriyle birlikte.',
    evidenceSource: 'Kaynak',
    evidenceMethod: 'Yöntem',
    evidenceBaseline: 'Karşılaştırıldığı',
    evidenceAsOf: 'Tarih',
    evidenceLimits: 'Sınırlar',
    noResults: 'Bu proje için yayımlanmış bir performans rakamı yok, dolayısıyla iddia da edilmiyor.',
    relatedService: 'İlgili hizmet',
    repository: 'Depo',
    report: 'Performans raporu',
    figureLabel: 'Şekil',
    nextStepTitle: 'Buna benzer bir probleminiz mi var?',
    nextStepLede: 'Neye karar vermeye çalıştığınızı anlatın, bu yaklaşımın uyup uymadığını söyleyeyim.',
  },
  maturity: {
    research: {
      label: 'Araştırma',
      description: 'Yayımlanmış bir ürünü olan araştırma çalışması. Kurulmadı ve kimse kullanmıyor.',
    },
    prototype: {
      label: 'Prototip',
      description: 'Bir yaklaşımın işe yarayıp yaramadığını sınamak için yapıldı. Düzenli kullanım için sağlamlaştırılmadı.',
    },
    'internal-deployment': {
      label: 'Kurum içi kullanım',
      description: 'Bir kuruluşun kendi çalışanları için içeride çalışıyor.',
    },
    'client-engagement': {
      label: 'Müşteri işi',
      description: 'Bir müşteri için sipariş edildi ve teslim edildi.',
    },
    'maintained-product': {
      label: 'Bakımı yapılan ürün',
      description: 'Sürekli kullanımda ve etkin biçimde bakımı yapılıyor.',
    },
    'synthetic-demo': {
      label: 'Sentetik gösterim',
      description:
        'Bir yöntemi göstermek için bu site adına uydurma veriyle yapıldı. Bir iş değil, bir müşteri sonucu değil ve kimse kullanmıyor.',
    },
  },
  contact: {
    label: 'İletişim',
    title: 'Hangi kararı veya iş akışını iyileştirmeye çalışıyorsunuz?',
    lede:
      'Başlamak için birkaç cümle yeterli. Yanıtları bizzat ben yazıyorum ve probleminiz için başka biri daha uygunsa bunu açıkça söylerim.',
    nameLabel: 'Ad',
    namePlaceholder: 'Adınız',
    emailLabel: 'E-posta',
    emailPlaceholder: 'siz@sirket.com',
    companyLabel: 'Şirket',
    companyOptional: 'isteğe bağlı',
    companyPlaceholder: 'Nerede çalışıyorsunuz',
    topicLabel: 'Konu nedir?',
    topicPlaceholder: 'Bir konu seçin',
    messageLabel: 'Neyi iyileştirmeye çalışıyorsunuz?',
    messagePlaceholder:
      'Örneğin: aylık raporlamamız dört ayrı sistemden elle birleştiriliyor, bir hafta sürüyor ve rapor masaya geldiğinde kimse sayılara güvenmiyor.',
    messageHint: 'Problem, kabaca. Hazır bir brief gerekmiyor.',
    submit: 'Mesajı gönder',
    submitting: 'Gönderiliyor…',
    required: 'Bu alan zorunlu',
    invalidEmail: 'Yanıt alabileceğiniz bir e-posta adresi girin',
    tooShort: 'Neye ihtiyacınız olduğunu anlamam için bir iki cümle',
    tooLong: 'Lütfen biraz kısaltın',
    errorSummary: 'Mesajınız gönderilmedi. Lütfen aşağıda işaretlenen alanları kontrol edin.',
    successTitle: 'Alındı',
    successBody:
      'Mesajınız gelen kutuma ulaştı. Bunları kendim okuyorum ve verdiğiniz adrese genelde birkaç iş günü içinde yanıt veriyorum.',
    failureTitle: 'Bu gönderilemedi',
    failureBody:
      'Hiçbir şey gönderilmedi. Mesajınız hâlâ formda duruyor — yeniden deneyebilir veya aşağıdaki adresi kullanarak doğrudan e-posta atabilirsiniz.',
    disabledTitle: 'E-posta ile iletişime geçin',
    disabledBody:
      'İletişim formu şu anda kullanılamıyor. Projenizi birkaç cümleyle e-posta ile anlatın; mesajınız doğrudan bana ulaşır.',
    whatHappensNext: 'Bundan sonra ne oluyor',
    nextSteps: [
      'Mesajınızı kendim okuyorum. Hiçbir şey bir asistana veya otomatik yanıtlayıcıya yönlendirilmiyor.',
      'Verdiğiniz adrese, genelde iki iş günü içinde, yardımcı olabileceğimi düşünüp düşünmediğimi belirten bir yanıt geliyor.',
      'Uygun görünüyorsa, kapsam veya teklif konuşulmadan önce otuz dakikayı asıl problemin kendisine ayırıyoruz.',
    ],
    privacyTitle: 'Gönderdiklerinize ne oluyor',
    privacyBody:
      'Adınız, e-postanız, şirketiniz ve mesajınız yanıt verebilmem için e-posta sağlayıcıma gönderilir ve o gelen kutusunda saklanır. Bir e-posta listesine eklenmez, başka kimseye aktarılmaz ve içerik hiçbir zaman analitiğe gönderilmez. İstediğiniz an söyleyin, yazışmayı silerim.',
    directTitle: 'Ya da doğrudan ulaşın',
    directBody: 'Form ile başlamak istemiyorsanız, bunların ikisi de bana ulaşır.',
    whatsappDirect: 'WhatsApp',
    noScheduling:
      'Burada bilerek bir takvim bağlantısı yok: herkese açık bir randevu takvimi tutmuyorum, dolayısıyla saat ilk yanıtta kararlaştırılıyor.',
    charactersRemaining: 'karakter kaldı',
  },
  labels: {
    disclaimer: 'Bu sitedeki hiçbir şey muhasebe, denetim, vergi, hukuk veya yatırım tavsiyesi değildir ve buradaki hiçbir rakam bir sonuç vaadi değildir. Bir sayı görünüyorsa, kaynağı ve sınırları da onunla birlikte görünür.',
    synthetic: 'Sentetik gösterim',
    syntheticHint: 'Bir yöntemi göstermek için kullanılan uydurma veri. Gerçek bir sonuç değil.',
    interactiveCalculation: 'Etkileşimli hesaplama',
    interactiveHint: 'Belirtilen varsayımlardan tarayıcınızda hesaplanır. Dış veri yok.',
    recordedExample: 'Kayıtlı örnek',
    liveData: 'Canlı veri',
  },
};

const it: UIStrings = {
  nav: {
    mainLabel: 'Navigazione principale',
    shelf: 'Lo scaffale',
    volumes: 'Volumi',
    frontMatter: 'Prefazione',
    contact: 'Contatti',
    primaryCta: 'Parliamo del tuo progetto',
    menu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
    language: 'Lingua',
    skipToContent: 'Vai al contenuto',
  },
  home: {
    metaTitle: 'Consulenza in AI Applicata e Analisi Finanziaria',
    heroEyebrow: 'AI applicata e analisi finanziaria',
    heroLede:
      'Aiuto i team di finanza e operations a costruire modelli previsionali, automatizzare la revisione documentale e creare sistemi di reporting che si possano davvero usare.',
    brandLine: 'Un ponte tra codice e capitale',
    ctaPrimary: 'Parliamo del tuo progetto',
    ctaSecondary: 'Apri il primo volume',
    locationLine: 'Milano, Italia · lavoro in inglese, italiano e turco',
    evidenceLabel: 'Prove',
    evidenceTitle: 'Che aspetto ha il lavoro quando lo verifichi',
    evidenceLede:
      'Tre cose che posso mostrarti invece di affermarle. Ognuna rimanda all’artefatto e ai numeri che ci stanno dietro, compreso dove non arrivano.',
    problemsLabel: 'Problemi',
    problemsTitle: 'Tre problemi per cui di solito mi cercano',
    problemsLede:
      'Se uno di questi è il motivo per cui stai leggendo, il servizio collegato spiega come viene definito l’incarico e che cosa riceveresti.',
    featuredLabel: 'Caso di studio',
    processLabel: 'Processo',
    processTitle: 'Come si svolge un incarico',
    costLabel: 'Il problema',
    costTitle: 'La parte costosa non è mai il lavoro. È il ritardo, il rifacimento e la decisione presa senza il numero.',
    costLede:
      'Ogni problema sullo scaffale qui sopra ha la stessa forma. Qualcosa che dovrebbe richiedere un pomeriggio richiede una settimana; qualcosa che dovrebbe essere verificabile viene preso per buono; e una decisione che costerà denaro vero viene presa prima che arrivi la cifra che dovrebbe informarla. Nulla di tutto ciò compare come voce di costo, ed è esattamente per questo che dura.',
    costPoints: [
      {
        cost: 'Tempo qualificato speso ad assemblare, non a decidere',
        body: 'Un responsabile finanziario che passa la prima settimana di ogni mese a riconciliare quattro sistemi è la pipeline di dati più costosa dell’azienda, e la meno mantenuta.',
      },
      {
        cost: 'Decisioni prese prima che arrivi il numero',
        body: 'Quando il pacchetto arriva dopo la riunione, la decisione è stata presa a intuito e il reporting è diventato il verbale di ciò che è già successo anziché un input per ciò che succederà.',
      },
      {
        cost: 'Numeri che nessuno è disposto a difendere',
        body: 'Una cifra che due reparti calcolano in modo diverso è peggio di nessuna cifra: se ne discute invece di agire, e la discussione torna ogni mese.',
      },
      {
        cost: 'La clausola trovata dopo il rinnovo',
        body: 'Documenti letti da una persona sola, sotto pressione, producono omissioni che riemergono come costo mesi dopo — senza alcuna traccia del perché quel documento sia stato trattato così.',
      },
    ],
    processLede: 'Quattro fasi, ognuna delle quali termina con qualcosa di concreto e non con un aggiornamento di stato.',
    process: [
      {
        stage: 'Discovery',
        body: 'Guardiamo la decisione vera e i dati veri, e concordiamo cosa sarebbe un buon risultato prima di costruire qualsiasi cosa. Spesso è qui che un progetto diventa più piccolo.',
        output: 'Una definizione scritta del problema e un parere onesto se valga la pena farlo.',
      },
      {
        stage: 'Pilota delimitato',
        body: 'Un flusso, un tipo di documento, una previsione. Abbastanza piccolo perché scoprire che non funziona sia una risposta economica e non un costo affondato.',
        output: 'Un prototipo funzionante e una valutazione sui vostri dati.',
      },
      {
        stage: 'Consegna',
        body: 'Ciò che è sopravvissuto al pilota viene costruito dove il lavoro avviene davvero, con il passaggio di revisione presente dal primo giorno anziché aggiunto dopo.',
        output: 'Il flusso in produzione, la sua documentazione e i controlli che mostrano quando si degrada.',
      },
      {
        stage: 'Passaggio di consegne',
        body: 'Il vostro team lo gestisce senza di me. Questo include sapere come rivalutarlo quando gli input cambiano, perché cambieranno.',
        output: 'Documentazione, impianto di valutazione e una sessione con chi lo prenderà in carico.',
      },
    ],
    storyLabel: 'Percorso',
    storyTitle: 'Perché un data scientist continua a leggere bilanci',
    storyLede:
      'Ho studiato economia e informatica alla Bocconi, ho lavorato nel rischio bancario, ho messo in produzione modelli previsionali in stabilimento e ho passato due anni a insegnare ai modelli a leggere le comunicazioni aziendali. Il filo conduttore è che un modello conta solo quando qualcuno deve firmare ciò che dice.',
    storyCta: 'Leggi il percorso completo',
    contactTitle: 'Quale decisione o processo stai cercando di migliorare?',
    contactLede:
      'Bastano poche frasi. Rispondo personalmente, di solito entro un paio di giorni lavorativi, e dico apertamente se non è qualcosa di cui dovrei occuparmi io.',
  },
  work: {
    readCaseStudy: 'Leggi il caso di studio',
    sections: {
      problem: 'Il problema',
      context: 'Contesto',
      role: 'Il mio ruolo',
      audience: 'A chi serve',
      data: 'Provenienza dei dati',
      constraints: 'Vincoli',
      approach: 'Approccio',
      decisions: 'Decisioni che hanno contato',
      baseline: 'Riferimento',
      evaluation: 'Come è stato valutato',
      results: 'Risultati',
      deliverables: 'Cosa è stato consegnato',
      consequences: 'Cosa cambia nella pratica',
      limitations: 'Limiti',
      humanReview: 'Revisione umana',
      evidence: 'Registro delle prove',
      links: 'Materiale di origine',
    },
    evidenceIntro: 'Ogni cifra citata sopra, con la sua fonte e ciò che non dice.',
    evidenceSource: 'Fonte',
    evidenceMethod: 'Metodo',
    evidenceBaseline: 'Confrontato con',
    evidenceAsOf: 'Al',
    evidenceLimits: 'Limiti',
    noResults: 'Per questo progetto non è pubblicata alcuna misura di prestazione, quindi non ne viene dichiarata alcuna.',
    relatedService: 'Servizio collegato',
    repository: 'Repository',
    report: 'Relazione sulle prestazioni',
    figureLabel: 'Figura',
    nextStepTitle: 'Hai un problema di questa forma?',
    nextStepLede: 'Dimmi che cosa stai cercando di decidere e ti dirò se questo approccio è adatto.',
  },
  maturity: {
    research: {
      label: 'Ricerca',
      description: 'Lavoro di indagine con un artefatto pubblicato. Non installato e non usato da nessuno.',
    },
    prototype: {
      label: 'Prototipo',
      description: 'Costruito per verificare se un approccio funziona. Non irrobustito per l’uso regolare.',
    },
    'internal-deployment': {
      label: 'Uso interno',
      description: 'In funzione dentro un’organizzazione per il proprio personale.',
    },
    'client-engagement': {
      label: 'Incarico cliente',
      description: 'Commissionato e consegnato per un cliente.',
    },
    'maintained-product': {
      label: 'Prodotto mantenuto',
      description: 'In uso continuo e mantenuto attivamente.',
    },
    'synthetic-demo': {
      label: 'Dimostrazione sintetica',
      description:
        'Costruita per questo sito su dati inventati per mostrare un metodo. Non è un incarico, non è un risultato di cliente e non è usata da nessuno.',
    },
  },
  contact: {
    label: 'Contatti',
    title: 'Quale decisione o processo stai cercando di migliorare?',
    lede:
      'Per iniziare bastano poche frasi. Rispondo personalmente e dico apertamente se il tuo problema è servito meglio da qualcun altro.',
    nameLabel: 'Nome',
    namePlaceholder: 'Il tuo nome',
    emailLabel: 'Email',
    emailPlaceholder: 'tu@azienda.com',
    companyLabel: 'Azienda',
    companyOptional: 'facoltativo',
    companyPlaceholder: 'Dove lavori',
    topicLabel: 'Di cosa si tratta?',
    topicPlaceholder: 'Scegli un argomento',
    messageLabel: 'Che cosa stai cercando di migliorare?',
    messagePlaceholder:
      'Per esempio: il nostro reporting mensile viene assemblato a mano da quattro sistemi, richiede una settimana e quando arriva nessuno si fida dei numeri.',
    messageHint: 'Il problema, a grandi linee. Non serve preparare un brief.',
    submit: 'Invia il messaggio',
    submitting: 'Invio in corso…',
    required: 'Questo campo è obbligatorio',
    invalidEmail: 'Inserisci un indirizzo email che possa ricevere una risposta',
    tooShort: 'Una o due frasi, così capisco di cosa hai bisogno',
    tooLong: 'Per favore accorcia un po’',
    errorSummary: 'Il messaggio non è stato inviato. Controlla i campi segnalati qui sotto.',
    successTitle: 'Ricevuto',
    successBody:
      'Il tuo messaggio è arrivato nella mia casella. Li leggo io e rispondo all’indirizzo che hai indicato, di solito entro un paio di giorni lavorativi.',
    failureTitle: 'Non è andato a buon fine',
    failureBody:
      'Non è stato inviato nulla. Il messaggio è ancora nel modulo — puoi riprovare oppure scrivermi direttamente all’indirizzo qui sotto.',
    disabledTitle: 'Iniziamo con un’email',
    disabledBody:
      'Il modulo di contatto non è al momento disponibile. Raccontami il tuo progetto in poche righe via email; il messaggio arriva direttamente a me.',
    whatHappensNext: 'Cosa succede dopo',
    nextSteps: [
      'Leggo io il tuo messaggio. Nulla passa da un assistente o da una risposta automatica.',
      'Ricevi una risposta all’indirizzo che hai indicato — normalmente entro due giorni lavorativi — in cui ti dico se penso di poterti aiutare.',
      'Se sembra adatto, dedichiamo trenta minuti al problema vero prima di parlare di perimetro o di proposta.',
    ],
    privacyTitle: 'Che fine fa quello che invii',
    privacyBody:
      'Nome, email, azienda e messaggio vengono inviati al mio provider di posta perché io possa rispondere, e restano in quella casella. Non finiscono in una mailing list, non vengono passati a nessuno e il contenuto non viene mai inviato agli strumenti di analisi. Chiedimelo in qualsiasi momento e cancello la conversazione.',
    directTitle: 'Oppure scrivimi direttamente',
    directBody: 'Se non vuoi iniziare da un modulo, entrambi questi canali mi raggiungono.',
    whatsappDirect: 'WhatsApp',
    noScheduling:
      'Qui non c’è un link al calendario, ed è voluto: non tengo un’agenda di prenotazione pubblica, quindi l’orario si concorda nella prima risposta.',
    charactersRemaining: 'caratteri rimanenti',
  },
  labels: {
    disclaimer: 'Nulla in questo sito è consulenza contabile, di revisione, fiscale, legale o in materia di investimenti, e nessuna cifra qui è una promessa di risultato. Dove compare un numero, compaiono con esso la sua fonte e i suoi limiti.',
    synthetic: 'Illustrazione sintetica',
    syntheticHint: 'Dati inventati, usati per dimostrare un metodo. Non è un risultato reale.',
    interactiveCalculation: 'Calcolo interattivo',
    interactiveHint: 'Calcolato nel tuo browser dalle ipotesi dichiarate. Nessun dato esterno.',
    recordedExample: 'Esempio registrato',
    liveData: 'Dati in tempo reale',
  },
};

const UI: Record<Locale, UIStrings> = { en, tr, it };

export const getUI = (locale: Locale): UIStrings => UI[locale] ?? UI.en;

export { UI };
