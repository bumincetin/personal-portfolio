import type { Locale } from '../translations';
import type { EvidenceKey } from './evidence';

/**
 * The evidence library.
 *
 * Structure is deliberately split in two: a language-independent spine (dates,
 * maturity, links, which evidence entries apply) and localised prose. A single
 * spine is what stops the English and Italian pages describing different
 * projects, which is how the old outbound project cards had already drifted --
 * they were English-only inside three localised routes.
 *
 * What is *not* here matters as much as what is. The Fedrigoni, N26 and
 * ImpactScope engagements are real and dated on the About page, but there is no
 * public artefact and no client permission for any of them, so none of them is
 * written up as a case study. Two research projects have published repositories
 * and are written up from those; two are first-party demonstrations built for
 * this site and are labelled as synthetic, not as engagements.
 */

/**
 * How far a piece of work actually got. Every study carries one, and the label
 * is rendered next to the title so a research artefact is never read as a
 * delivered engagement.
 */
export type Maturity =
  | 'research'
  | 'prototype'
  | 'internal-deployment'
  | 'client-engagement'
  | 'maintained-product'
  /** Not an engagement. Built to demonstrate a method on invented inputs. */
  | 'synthetic-demo';

export type ServiceKey = 'document-intelligence' | 'forecasting' | 'reporting' | 'cross-border';

export interface CaseStudySpine {
  slug: string;
  maturity: Maturity;
  service: ServiceKey;
  /** ISO dates. `end` absent means the record does not state an end. */
  dates: { start: string; end?: string };
  /** Set only where the artefact carries one. */
  version?: string;
  /** ISO date the underlying evidence was last checked against its source. */
  evidenceCheckedOn?: string;
  evidence: EvidenceKey[];
  links: { kind: 'repository' | 'report'; href: string; external: boolean }[];
  /** Which figure to draw. Each has a hand-written accessible description. */
  visual: 'score-correlation' | 'seat-distribution' | 'efficient-frontier' | 'ratio-trace';
  featured: boolean;
}

const CASE_STUDIES: readonly CaseStudySpine[] = [
  {
    slug: 'greenwashing-risk-scoring',
    maturity: 'research',
    service: 'document-intelligence',
    dates: { start: '2024-09', end: '2026-01' },
    version: 'v3',
    evidenceCheckedOn: '2026-01-29',
    evidence: ['gw-sample-size', 'gw-alpha', 'gw-pearson-v1', 'gw-recall-v3'],
    links: [
      { kind: 'repository', href: 'https://github.com/bumincetin/greenwashing-detection', external: true },
      {
        kind: 'report',
        href: 'https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md',
        external: true,
      },
    ],
    visual: 'score-correlation',
    featured: true,
  },
  {
    slug: 'parliamentary-seat-forecast',
    maturity: 'research',
    service: 'forecasting',
    dates: { start: '2023-01', end: '2023-06' },
    evidence: [],
    links: [{ kind: 'repository', href: 'https://github.com/bumincetin/TurkishElection2023', external: true }],
    visual: 'seat-distribution',
    featured: true,
  },
  {
    slug: 'portfolio-optimizer',
    maturity: 'synthetic-demo',
    service: 'forecasting',
    dates: { start: '2026-08' },
    evidence: [],
    // The demo is bound into this volume as a page; there is nothing to link out to.
    links: [],
    visual: 'efficient-frontier',
    featured: true,
  },
] as const;

export interface CaseStudyCopy {
  title: string;
  /** One sentence for cards and meta descriptions. */
  summary: string;
  problem: string;
  audience: string;
  context: string;
  /** What the author actually did, in the first person. */
  role: string;
  dataProvenance: string;
  constraints: string;
  approach: string[];
  decisions: { decision: string; because: string }[];
  /** Empty string where there is no legitimate baseline to state. */
  baseline: string;
  evaluation: string;
  /** Only non-empty where the spine carries evidence keys. */
  results: string[];
  deliverables: string[];
  visualCaption: string;
  /** Read by screen readers in place of the figure. Must state the numbers. */
  visualAlt: string;
  consequences: string;
  limitations: string[];
  humanReview: string;
  nextAction: string;
}

type CopyBySlug = Record<string, CaseStudyCopy>;

