import type { Locale } from '@/lib/translations';

/**
 * The seven volumes on the shelf.
 *
 * The authored ThreeUI shelf carries seven hardcovers. This site fills them with
 * the seven things it actually offers — four services and three pieces of
 * evidence — and each one is titled by **the expensive problem it addresses**
 * rather than by the technique. A visitor spinning the shelf should be able to
 * recognise their own bad week on a spine.
 *
 * What is kept from the source and why: `color`, `foil`, `palette` and the
 * three dimensions are the authored values, because each cover in
 * public/shelf/covers.webp is artwork tuned to its binding colour and its slot
 * in the atlas. Re-tinting the bindings without regenerating the artwork would
 * break the pairing the original author set up. The text, the routes and the
 * meaning are entirely this site's.
 *
 * `binding` / `format` / `theme` / `motif` are the source's four metadata slots.
 * They are repurposed, consistently across all seven, as:
 *
 *   binding -> what kind of work this is (maturity, or the engagement type)
 *   format  -> what you receive
 *   theme   -> the expensive problem, stated as a cost
 *   motif   -> the shape of the answer
 */

export type VolumeKind = 'service' | 'evidence';

export interface VolumeSpine {
  id: string;
  kind: VolumeKind;
  /** The reader route for this volume, after the locale segment. */
  href: string;
  /** Authored motif geometry: brackets | paths | caret | orbits | modules | frames | compass. */
  motifKey: string;
  color: string;
  foil: string;
  palette: {
    paper: string;
    paperDeep: string;
    paperPale: string;
    ink: string;
    inkSoft: string;
    wall: string;
    shelf: string;
    shelfDark: string;
    light: string;
    fill: string;
  };
  width: number;
  height: number;
  depth: number;
  seed: number;
}

/** Authored bindings, in atlas order. Do not reorder: covers are indexed by position. */
export const VOLUMES: readonly VolumeSpine[] = [
  {
    id: 'document-intelligence',
    kind: 'service',
    href: '/volumes/document-intelligence',
    motifKey: 'brackets',
    color: '#182a43',
    foil: '#c87046',
    palette: {
      paper: '#1b1613',
      paperDeep: '#120e0b',
      paperPale: '#f1eadf',
      ink: '#f4eee6',
      inkSoft: '#b9b4ae',
      wall: '#1b1613',
      shelf: '#3a2118',
      shelfDark: '#1c0e0a',
      light: '#f4d7b9',
      fill: '#c2a184',
    },
    width: 1.02,
    height: 1.58,
    depth: 0.26,
    seed: 11,
  },
  {
    id: 'forecasting',
    kind: 'service',
    href: '/volumes/forecasting',
    motifKey: 'paths',
    color: '#c24d24',
    foil: '#efc16d',
    palette: {
      paper: '#1e1813',
      paperDeep: '#130f0b',
      paperPale: '#f4ece1',
      ink: '#f6efe6',
      inkSoft: '#c0b3a6',
      wall: '#1e1813',
      shelf: '#3a2118',
      shelfDark: '#1c0e0a',
      light: '#f7d9ad',
      fill: '#c99a6a',
    },
    width: 1.1,
    height: 1.46,
    depth: 0.29,
    seed: 22,
  },
  {
    id: 'reporting',
    kind: 'service',
    href: '/volumes/reporting',
    motifKey: 'caret',
    color: '#afc400',
    foil: '#171a16',
    palette: {
      paper: '#1c1a11',
      paperDeep: '#12110a',
      paperPale: '#eef0e2',
      ink: '#f1f3e8',
      inkSoft: '#b5bba7',
      wall: '#1c1a11',
      shelf: '#3a2118',
      shelfDark: '#1c0e0a',
      light: '#f2e4b4',
      fill: '#b0a377',
    },
    width: 0.92,
    height: 1.52,
    depth: 0.22,
    seed: 33,
  },
  {
    id: 'cross-border',
    kind: 'service',
    href: '/volumes/cross-border',
    motifKey: 'orbits',
    color: '#1537a1',
    foil: '#dbe8f1',
    palette: {
      paper: '#1a1614',
      paperDeep: '#110e0c',
      paperPale: '#e8eef6',
      ink: '#eef3f9',
      inkSoft: '#adb8c9',
      wall: '#1a1614',
      shelf: '#3a2118',
      shelfDark: '#1c0e0a',
      light: '#f4dcc0',
      fill: '#b08f74',
    },
    width: 1.08,
    height: 1.68,
    depth: 0.25,
    seed: 44,
  },
  {
    id: 'greenwashing-risk-scoring',
    kind: 'evidence',
    href: '/volumes/greenwashing-risk-scoring',
    motifKey: 'modules',
    color: '#c83222',
    foil: '#efb0aa',
    palette: {
      paper: '#1e1514',
      paperDeep: '#140d0c',
      paperPale: '#f6e9e6',
      ink: '#f8eeec',
      inkSoft: '#c5aeaa',
      wall: '#1e1514',
      shelf: '#3a2118',
      shelfDark: '#1c0e0a',
      light: '#f7cfc6',
      fill: '#c08278',
    },
    width: 1.0,
    height: 1.48,
    depth: 0.3,
    seed: 55,
  },
  {
    id: 'parliamentary-seat-forecast',
    kind: 'evidence',
    href: '/volumes/parliamentary-seat-forecast',
    motifKey: 'frames',
    color: '#da3b2f',
    foil: '#ff8eab',
    palette: {
      paper: '#1f1615',
      paperDeep: '#150e0c',
      paperPale: '#f7e9ec',
      ink: '#f9eff1',
      inkSoft: '#c7adb3',
      wall: '#1f1615',
      shelf: '#3a2118',
      shelfDark: '#1c0e0a',
      light: '#f9cdd6',
      fill: '#c2808f',
    },
    width: 0.96,
    height: 1.57,
    depth: 0.24,
    seed: 66,
  },
  {
    id: 'portfolio-optimizer',
    kind: 'evidence',
    href: '/volumes/portfolio-optimizer',
    motifKey: 'compass',
    color: '#78a7bd',
    foil: '#e4e7e5',
    palette: {
      paper: '#1a1715',
      paperDeep: '#110f0d',
      paperPale: '#e9eff2',
      ink: '#eff4f6',
      inkSoft: '#aebcc4',
      wall: '#1a1715',
      shelf: '#3a2118',
      shelfDark: '#1c0e0a',
      light: '#f2ddc6',
      fill: '#b39a80',
    },
    width: 1.12,
    height: 1.63,
    depth: 0.28,
    seed: 77,
  },
] as const;

