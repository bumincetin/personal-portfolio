import type { Locale } from '../translations';
import type { ServiceKey } from './case-studies';

/**
 * Service definitions.
 *
 * Three technical services form one family (document intelligence, forecasting,
 * reporting). Cross-border advisory is deliberately kept on its own track with
 * `regulated: true`, because the work it touches — company formation, tax
 * structuring, property transfer — is reserved in Italy to licensed
 * professionals. The old page described that work in the first person
 * ("we set up the legal infrastructure flawlessly"); `responsibilities` is what
 * replaces it, and the page renders the boundary rather than a disclaimer.
 *
 * Routes are the ones that already exist. `ai-nlp` is the real
 * document-intelligence path in all three locales and is not renamed.
 */

export interface EngagementOffer {
  /** Title of the starting engagement. */
  name: string;
  /** Framed as a potential output, never as a guarantee. */
  output: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceCopy {
  /** Short label for navigation and cards. */
  name: string;
  /** Page <h1>. */
  title: string;
  /** One sentence; also the meta description. */
  summary: string;
  problem: string;
  audience: string;
  /** The concrete thing a client ends up holding. */
  deliverable: { title: string; body: string; items: string[] };
  /** Prose pointing at the case study; no number is stated here. */
  evidence: string;
  process: { stage: string; body: string; output: string }[];
  inputs: string[];
  boundaries: { inScope: string[]; outOfScope: string[] };
  offer: EngagementOffer;
  faqs: ServiceFaq[];
  /** Technology, listed after the practical explanation. */
  stack: string[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  /** Only on the regulated service. */
  responsibilities?: { actor: string; does: string }[];
  regulatedNotice?: string;
}

export interface ServiceSpine {
  key: ServiceKey;
  /**
   * The service page's old path segment. There is no such route any more — the
   * volume replaced it — but the value is kept because next.config.js redirects
   * that path here, and the two must not drift apart.
   */
  route: string;
  /** Slugs of case studies that stand as evidence for this service. */
  caseStudies: string[];
  /** Cross-border advisory needs a separate pathway and a boundary statement. */
  regulated: boolean;
  /** Part of the coherent technical family shown together. */
  technical: boolean;
}

export const SERVICES: readonly ServiceSpine[] = [
  {
    key: 'document-intelligence',
    route: 'ai-nlp',
    caseStudies: ['greenwashing-risk-scoring', 'statement-review'],
    regulated: false,
    technical: true,
  },
  {
    key: 'forecasting',
    route: 'financial-analytics',
    caseStudies: ['portfolio-optimizer', 'parliamentary-seat-forecast'],
    regulated: false,
    technical: true,
  },
  {
    key: 'reporting',
    route: 'business-intelligence',
    caseStudies: [],
    regulated: false,
    technical: true,
  },
  {
    key: 'cross-border',
    route: 'financial-consultancy',
    caseStudies: [],
    regulated: true,
    technical: false,
  },
] as const;

export const getService = (key: ServiceKey) => SERVICES.find((s) => s.key === key);

type CopyByService = Record<ServiceKey, ServiceCopy>;

const en: CopyByService = {
  'document-intelligence': {
    name: 'Document intelligence',
    title: 'Document intelligence and applied AI',
    summary:
      'Automated review for the documents your team reads by hand — contracts, statements, disclosures, invoices — built so that every output can be checked.',
    problem:
      'Somebody on your team reads the same kind of document over and over: supplier contracts, incoming invoices, policy files, sustainability reports. The reading is slow, it is inconsistent between people, and when a decision is questioned months later there is no record of why that document was treated the way it was.',
    audience:
      'Teams with a recurring queue of documents and a person whose judgement is the bottleneck. It fits best where being wrong is expensive, so the output has to be defensible rather than merely fast.',
    deliverable: {
      title: 'What you end up with',
      body:
        'A bounded workflow over one document type, with an evaluation you can read and an exception path for everything the model should not decide alone.',
      items: [
        'A pipeline that turns a document into structured fields with the source passage retained for each one.',
        'An evaluation on a sample your team labelled, reporting where the system agrees with your reviewers and where it does not.',
        'An exception queue: the cases routed to a person, and the rule that decides what lands there.',
        'A written account of the failure modes found during evaluation.',
      ],
    },
    evidence:
      'The greenwashing case study is the honest version of this work: it shows a detector that tracks expert judgement closely on a continuous score while still missing most of the items it should flag, and explains why that combination makes it a triage aid rather than a filter.',
    process: [
      {
        stage: 'Discovery',
        body: 'We look at real examples of the document and the decision made from it, and agree what "correct" means before anything is built.',
        output: 'A written problem statement with the decision, the document type, and the definition of a correct output.',
      },
      {
        stage: 'Bounded pilot',
        body: 'One document type, one workflow. Your team labels a sample; I build against it and evaluate on held-out examples.',
        output: 'A working pipeline, evaluation results on your own documents, and the exception-review process.',
      },
      {
        stage: 'Delivery',
        body: 'The pipeline is integrated where the work actually happens, with the review step in place from day one.',
        output: 'Deployed workflow, runbook, and the monitoring that shows when quality drifts.',
      },
      {
        stage: 'Handover',
        body: 'Your team runs it. I document how to re-evaluate it when the documents change, because they will.',
        output: 'Documentation, the evaluation harness, and a walkthrough with the people who will own it.',
      },
    ],
    inputs: [
      'A representative sample of the documents, including the awkward ones.',
      'Access to a person who can say what a correct output looks like.',
      'Time from your reviewers to label a sample — this is usually the real constraint.',
      'Clarity on what may leave your infrastructure and what may not.',
    ],
    boundaries: {
      inScope: [
        'Extraction, classification, ranking and routing over a defined document type.',
        'Evaluation against labels your team produced.',
        'The exception process and the interface a reviewer works in.',
      ],
      outOfScope: [
        'Unattended decisions. Everything consequential keeps a human in the loop.',
        'Legal, tax or audit opinions about what a document means.',
        'A general-purpose system that handles any document you have. Pilots are scoped to one type.',
      ],
    },
    offer: {
      name: 'Document-intelligence pilot',
      output: 'A bounded workflow, evaluation results on your own documents, and an exception-review process.',
    },
    faqs: [
      {
        q: 'Will this replace the person who reads these today?',
        a: 'No, and I would not build it that way. It changes what they read first and gives them the reason for the ranking. On the research project behind this service, the best detector still missed most of the items a reviewer would flag — which is exactly why the review step stays.',
      },
      {
        q: 'Does our data leave our systems?',
        a: 'That is a decision we make in discovery, not a default. Some approaches run entirely on your infrastructure; others use a hosted model, which means the document text goes to that provider. I will tell you which one a given approach requires before we commit to it.',
      },
      {
        q: 'How accurate is it?',
        a: 'Unanswerable before we have your documents and your labels. Any number quoted to you in advance of that is about someone else’s data. Establishing the number for yours is what the pilot is for.',
      },
      {
        q: 'What if the evaluation shows it does not work well enough?',
        a: 'Then that is the pilot’s result and you have spent a bounded amount to learn it. That outcome is why the pilot is scoped small and evaluated before anything is integrated.',
      },
    ],
    stack: ['Python', 'spaCy', 'Hugging Face Transformers', 'Sentence Transformers', 'PyTorch', 'scikit-learn'],
    ctaTitle: 'Have a document queue that is slowing a decision down?',
    ctaBody: 'Tell me which document and which decision, and I will tell you whether a pilot is worth running.',
    ctaButton: 'Discuss a document-intelligence pilot',
  },
  forecasting: {
    name: 'Forecasting & financial analytics',
    title: 'Forecasting and financial analytics',
    summary:
      'Forecasts and financial models that state their assumptions and their uncertainty, so a decision can be made with the range in view rather than a single number.',
    problem:
      'You need to decide something now that depends on what happens later — how much to hold, whether cash covers the next two quarters, whether a price change pays for itself. The spreadsheet that answers it produces one number, and nobody can say how wrong that number could be.',
    audience:
      'Finance and operations teams making recurring decisions under uncertainty: demand and cash planning, pricing, capacity, scenario work for a board.',
    deliverable: {
      title: 'What you end up with',
      body:
        'A model you can interrogate, compared against the simple baseline it has to beat, with the uncertainty stated rather than implied.',
      items: [
        'A forecast with intervals, and a validation showing how it performed on periods it never saw.',
        'A comparison against a naive baseline, because a model that cannot beat last month’s number is not worth maintaining.',
        'The assumptions written down as parameters you can change, not constants buried in code.',
        'A recommendation on whether to build further, keep it simple, or stop.',
      ],
    },
    evidence:
      'The portfolio optimizer on this page is the method made inspectable: assumptions visible, views adjustable, and outcomes shown as a distribution rather than a projection. It runs on invented capital-market assumptions, which is stated on its face — it demonstrates how I build, not what a market will do.',
    process: [
      {
        stage: 'Discovery',
        body: 'We identify the decision the forecast serves and how much accuracy it actually needs. Often less than expected.',
        output: 'The decision, its cadence, and the accuracy that would change it — written down.',
      },
      {
        stage: 'Baseline & assessment',
        body: 'I establish what a naive forecast achieves on your history, then test whether anything more elaborate beats it.',
        output: 'A baseline comparison, a validation approach, and a recommended next step.',
      },
      {
        stage: 'Delivery',
        body: 'The chosen model is built where your team can run it, with the intervals surfaced rather than hidden.',
        output: 'The model, its interface, and documentation of every assumption in it.',
      },
      {
        stage: 'Handover',
        body: 'Re-validation is part of the handover: how to tell when the model has stopped working.',
        output: 'Runbook, re-validation procedure, and the monitoring to support it.',
      },
    ],
    inputs: [
      'Historical data at the grain the decision is made at, with its known gaps.',
      'The decision itself and who makes it.',
      'Any structural rules the outcome passes through — tax bands, tiers, covenants, thresholds.',
      'Known one-off events in the history, so they are not learned as patterns.',
    ],
    boundaries: {
      inScope: [
        'Time-series forecasting, scenario modelling, sensitivity and stress analysis.',
        'Baseline comparison and out-of-sample validation.',
        'Financial models with the assumptions exposed.',
      ],
      outOfScope: [
        'Predictions of market prices, and any suggestion that a forecast removes uncertainty.',
        'Investment advice, portfolio management, or trading of any kind.',
        'Guaranteed accuracy. What is achievable is established by validation, not promised in advance.',
      ],
    },
    offer: {
      name: 'Forecasting assessment',
      output: 'A baseline comparison, a validation approach, and a recommended next step.',
    },
    faqs: [
      {
        q: 'How accurate will the forecast be?',
        a: 'Not knowable until it has been validated on your history. The assessment exists to answer this honestly, and sometimes the answer is that a simple baseline is already good enough and you should not pay for more.',
      },
      {
        q: 'We have messy, incomplete history. Is that disqualifying?',
        a: 'No, but it changes what is achievable and you should hear that early. Part of the assessment is establishing what the data will and will not support.',
      },
      {
        q: 'Can you forecast our share price or a market?',
        a: 'No. I do not take that work, and anyone who offers it with confidence is telling you something about themselves.',
      },
      {
        q: 'Why do you insist on showing a range?',
        a: 'Because the range is the decision-relevant part. A single number invites a plan with no contingency in it.',
      },
    ],
    stack: ['Python', 'pandas', 'statsmodels', 'scikit-learn', 'PyTorch', 'SQL'],
    ctaTitle: 'Making a decision that depends on a forecast?',
    ctaBody: 'Describe the decision and the data you hold, and I will tell you what is realistically achievable.',
    ctaButton: 'Discuss a forecasting assessment',
  },
  reporting: {
    name: 'Business intelligence & reporting',
    title: 'Business intelligence and reporting',
    summary:
      'Replace fragmented monthly reporting with one dependable management view, starting from the decisions your team actually needs to make.',
    problem:
      'Replace fragmented monthly reporting with one dependable management view. Right now the numbers are assembled by hand from several systems, two departments quote different figures for the same month, and by the time the pack is ready the meeting it was built for has moved on.',
    audience:
      'Owner-managers and finance leads who have outgrown spreadsheets but do not need — and should not buy — an enterprise data platform.',
    deliverable: {
      title: 'What you end up with',
      body:
        'A small set of metrics everyone agrees on, computed the same way every time, from sources that have been reconciled.',
      items: [
        'An assessment of your source data: what is trustworthy, what conflicts, and what is missing.',
        'Written KPI definitions — the exact calculation and the source for each, so two people cannot compute it differently.',
        'A reporting view built on those definitions, refreshed on a schedule rather than by hand.',
        'The reconciliation notes explaining any figure that differs from what a system used to report.',
      ],
    },
    evidence:
      'This is the service with the least published evidence behind it, and I would rather say so than pad it. What I can show is the approach: the demo portal applies the same principle to a single statement, exposing every figure with the rows it came from instead of asking you to trust the total.',
    process: [
      {
        stage: 'Discovery',
        body: 'Start by identifying the decisions your team needs to make, then work backwards to the smallest set of metrics that would inform them.',
        output: 'A decision list and a candidate metric set, deliberately short.',
      },
      {
        stage: 'Diagnostic',
        body: 'Reconcile the source data and find where the systems disagree. This is usually where the real problem turns out to be.',
        output: 'Source-data assessment, KPI definitions, and reporting priorities.',
      },
      {
        stage: 'Delivery',
        body: 'Build the view on the agreed definitions, with the refresh automated and the lineage visible.',
        output: 'The reporting view, its data pipeline, and documentation of every definition.',
      },
      {
        stage: 'Handover',
        body: 'Your team owns it, including how to add a metric without breaking the ones already agreed.',
        output: 'Documentation, a walkthrough, and the procedure for changing a definition.',
      },
    ],
    inputs: [
      'Access to the systems the numbers come from, read-only.',
      'Whoever currently assembles the report — they know where the bodies are buried.',
      'The existing reporting pack, however imperfect.',
      'A decision-maker who can settle what a metric means when two departments disagree.',
    ],
    boundaries: {
      inScope: [
        'Source reconciliation, metric definition, pipeline and reporting views.',
        'Automating a report that is currently assembled by hand.',
        'Making a figure traceable back to its source rows.',
      ],
      outOfScope: [
        'Replacing your accounting or ERP system.',
        'Statutory or regulatory reporting, which belongs with your accountant.',
        'A dashboard for its own sake. If the decisions do not need it, I will say so.',
      ],
    },
    offer: {
      name: 'Reporting diagnostic',
      output: 'A source-data assessment, KPI definitions, and reporting priorities.',
    },
    faqs: [
      {
        q: 'We already have dashboards nobody looks at. How is this different?',
        a: 'Those usually start from what the data can show rather than from a decision. Starting from the decision is what keeps the metric set small enough to maintain and relevant enough to open.',
      },
      {
        q: 'Which tool will you use?',
        a: 'Whatever you already have, wherever that works. Introducing a new platform is a cost your team carries afterwards, so it needs a reason beyond my familiarity with it.',
      },
      {
        q: 'Our two systems disagree about revenue. Can you fix that?',
        a: 'I can find where they diverge and document it precisely. Deciding which one is right is a business judgement, and it stays with you.',
      },
      {
        q: 'Is this statutory reporting?',
        a: 'No. This is management reporting for internal decisions. Statutory accounts stay with your accountant.',
      },
    ],
    stack: ['SQL', 'Python', 'Power BI', 'KNIME', 'Excel'],
    ctaTitle: 'Spending the first week of every month assembling a report?',
    ctaBody: 'Tell me which decisions it feeds and where the numbers come from.',
    ctaButton: 'Discuss a reporting diagnostic',
  },
  'cross-border': {
    name: 'Cross-border advisory',
    title: 'Cross-border business advisory, Italy and Türkiye',
    summary:
      'Coordination for businesses operating between Italy and Türkiye: scoping the work, translating between two business cultures, and bringing in the licensed professionals each step requires.',
    problem:
      'Operating between Italy and Türkiye means dealing with two regulatory systems, two languages and two sets of professional norms at once. The expensive mistakes are rarely the visible ones — they come from not knowing which questions to ask, or which professional is legally required for a given step.',
    audience:
      'Businesses and founders moving between the Italian and Turkish markets who need the ground mapped before committing.',
    deliverable: {
      title: 'What you end up with',
      body:
        'A clear picture of what your situation actually requires, who is qualified to do each part, and what it will involve — before you commit to any of it.',
      items: [
        'A written scope: what you are trying to do and the steps it decomposes into.',
        'A responsibility map naming which steps require a licensed professional and which do not.',
        'Introductions to the qualified professionals each regulated step needs.',
        'The sequence and the dependencies, so nothing stalls waiting on a step nobody started.',
      ],
    },
    evidence:
      'This is advisory and coordination work, and the engagements behind it are private. There is no case study on this site for it, and I would rather leave that gap visible than fill it with something unverifiable.',
    process: [
      {
        stage: 'Discovery',
        body: 'Understand what you are actually trying to achieve commercially, before anyone talks about structures.',
        output: 'A written statement of the commercial objective and the constraints on it.',
      },
      {
        stage: 'Scoping',
        body: 'Break the objective into steps and identify which require a licensed professional in which jurisdiction.',
        output: 'Confirmed scope, responsibilities, and the necessary professional partners.',
      },
      {
        stage: 'Coordination',
        body: 'Introduce the right professionals, keep the sequence moving, and translate between the parties — linguistically and commercially.',
        output: 'An active workstream with named owners and a sequence everyone can see.',
      },
      {
        stage: 'Handover',
        body: 'You hold direct relationships with the professionals doing the regulated work. That is the point, not a side effect.',
        output: 'Direct relationships and a record of what was decided and why.',
      },
    ],
    inputs: [
      'What you are trying to achieve commercially, and by when.',
      'Your existing corporate structure, if there is one.',
      'Any professional relationships you already hold in either country.',
      'Your appetite for complexity — some structures are legal and still not worth the overhead.',
    ],
    boundaries: {
      inScope: [
        'Scoping, sequencing and coordination of a cross-border project.',
        'Identifying which regulated professionals a given step requires.',
        'Commercial and cultural translation between the parties.',
      ],
      outOfScope: [
        'Tax advice, legal advice, notarial acts, statutory accounting and company formation filings. These are reserved to licensed professionals and are not performed here.',
        'Investment advice and any regulated financial service.',
        'Any representation that a particular tax or legal outcome will be achieved.',
      ],
    },
    offer: {
      name: 'Cross-border discovery',
      output: 'A confirmed scope, a responsibility map, and the necessary professional partners identified.',
    },
    faqs: [
      {
        q: 'Can you set up my Italian company?',
        a: 'No. Company formation in Italy involves notarial acts and filings reserved to licensed professionals. I can scope what your situation requires, tell you which professionals it needs, and coordinate the work — which is a different and narrower thing than doing it.',
      },
      {
        q: 'Can you advise on my tax position?',
        a: 'No. Tax advice is regulated and belongs with a qualified commercialista or tax lawyer. I can make sure the right questions reach them and that their answers are understood on both sides.',
      },
      {
        q: 'Then what am I paying you for?',
        a: 'For knowing what the project actually consists of, which professional each step requires, and how to keep a process moving across two languages and two systems. That is coordination, and it is worth being precise about its limits.',
      },
      {
        q: 'Do you guarantee an outcome?',
        a: 'No. Nobody in a position to be honest with you does, and outcomes here depend on authorities and professionals neither of us controls.',
      },
    ],
    stack: [],
    ctaTitle: 'Moving a business between Italy and Türkiye?',
    ctaBody: 'Describe what you are trying to do and I will tell you what it actually involves — including the parts I would refer elsewhere.',
    ctaButton: 'Discuss a cross-border discovery',
    responsibilities: [
      {
        actor: 'What I do personally',
        does: 'Scoping, sequencing, coordination, and commercial and cultural translation between the parties.',
      },
      {
        actor: 'What Alvolo Consulting does',
        does: 'Alvolo Consulting is the advisory practice I founded for work in this corridor. Engagements run through it where that is the appropriate vehicle.',
      },
      {
        actor: 'What a licensed professional does',
        does: 'Notarial acts, company formation filings, tax advice and opinions, legal advice, statutory accounting and audit. These are performed by qualified professionals with whom you hold a direct relationship — never by me.',
      },
    ],
    regulatedNotice:
      'Company formation, tax structuring, legal advice and statutory accounting are reserved in Italy to licensed professionals. Those services are not provided here. What is provided is the scoping and coordination around them, and the introductions to the people qualified to do them.',
  },
};

const tr: CopyByService = {
  'document-intelligence': {
    name: 'Belge zekâsı',
    title: 'Belge zekâsı ve uygulamalı yapay zekâ',
    summary:
      'Ekibinizin elle okuduğu belgeler için otomatik inceleme — sözleşmeler, tablolar, raporlar, faturalar — her çıktının denetlenebileceği biçimde kurulur.',
    problem:
      'Ekibinizden biri aynı tür belgeyi tekrar tekrar okuyor: tedarikçi sözleşmeleri, gelen faturalar, poliçe dosyaları, sürdürülebilirlik raporları. Okuma yavaş, kişiden kişiye tutarsız ve aylar sonra bir karar sorgulandığında o belgenin neden öyle değerlendirildiğine dair bir kayıt yok.',
    audience:
      'Yinelenen bir belge kuyruğu olan ve darboğazı bir kişinin yargısı olan ekipler. En iyi, yanılmanın pahalı olduğu yerlere oturur; orada çıktının hızlı olmaktan çok savunulabilir olması gerekir.',
    deliverable: {
      title: 'Elinize ne geçiyor',
      body:
        'Tek bir belge türü üzerinde sınırlanmış bir iş akışı, okuyabileceğiniz bir değerlendirme ve modelin tek başına karar vermemesi gereken her şey için bir istisna yolu.',
      items: [
        'Bir belgeyi, her alan için kaynak pasajı saklanmış yapılandırılmış alanlara dönüştüren bir hat.',
        'Ekibinizin etiketlediği bir örnek üzerinde değerlendirme; sistemin inceleyicilerinizle nerede uyuştuğunu ve nerede uyuşmadığını raporlar.',
        'Bir istisna kuyruğu: bir kişiye yönlendirilen durumlar ve oraya neyin düşeceğini belirleyen kural.',
        'Değerlendirme sırasında bulunan hata biçimlerinin yazılı dökümü.',
      ],
    },
    evidence:
      'Yeşil aklama vaka çalışması bu işin dürüst hâlidir: sürekli bir puan üzerinde uzman yargısını yakından izlerken, işaretlemesi gereken maddelerin çoğunu yine de kaçıran bir dedektör gösterir ve bu birleşimin onu neden bir filtre değil, bir önceliklendirme aracı yaptığını açıklar.',
    process: [
      {
        stage: 'Keşif',
        body: 'Belgenin gerçek örneklerine ve ondan verilen karara bakarız; hiçbir şey inşa edilmeden önce “doğru”nun ne demek olduğunu kararlaştırırız.',
        output: 'Kararı, belge türünü ve doğru çıktının tanımını içeren yazılı bir problem tanımı.',
      },
      {
        stage: 'Sınırlanmış pilot',
        body: 'Tek belge türü, tek iş akışı. Ekibiniz bir örneği etiketler; ben ona karşı geliştirir ve ayrılmış örnekler üzerinde değerlendiririm.',
        output: 'Çalışan bir hat, kendi belgeleriniz üzerinde değerlendirme sonuçları ve istisna inceleme süreci.',
      },
      {
        stage: 'Teslim',
        body: 'Hat, işin gerçekte yapıldığı yere entegre edilir; inceleme adımı ilk günden yerindedir.',
        output: 'Devreye alınmış iş akışı, çalıştırma kılavuzu ve kalitenin ne zaman sapmaya başladığını gösteren izleme.',
      },
      {
        stage: 'Devir',
        body: 'Ekibiniz çalıştırır. Belgeler değiştiğinde nasıl yeniden değerlendirileceğini belgelerim; çünkü değişecekler.',
        output: 'Dokümantasyon, değerlendirme düzeneği ve sahiplenecek kişilerle birlikte bir gözden geçirme.',
      },
    ],
    inputs: [
      'Zor olanlar dâhil, belgelerin temsili bir örneği.',
      'Doğru çıktının neye benzediğini söyleyebilecek bir kişiye erişim.',
      'İnceleyicilerinizden bir örneği etiketlemek için zaman — asıl kısıt genelde budur.',
      'Altyapınızdan neyin çıkabileceği ve neyin çıkamayacağı konusunda netlik.',
    ],
    boundaries: {
      inScope: [
        'Tanımlı bir belge türü üzerinde çıkarım, sınıflandırma, sıralama ve yönlendirme.',
        'Ekibinizin ürettiği etiketlere karşı değerlendirme.',
        'İstisna süreci ve bir inceleyicinin çalıştığı arayüz.',
      ],
      outOfScope: [
        'Gözetimsiz kararlar. Sonuç doğuran her şeyde döngüde bir insan kalır.',
        'Bir belgenin ne anlama geldiğine dair hukuki, vergisel veya denetim görüşleri.',
        'Elinizdeki her belgeyi işleyen genel amaçlı bir sistem. Pilotlar tek bir türle sınırlanır.',
      ],
    },
    offer: {
      name: 'Belge zekâsı pilotu',
      output: 'Sınırlanmış bir iş akışı, kendi belgeleriniz üzerinde değerlendirme sonuçları ve bir istisna inceleme süreci.',
    },
    faqs: [
      {
        q: 'Bu, bugün bunları okuyan kişinin yerini alacak mı?',
        a: 'Hayır ve öyle kurmam. Önce neyi okuyacaklarını değiştirir ve sıralamanın gerekçesini verir. Bu hizmetin arkasındaki araştırma projesinde en iyi dedektör bile bir inceleyicinin işaretleyeceği maddelerin çoğunu kaçırdı — inceleme adımının kalmasının nedeni tam olarak bu.',
      },
      {
        q: 'Verimiz sistemlerimizden çıkıyor mu?',
        a: 'Bu, varsayılan değil, keşifte verdiğimiz bir karardır. Bazı yaklaşımlar tamamen sizin altyapınızda çalışır; diğerleri barındırılan bir model kullanır, bu da belge metninin o sağlayıcıya gitmesi demektir. Bir yaklaşıma bağlanmadan önce hangisinin gerektiğini size söylerim.',
      },
      {
        q: 'Doğruluğu ne kadar?',
        a: 'Belgeleriniz ve etiketleriniz olmadan yanıtlanamaz. Bundan önce size söylenen her rakam başkasının verisi hakkındadır. Sizinki için rakamı belirlemek pilotun işidir.',
      },
      {
        q: 'Değerlendirme yeterince iyi çalışmadığını gösterirse ne olur?',
        a: 'O zaman pilotun sonucu budur ve bunu öğrenmek için sınırlı bir bütçe harcamış olursunuz. Pilotun küçük kapsamlanmasının ve entegrasyondan önce değerlendirilmesinin nedeni bu sonuçtur.',
      },
    ],
    stack: ['Python', 'spaCy', 'Hugging Face Transformers', 'Sentence Transformers', 'PyTorch', 'scikit-learn'],
    ctaTitle: 'Bir kararı yavaşlatan bir belge kuyruğunuz mu var?',
    ctaBody: 'Hangi belge ve hangi karar olduğunu anlatın, pilotun çalıştırmaya değip değmeyeceğini söyleyeyim.',
    ctaButton: 'Belge zekâsı pilotunu konuşalım',
  },
  forecasting: {
    name: 'Tahmin & finansal analitik',
    title: 'Tahmin ve finansal analitik',
    summary:
      'Varsayımlarını ve belirsizliğini açıkça belirten tahminler ve finansal modeller; böylece karar tek bir sayıyla değil, aralık görünürken verilir.',
    problem:
      'Şimdi vermeniz gereken bir karar sonradan olacaklara bağlı — ne kadar stok tutulacağı, nakdin önümüzdeki iki çeyreği karşılayıp karşılamayacağı, bir fiyat değişikliğinin kendini amorti edip etmeyeceği. Buna cevap veren tablo tek bir sayı üretiyor ve o sayının ne kadar yanlış olabileceğini kimse söyleyemiyor.',
    audience:
      'Belirsizlik altında yinelenen kararlar veren finans ve operasyon ekipleri: talep ve nakit planlaması, fiyatlama, kapasite, yönetim kurulu için senaryo çalışmaları.',
    deliverable: {
      title: 'Elinize ne geçiyor',
      body:
        'Sorgulayabileceğiniz bir model; aşması gereken basit kıyas noktasıyla karşılaştırılmış ve belirsizliği ima edilmek yerine belirtilmiş hâlde.',
      items: [
        'Aralıklarıyla birlikte bir tahmin ve hiç görmediği dönemlerde nasıl performans gösterdiğini gösteren bir doğrulama.',
        'Naif bir kıyas noktasıyla karşılaştırma; çünkü geçen ayın sayısını geçemeyen bir model bakım yapmaya değmez.',
        'Varsayımlar, koda gömülü sabitler olarak değil, değiştirebileceğiniz parametreler olarak yazılı.',
        'Daha ileri gitmek, basit tutmak veya durmak konusunda bir öneri.',
      ],
    },
    evidence:
      'Bu sayfadaki portföy optimizasyon aracı yöntemin incelenebilir hâlidir: varsayımlar görünür, görüşler ayarlanabilir ve sonuçlar bir öngörü olarak değil bir dağılım olarak gösterilir. Uydurma sermaye piyasası varsayımlarıyla çalışır ve bunu açıkça söyler — bir piyasanın ne yapacağını değil, nasıl kurduğumu gösterir.',
    process: [
      {
        stage: 'Keşif',
        body: 'Tahminin hizmet ettiği kararı ve gerçekte ne kadar doğruluk gerektirdiğini belirleriz. Genelde beklenenden az.',
        output: 'Karar, sıklığı ve onu değiştirecek doğruluk düzeyi — yazılı olarak.',
      },
      {
        stage: 'Kıyas & değerlendirme',
        body: 'Naif bir tahminin sizin geçmişinizde ne başardığını belirler, ardından daha ayrıntılı bir şeyin onu geçip geçmediğini sınarım.',
        output: 'Bir kıyas karşılaştırması, bir doğrulama yaklaşımı ve önerilen bir sonraki adım.',
      },
      {
        stage: 'Teslim',
        body: 'Seçilen model, ekibinizin çalıştırabileceği yerde kurulur; aralıklar gizlenmek yerine öne çıkarılır.',
        output: 'Model, arayüzü ve içindeki her varsayımın dokümantasyonu.',
      },
      {
        stage: 'Devir',
        body: 'Yeniden doğrulama devrin bir parçasıdır: modelin ne zaman çalışmayı bıraktığı nasıl anlaşılır.',
        output: 'Çalıştırma kılavuzu, yeniden doğrulama yordamı ve bunu destekleyen izleme.',
      },
    ],
    inputs: [
      'Kararın verildiği ayrıntı düzeyinde, bilinen boşluklarıyla birlikte geçmiş veri.',
      'Kararın kendisi ve onu kimin verdiği.',
      'Sonucun içinden geçtiği yapısal kurallar — vergi dilimleri, kademeler, sözleşme koşulları, eşikler.',
      'Geçmişteki bilinen tek seferlik olaylar; böylece örüntü olarak öğrenilmezler.',
    ],
    boundaries: {
      inScope: [
        'Zaman serisi tahmini, senaryo modelleme, duyarlılık ve stres analizi.',
        'Kıyas karşılaştırması ve örneklem dışı doğrulama.',
        'Varsayımları açıkta olan finansal modeller.',
      ],
      outOfScope: [
        'Piyasa fiyatı öngörüleri ve bir tahminin belirsizliği ortadan kaldırdığı imasının her türlüsü.',
        'Yatırım tavsiyesi, portföy yönetimi veya her türlü alım satım.',
        'Garantili doğruluk. Neyin başarılabileceği doğrulamayla belirlenir, önceden vaat edilmez.',
      ],
    },
    offer: {
      name: 'Tahmin değerlendirmesi',
      output: 'Bir kıyas karşılaştırması, bir doğrulama yaklaşımı ve önerilen bir sonraki adım.',
    },
    faqs: [
      {
        q: 'Tahmin ne kadar doğru olacak?',
        a: 'Sizin geçmişiniz üzerinde doğrulanmadan bilinemez. Değerlendirme bunu dürüstçe yanıtlamak için vardır ve bazen yanıt, basit bir kıyas noktasının zaten yeterli olduğu ve fazlası için para ödememeniz gerektiğidir.',
      },
      {
        q: 'Dağınık ve eksik bir geçmişimiz var. Bu diskalifiye eder mi?',
        a: 'Hayır, ama neyin başarılabileceğini değiştirir ve bunu erken duymalısınız. Verinin neyi destekleyip desteklemeyeceğini belirlemek değerlendirmenin bir parçasıdır.',
      },
      {
        q: 'Hisse fiyatımızı veya bir piyasayı tahmin edebilir misiniz?',
        a: 'Hayır. Bu işi almıyorum ve bunu güvenle teklif eden biri size kendisi hakkında bir şey söylüyordur.',
      },
      {
        q: 'Neden bir aralık göstermekte ısrar ediyorsunuz?',
        a: 'Çünkü karar açısından anlamlı olan kısım aralıktır. Tek bir sayı, içinde acil durum planı olmayan bir plana davetiye çıkarır.',
      },
    ],
    stack: ['Python', 'pandas', 'statsmodels', 'scikit-learn', 'PyTorch', 'SQL'],
    ctaTitle: 'Bir tahmine bağlı bir karar mı veriyorsunuz?',
    ctaBody: 'Kararı ve elinizdeki veriyi anlatın, gerçekçi olarak neyin başarılabileceğini söyleyeyim.',
    ctaButton: 'Tahmin değerlendirmesini konuşalım',
  },
  reporting: {
    name: 'İş zekâsı & raporlama',
    title: 'İş zekâsı ve raporlama',
    summary:
      'Parçalı aylık raporlamayı tek bir güvenilir yönetim görünümüyle değiştirin; ekibinizin gerçekten vermesi gereken kararlardan başlayarak.',
    problem:
      'Parçalı aylık raporlamayı tek bir güvenilir yönetim görünümüyle değiştirin. Şu anda sayılar birkaç sistemden elle birleştiriliyor, iki departman aynı ay için farklı rakamlar söylüyor ve rapor hazır olduğunda kurulduğu toplantı çoktan geçmiş oluyor.',
    audience:
      'Elektronik tabloları aşmış ama kurumsal bir veri platformuna ihtiyacı olmayan — ve almaması gereken — işletme sahipleri ve finans yöneticileri.',
    deliverable: {
      title: 'Elinize ne geçiyor',
      body:
        'Herkesin üzerinde uzlaştığı küçük bir ölçüt kümesi; her seferinde aynı şekilde ve mutabakatı yapılmış kaynaklardan hesaplanıyor.',
      items: [
        'Kaynak verinizin değerlendirmesi: neye güvenilir, ne çelişiyor ve ne eksik.',
        'Yazılı KPI tanımları — her biri için tam hesap ve kaynak; böylece iki kişi farklı hesaplayamaz.',
        'Bu tanımlar üzerine kurulmuş, elle değil bir programa göre yenilenen bir raporlama görünümü.',
        'Bir sistemin eskiden raporladığından farklı çıkan her rakamı açıklayan mutabakat notları.',
      ],
    },
    evidence:
      'Arkasında en az yayımlanmış kanıt bulunan hizmet budur ve bunu şişirmektense söylemeyi tercih ederim. Gösterebileceğim şey yaklaşımdır: demo portalı aynı ilkeyi tek bir tabloya uygular; toplama güvenmenizi istemek yerine her rakamı geldiği satırlarla birlikte açığa çıkarır.',
    process: [
      {
        stage: 'Keşif',
        body: 'Ekibinizin vermesi gereken kararları belirleyerek başlayın, sonra geriye doğru çalışıp onları besleyecek en küçük ölçüt kümesine ulaşın.',
        output: 'Bir karar listesi ve bilinçli olarak kısa tutulmuş bir aday ölçüt kümesi.',
      },
      {
        stage: 'Tanılama',
        body: 'Kaynak verinin mutabakatını yapar ve sistemlerin nerede ayrıştığını bulurum. Asıl problem genellikle burada çıkar.',
        output: 'Kaynak veri değerlendirmesi, KPI tanımları ve raporlama öncelikleri.',
      },
      {
        stage: 'Teslim',
        body: 'Görünüm, uzlaşılan tanımlar üzerine kurulur; yenileme otomatikleştirilir ve veri soyağacı görünür kılınır.',
        output: 'Raporlama görünümü, veri hattı ve her tanımın dokümantasyonu.',
      },
      {
        stage: 'Devir',
        body: 'Ekibiniz sahiplenir; buna, üzerinde uzlaşılmışları bozmadan yeni bir ölçüt eklemenin nasıl yapılacağı da dâhildir.',
        output: 'Dokümantasyon, bir gözden geçirme ve bir tanımı değiştirme yordamı.',
      },
    ],
    inputs: [
      'Sayıların geldiği sistemlere salt okunur erişim.',
      'Şu anda raporu kim birleştiriyorsa o kişi — cesetlerin nerede gömülü olduğunu bilir.',
      'Ne kadar kusurlu olursa olsun mevcut rapor paketi.',
      'İki departman anlaşamadığında bir ölçütün ne anlama geldiğini karara bağlayabilecek bir karar verici.',
    ],
    boundaries: {
      inScope: [
        'Kaynak mutabakatı, ölçüt tanımı, veri hattı ve raporlama görünümleri.',
        'Şu anda elle birleştirilen bir raporun otomatikleştirilmesi.',
        'Bir rakamın kaynak satırlarına kadar izlenebilir kılınması.',
      ],
      outOfScope: [
        'Muhasebe veya ERP sisteminizin değiştirilmesi.',
        'Mali müşavirinize ait olan yasal veya düzenleyici raporlama.',
        'Kendisi için var olan bir pano. Kararlar buna ihtiyaç duymuyorsa bunu söylerim.',
      ],
    },
    offer: {
      name: 'Raporlama tanılaması',
      output: 'Bir kaynak veri değerlendirmesi, KPI tanımları ve raporlama öncelikleri.',
    },
    faqs: [
      {
        q: 'Zaten kimsenin bakmadığı panolarımız var. Bunun farkı ne?',
        a: 'Onlar genelde bir karardan değil, verinin neyi gösterebileceğinden yola çıkar. Karardan başlamak, ölçüt kümesini bakımı yapılabilecek kadar küçük ve açılmaya değecek kadar ilgili tutan şeydir.',
      },
      {
        q: 'Hangi aracı kullanacaksınız?',
        a: 'İşe yaradığı sürece elinizde ne varsa onu. Yeni bir platform getirmek sonrasında ekibinizin taşıdığı bir maliyettir; dolayısıyla benim ona aşinalığımdan öte bir gerekçesi olmalı.',
      },
      {
        q: 'İki sistemimiz ciro konusunda anlaşmıyor. Bunu düzeltebilir misiniz?',
        a: 'Nerede ayrıştıklarını bulup tam olarak belgeleyebilirim. Hangisinin doğru olduğuna karar vermek bir iş yargısıdır ve sizde kalır.',
      },
      {
        q: 'Bu yasal raporlama mı?',
        a: 'Hayır. Bu, iç kararlar için yönetim raporlamasıdır. Yasal beyanlar mali müşavirinizde kalır.',
      },
    ],
    stack: ['SQL', 'Python', 'Power BI', 'KNIME', 'Excel'],
    ctaTitle: 'Her ayın ilk haftasını rapor birleştirerek mi geçiriyorsunuz?',
    ctaBody: 'Hangi kararları beslediğini ve sayıların nereden geldiğini anlatın.',
    ctaButton: 'Raporlama tanılamasını konuşalım',
  },
  'cross-border': {
    name: 'Sınır ötesi danışmanlık',
    title: 'İtalya–Türkiye sınır ötesi iş danışmanlığı',
    summary:
      'İtalya ile Türkiye arasında iş yapan şirketler için koordinasyon: işin kapsamlanması, iki iş kültürü arasında çeviri ve her adımın gerektirdiği lisanslı meslek mensuplarının devreye alınması.',
    problem:
      'İtalya ile Türkiye arasında iş yapmak, aynı anda iki düzenleyici sistem, iki dil ve iki meslek normları kümesiyle uğraşmak demektir. Pahalı hatalar nadiren görünür olanlardır — hangi soruların sorulacağını ya da belirli bir adım için hangi meslek mensubunun yasal olarak gerektiğini bilmemekten doğarlar.',
    audience: 'İtalyan ve Türk pazarları arasında hareket eden ve bağlanmadan önce zemini haritalandırması gereken şirketler ve kurucular.',
    deliverable: {
      title: 'Elinize ne geçiyor',
      body:
        'Durumunuzun gerçekte neyi gerektirdiğine, her parçayı yapmaya kimin yetkili olduğuna ve neyi kapsayacağına dair net bir tablo — hiçbirine bağlanmadan önce.',
      items: [
        'Yazılı bir kapsam: ne yapmaya çalıştığınız ve bunun hangi adımlara ayrıldığı.',
        'Hangi adımların lisanslı bir meslek mensubu gerektirdiğini, hangilerinin gerektirmediğini adlandıran bir sorumluluk haritası.',
        'Düzenlemeye tabi her adımın ihtiyaç duyduğu nitelikli meslek mensuplarıyla tanıştırma.',
        'Sıra ve bağımlılıklar; böylece hiçbir şey kimsenin başlamadığı bir adımı bekleyerek tıkanmaz.',
      ],
    },
    evidence:
      'Bu, danışmanlık ve koordinasyon işidir ve arkasındaki işler özeldir. Bu sitede buna dair bir vaka çalışması yok; bu boşluğu doğrulanamayacak bir şeyle doldurmaktansa görünür bırakmayı tercih ederim.',
    process: [
      {
        stage: 'Keşif',
        body: 'Kimse yapılardan söz etmeden önce ticari olarak neyi başarmaya çalıştığınızı anlamak.',
        output: 'Ticari hedefin ve üzerindeki kısıtların yazılı beyanı.',
      },
      {
        stage: 'Kapsamlama',
        body: 'Hedefi adımlara ayırmak ve hangilerinin hangi ülkede lisanslı bir meslek mensubu gerektirdiğini belirlemek.',
        output: 'Doğrulanmış kapsam, sorumluluklar ve gerekli meslek ortakları.',
      },
      {
        stage: 'Koordinasyon',
        body: 'Doğru meslek mensuplarını tanıştırmak, sırayı akışta tutmak ve taraflar arasında dilsel ve ticari çeviri yapmak.',
        output: 'Adlandırılmış sahipleri ve herkesin görebildiği bir sırası olan etkin bir iş akışı.',
      },
      {
        stage: 'Devir',
        body: 'Düzenlemeye tabi işi yapan meslek mensuplarıyla doğrudan ilişkiler sizde olur. Bu bir yan etki değil, asıl amaçtır.',
        output: 'Doğrudan ilişkiler ve neyin neden kararlaştırıldığının kaydı.',
      },
    ],
    inputs: [
      'Ticari olarak neyi, ne zamana kadar başarmak istediğiniz.',
      'Varsa mevcut şirket yapınız.',
      'İki ülkede hâlihazırda sahip olduğunuz meslek ilişkileri.',
      'Karmaşıklık iştahınız — bazı yapılar yasaldır ama yine de yükü değmez.',
    ],
    boundaries: {
      inScope: [
        'Sınır ötesi bir projenin kapsamlanması, sıralanması ve koordinasyonu.',
        'Belirli bir adımın hangi düzenlemeye tabi meslek mensubunu gerektirdiğinin belirlenmesi.',
        'Taraflar arasında ticari ve kültürel çeviri.',
      ],
      outOfScope: [
        'Vergi danışmanlığı, hukuki danışmanlık, noter işlemleri, yasal muhasebe ve şirket kuruluş tescilleri. Bunlar lisanslı meslek mensuplarına ayrılmıştır ve burada yapılmaz.',
        'Yatırım tavsiyesi ve düzenlemeye tabi her türlü finansal hizmet.',
        'Belirli bir vergi veya hukuk sonucunun elde edileceğine dair her türlü beyan.',
      ],
    },
    offer: {
      name: 'Sınır ötesi keşif',
      output: 'Doğrulanmış bir kapsam, bir sorumluluk haritası ve belirlenmiş gerekli meslek ortakları.',
    },
    faqs: [
      {
        q: 'İtalyan şirketimi kurabilir misiniz?',
        a: 'Hayır. İtalya’da şirket kuruluşu, lisanslı meslek mensuplarına ayrılmış noter işlemleri ve tescilleri içerir. Durumunuzun neyi gerektirdiğini kapsamlayabilir, hangi meslek mensuplarının gerektiğini söyleyebilir ve işi koordine edebilirim — bu, onu yapmaktan farklı ve daha dar bir şeydir.',
      },
      {
        q: 'Vergi durumum hakkında danışmanlık verebilir misiniz?',
        a: 'Hayır. Vergi danışmanlığı düzenlemeye tabidir ve nitelikli bir commercialista ya da vergi avukatına aittir. Doğru soruların onlara ulaşmasını ve yanıtlarının iki tarafta da anlaşılmasını sağlayabilirim.',
      },
      {
        q: 'O hâlde size ne için ödeme yapıyorum?',
        a: 'Projenin gerçekte nelerden oluştuğunu, her adımın hangi meslek mensubunu gerektirdiğini ve iki dil ile iki sistem arasında bir süreci nasıl akışta tutacağınızı bilmek için. Bu koordinasyondur ve sınırları konusunda net olmaya değer.',
      },
      {
        q: 'Bir sonuç garanti ediyor musunuz?',
        a: 'Hayır. Size karşı dürüst olabilecek konumdaki hiç kimse etmez; buradaki sonuçlar ikimizin de kontrol etmediği kurumlara ve meslek mensuplarına bağlıdır.',
      },
    ],
    stack: [],
    ctaTitle: 'İtalya ile Türkiye arasında bir iş mi taşıyorsunuz?',
    ctaBody: 'Ne yapmak istediğinizi anlatın, bunun gerçekte neyi kapsadığını söyleyeyim — başka yere yönlendireceğim kısımlar dâhil.',
    ctaButton: 'Sınır ötesi keşfi konuşalım',
    responsibilities: [
      {
        actor: 'Bizzat yaptıklarım',
        does: 'Kapsamlama, sıralama, koordinasyon ve taraflar arasında ticari ile kültürel çeviri.',
      },
      {
        actor: 'Alvolo Consulting’in yaptıkları',
        does: 'Alvolo Consulting, bu koridordaki iş için kurduğum danışmanlık pratiğidir. Uygun araç olduğunda işler onun üzerinden yürür.',
      },
      {
        actor: 'Lisanslı meslek mensubunun yaptıkları',
        does: 'Noter işlemleri, şirket kuruluş tescilleri, vergi danışmanlığı ve görüşleri, hukuki danışmanlık, yasal muhasebe ve denetim. Bunlar, doğrudan ilişki kurduğunuz nitelikli meslek mensuplarınca yapılır — asla benim tarafımdan değil.',
      },
    ],
    regulatedNotice:
      'İtalya’da şirket kuruluşu, vergi yapılandırması, hukuki danışmanlık ve yasal muhasebe lisanslı meslek mensuplarına ayrılmıştır. Bu hizmetler burada verilmez. Verilen şey, bunların etrafındaki kapsamlama ve koordinasyon ile bunları yapmaya yetkili kişilerle tanıştırmadır.',
  },
};

const it: CopyByService = {
  'document-intelligence': {
    name: 'Document intelligence',
    title: 'Document intelligence e AI applicata',
    summary:
      'Revisione automatica per i documenti che il tuo team legge a mano — contratti, bilanci, dichiarazioni, fatture — costruita in modo che ogni risultato sia verificabile.',
    problem:
      'Qualcuno nel tuo team legge lo stesso tipo di documento in continuazione: contratti fornitori, fatture in entrata, polizze, report di sostenibilità. La lettura è lenta, cambia da persona a persona e, quando mesi dopo una decisione viene messa in discussione, non c’è traccia del perché quel documento sia stato trattato così.',
    audience:
      'Team con una coda ricorrente di documenti dove il collo di bottiglia è il giudizio di una persona. Funziona meglio dove sbagliare costa, perché lì il risultato deve essere difendibile prima che veloce.',
    deliverable: {
      title: 'Cosa ti resta',
      body:
        'Un flusso di lavoro delimitato su un tipo di documento, con una valutazione leggibile e un percorso di eccezione per tutto ciò che il modello non deve decidere da solo.',
      items: [
        'Una pipeline che trasforma un documento in campi strutturati, conservando per ciascuno il passaggio di origine.',
        'Una valutazione su un campione etichettato dal tuo team, che riporta dove il sistema concorda con i tuoi revisori e dove no.',
        'Una coda di eccezioni: i casi instradati a una persona e la regola che decide cosa ci finisce.',
        'Un resoconto scritto delle modalità di errore emerse in valutazione.',
      ],
    },
    evidence:
      'Il caso di studio sul greenwashing è la versione onesta di questo lavoro: mostra un rilevatore che segue da vicino il giudizio esperto su un punteggio continuo, pur mancando la maggior parte degli elementi che dovrebbe segnalare, e spiega perché questa combinazione lo rende uno strumento di triage e non un filtro.',
    process: [
      {
        stage: 'Discovery',
        body: 'Guardiamo esempi reali del documento e la decisione che ne discende, e concordiamo cosa significhi «corretto» prima di costruire qualsiasi cosa.',
        output: 'Una definizione scritta del problema, con la decisione, il tipo di documento e la definizione di risultato corretto.',
      },
      {
        stage: 'Pilota delimitato',
        body: 'Un tipo di documento, un flusso. Il tuo team etichetta un campione; io ci lavoro sopra e valuto su esempi tenuti da parte.',
        output: 'Una pipeline funzionante, risultati di valutazione sui tuoi documenti e il processo di revisione delle eccezioni.',
      },
      {
        stage: 'Consegna',
        body: 'La pipeline viene integrata dove il lavoro avviene davvero, con il passaggio di revisione presente dal primo giorno.',
        output: 'Flusso in produzione, runbook e il monitoraggio che segnala quando la qualità si degrada.',
      },
      {
        stage: 'Passaggio di consegne',
        body: 'Il tuo team lo gestisce. Documento come rivalutarlo quando i documenti cambiano, perché cambieranno.',
        output: 'Documentazione, impianto di valutazione e una sessione con chi lo prenderà in carico.',
      },
    ],
    inputs: [
      'Un campione rappresentativo dei documenti, compresi quelli scomodi.',
      'Accesso a una persona che possa dire com’è fatto un risultato corretto.',
      'Tempo dei tuoi revisori per etichettare un campione — di solito è il vero vincolo.',
      'Chiarezza su cosa può uscire dalla vostra infrastruttura e cosa no.',
    ],
    boundaries: {
      inScope: [
        'Estrazione, classificazione, ordinamento e instradamento su un tipo di documento definito.',
        'Valutazione rispetto a etichette prodotte dal tuo team.',
        'Il processo di eccezione e l’interfaccia in cui lavora chi rivede.',
      ],
      outOfScope: [
        'Decisioni non presidiate. Tutto ciò che ha conseguenze mantiene una persona nel ciclo.',
        'Pareri legali, fiscali o di revisione su cosa significhi un documento.',
        'Un sistema generico che gestisca qualsiasi documento abbiate. I piloti riguardano un solo tipo.',
      ],
    },
    offer: {
      name: 'Pilota di document intelligence',
      output: 'Un flusso delimitato, risultati di valutazione sui tuoi documenti e un processo di revisione delle eccezioni.',
    },
    faqs: [
      {
        q: 'Sostituirà la persona che oggi li legge?',
        a: 'No, e non lo costruirei così. Cambia cosa legge per prima e le dà la ragione dell’ordinamento. Nel progetto di ricerca dietro questo servizio, il rilevatore migliore mancava comunque la maggior parte degli elementi che un revisore avrebbe segnalato — ed è esattamente per questo che il passaggio di revisione resta.',
      },
      {
        q: 'I nostri dati escono dai nostri sistemi?',
        a: 'È una decisione che prendiamo in discovery, non un’impostazione predefinita. Alcuni approcci girano interamente sulla vostra infrastruttura; altri usano un modello ospitato, il che significa che il testo del documento va a quel fornitore. Vi dico quale serve prima di impegnarci.',
      },
      {
        q: 'Quanto è accurato?',
        a: 'Non è rispondibile prima di avere i vostri documenti e le vostre etichette. Qualsiasi numero citato prima riguarda i dati di qualcun altro. Stabilire il numero per i vostri è ciò a cui serve il pilota.',
      },
      {
        q: 'E se la valutazione dicesse che non funziona abbastanza bene?',
        a: 'Allora quello è il risultato del pilota e avete speso una cifra delimitata per scoprirlo. È proprio per questo esito che il pilota è piccolo e valutato prima di qualsiasi integrazione.',
      },
    ],
    stack: ['Python', 'spaCy', 'Hugging Face Transformers', 'Sentence Transformers', 'PyTorch', 'scikit-learn'],
    ctaTitle: 'Hai una coda di documenti che rallenta una decisione?',
    ctaBody: 'Dimmi quale documento e quale decisione, e ti dirò se vale la pena fare un pilota.',
    ctaButton: 'Parliamo di un pilota di document intelligence',
  },
  forecasting: {
    name: 'Previsione & analisi finanziaria',
    title: 'Previsione e analisi finanziaria',
    summary:
      'Previsioni e modelli finanziari che dichiarano le proprie ipotesi e la propria incertezza, così che una decisione si prenda avendo davanti l’intervallo e non un numero solo.',
    problem:
      'Devi decidere ora qualcosa che dipende da cosa succederà dopo — quanto tenere a magazzino, se la cassa copre i prossimi due trimestri, se un cambio di prezzo si ripaga. Il foglio di calcolo che risponde produce un numero solo, e nessuno sa dire quanto quel numero possa essere sbagliato.',
    audience:
      'Team di finanza e operations che prendono decisioni ricorrenti in condizioni di incertezza: pianificazione della domanda e della cassa, prezzi, capacità, scenari per il consiglio.',
    deliverable: {
      title: 'Cosa ti resta',
      body:
        'Un modello interrogabile, confrontato con la baseline semplice che deve battere, con l’incertezza dichiarata e non sottintesa.',
      items: [
        'Una previsione con intervalli e una validazione che mostra come si è comportata su periodi mai visti.',
        'Un confronto con una baseline naive, perché un modello che non batte il numero del mese scorso non vale la manutenzione.',
        'Le ipotesi scritte come parametri modificabili, non come costanti sepolte nel codice.',
        'Una raccomandazione: proseguire, tenerlo semplice o fermarsi.',
      ],
    },
    evidence:
      'L’ottimizzatore di portafoglio su questa pagina è il metodo reso ispezionabile: ipotesi visibili, view modificabili ed esiti mostrati come distribuzione anziché come proiezione. Gira su ipotesi di mercato inventate, ed è dichiarato apertamente — dimostra come costruisco, non cosa farà un mercato.',
    process: [
      {
        stage: 'Discovery',
        body: 'Individuiamo la decisione a cui la previsione serve e quanta accuratezza le occorra davvero. Spesso meno del previsto.',
        output: 'La decisione, la sua cadenza e l’accuratezza che la cambierebbe — messe per iscritto.',
      },
      {
        stage: 'Baseline e valutazione',
        body: 'Stabilisco cosa ottiene una previsione naive sul vostro storico, poi verifico se qualcosa di più elaborato la batte.',
        output: 'Un confronto con la baseline, un approccio di validazione e un passo successivo raccomandato.',
      },
      {
        stage: 'Consegna',
        body: 'Il modello scelto viene costruito dove il vostro team può eseguirlo, con gli intervalli in evidenza e non nascosti.',
        output: 'Il modello, la sua interfaccia e la documentazione di ogni ipotesi.',
      },
      {
        stage: 'Passaggio di consegne',
        body: 'La rivalidazione fa parte della consegna: come accorgersi che il modello ha smesso di funzionare.',
        output: 'Runbook, procedura di rivalidazione e il monitoraggio che la sostiene.',
      },
    ],
    inputs: [
      'Storico al livello di dettaglio a cui si prende la decisione, con le sue lacune note.',
      'La decisione stessa e chi la prende.',
      'Le regole strutturali che l’esito attraversa — scaglioni fiscali, soglie, covenant.',
      'Gli eventi una tantum noti nello storico, così da non impararli come schemi.',
    ],
    boundaries: {
      inScope: [
        'Previsione su serie storiche, modellazione di scenari, analisi di sensitività e di stress.',
        'Confronto con la baseline e validazione fuori campione.',
        'Modelli finanziari con le ipotesi esposte.',
      ],
      outOfScope: [
        'Previsioni di prezzi di mercato e qualsiasi suggerimento che una previsione elimini l’incertezza.',
        'Consulenza in materia di investimenti, gestione di portafoglio o negoziazione di qualsiasi tipo.',
        'Accuratezza garantita. Ciò che è ottenibile si stabilisce con la validazione, non si promette prima.',
      ],
    },
    offer: {
      name: 'Valutazione previsionale',
      output: 'Un confronto con la baseline, un approccio di validazione e un passo successivo raccomandato.',
    },
    faqs: [
      {
        q: 'Quanto sarà accurata la previsione?',
        a: 'Non è conoscibile prima di averla validata sul vostro storico. La valutazione serve a rispondere onestamente, e a volte la risposta è che una baseline semplice basta già e non conviene pagare di più.',
      },
      {
        q: 'Il nostro storico è disordinato e incompleto. È squalificante?',
        a: 'No, ma cambia ciò che è ottenibile e va detto subito. Parte della valutazione è stabilire cosa i dati sosterranno e cosa no.',
      },
      {
        q: 'Potete prevedere il nostro titolo o un mercato?',
        a: 'No. Non prendo quel tipo di lavoro, e chi ve lo offre con sicurezza vi sta dicendo qualcosa su di sé.',
      },
      {
        q: 'Perché insistete nel mostrare un intervallo?',
        a: 'Perché l’intervallo è la parte rilevante per la decisione. Un numero solo invita a un piano privo di alternative.',
      },
    ],
    stack: ['Python', 'pandas', 'statsmodels', 'scikit-learn', 'PyTorch', 'SQL'],
    ctaTitle: 'Stai prendendo una decisione che dipende da una previsione?',
    ctaBody: 'Descrivi la decisione e i dati che hai, e ti dirò cosa è realisticamente ottenibile.',
    ctaButton: 'Parliamo di una valutazione previsionale',
  },
  reporting: {
    name: 'Business intelligence & reporting',
    title: 'Business intelligence e reporting',
    summary:
      'Sostituisci un reporting mensile frammentato con un’unica vista gestionale affidabile, partendo dalle decisioni che il tuo team deve davvero prendere.',
    problem:
      'Sostituisci un reporting mensile frammentato con un’unica vista gestionale affidabile. Oggi i numeri si assemblano a mano da più sistemi, due reparti citano cifre diverse per lo stesso mese e quando il pacchetto è pronto la riunione per cui era stato costruito è già passata.',
    audience:
      'Imprenditori e responsabili finanziari che hanno superato i fogli di calcolo ma non hanno bisogno — e non dovrebbero comprare — una piattaforma dati enterprise.',
    deliverable: {
      title: 'Cosa ti resta',
      body:
        'Un piccolo insieme di metriche su cui tutti concordano, calcolate sempre allo stesso modo, da fonti riconciliate.',
      items: [
        'Una valutazione dei dati di origine: cosa è affidabile, cosa è in conflitto e cosa manca.',
        'Definizioni scritte dei KPI — calcolo esatto e fonte per ciascuno, così che due persone non possano calcolarlo in modo diverso.',
        'Una vista di reporting costruita su quelle definizioni, aggiornata su base pianificata anziché a mano.',
        'Le note di riconciliazione che spiegano ogni cifra diversa da quanto un sistema riportava prima.',
      ],
    },
    evidence:
      'È il servizio con meno prove pubblicate alle spalle, e preferisco dirlo che gonfiarlo. Ciò che posso mostrare è l’approccio: il portale demo applica lo stesso principio a un singolo bilancio, esponendo ogni cifra con le righe da cui deriva invece di chiedervi di fidarvi del totale.',
    process: [
      {
        stage: 'Discovery',
        body: 'Si parte individuando le decisioni che il tuo team deve prendere, e si risale al più piccolo insieme di metriche che le informerebbe.',
        output: 'Un elenco di decisioni e un insieme candidato di metriche, deliberatamente breve.',
      },
      {
        stage: 'Diagnostica',
        body: 'Riconcilio i dati di origine e trovo dove i sistemi divergono. Di solito è lì che sta il problema vero.',
        output: 'Valutazione dei dati di origine, definizioni dei KPI e priorità di reporting.',
      },
      {
        stage: 'Consegna',
        body: 'Costruisco la vista sulle definizioni concordate, con l’aggiornamento automatizzato e la tracciabilità visibile.',
        output: 'La vista di reporting, la sua pipeline e la documentazione di ogni definizione.',
      },
      {
        stage: 'Passaggio di consegne',
        body: 'Il team la possiede, compreso come aggiungere una metrica senza rompere quelle già concordate.',
        output: 'Documentazione, una sessione guidata e la procedura per cambiare una definizione.',
      },
    ],
    inputs: [
      'Accesso in sola lettura ai sistemi da cui provengono i numeri.',
      'Chi oggi assembla il report — sa dove sono sepolti i cadaveri.',
      'Il pacchetto di reporting esistente, per quanto imperfetto.',
      'Un decisore che possa stabilire cosa significhi una metrica quando due reparti non concordano.',
    ],
    boundaries: {
      inScope: [
        'Riconciliazione delle fonti, definizione delle metriche, pipeline e viste di reporting.',
        'Automazione di un report oggi assemblato a mano.',
        'Rendere una cifra tracciabile fino alle righe di origine.',
      ],
      outOfScope: [
        'Sostituire il vostro gestionale o ERP.',
        'Reporting civilistico o regolamentare, che resta al vostro commercialista.',
        'Una dashboard fine a sé stessa. Se le decisioni non ne hanno bisogno, ve lo dico.',
      ],
    },
    offer: {
      name: 'Diagnostica di reporting',
      output: 'Una valutazione dei dati di origine, le definizioni dei KPI e le priorità di reporting.',
    },
    faqs: [
      {
        q: 'Abbiamo già dashboard che nessuno guarda. In cosa è diverso?',
        a: 'Di solito quelle partono da cosa i dati possono mostrare invece che da una decisione. Partire dalla decisione è ciò che tiene l’insieme di metriche abbastanza piccolo da mantenere e abbastanza rilevante da aprire.',
      },
      {
        q: 'Quale strumento userete?',
        a: 'Quello che avete già, dove funziona. Introdurre una nuova piattaforma è un costo che il vostro team porta dopo, quindi serve una ragione oltre alla mia familiarità.',
      },
      {
        q: 'Due sistemi non concordano sul fatturato. Potete sistemarlo?',
        a: 'Posso trovare dove divergono e documentarlo con precisione. Decidere quale sia giusto è un giudizio aziendale, e resta a voi.',
      },
      {
        q: 'È reporting civilistico?',
        a: 'No. Questo è reporting gestionale per decisioni interne. Il bilancio d’esercizio resta al vostro commercialista.',
      },
    ],
    stack: ['SQL', 'Python', 'Power BI', 'KNIME', 'Excel'],
    ctaTitle: 'Passi la prima settimana di ogni mese ad assemblare un report?',
    ctaBody: 'Dimmi quali decisioni alimenta e da dove arrivano i numeri.',
    ctaButton: 'Parliamo di una diagnostica di reporting',
  },
  'cross-border': {
    name: 'Consulenza transfrontaliera',
    title: 'Consulenza aziendale transfrontaliera, Italia e Turchia',
    summary:
      'Coordinamento per imprese che operano tra Italia e Turchia: definire il perimetro del lavoro, tradurre tra due culture d’impresa e coinvolgere i professionisti abilitati che ogni passaggio richiede.',
    problem:
      'Operare tra Italia e Turchia significa avere a che fare con due sistemi normativi, due lingue e due insiemi di prassi professionali insieme. Gli errori costosi sono raramente quelli visibili: nascono dal non sapere quali domande porre, o quale professionista sia legalmente necessario per un dato passaggio.',
    audience: 'Imprese e fondatori che si muovono tra il mercato italiano e quello turco e hanno bisogno di mappare il terreno prima di impegnarsi.',
    deliverable: {
      title: 'Cosa ti resta',
      body:
        'Un quadro chiaro di cosa la tua situazione richieda davvero, chi sia qualificato per ciascuna parte e cosa comporterà — prima di impegnarti su qualunque cosa.',
      items: [
        'Un perimetro scritto: cosa stai cercando di fare e in quali passaggi si scompone.',
        'Una mappa delle responsabilità che indica quali passaggi richiedono un professionista abilitato e quali no.',
        'Presentazioni ai professionisti qualificati che ogni passaggio regolamentato richiede.',
        'La sequenza e le dipendenze, così che nulla si blocchi in attesa di un passaggio che nessuno ha avviato.',
      ],
    },
    evidence:
      'Questo è lavoro di consulenza e coordinamento, e gli incarichi che ci stanno dietro sono privati. Su questo sito non c’è un caso di studio, e preferisco lasciare la lacuna visibile piuttosto che riempirla con qualcosa di non verificabile.',
    process: [
      {
        stage: 'Discovery',
        body: 'Capire cosa stai davvero cercando di ottenere sul piano commerciale, prima che qualcuno parli di strutture.',
        output: 'Una formulazione scritta dell’obiettivo commerciale e dei suoi vincoli.',
      },
      {
        stage: 'Perimetrazione',
        body: 'Scomporre l’obiettivo in passaggi e individuare quali richiedono un professionista abilitato e in quale giurisdizione.',
        output: 'Perimetro confermato, responsabilità e partner professionali necessari.',
      },
      {
        stage: 'Coordinamento',
        body: 'Presentare i professionisti giusti, tenere in movimento la sequenza e tradurre tra le parti — linguisticamente e commercialmente.',
        output: 'Un flusso di lavoro attivo con responsabili nominati e una sequenza visibile a tutti.',
      },
      {
        stage: 'Passaggio di consegne',
        body: 'I rapporti diretti con i professionisti che svolgono il lavoro regolamentato restano tuoi. È il punto, non un effetto collaterale.',
        output: 'Rapporti diretti e un resoconto di cosa è stato deciso e perché.',
      },
    ],
    inputs: [
      'Cosa vuoi ottenere commercialmente, ed entro quando.',
      'La struttura societaria esistente, se c’è.',
      'I rapporti professionali che già hai in uno dei due paesi.',
      'La tua tolleranza alla complessità — alcune strutture sono legittime e comunque non valgono il peso gestionale.',
    ],
    boundaries: {
      inScope: [
        'Perimetrazione, sequenziamento e coordinamento di un progetto transfrontaliero.',
        'Individuazione di quali professionisti regolamentati richieda un dato passaggio.',
        'Traduzione commerciale e culturale tra le parti.',
      ],
      outOfScope: [
        'Consulenza fiscale, consulenza legale, atti notarili, contabilità civilistica e pratiche di costituzione societaria. Sono riservate a professionisti abilitati e non vengono svolte qui.',
        'Consulenza in materia di investimenti e qualsiasi servizio finanziario regolamentato.',
        'Qualsiasi assicurazione che un determinato esito fiscale o legale sarà ottenuto.',
      ],
    },
    offer: {
      name: 'Discovery transfrontaliera',
      output: 'Un perimetro confermato, una mappa delle responsabilità e i partner professionali necessari individuati.',
    },
    faqs: [
      {
        q: 'Potete costituire la mia società italiana?',
        a: 'No. La costituzione in Italia comporta atti notarili e adempimenti riservati a professionisti abilitati. Posso definire cosa richieda la vostra situazione, dirvi quali professionisti servano e coordinare il lavoro — cosa diversa e più circoscritta dal farlo.',
      },
      {
        q: 'Potete consigliarmi sulla mia posizione fiscale?',
        a: 'No. La consulenza fiscale è regolamentata e spetta a un commercialista o a un avvocato tributarista. Posso assicurarmi che le domande giuste arrivino a loro e che le risposte siano comprese da entrambe le parti.',
      },
      {
        q: 'Allora per cosa vi sto pagando?',
        a: 'Per sapere in cosa consiste davvero il progetto, quale professionista serva a ciascun passaggio e come tenere in movimento un processo tra due lingue e due sistemi. È coordinamento, ed è giusto essere precisi sui suoi limiti.',
      },
      {
        q: 'Garantite un risultato?',
        a: 'No. Nessuno in condizione di esservi onesto lo fa, e qui gli esiti dipendono da autorità e professionisti che nessuno dei due controlla.',
      },
    ],
    stack: [],
    ctaTitle: 'Stai spostando un’attività tra Italia e Turchia?',
    ctaBody: 'Descrivi cosa vuoi fare e ti dirò cosa comporta davvero — comprese le parti che affiderei ad altri.',
    ctaButton: 'Parliamo di una discovery transfrontaliera',
    responsibilities: [
      {
        actor: 'Cosa faccio personalmente',
        does: 'Perimetrazione, sequenziamento, coordinamento e traduzione commerciale e culturale tra le parti.',
      },
      {
        actor: 'Cosa fa Alvolo Consulting',
        does: 'Alvolo Consulting è la pratica di consulenza che ho fondato per il lavoro su questo corridoio. Gli incarichi passano da lì quando è il veicolo appropriato.',
      },
      {
        actor: 'Cosa fa un professionista abilitato',
        does: 'Atti notarili, pratiche di costituzione, consulenza e pareri fiscali, consulenza legale, contabilità civilistica e revisione. Sono svolti da professionisti qualificati con cui avete un rapporto diretto — mai da me.',
      },
    ],
    regulatedNotice:
      'In Italia costituzione societaria, strutturazione fiscale, consulenza legale e contabilità civilistica sono riservate a professionisti abilitati. Quei servizi non sono forniti qui. Ciò che viene fornito è la perimetrazione e il coordinamento attorno a essi, e le presentazioni alle persone qualificate a svolgerli.',
  },
};

const COPY: Record<Locale, CopyByService> = { en, tr, it };

export const getAllServiceCopy = (locale: Locale): CopyByService => COPY[locale];