const en: CopyBySlug = {
  'greenwashing-risk-scoring': {
    title: 'Scoring greenwashing risk in corporate environmental claims',
    summary:
      'A reviewer-facing detector that ranks environmental claims by how far the language outruns the commitment, evaluated against expert ratings on a 29-claim set.',
    problem:
      'A sustainability analyst reading corporate disclosures has to decide which environmental claims are worth challenging. The claims that matter are rarely false outright; they are vague where they should be specific, and the reading is slow, subjective and hard to defend when two analysts disagree.',
    audience:
      'Sustainability and ESG analysts, and the risk teams who have to justify why a particular claim was escalated.',
    context:
      'This began as my master’s thesis at Bocconi and became a working codebase with a validation harness. It is research: it was never deployed to a client and has no production users.',
    role:
      'I designed and built the whole system — claim extraction, the scoring components, the questionnaire used to collect expert ratings, and the validation scripts that produce the numbers below.',
    dataProvenance:
      'Environmental claims extracted from public corporate communications. The reference ratings are human judgements collected through a structured questionnaire, stored in the repository alongside the code.',
    constraints:
      'A reference set of twenty-nine rated claims. That was the honest ceiling on how much expert rating time was available, and it constrains every conclusion drawn from it.',
    approach: [
      'Extract discrete environmental claims from a document with spaCy rather than scoring the document as a whole, so a score can always be traced back to a sentence.',
      'Score each claim on several components — lexical density of promotional language, semantic specificity via ClimateBERT, and similarity to known narrative patterns via Sentence Transformers — and combine them under weights held in one config file.',
      'Validate against the human ratings with correlation and error metrics, not accuracy alone, because the underlying quantity is a degree of risk rather than a class.',
      'Keep three detector versions side by side and compare them on the same set, instead of reporting only the one that looks best.',
    ],
    decisions: [
      {
        decision: 'Reported correlation and error against continuous expert ratings before reporting any binary accuracy.',
        because:
          'Greenwashing risk is a matter of degree. Binarising it first would have hidden that the model tracks reviewer judgement well while still being a poor filter.',
      },
      {
        decision: 'Kept the simple lexical version (v1) as the reference model even though a transformer version existed.',
        because:
          'The semantic version (v2) correlated worse — 0.557 against v1’s 0.906 — and was retired. Using the more sophisticated architecture would have made a better story and a worse tool.',
      },
      {
        decision: 'Tuned v3 toward recall while holding precision at 1.00.',
        because:
          'A reviewer aid that raises a false alarm burns trust much faster than one that stays quiet. Missing items is recoverable by reading; a wrong accusation is not.',
      },
    ],
    baseline:
      'Two internal comparisons: a keyword-density detector, and the earlier v1 and v2 detectors scored on the same claims. There is no external published benchmark for this task to compare against.',
    evaluation:
      'Every detector version is scored on the same 29 human-rated claims. Continuous agreement is measured with Pearson, Spearman and Kendall correlation plus MAE and RMSE; flag/no-flag behaviour is measured with precision, recall and F1. Rater reliability is reported so the human ceiling is visible. The published figures were re-run and reproduced on 29 January 2026.',
    results: [
      'The v1 detector tracks expert ratings closely: Pearson r = 0.906, Spearman 0.811, MAE 0.206.',
      'As a flagging tool it is weak. v1 catches 15% of flaggable claims; the tuned v3 rule-based detector reaches 40%, at F1 0.571.',
      'Neither version produced a false positive on this set — precision was 1.00 — but on twenty-nine items that is a handful of correct calls, not a property of the method.',
      'The human raters agreed at Krippendorff’s α = 0.69, which is the ceiling any model is being measured against.',
    ],
    deliverables: [
      'A Python package that turns a document into per-claim scores with the contributing components exposed.',
      'A validation harness that regenerates every published metric from the stored ratings.',
      'Written reports covering the algorithm, the detector versions and the performance comparison.',
    ],
    visualCaption:
      'Detector score against expert rating across the 29 evaluated claims, with the three detector versions compared. Reproduced from the repository’s validation output, 29 January 2026.',
    visualAlt:
      'A comparison of three detector versions against expert ratings on 29 claims. Version 1 has the highest correlation at Pearson 0.906 and mean absolute error 0.206; version 3 reaches 0.793 with error 0.256; version 2 is the weakest at 0.557 and was retired. On binary flagging, version 1 recalls 15% of flaggable claims and version 3 recalls 40%, both at 100% precision.',
    consequences:
      'Used as intended, this shortens the queue rather than clearing it: an analyst reads the highest-scoring claims first and has a component breakdown to point at when explaining the ranking. It does not reduce the number of claims that must ultimately be read by a person.',
    limitations: [
      'Twenty-nine evaluated claims. Every figure here has wide uncertainty and none of it generalises to a new corpus without re-evaluation.',
      'The score is a ranking signal. It is not a calibrated probability, and a high score is not a finding that a company has greenwashed.',
      'Recall of 0.40 at best. Most flaggable claims are still missed.',
      'Evaluated on English-language corporate communications only.',
      'The scoring weights were tuned on the same small set they are reported against, so the figures are optimistic.',
    ],
    humanReview:
      'Every score is reviewed by a person before it reaches a conclusion. The system ranks and explains; it never issues a verdict about a company.',
    nextAction: 'Read the performance report',
  },
  'parliamentary-seat-forecast': {
    title: 'Forecasting parliamentary seat distribution under a threshold system',
    summary:
      'A bachelor thesis that treated a national election as a forecasting problem, converting vote-share estimates into seats through the actual allocation rules.',
    problem:
      'Vote-share polling does not answer the question people actually ask about an election. Under D’Hondt allocation with an electoral threshold, small changes in share produce large, discontinuous changes in seats, and the interesting uncertainty lives in that conversion rather than in the polling.',
    audience:
      'A methodological audience. It is published here as evidence of how I handle forecasting under structural rules, not as political analysis.',
    context:
      'My bachelor thesis in Economics, Management and Computer Science at Bocconi, completed in 2023. It is research, and it has not been maintained since.',
    role: 'Sole author: data collection, modelling and the written thesis.',
    dataProvenance:
      'Published historical results from the Supreme Election Council (YSK), demographic and socio-economic indicators from the Turkish Statistical Institute (TurkStat), public polling, and administrative boundary shapefiles.',
    constraints:
      'Province-level published data only, and a polling record whose historical accuracy is itself uncertain — which pushes the work toward modelling the conversion rules rather than trying to out-predict the polls.',
    approach: [
      'Assemble province-level historical results and align them with demographic and socio-economic indicators.',
      'Model vote share at province level rather than nationally, since seat allocation happens per constituency.',
      'Apply the actual seat-allocation rules, including the electoral threshold, so the discontinuities are reproduced rather than smoothed away.',
      'Examine where the forecast is most sensitive — which is concentrated in a small number of provinces near allocation boundaries.',
    ],
    decisions: [
      {
        decision: 'Forecast seats through the allocation rules rather than regressing on seat counts directly.',
        because:
          'Seat counts are a deterministic function of vote shares and rules. Learning that function from a handful of past elections would be fitting noise where the rule is already known exactly.',
      },
      {
        decision: 'Kept the analysis at province level.',
        because: 'A national vote-share error of one point matters enormously in some provinces and not at all in others.',
      },
    ],
    baseline: '',
    evaluation:
      'The repository documents the method and the data sources; it does not report a held-out accuracy figure. No performance claim is made here because none is published, and inventing one after the fact would not be a measurement.',
    results: [],
    deliverables: [
      'Notebooks covering vote-share estimation, seat allocation and the presidential race.',
      'An assembled province-level dataset joining electoral, demographic and socio-economic sources.',
      'The written thesis.',
    ],
    visualCaption:
      'How a small change in vote share moves seats under threshold-based allocation. Drawn from the thesis method; an illustration of the mechanism, not a forecast.',
    visualAlt:
      'A chart showing seat allocation as a function of vote share, with a sharp step at the electoral threshold: parties below it receive no seats, and parties just above it gain a disproportionate number. The relationship between share and seats is flat in the middle of the range and steep near the boundaries.',
    consequences:
      'The transferable point is about structure, not politics: when an outcome passes through a rule with cliffs in it, the forecast has to model the rule. The same reasoning applies to tax bands, covenant tests and volume tiers.',
    limitations: [
      'No held-out accuracy is published, so no predictive performance is claimed.',
      'Built for one election under one set of rules; it is not a general election model.',
      'Not maintained since 2023.',
    ],
    humanReview: 'Research output, read as such. Nothing here is a prediction offered for decision-making.',
    nextAction: 'View the repository',
  },
  'portfolio-optimizer': {
    title: 'A portfolio allocator you can interrogate in the browser',
    summary:
      'A Black–Litterman allocator with Monte Carlo stress paths, running entirely client-side on invented capital-market assumptions — built to make an opaque method inspectable.',
    problem:
      'Allocation models are usually presented as an answer: a pie chart with no visible link between the assumptions and the output. Anyone being shown one has no way to ask what happens if a view is wrong.',
    audience:
      'Anyone evaluating whether I can build a quantitative tool that a non-specialist can actually use. It is a demonstration of method.',
    context:
      'Built for this site. It is a synthetic demonstration, not an engagement and not a product: no client commissioned it and no one is using it to allocate money.',
    role: 'Designed and built entirely by me — the solver, the simulation and the interface.',
    dataProvenance:
      'None. Every input is an invented long-run assumption written into the source, not a market feed: eight asset classes with stylised expected returns, volatilities, a correlation matrix and benchmark weights. No live prices are fetched, and there is no market data anywhere in this tool.',
    constraints:
      'It has to run in a browser with no server, and it has to stay honest about being synthetic while still behaving like the real method.',
    approach: [
      'Start from benchmark weights and reverse-engineer the equilibrium returns they imply, as Black–Litterman does.',
      'Let the visitor state views as scenarios, blend them with the equilibrium prior at a confidence they control, and re-solve.',
      'Run Monte Carlo paths from the resulting allocation to show the spread of outcomes rather than a single expected return.',
      'Expose the assumptions and the formulas in an advanced view, so the numbers can be checked rather than trusted.',
    ],
    decisions: [
      {
        decision: 'Kept the assumptions visible and editable instead of hiding them behind the chart.',
        because: 'The point of the tool is that the output follows from stated inputs. Hiding them would make it decoration.',
      },
      {
        decision: 'Show a distribution of outcomes, never a single projected return.',
        because: 'A single number invites being read as a forecast. It is not one.',
      },
      {
        decision: 'Everything runs client-side.',
        because: 'No server means nothing a visitor types is transmitted or stored anywhere.',
      },
    ],
    baseline:
      'Each allocation is shown against the benchmark weights it started from, so the effect of a view is visible as a difference.',
    evaluation:
      'The solver is covered by unit tests that check its mathematical properties — that weights sum to one, that a neutral view reproduces the benchmark, that the covariance matrix stays positive definite. There is no accuracy claim to evaluate, because there is nothing being predicted.',
    results: [],
    deliverables: [
      'A client-side Black–Litterman solver with a Monte Carlo simulator.',
      'Simple and advanced views over the same computation.',
      'Regression tests over the financial logic.',
    ],
    visualCaption:
      'Allocation and outcome spread produced by the optimizer from its built-in assumptions. Synthetic illustration — the inputs are invented and no market data is involved.',
    visualAlt:
      'An allocation across eight asset classes shown against benchmark weights, beside a fan of simulated outcome paths widening over time. The fan shows a broad range of outcomes rather than a single line, with the median path in the middle and progressively wider bands around it.',
    consequences:
      'It shows the working. The method is the same one used on real mandates; only the numbers are invented, and the tool says so on its face.',
    limitations: [
      'Every input is invented. Nothing here is a market observation, a backtest, or a track record.',
      'Not investment advice, and it produces no recommendation about any real security.',
      'Long-run assumptions with no regime changes, no transaction costs and no taxes.',
    ],
    humanReview: 'Not applicable — it is a demonstration, and its output is not used for any decision.',
    nextAction: 'Open the optimizer',
  },

};