export interface VolumeCopy {
  /** The expensive problem, as a title. */
  title: string;
  roman: string;
  /** Short domain label. */
  discipline: string;
  /** One line under the title on the browse UI. */
  note: string;
  /** The paragraph in the detail panel. */
  deck: string;
  /** What kind of work this is. */
  binding: string;
  /** What you receive. */
  format: string;
  /** The cost of leaving it alone. */
  theme: string;
  /** The shape of the answer. */
  motif: string;
  /** Three sample "pages" shown when the book opens. */
  chapters: string[];
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

type CopyById = Record<string, Omit<VolumeCopy, 'roman'>>;

const en: CopyById = {
  'document-intelligence': {
    title: 'The Unread Pile',
    discipline: 'Document intelligence',
    note: 'The document nobody has time to read — and one person is the bottleneck.',
    deck:
      'Contracts, invoices, disclosures, policy files — read by hand, one person deep, and inconsistently between people. The cost is rarely the reading. It is the renewal clause found after it renewed, and the decision nobody can reconstruct six months later.',
    binding: 'Client engagement · bounded pilot',
    format: 'A workflow over one document type, evaluated on your own examples',
    theme: 'A queue that only one person can clear',
    motif: 'Triage, not replacement',
    chapters: ['The queue', 'What the model may decide', 'The exception path'],
  },
  forecasting: {
    title: 'The Naked Number',
    discipline: 'Forecasting & financial analytics',
    note: 'A single figure, presented as certainty and planned against as fact.',
    deck:
      'You have to commit now to something that depends on later — stock, cash, price, capacity. The spreadsheet returns one number and nobody can say how wrong it could be, so the plan has no contingency in it and the surprise arrives at full cost.',
    binding: 'Client engagement · assessment first',
    format: 'A baseline comparison, a validation approach, and a recommendation',
    theme: 'A plan with no room for being wrong',
    motif: 'A range, and the assumption that moves it',
    chapters: ['The decision', 'Beating the naive baseline', 'Where it breaks'],
  },
  reporting: {
    title: 'The Week-Long Month',
    discipline: 'Business intelligence & reporting',
    note: 'Two departments, two revenue figures, and a meeting that has already moved on.',
    deck:
      'The numbers are assembled by hand from several systems. It takes days, two teams quote different figures for the same month, and by the time the pack is ready the decision it was built for has already been taken on instinct.',
    binding: 'Client engagement · diagnostic first',
    format: 'Source-data assessment, written KPI definitions, reporting priorities',
    theme: 'A week of skilled time, every month, for numbers nobody trusts',
    motif: 'One view, defined once',
    chapters: ['The decisions first', 'Where the systems disagree', 'Definitions that hold'],
  },
  'cross-border': {
    title: 'Two Rulebooks',
    discipline: 'Cross-border advisory · Italy & Türkiye',
    note: 'Two regulatory systems at once. The expensive mistake is not knowing which question to ask.',
    deck:
      'Operating between Italy and Türkiye means two regulatory systems, two languages and two sets of professional norms at once. What costs money is rarely the visible step — it is not knowing which professional a given step legally requires, and finding out late.',
    binding: 'Coordination · regulated work referred out',
    format: 'A confirmed scope, a responsibility map, and the professionals it needs',
    theme: 'A process stalled on a step nobody started',
    motif: 'Sequence, and who is qualified for each part',
    chapters: ['The commercial objective', 'Who is allowed to do what', 'The sequence'],
  },
  'greenwashing-risk-scoring': {
    title: 'The Overrun Claim',
    discipline: 'Research · document intelligence',
    note: 'A claim that outruns the commitment. Evaluated on 29 claims — and it misses most of them.',
    deck:
      'A detector that ranks environmental claims by how far the language runs ahead of the commitment. It tracks expert judgement closely — Pearson 0.906 — and still finds at best 40% of what a reviewer would flag. Published here because that second number is the one that decides how it can be used.',
    binding: 'Research · published repository',
    format: 'Per-claim scores, a validation harness, and the numbers that failed',
    theme: 'A reading queue with no defensible order',
    motif: 'Rank the queue; never issue the verdict',
    chapters: ['Twenty-nine claims', 'Why the simple model won', 'What it still misses'],
  },
  'parliamentary-seat-forecast': {
    title: 'The Threshold Cliff',
    discipline: 'Research · forecasting',
    note: 'When an outcome passes through a threshold, it is the threshold that must be modelled.',
    deck:
      'A bachelor thesis that treated an election as a forecasting problem. The interesting uncertainty was never in the polling — it was in a rule where a fraction of a point either side of a threshold changes the answer completely. Tax bands, covenants and volume tiers behave the same way.',
    binding: 'Research · published repository',
    format: 'Method, data provenance, and no accuracy claim, because none was published',
    theme: 'A forecast that smooths away the part that matters',
    motif: 'Model the rule, not the average',
    chapters: ['Share is not seats', 'Where it is sensitive', 'What is not claimed'],
  },
  'portfolio-optimizer': {
    title: 'The Sealed Model',
    discipline: 'Demonstration · synthetic data',
    note: 'An allocation you cannot interrogate. Invented assumptions, shown in full.',
    deck:
      'Allocation models arrive as a pie chart with no visible link between the assumptions and the answer, so nobody can ask what happens if a view is wrong. This one runs in your browser on assumptions written into the source, and publishes every one of them.',
    binding: 'Synthetic demonstration · built for this site',
    format: 'A solver you can argue with, and the assumptions table behind it',
    theme: 'A recommendation nobody can check',
    motif: 'Show the working, or do not show the chart',
    chapters: ['The prior', 'Your view, weighted', 'A distribution, not a number'],
  },
};

const tr: CopyById = {
  'document-intelligence': {
    title: 'Okunmayan Yığın',
    discipline: 'Belge zekâsı',
    note: 'Kimsenin okumaya vakti olmayan belge — ve darboğaz tek bir kişi.',
    deck:
      'Sözleşmeler, faturalar, raporlar, poliçe dosyaları — elle, tek kişiye bağlı ve kişiden kişiye tutarsız biçimde okunuyor. Maliyet nadiren okumanın kendisidir. Maliyet, yenilendikten sonra fark edilen yenileme maddesi ve altı ay sonra kimsenin yeniden kuramadığı karardır.',
    binding: 'Müşteri işi · sınırlanmış pilot',
    format: 'Tek belge türü üzerinde bir iş akışı, kendi örneklerinizle değerlendirilmiş',
    theme: 'Yalnızca bir kişinin eritebildiği bir kuyruk',
    motif: 'Yerine geçmek değil, önceliklendirmek',
    chapters: ['Kuyruk', 'Modelin karar verebileceği', 'İstisna yolu'],
  },
  forecasting: {
    title: 'Çıplak Sayı',
    discipline: 'Tahmin & finansal analitik',
    note: 'Tek bir rakam; kesinlik gibi sunulmuş, gerçek gibi plana alınmış.',
    deck:
      'Şimdi, sonrasına bağlı bir şeye bağlanmanız gerekiyor — stok, nakit, fiyat, kapasite. Tablo tek bir sayı veriyor ve kimse onun ne kadar yanlış olabileceğini söyleyemiyor; dolayısıyla planın içinde acil durum payı yok ve sürpriz tam bedeliyle geliyor.',
    binding: 'Müşteri işi · önce değerlendirme',
    format: 'Bir kıyas karşılaştırması, bir doğrulama yaklaşımı ve bir öneri',
    theme: 'Yanılmaya yer bırakmayan bir plan',
    motif: 'Bir aralık ve onu oynatan varsayım',
    chapters: ['Karar', 'Naif kıyası geçmek', 'Nerede kırılıyor'],
  },
  reporting: {
    title: 'Bir Haftalık Ay',
    discipline: 'İş zekâsı & raporlama',
    note: 'İki departman, iki ciro rakamı ve çoktan geçmiş bir toplantı.',
    deck:
      'Sayılar birkaç sistemden elle birleştiriliyor. Günler sürüyor, iki ekip aynı ay için farklı rakam söylüyor ve rapor hazır olduğunda kurulduğu karar çoktan sezgiyle verilmiş oluyor.',
    binding: 'Müşteri işi · önce tanılama',
    format: 'Kaynak veri değerlendirmesi, yazılı KPI tanımları, raporlama öncelikleri',
    theme: 'Her ay, kimsenin güvenmediği sayılar için bir haftalık nitelikli zaman',
    motif: 'Tek bir görünüm, bir kez tanımlanmış',
    chapters: ['Önce kararlar', 'Sistemler nerede ayrışıyor', 'Kalıcı tanımlar'],
  },
  'cross-border': {
    title: 'İki Kural Kitabı',
    discipline: 'Sınır ötesi danışmanlık · İtalya & Türkiye',
    note: 'Aynı anda iki düzenleyici sistem. Pahalı hata, hangi soruyu soracağını bilmemektir.',
    deck:
      'İtalya ile Türkiye arasında iş yapmak, aynı anda iki düzenleyici sistem, iki dil ve iki meslek normları kümesi demektir. Para kaybettiren şey nadiren görünür adımdır — belirli bir adımın yasal olarak hangi meslek mensubunu gerektirdiğini bilmemek ve bunu geç öğrenmektir.',
    binding: 'Koordinasyon · düzenlemeye tabi iş dışarı yönlendirilir',
    format: 'Doğrulanmış kapsam, sorumluluk haritası ve gereken meslek mensupları',
    theme: 'Kimsenin başlamadığı bir adımda tıkanmış bir süreç',
    motif: 'Sıra ve her parçaya kimin yetkili olduğu',
    chapters: ['Ticari hedef', 'Kim neyi yapabilir', 'Sıra'],
  },
  'greenwashing-risk-scoring': {
    title: 'Taşan İddia',
    discipline: 'Araştırma · belge zekâsı',
    note: 'Taahhüdü aşan bir iddia. 29 iddia üzerinde ölçüldü — ve çoğunu kaçırıyor.',
    deck:
      'Çevre iddialarını, dilin taahhüdün ne kadar önüne geçtiğine göre sıralayan bir dedektör. Uzman yargısını yakından izliyor — Pearson 0,906 — ve yine de bir inceleyicinin işaretleyeceğinin en iyi ihtimalle %40’ını buluyor. Burada yayımlanmasının nedeni, nasıl kullanılabileceğine karar veren şeyin bu ikinci sayı olması.',
    binding: 'Araştırma · yayımlanmış depo',
    format: 'İddia başına puanlar, bir doğrulama düzeneği ve başarısız olan sayılar',
    theme: 'Savunulabilir bir sırası olmayan bir okuma kuyruğu',
    motif: 'Kuyruğu sırala; hükmü asla verme',
    chapters: ['Yirmi dokuz iddia', 'Basit model neden kazandı', 'Hâlâ neyi kaçırıyor'],
  },
  'parliamentary-seat-forecast': {
    title: 'Eşik Uçurumu',
    discipline: 'Araştırma · tahmin',
    note: 'Bir sonuç bir eşikten geçiyorsa, modellenmesi gereken eşiktir.',
    deck:
      'Bir seçimi tahmin problemi olarak ele alan bir lisans tezi. İlginç belirsizlik hiçbir zaman anketlerde değildi — bir eşiğin iki yanındaki puanın kesri cevabı tamamen değiştiren bir kuraldaydı. Vergi dilimleri, kredi sözleşmesi koşulları ve hacim kademeleri de aynı şekilde davranır.',
    binding: 'Araştırma · yayımlanmış depo',
    format: 'Yöntem, verinin kaynağı ve doğruluk iddiası yok; çünkü yayımlanmadı',
    theme: 'Asıl önemli kısmı yumuşatarak yok eden bir tahmin',
    motif: 'Ortalamayı değil, kuralı modelle',
    chapters: ['Oran sandalye değildir', 'Nerede duyarlı', 'Neyin iddia edilmediği'],
  },
  'portfolio-optimizer': {
    title: 'Mühürlü Model',
    discipline: 'Gösterim · sentetik veri',
    note: 'Sorgulayamadığınız bir dağıtım. Uydurma varsayımlar, tümü açıkta.',
    deck:
      'Dağıtım modelleri, varsayımlarla cevap arasında görünür bir bağ olmayan bir pasta grafiği olarak gelir; kimse bir görüş yanlışsa ne olacağını soramaz. Bu araç, kaynağa yazılmış varsayımlarla tarayıcınızda çalışır ve varsayımların hepsini yayımlar.',
    binding: 'Sentetik gösterim · bu site için yapıldı',
    format: 'Tartışabileceğiniz bir çözücü ve arkasındaki varsayım tablosu',
    theme: 'Kimsenin denetleyemediği bir öneri',
    motif: 'Ya hesabı göster ya da grafiği gösterme',
    chapters: ['Önsel', 'Görüşünüz, ağırlıklandırılmış', 'Bir sayı değil, bir dağılım'],
  },
};

const it: CopyById = {
  'document-intelligence': {
    title: 'La Pila Non Letta',
    discipline: 'Document intelligence',
    note: 'Il documento che nessuno ha tempo di leggere — e il collo di bottiglia è una persona sola.',
    deck:
      'Contratti, fatture, dichiarazioni, polizze — letti a mano, dipendenti da una persona sola e in modo incoerente da persona a persona. Il costo raramente è la lettura. È la clausola di rinnovo scoperta dopo il rinnovo, e la decisione che sei mesi dopo nessuno sa ricostruire.',
    binding: 'Incarico cliente · pilota delimitato',
    format: 'Un flusso su un tipo di documento, valutato sui vostri esempi',
    theme: 'Una coda che solo una persona sa smaltire',
    motif: 'Dare priorità, non sostituire',
    chapters: ['La coda', 'Cosa può decidere il modello', 'Il percorso di eccezione'],
  },
  forecasting: {
    title: 'Il Numero Nudo',
    discipline: 'Previsione & analisi finanziaria',
    note: 'Una cifra sola, presentata come certezza e pianificata come un fatto.',
    deck:
      'Dovete impegnarvi ora su qualcosa che dipende da dopo — magazzino, cassa, prezzo, capacità. Il foglio restituisce un numero solo e nessuno sa dire quanto possa essere sbagliato: così il piano non ha alternative dentro e la sorpresa arriva a prezzo pieno.',
    binding: 'Incarico cliente · prima la valutazione',
    format: 'Un confronto con la baseline, un approccio di validazione e una raccomandazione',
    theme: 'Un piano senza spazio per sbagliarsi',
    motif: 'Un intervallo, e l’ipotesi che lo sposta',
    chapters: ['La decisione', 'Battere la baseline naive', 'Dove si rompe'],
  },
  reporting: {
    title: 'Il Mese Lungo',
    discipline: 'Business intelligence & reporting',
    note: 'Due reparti, due fatturati, e una riunione che è già passata.',
    deck:
      'I numeri si assemblano a mano da più sistemi. Servono giorni, due squadre dichiarano cifre diverse per lo stesso mese, e quando il pacchetto è pronto la decisione per cui era stato costruito è già stata presa a intuito.',
    binding: 'Incarico cliente · prima la diagnostica',
    format: 'Valutazione dei dati di origine, definizioni scritte dei KPI, priorità',
    theme: 'Una settimana di tempo qualificato, ogni mese, per numeri di cui nessuno si fida',
    motif: 'Una vista sola, definita una volta',
    chapters: ['Prima le decisioni', 'Dove i sistemi divergono', 'Definizioni che tengono'],
  },
  'cross-border': {
    title: 'Due Regolamenti',
    discipline: 'Consulenza transfrontaliera · Italia & Turchia',
    note: 'Due sistemi normativi insieme. L’errore costoso è non sapere quale domanda porre.',
    deck:
      'Operare tra Italia e Turchia significa due sistemi normativi, due lingue e due insiemi di prassi professionali insieme. Ciò che costa raramente è il passaggio visibile: è non sapere quale professionista un dato passaggio richieda per legge, e scoprirlo tardi.',
    binding: 'Coordinamento · il lavoro regolamentato è affidato a terzi',
    format: 'Un perimetro confermato, una mappa delle responsabilità e i professionisti necessari',
    theme: 'Un processo bloccato su un passaggio che nessuno ha avviato',
    motif: 'La sequenza, e chi è qualificato per ciascuna parte',
    chapters: ['L’obiettivo commerciale', 'Chi può fare cosa', 'La sequenza'],
  },
  'greenwashing-risk-scoring': {
    title: 'La Promessa Eccedente',
    discipline: 'Ricerca · document intelligence',
    note: 'Una dichiarazione che supera l’impegno. Valutata su 29 casi — e ne manca la maggior parte.',
    deck:
      'Un rilevatore che ordina le dichiarazioni ambientali in base a quanto il linguaggio corra avanti rispetto all’impegno. Segue da vicino il giudizio esperto — Pearson 0,906 — e trova comunque al massimo il 40% di ciò che un revisore segnalerebbe. È pubblicato qui perché è il secondo numero a decidere come possa essere usato.',
    binding: 'Ricerca · repository pubblico',
    format: 'Punteggi per dichiarazione, un impianto di validazione e i numeri che non hanno retto',
    theme: 'Una coda di lettura senza un ordine difendibile',
    motif: 'Ordina la coda; non emettere mai il verdetto',
    chapters: ['Ventinove dichiarazioni', 'Perché ha vinto il modello semplice', 'Cosa manca ancora'],
  },
  'parliamentary-seat-forecast': {
    title: 'Il Salto di Soglia',
    discipline: 'Ricerca · previsione',
    note: 'Se un esito attraversa una soglia, è la soglia che va modellata.',
    deck:
      'Una tesi triennale che ha trattato un’elezione come un problema di previsione. L’incertezza interessante non è mai stata nei sondaggi: stava in una regola dove una frazione di punto da una parte o dall’altra di una soglia cambia del tutto la risposta. Scaglioni fiscali, covenant e soglie di volume si comportano allo stesso modo.',
    binding: 'Ricerca · repository pubblico',
    format: 'Metodo, provenienza dei dati, e nessuna dichiarazione di accuratezza perché nessuna è pubblicata',
    theme: 'Una previsione che appiana proprio la parte che conta',
    motif: 'Modella la regola, non la media',
    chapters: ['La quota non sono i seggi', 'Dove è sensibile', 'Cosa non viene dichiarato'],
  },
  'portfolio-optimizer': {
    title: 'Il Modello Sigillato',
    discipline: 'Dimostrazione · dati sintetici',
    note: 'Un’allocazione che non puoi interrogare. Ipotesi inventate, mostrate per intero.',
    deck:
      'I modelli di allocazione arrivano come un grafico a torta senza un legame visibile tra ipotesi e risultato, così nessuno può chiedere cosa succede se una view è sbagliata. Questo gira nel tuo browser su ipotesi scritte nel codice, e le pubblica tutte.',
    binding: 'Dimostrazione sintetica · costruita per questo sito',
    format: 'Un solutore con cui discutere, e la tabella delle ipotesi che lo alimenta',
    theme: 'Una raccomandazione che nessuno può verificare',
    motif: 'Mostra i passaggi, o non mostrare il grafico',
    chapters: ['La distribuzione a priori', 'La tua view, pesata', 'Una distribuzione, non un numero'],
  },
};

const COPY: Record<Locale, CopyById> = { en, tr, it };

/** The record shape the authored engine consumes. */
export interface ShelfBook extends VolumeSpine, VolumeCopy {}

export function getShelfBooks(locale: Locale): ShelfBook[] {
  const copy = COPY[locale] ?? COPY.en;
  return VOLUMES.map((volume, index) => ({
    ...volume,
    ...copy[volume.id],
    roman: ROMAN[index],
  }));
}