const tr: CopyBySlug = {
  'greenwashing-risk-scoring': {
    title: 'Kurumsal çevre iddialarında yeşil aklama riskinin puanlanması',
    summary:
      'Çevre iddialarını, dilin taahhüdü ne kadar aştığına göre sıralayan bir inceleme aracı; 29 iddialık bir küme üzerinde uzman değerlendirmelerine karşı ölçüldü.',
    problem:
      'Kurumsal raporları okuyan bir sürdürülebilirlik analisti, hangi çevre iddiasının sorgulanmaya değer olduğuna karar vermek zorundadır. Önemli olan iddialar nadiren açıkça yanlıştır; spesifik olmaları gereken yerde muğlaktırlar. Bu okuma yavaş, özneldir ve iki analist anlaşmazlığa düştüğünde savunulması zordur.',
    audience:
      'Sürdürülebilirlik ve ESG analistleri ile bir iddianın neden yükseltildiğini gerekçelendirmek zorunda olan risk ekipleri.',
    context:
      'Bocconi’deki yüksek lisans tezim olarak başladı ve doğrulama düzeneği olan çalışır bir kod tabanına dönüştü. Bu bir araştırmadır: hiçbir müşteriye kurulmadı ve üretimde kullanıcısı yok.',
    role:
      'Sistemin tamamını ben tasarladım ve yazdım — iddia çıkarımı, puanlama bileşenleri, uzman değerlendirmelerini toplamak için kullanılan anket ve aşağıdaki sayıları üreten doğrulama betikleri.',
    dataProvenance:
      'Kamuya açık kurumsal iletişim metinlerinden çıkarılan çevre iddiaları. Referans değerlendirmeler, yapılandırılmış bir anketle toplanan ve kodla birlikte depoda saklanan insan yargılarıdır.',
    constraints:
      'Yirmi dokuz değerlendirilmiş iddiadan oluşan bir referans küme. Ayrılabilen uzman değerlendirme süresinin dürüst sınırı buydu ve buradan çıkarılan her sonucu kısıtlıyor.',
    approach: [
      'Belgeyi bütün olarak puanlamak yerine spaCy ile ayrı çevre iddialarını çıkarmak; böylece bir puan her zaman bir cümleye kadar izlenebilir.',
      'Her iddiayı birkaç bileşen üzerinden puanlamak — tanıtım dilinin sözcüksel yoğunluğu, ClimateBERT ile anlamsal spesifiklik, Sentence Transformers ile bilinen anlatı kalıplarına benzerlik — ve bunları tek bir yapılandırma dosyasındaki ağırlıklarla birleştirmek.',
      'Yalnızca doğrulukla değil, korelasyon ve hata ölçütleriyle doğrulamak; çünkü ölçülen büyüklük bir sınıf değil, bir risk derecesidir.',
      'Yalnızca en iyi görüneni raporlamak yerine üç dedektör sürümünü aynı küme üzerinde yan yana tutmak.',
    ],
    decisions: [
      {
        decision: 'İkili doğruluktan önce, sürekli uzman değerlendirmelerine karşı korelasyon ve hata raporlandı.',
        because:
          'Yeşil aklama riski bir derece meselesidir. Önce ikilileştirmek, modelin uzman yargısını iyi izlerken yine de zayıf bir filtre olduğunu gizlerdi.',
      },
      {
        decision: 'Bir transformer sürümü mevcut olmasına rağmen basit sözcüksel sürüm (v1) referans model olarak korundu.',
        because:
          'Anlamsal sürüm (v2) daha kötü korele oldu — v1’in 0,906’sına karşı 0,557 — ve emekliye ayrıldı. Daha gelişmiş mimariyi kullanmak daha iyi bir hikâye, daha kötü bir araç üretirdi.',
      },
      {
        decision: 'v3, kesinlik 1,00’de tutulurken duyarlılığa doğru ayarlandı.',
        because:
          'Yanlış alarm veren bir inceleme aracı, sessiz kalan birine göre güveni çok daha hızlı tüketir. Atlanan maddeler okunarak telafi edilebilir; yanlış bir suçlama edilemez.',
      },
    ],
    baseline:
      'İki iç karşılaştırma: bir anahtar kelime yoğunluğu dedektörü ve aynı iddialar üzerinde puanlanan önceki v1 ile v2 dedektörleri. Bu görev için karşılaştırılacak yayımlanmış harici bir kıyas ölçütü yoktur.',
    evaluation:
      'Her dedektör sürümü aynı 29 insan değerlendirmeli iddia üzerinde puanlanır. Sürekli uyum Pearson, Spearman ve Kendall korelasyonları ile MAE ve RMSE üzerinden; işaretle/işaretleme davranışı kesinlik, duyarlılık ve F1 ile ölçülür. İnsan tavanının görünür olması için değerlendiriciler arası güvenilirlik de raporlanır. Yayımlanan rakamlar 29 Ocak 2026’da yeniden çalıştırılıp aynen üretildi.',
    results: [
      'v1 dedektörü uzman değerlendirmelerini yakından izliyor: Pearson r = 0,906, Spearman 0,811, MAE 0,206.',
      'Bir işaretleme aracı olarak zayıf. v1 işaretlenebilir iddiaların %15’ini yakalıyor; ayarlanmış kural tabanlı v3 ise F1 0,571 ile %40’a ulaşıyor.',
      'Bu küme üzerinde hiçbir sürüm yanlış pozitif üretmedi — kesinlik 1,00 — ancak yirmi dokuz maddede bu, yöntemin bir özelliği değil, bir avuç doğru karardır.',
      'İnsan değerlendiriciler Krippendorff α = 0,69 düzeyinde anlaştı; bu, herhangi bir modelin karşısında ölçüldüğü tavandır.',
    ],
    deliverables: [
      'Bir belgeyi, katkıda bulunan bileşenleri açıkta bırakarak iddia başına puanlara dönüştüren bir Python paketi.',
      'Yayımlanan her ölçütü saklanan değerlendirmelerden yeniden üreten bir doğrulama düzeneği.',
      'Algoritmayı, dedektör sürümlerini ve performans karşılaştırmasını kapsayan yazılı raporlar.',
    ],
    visualCaption:
      'Değerlendirilen 29 iddia için dedektör puanına karşı uzman değerlendirmesi ve üç dedektör sürümünün karşılaştırması. Deponun doğrulama çıktısından yeniden üretildi, 29 Ocak 2026.',
    visualAlt:
      '29 iddia üzerinde üç dedektör sürümünün uzman değerlendirmeleriyle karşılaştırılması. Sürüm 1, Pearson 0,906 korelasyon ve 0,206 ortalama mutlak hata ile en yüksek uyuma sahip; sürüm 3, 0,256 hata ile 0,793’e ulaşıyor; sürüm 2 ise 0,557 ile en zayıfı ve emekliye ayrıldı. İkili işaretlemede sürüm 1 işaretlenebilir iddiaların %15’ini, sürüm 3 ise %40’ını yakalıyor; ikisi de %100 kesinlikte.',
    consequences:
      'Amaçlandığı gibi kullanıldığında kuyruğu boşaltmaz, kısaltır: analist en yüksek puanlı iddiaları önce okur ve sıralamayı açıklarken gösterebileceği bir bileşen dökümüne sahip olur. Sonunda bir insan tarafından okunması gereken iddia sayısını azaltmaz.',
    limitations: [
      'Yirmi dokuz değerlendirilmiş iddia. Buradaki her rakam geniş bir belirsizlik taşır ve hiçbiri yeniden değerlendirilmeden yeni bir derlemeye genellenemez.',
      'Puan bir sıralama sinyalidir. Kalibre edilmiş bir olasılık değildir ve yüksek bir puan, bir şirketin yeşil aklama yaptığı bulgusu değildir.',
      'En iyi durumda 0,40 duyarlılık. İşaretlenebilir iddiaların çoğu hâlâ atlanıyor.',
      'Yalnızca İngilizce kurumsal iletişim metinleri üzerinde değerlendirildi.',
      'Puanlama ağırlıkları, karşısında raporlandıkları aynı küçük küme üzerinde ayarlandı; dolayısıyla rakamlar iyimserdir.',
    ],
    humanReview:
      'Her puan, bir sonuca ulaşmadan önce bir kişi tarafından incelenir. Sistem sıralar ve açıklar; bir şirket hakkında asla hüküm vermez.',
    nextAction: 'Performans raporunu okuyun',
  },
  'parliamentary-seat-forecast': {
    title: 'Baraj sistemi altında parlamento sandalye dağılımının tahmini',
    summary:
      'Bir genel seçimi tahmin problemi olarak ele alan ve oy oranı kestirimlerini gerçek dağıtım kuralları üzerinden sandalyeye çeviren bir lisans tezi.',
    problem:
      'Oy oranı anketleri, insanların bir seçim hakkında gerçekten sorduğu soruyu yanıtlamaz. Barajlı D’Hondt dağıtımı altında oranlardaki küçük değişimler sandalyelerde büyük ve süreksiz değişimler üretir; ilginç belirsizlik anketlerde değil, bu dönüşümde yaşar.',
    audience:
      'Yöntemsel bir okuyucu kitlesi. Burada siyasi analiz olarak değil, yapısal kurallar altında tahmini nasıl ele aldığıma dair kanıt olarak yayımlanıyor.',
    context:
      'Bocconi’de Ekonomi, Yönetim ve Bilgisayar Bilimi lisans tezim; 2023’te tamamlandı. Bir araştırmadır ve o tarihten beri bakımı yapılmamıştır.',
    role: 'Tek yazar: veri toplama, modelleme ve tezin yazımı.',
    dataProvenance:
      'YSK’nın yayımlanmış geçmiş sonuçları, TÜİK’ten demografik ve sosyoekonomik göstergeler, kamuya açık anketler ve idari sınır dosyaları.',
    constraints:
      'Yalnızca il düzeyinde yayımlanmış veri ve geçmiş isabeti kendi başına belirsiz olan bir anket kaydı — bu da çalışmayı anketleri geçmeye çalışmak yerine dönüşüm kurallarını modellemeye itiyor.',
    approach: [
      'İl düzeyinde geçmiş sonuçları toplamak ve demografik ile sosyoekonomik göstergelerle eşleştirmek.',
      'Sandalye dağıtımı seçim çevresi başına gerçekleştiği için oy oranını ulusal değil il düzeyinde modellemek.',
      'Baraj dâhil gerçek sandalye dağıtım kurallarını uygulamak; böylece süreksizlikler yumuşatılmak yerine yeniden üretilir.',
      'Tahminin en duyarlı olduğu yerleri incelemek — bu, dağıtım sınırlarına yakın az sayıda ilde yoğunlaşıyor.',
    ],
    decisions: [
      {
        decision: 'Sandalye sayıları üzerinde doğrudan regresyon yerine, dağıtım kuralları üzerinden tahmin yapıldı.',
        because:
          'Sandalye sayıları, oy oranlarının ve kuralların deterministik bir fonksiyonudur. Kural zaten tam olarak bilinirken bu fonksiyonu bir avuç geçmiş seçimden öğrenmek, gürültüye uydurmak olurdu.',
      },
      {
        decision: 'Analiz il düzeyinde tutuldu.',
        because: 'Ulusal oy oranındaki bir puanlık hata bazı illerde çok şey ifade eder, bazılarında hiçbir şey.',
      },
    ],
    baseline: '',
    evaluation:
      'Depo, yöntemi ve veri kaynaklarını belgeliyor; ayrılmış küme üzerinde bir doğruluk rakamı raporlamıyor. Yayımlanmış bir rakam olmadığı için burada performans iddiasında bulunulmuyor; sonradan bir rakam uydurmak ölçüm olmazdı.',
    results: [],
    deliverables: [
      'Oy oranı kestirimi, sandalye dağıtımı ve cumhurbaşkanlığı yarışını kapsayan defterler.',
      'Seçim, demografik ve sosyoekonomik kaynakları birleştiren il düzeyinde bir veri kümesi.',
      'Yazılı tez.',
    ],
    visualCaption:
      'Barajlı dağıtım altında oy oranındaki küçük bir değişimin sandalyeleri nasıl hareket ettirdiği. Tez yönteminden çizildi; bir tahmin değil, mekanizmanın gösterimi.',
    visualAlt:
      'Sandalye dağıtımını oy oranının bir fonksiyonu olarak gösteren, seçim barajında keskin bir basamak içeren bir grafik: barajın altındaki partiler hiç sandalye almıyor, hemen üstündekiler ise orantısız biçimde çok sandalye kazanıyor. Oran ile sandalye arasındaki ilişki aralığın ortasında düz, sınırlara yakın diktir.',
    consequences:
      'Aktarılabilir nokta siyaset değil yapı hakkındadır: bir sonuç, içinde uçurumlar olan bir kuraldan geçiyorsa, tahminin o kuralı modellemesi gerekir. Aynı akıl yürütme vergi dilimlerine, kredi sözleşmesi testlerine ve hacim kademelerine de uygulanır.',
    limitations: [
      'Ayrılmış küme üzerinde doğruluk yayımlanmadığı için tahmin performansı iddia edilmiyor.',
      'Tek bir kural kümesi altında tek bir seçim için kuruldu; genel bir seçim modeli değildir.',
      '2023’ten beri bakımı yapılmamıştır.',
    ],
    humanReview: 'Bir araştırma çıktısıdır ve öyle okunur. Buradaki hiçbir şey karar almak için sunulmuş bir öngörü değildir.',
    nextAction: 'Depoyu görüntüleyin',
  },
  'portfolio-optimizer': {
    title: 'Tarayıcıda sorgulayabileceğiniz bir portföy dağıtıcısı',
    summary:
      'Monte Carlo stres yollarıyla birlikte çalışan bir Black–Litterman dağıtıcısı; tamamen tarayıcıda ve uydurma sermaye piyasası varsayımları üzerinde çalışır — kapalı bir yöntemi incelenebilir kılmak için yapıldı.',
    problem:
      'Dağıtım modelleri genellikle bir cevap olarak sunulur: varsayımlarla çıktı arasında görünür bir bağ olmayan bir pasta grafiği. Kendisine böyle bir şey gösterilen kişinin, bir görüş yanlışsa ne olacağını sorma imkânı yoktur.',
    audience:
      'Uzman olmayan birinin gerçekten kullanabileceği nicel bir araç kurup kuramayacağımı değerlendiren herkes. Bu bir yöntem gösterimidir.',
    context:
      'Bu site için yapıldı. Sentetik bir gösterimdir; bir iş değil, bir ürün de değil: kimse sipariş etmedi ve kimse bununla para dağıtmıyor.',
    role: 'Tamamen benim tarafımdan tasarlandı ve yazıldı — çözücü, benzetim ve arayüz.',
    dataProvenance:
      'Yok. Her girdi, bir piyasa akışı değil, kaynağa yazılmış uydurma bir uzun vadeli varsayımdır: stilize beklenen getiriler, oynaklıklar, bir korelasyon matrisi ve kıyas ağırlıklarıyla sekiz varlık sınıfı. Hiçbir canlı fiyat çekilmez ve bu araçta hiçbir yerde piyasa verisi yoktur.',
    constraints:
      'Sunucusuz olarak tarayıcıda çalışmak zorunda ve gerçek yöntem gibi davranırken sentetik olduğu konusunda dürüst kalmak zorunda.',
    approach: [
      'Black–Litterman’ın yaptığı gibi kıyas ağırlıklarından başlayıp bunların ima ettiği denge getirilerini tersine çözmek.',
      'Ziyaretçinin görüşlerini senaryo olarak belirtmesine izin vermek, bunları kendi kontrol ettiği bir güven düzeyinde denge önseliyle harmanlamak ve yeniden çözmek.',
      'Tek bir beklenen getiri yerine sonuç dağılımını göstermek için elde edilen dağılımdan Monte Carlo yolları çalıştırmak.',
      'Varsayımları ve formülleri gelişmiş görünümde açığa çıkarmak; böylece sayılara güvenilmek yerine denetlenebilirler.',
    ],
    decisions: [
      {
        decision: 'Varsayımlar grafiğin arkasına saklanmak yerine görünür ve düzenlenebilir tutuldu.',
        because: 'Aracın amacı, çıktının belirtilen girdilerden çıkmasıdır. Onları saklamak aracı bir süse dönüştürürdü.',
      },
      {
        decision: 'Tek bir öngörülen getiri değil, her zaman bir sonuç dağılımı gösteriliyor.',
        because: 'Tek bir sayı, tahmin olarak okunmaya davet eder. Oysa tahmin değildir.',
      },
      {
        decision: 'Her şey istemci tarafında çalışıyor.',
        because: 'Sunucu olmaması, ziyaretçinin yazdığı hiçbir şeyin hiçbir yere iletilmemesi veya saklanmaması demektir.',
      },
    ],
    baseline:
      'Her dağıtım, başladığı kıyas ağırlıklarına karşı gösterilir; böylece bir görüşün etkisi fark olarak görünür.',
    evaluation:
      'Çözücü, matematiksel özelliklerini denetleyen birim testleriyle kapsanır — ağırlıkların bire toplanması, nötr bir görüşün kıyası yeniden üretmesi, kovaryans matrisinin pozitif tanımlı kalması. Değerlendirilecek bir doğruluk iddiası yoktur, çünkü tahmin edilen bir şey yoktur.',
    results: [],
    deliverables: [
      'Monte Carlo benzeticisiyle birlikte istemci tarafında bir Black–Litterman çözücüsü.',
      'Aynı hesaplama üzerinde basit ve gelişmiş görünümler.',
      'Finansal mantık üzerinde gerileme testleri.',
    ],
    visualCaption:
      'Optimizasyon aracının kendi yerleşik varsayımlarından ürettiği dağıtım ve sonuç aralığı. Sentetik gösterim — girdiler uydurmadır ve hiçbir piyasa verisi kullanılmaz.',
    visualAlt:
      'Sekiz varlık sınıfı üzerinde kıyas ağırlıklarına karşı gösterilen bir dağıtım grafiği ve yanında zamanla genişleyen benzetilmiş sonuç yollarından oluşan bir yelpaze grafiği. Yelpaze tek bir çizgi yerine geniş bir sonuç aralığı gösteriyor; ortada medyan yol ve çevresinde giderek genişleyen bantlar var.',
    consequences:
      'Hesabı gösterir. Yöntem, gerçek görevlerde kullanılanın aynısıdır; yalnızca sayılar uydurmadır ve araç bunu açıkça söyler.',
    limitations: [
      'Her girdi uydurmadır. Buradaki hiçbir şey bir piyasa gözlemi, geriye dönük test veya geçmiş performans değildir.',
      'Yatırım tavsiyesi değildir ve gerçek hiçbir menkul kıymet hakkında öneri üretmez.',
      'Rejim değişimi, işlem maliyeti ve vergi içermeyen uzun vadeli varsayımlar.',
    ],
    humanReview: 'Uygulanabilir değil — bir gösterimdir ve çıktısı hiçbir kararda kullanılmaz.',
    nextAction: 'Optimizasyon aracını açın',
  },

};

const it: CopyBySlug = {
  'greenwashing-risk-scoring': {
    title: 'Valutare il rischio di greenwashing nelle dichiarazioni ambientali aziendali',
    summary:
      'Un rilevatore di supporto all’analista che ordina le dichiarazioni ambientali in base a quanto il linguaggio superi l’impegno effettivo, valutato contro giudizi esperti su un insieme di 29 dichiarazioni.',
    problem:
      'Un analista di sostenibilità che legge le comunicazioni aziendali deve decidere quali dichiarazioni ambientali meritino di essere contestate. Le dichiarazioni che contano sono raramente false in modo netto: sono vaghe dove dovrebbero essere specifiche. La lettura è lenta, soggettiva e difficile da difendere quando due analisti non concordano.',
    audience:
      'Analisti di sostenibilità ed ESG, e i team di rischio che devono motivare perché una specifica dichiarazione sia stata segnalata.',
    context:
      'È nato come tesi magistrale alla Bocconi ed è diventato un codice funzionante con un impianto di validazione. È ricerca: non è mai stato installato presso un cliente e non ha utenti in produzione.',
    role:
      'Ho progettato e sviluppato l’intero sistema — estrazione delle dichiarazioni, componenti di punteggio, questionario usato per raccogliere i giudizi esperti e script di validazione che producono i numeri qui sotto.',
    dataProvenance:
      'Dichiarazioni ambientali estratte da comunicazioni aziendali pubbliche. I giudizi di riferimento sono valutazioni umane raccolte con un questionario strutturato e conservate nel repository insieme al codice.',
    constraints:
      'Un insieme di riferimento di ventinove dichiarazioni valutate. Era il limite onesto del tempo di valutazione esperta disponibile, e vincola ogni conclusione che ne deriva.',
    approach: [
      'Estrarre singole dichiarazioni ambientali con spaCy invece di valutare il documento nel suo insieme, così che un punteggio sia sempre riconducibile a una frase.',
      'Valutare ogni dichiarazione su più componenti — densità lessicale del linguaggio promozionale, specificità semantica tramite ClimateBERT, somiglianza a schemi narrativi noti tramite Sentence Transformers — combinandole con pesi tenuti in un unico file di configurazione.',
      'Validare con metriche di correlazione ed errore, non con la sola accuratezza, perché la grandezza sottostante è un grado di rischio e non una classe.',
      'Tenere tre versioni del rilevatore affiancate sullo stesso insieme, invece di riportare solo quella che appare migliore.',
    ],
    decisions: [
      {
        decision: 'Riportata la correlazione e l’errore rispetto ai giudizi continui prima di qualsiasi accuratezza binaria.',
        because:
          'Il rischio di greenwashing è una questione di grado. Binarizzarlo per primo avrebbe nascosto che il modello segue bene il giudizio dell’analista pur restando un filtro debole.',
      },
      {
        decision: 'Mantenuta la versione lessicale semplice (v1) come modello di riferimento pur avendo una versione transformer.',
        because:
          'La versione semantica (v2) correlava peggio — 0,557 contro 0,906 — ed è stata ritirata. Usare l’architettura più sofisticata avrebbe prodotto una storia migliore e uno strumento peggiore.',
      },
      {
        decision: 'La v3 è stata tarata verso il richiamo mantenendo la precisione a 1,00.',
        because:
          'Uno strumento di supporto che lancia un falso allarme consuma fiducia molto più in fretta di uno che resta silenzioso. Le omissioni si recuperano leggendo; un’accusa sbagliata no.',
      },
    ],
    baseline:
      'Due confronti interni: un rilevatore a densità di parole chiave e le precedenti versioni v1 e v2 valutate sulle stesse dichiarazioni. Non esiste un benchmark esterno pubblicato per questo compito.',
    evaluation:
      'Ogni versione è valutata sulle stesse 29 dichiarazioni giudicate da esperti. L’accordo continuo è misurato con le correlazioni di Pearson, Spearman e Kendall più MAE e RMSE; il comportamento di segnalazione con precisione, richiamo e F1. L’affidabilità tra valutatori è riportata perché il tetto umano sia visibile. I dati pubblicati sono stati rieseguiti e riprodotti il 29 gennaio 2026.',
    results: [
      'Il rilevatore v1 segue da vicino i giudizi esperti: Pearson r = 0,906, Spearman 0,811, MAE 0,206.',
      'Come strumento di segnalazione è debole. La v1 individua il 15% delle dichiarazioni segnalabili; la v3 a regole, tarata, arriva al 40% con F1 0,571.',
      'Nessuna versione ha prodotto falsi positivi su questo insieme — precisione 1,00 — ma su ventinove elementi si tratta di una manciata di decisioni corrette, non di una proprietà del metodo.',
      'I valutatori umani concordano a un alfa di Krippendorff di 0,69, che è il tetto rispetto al quale ogni modello viene misurato.',
    ],
    deliverables: [
      'Un pacchetto Python che trasforma un documento in punteggi per dichiarazione, con le componenti che vi contribuiscono esposte.',
      'Un impianto di validazione che rigenera ogni metrica pubblicata a partire dai giudizi conservati.',
      'Relazioni scritte su algoritmo, versioni del rilevatore e confronto delle prestazioni.',
    ],
    visualCaption:
      'Punteggio del rilevatore rispetto al giudizio esperto per ciascuna delle 29 dichiarazioni valutate, con il confronto tra le tre versioni. Riprodotto dall’output di validazione del repository, 29 gennaio 2026.',
    visualAlt:
      'Un confronto tra tre versioni del rilevatore rispetto ai giudizi esperti su 29 dichiarazioni. La versione 1 ha la correlazione più alta, Pearson 0,906, con errore assoluto medio 0,206; la versione 3 raggiunge 0,793 con errore 0,256; la versione 2 è la più debole a 0,557 ed è stata ritirata. Nella segnalazione binaria la versione 1 individua il 15% delle dichiarazioni segnalabili e la versione 3 il 40%, entrambe con precisione del 100%.',
    consequences:
      'Usato come previsto, accorcia la coda invece di svuotarla: l’analista legge per prime le dichiarazioni con punteggio più alto e dispone di una scomposizione delle componenti da mostrare per spiegare l’ordinamento. Non riduce il numero di dichiarazioni che alla fine una persona deve leggere.',
    limitations: [
      'Ventinove dichiarazioni valutate. Ogni numero qui porta un’ampia incertezza e nessuno si generalizza a un nuovo corpus senza rivalutazione.',
      'Il punteggio è un segnale di ordinamento. Non è una probabilità calibrata, e un punteggio alto non è la constatazione che un’azienda abbia fatto greenwashing.',
      'Richiamo di 0,40 nel caso migliore. La maggior parte delle dichiarazioni segnalabili resta comunque non individuata.',
      'Valutato solo su comunicazioni aziendali in lingua inglese.',
      'I pesi sono stati tarati sullo stesso piccolo insieme su cui vengono riportati, quindi i numeri sono ottimistici.',
    ],
    humanReview:
      'Ogni punteggio è rivisto da una persona prima di arrivare a una conclusione. Il sistema ordina e spiega; non emette mai un verdetto su un’azienda.',
    nextAction: 'Leggi la relazione sulle prestazioni',
  },
  'parliamentary-seat-forecast': {
    title: 'Previsione della distribuzione dei seggi parlamentari con soglia di sbarramento',
    summary:
      'Una tesi triennale che ha trattato un’elezione nazionale come un problema di previsione, convertendo le stime di voto in seggi attraverso le regole di ripartizione effettive.',
    problem:
      'I sondaggi sulle quote di voto non rispondono alla domanda che le persone si pongono davvero. Con la ripartizione D’Hondt e una soglia di sbarramento, piccole variazioni di quota producono variazioni grandi e discontinue nei seggi: l’incertezza interessante vive in quella conversione, non nei sondaggi.',
    audience:
      'Un pubblico metodologico. È pubblicato qui come prova di come affronto la previsione sotto regole strutturali, non come analisi politica.',
    context:
      'La mia tesi triennale in Economia, Management e Informatica alla Bocconi, conclusa nel 2023. È ricerca e non è più mantenuta da allora.',
    role: 'Autore unico: raccolta dati, modellazione e stesura della tesi.',
    dataProvenance:
      'Risultati storici pubblicati dal Consiglio elettorale supremo (YSK), indicatori demografici e socio-economici dell’Istituto statistico turco (TurkStat), sondaggi pubblici e file dei confini amministrativi.',
    constraints:
      'Solo dati pubblicati a livello provinciale e uno storico di sondaggi la cui accuratezza passata è essa stessa incerta — il che spinge il lavoro a modellare le regole di conversione invece di cercare di battere i sondaggi.',
    approach: [
      'Assemblare i risultati storici provinciali e allinearli agli indicatori demografici e socio-economici.',
      'Modellare la quota di voto a livello provinciale anziché nazionale, poiché la ripartizione dei seggi avviene per circoscrizione.',
      'Applicare le regole effettive di ripartizione, soglia inclusa, così che le discontinuità siano riprodotte e non appianate.',
      'Esaminare dove la previsione è più sensibile — concentrata in un piccolo numero di province vicine ai confini di ripartizione.',
    ],
    decisions: [
      {
        decision: 'Previsione dei seggi attraverso le regole di ripartizione anziché una regressione diretta sui seggi.',
        because:
          'Il numero di seggi è una funzione deterministica delle quote e delle regole. Impararla da una manciata di elezioni passate, quando la regola è già nota esattamente, significherebbe adattarsi al rumore.',
      },
      {
        decision: 'Analisi mantenuta a livello provinciale.',
        because: 'Un errore di un punto sulla quota nazionale conta enormemente in alcune province e per nulla in altre.',
      },
    ],
    baseline: '',
    evaluation:
      'Il repository documenta il metodo e le fonti dei dati; non riporta un valore di accuratezza su dati esclusi dall’addestramento. Qui non viene formulata alcuna affermazione sulle prestazioni perché nessuna è pubblicata, e inventarne una a posteriori non sarebbe una misurazione.',
    results: [],
    deliverables: [
      'Notebook su stima delle quote di voto, ripartizione dei seggi e corsa presidenziale.',
      'Un dataset provinciale che unisce fonti elettorali, demografiche e socio-economiche.',
      'La tesi scritta.',
    ],
    visualCaption:
      'Come una piccola variazione della quota di voto sposta i seggi con una ripartizione a soglia. Tratto dal metodo della tesi; un’illustrazione del meccanismo, non una previsione.',
    visualAlt:
      'Un grafico che mostra la ripartizione dei seggi in funzione della quota di voto, con un gradino netto in corrispondenza della soglia: i partiti sotto soglia non ricevono seggi, quelli appena sopra ne guadagnano un numero sproporzionato. La relazione tra quota e seggi è piatta al centro dell’intervallo e ripida vicino ai confini.',
    consequences:
      'Il punto trasferibile riguarda la struttura, non la politica: quando un esito passa attraverso una regola con salti, la previsione deve modellare la regola. Lo stesso ragionamento vale per scaglioni fiscali, covenant e soglie di volume.',
    limitations: [
      'Non è pubblicata alcuna accuratezza su dati esclusi, quindi non si dichiara alcuna prestazione predittiva.',
      'Costruito per una sola elezione con un solo insieme di regole; non è un modello elettorale generale.',
      'Non mantenuto dal 2023.',
    ],
    humanReview: 'È un risultato di ricerca e va letto come tale. Nulla qui è una previsione offerta per prendere decisioni.',
    nextAction: 'Vedi il repository',
  },
  'portfolio-optimizer': {
    title: 'Un allocatore di portafoglio interrogabile nel browser',
    summary:
      'Un allocatore Black–Litterman con percorsi Monte Carlo di stress, eseguito interamente lato client su ipotesi di mercato inventate — costruito per rendere ispezionabile un metodo opaco.',
    problem:
      'I modelli di allocazione vengono di solito presentati come una risposta: un grafico a torta senza alcun legame visibile tra le ipotesi e il risultato. Chi lo riceve non ha modo di chiedere cosa succede se una view è sbagliata.',
    audience:
      'Chiunque stia valutando se so costruire uno strumento quantitativo che un non specialista possa davvero usare. È una dimostrazione di metodo.',
    context:
      'Costruito per questo sito. È una dimostrazione sintetica, non un incarico e non un prodotto: nessun cliente l’ha commissionato e nessuno lo usa per allocare denaro.',
    role: 'Progettato e sviluppato interamente da me — il solutore, la simulazione e l’interfaccia.',
    dataProvenance:
      'Nessuna. Ogni input è un’ipotesi di lungo periodo inventata e scritta nel codice sorgente, non un flusso di mercato: otto classi di attivo con rendimenti attesi stilizzati, volatilità, una matrice di correlazione e pesi di riferimento. Non viene scaricato alcun prezzo e in questo strumento non esistono dati di mercato.',
    constraints:
      'Deve girare nel browser senza server e deve restare onesto sul proprio carattere sintetico pur comportandosi come il metodo reale.',
    approach: [
      'Partire dai pesi di riferimento e ricavare per inversione i rendimenti di equilibrio che essi implicano, come fa Black–Litterman.',
      'Permettere al visitatore di esprimere view come scenari, combinarle con la distribuzione a priori di equilibrio a una confidenza che controlla lui, e risolvere di nuovo.',
      'Eseguire percorsi Monte Carlo dall’allocazione risultante per mostrare la dispersione degli esiti invece di un singolo rendimento atteso.',
      'Esporre ipotesi e formule in una vista avanzata, così che i numeri possano essere verificati anziché creduti.',
    ],
    decisions: [
      {
        decision: 'Ipotesi tenute visibili e modificabili invece che nascoste dietro il grafico.',
        because: 'Il senso dello strumento è che il risultato discende da input dichiarati. Nasconderli lo renderebbe decorativo.',
      },
      {
        decision: 'Mostrare una distribuzione di esiti, mai un singolo rendimento previsto.',
        because: 'Un numero singolo invita a essere letto come una previsione. Non lo è.',
      },
      {
        decision: 'Tutto viene eseguito lato client.',
        because: 'Nessun server significa che nulla di ciò che un visitatore digita viene trasmesso o conservato.',
      },
    ],
    baseline:
      'Ogni allocazione è mostrata rispetto ai pesi di riferimento da cui è partita, così l’effetto di una view è visibile come differenza.',
    evaluation:
      'Il solutore è coperto da test unitari che verificano le sue proprietà matematiche — che i pesi sommino a uno, che una view neutra riproduca il riferimento, che la matrice di covarianza resti definita positiva. Non c’è alcuna affermazione di accuratezza da valutare, perché non si sta prevedendo nulla.',
    results: [],
    deliverables: [
      'Un solutore Black–Litterman lato client con simulatore Monte Carlo.',
      'Viste semplice e avanzata sullo stesso calcolo.',
      'Test di regressione sulla logica finanziaria.',
    ],
    visualCaption:
      'Allocazione e dispersione degli esiti prodotte dall’ottimizzatore a partire dalle sue ipotesi interne. Illustrazione sintetica — gli input sono inventati e non è coinvolto alcun dato di mercato.',
    visualAlt:
      'Un’allocazione su otto classi di attivo mostrata rispetto ai pesi di riferimento, accanto a un ventaglio di percorsi simulati che si allarga nel tempo. Il ventaglio mostra un ampio intervallo di esiti anziché una singola linea, con il percorso mediano al centro e bande progressivamente più larghe attorno.',
    consequences:
      'Mostra i passaggi. Il metodo è lo stesso usato su mandati reali; solo i numeri sono inventati, e lo strumento lo dichiara apertamente.',
    limitations: [
      'Ogni input è inventato. Nulla qui è un’osservazione di mercato, un backtest o un track record.',
      'Non è consulenza in materia di investimenti e non produce raccomandazioni su alcun titolo reale.',
      'Ipotesi di lungo periodo senza cambi di regime, costi di transazione o imposte.',
    ],
    humanReview: 'Non applicabile — è una dimostrazione e il suo output non è usato per alcuna decisione.',
    nextAction: 'Apri l’ottimizzatore',
  },

};

const COPY: Record<Locale, CopyBySlug> = { en, tr, it };

export const getCaseStudyCopy = (locale: Locale, slug: string): CaseStudyCopy | undefined => COPY[locale]?.[slug];

export const getCaseStudy = (slug: string): CaseStudySpine | undefined =>
  CASE_STUDIES.find((entry) => entry.slug === slug);

export const caseStudySlugs = CASE_STUDIES.map((entry) => entry.slug);
