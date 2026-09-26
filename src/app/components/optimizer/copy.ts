"use client";
import { useContext } from "react";
import { OptimizerLocale } from "./locale";

/** UI translations are separate from the unchanged numerical engine. */
export const OPTIMIZER_COPY: Record<string, [string, string]> = {
  "Growth equities": ["Büyüme hisseleri", "Azioni di crescita"],
  "Defensive rates": [
    "Savunmacı faiz varlıkları",
    "Attivi obbligazionari difensivi",
  ],
  "Real assets": ["Reel varlıklar", "Attivi reali"],
  "vs 60/40": ["60/40'a göre", "rispetto al 60/40"],
  "T-Bills": ["Hazine bonoları", "Buoni del Tesoro"],
  "Geopolitical portfolio optimizer": [
    "Jeopolitik portföy optimizasyonu",
    "Ottimizzatore di portafoglio geopolitico",
  ],
  "Geopolitical Portfolio Optimizer": [
    "Jeopolitik Portföy Optimizasyonu",
    "Ottimizzatore di portafoglio geopolitico",
  ],
  "client-side engine": ["Tarayıcıda hesaplanır", "Calcolo nel browser"],
  alloc: ["dağılım", "allocazione"],
  sim: ["simülasyon", "simulazione"],
  "Control & Macro Inputs": [
    "Kontroller ve makro girdiler",
    "Controlli e parametri macro",
  ],
  "Initial capital": ["Başlangıç sermayesi", "Capitale iniziale"],
  "Monthly contribution": ["Aylık katkı", "Contributo mensile"],
  "Investment horizon": ["Yatırım süresi", "Orizzonte temporale"],
  "Risk tolerance": ["Risk toleransı", "Tolleranza al rischio"],
  "Geopolitical shock / regime": [
    "Jeopolitik şok / rejim",
    "Shock / regime geopolitico",
  ],
  "Macro regime": ["Makro rejim", "Regime macro"],
  "Geopolitical inertia": ["Jeopolitik atalet", "Inerzia geopolitica"],
  Cyclical: ["Döngüsel", "Ciclico"],
  Structural: ["Yapısal", "Strutturale"],
  "Equity sentiment": ["Hisse senedi duyarlılığı", "Sentiment azionario"],
  Bearish: ["Düşüş", "Ribassista"],
  Neutral: ["Nötr", "Neutrale"],
  Bullish: ["Yükseliş", "Rialzista"],
  "Active Black-Litterman views": [
    "Etkin Black-Litterman görüşleri",
    "Opinioni Black-Litterman attive",
  ],
  "Asset Allocation · w*": [
    "Varlık dağılımı · w*",
    "Allocazione degli attivi · w*",
  ],
  "Portfolio allocation donut; exact weights in the table below": [
    "Portföy dağılımı; kesin ağırlıklar aşağıdaki tabloda",
    "Allocazione del portafoglio; pesi esatti nella tabella sottostante",
  ],
  Asset: ["Varlık", "Attivo"],
  Weight: ["Ağırlık", "Peso"],
  Allocated: ["Dağıtıldı", "Allocato"],
  "Monte Carlo Wealth Fan": [
    "Monte Carlo servet dağılımı",
    "Ventaglio patrimoniale Monte Carlo",
  ],
  "Adaptive 5th–95th": ["Uyarlamalı %5–%95", "Adattivo 5°–95°"],
  "Paid in": ["Yatırılan", "Versato"],
  "paid in": ["yatırılan", "versato"],
  "simulating…": ["simülasyon…", "simulazione…"],
  "Adaptive p95": ["Uyarlamalı p95", "Adattivo p95"],
  "Adaptive p50": ["Uyarlamalı p50", "Adattivo p50"],
  "Adaptive p5": ["Uyarlamalı p5", "Adattivo p5"],
  "T-Bills p50": ["Hazine bonoları p50", "Buoni del Tesoro p50"],
  "Strategy Comparison": [
    "Strateji karşılaştırması",
    "Confronto delle strategie",
  ],
  "Strategy comparison": [
    "Strateji karşılaştırması",
    "Confronto delle strategie",
  ],
  Metric: ["Ölçüt", "Metrica"],
  Measure: ["Ölçüm", "Misura"],
  "Risk & Performance HUD": [
    "Risk ve performans göstergeleri",
    "Indicatori di rischio e rendimento",
  ],
  "Expected annual return · μ_BL": [
    "Beklenen yıllık getiri · μ_BL",
    "Rendimento annuo atteso · μ_BL",
  ],
  "Annual volatility · σ": ["Yıllık oynaklık · σ", "Volatilità annua · σ"],
  "95% CVaR · expected tail loss": [
    "%95 CVaR · beklenen kuyruk kaybı",
    "CVaR 95% · perdita attesa di coda",
  ],
  "· 1-yr horizon": ["· 1 yıllık süre", "· orizzonte di 1 anno"],
  "Simulated Sharpe ratio": [
    "Simüle edilen Sharpe oranı",
    "Indice di Sharpe simulato",
  ],
  analytic: ["analitik", "analitico"],
  "Geopolitical resilience alpha": [
    "Jeopolitik dayanıklılık alfası",
    "Alfa di resilienza geopolitica",
  ],
  "return edge vs 60/40 under full conflict": [
    "Tam çatışmada 60/40'a göre getiri farkı",
    "Vantaggio di rendimento sul 60/40 in pieno conflitto",
  ],
  "tail loss": ["kuyruk kaybı", "perdita di coda"],
  smaller: ["daha az", "minore"],
  larger: ["daha fazla", "maggiore"],
  "in conflict": ["çatışmada", "in conflitto"],
  "Conflict stress · θ = 1": [
    "Çatışma stresi · θ = 1",
    "Stress da conflitto · θ = 1",
  ],
  Adaptive: ["Uyarlamalı", "Adattivo"],
  "Engine telemetry": ["Hesaplama ölçümleri", "Telemetria del motore"],
  "BL views": ["BL görüşleri", "Opinioni BL"],
  Solver: ["Çözücü", "Risolutore"],
  "iters · λ": ["yineleme · λ", "iterazioni · λ"],
  "Target μ": ["Hedef μ", "Obiettivo μ"],
  "Tail model": ["Kuyruk modeli", "Modello di coda"],
  Allocation: ["Dağılım", "Allocazione"],
  Simulation: ["Simülasyon", "Simulazione"],
  "Expected return": ["Beklenen getiri", "Rendimento atteso"],
  Volatility: ["Oynaklık", "Volatilità"],
  "μ_BL · annual": ["μ_BL · yıllık", "μ_BL · annuo"],
  "σ · annual": ["σ · yıllık", "σ · annua"],
  "1-yr expected tail loss": [
    "1 yıllık beklenen kuyruk kaybı",
    "Perdita attesa di coda a 1 anno",
  ],
  "Simulated Sharpe": ["Simüle edilen Sharpe", "Sharpe simulato"],
  "from the paths": ["simülasyon yollarından", "dalle traiettorie"],
  "Median wealth": ["Medyan servet", "Patrimonio mediano"],
  "Stress wealth": ["Stres durumunda servet", "Patrimonio sotto stress"],
  "Bull wealth": ["Yükseliş durumunda servet", "Patrimonio rialzista"],
  "5th percentile": ["5. yüzdelik", "5° percentile"],
  "95th percentile": ["95. yüzdelik", "95° percentile"],
  "P(shortfall)": ["P(eksik bakiye)", "P(deficit)"],
  "ends below money paid in": [
    "yatırılan tutarın altında sonuç",
    "risultato inferiore ai versamenti",
  ],
  "Adaptive Geopolitical": ["Uyarlamalı jeopolitik", "Geopolitico adattivo"],
  "Static 60/40": ["Sabit 60/40", "Statico 60/40"],
  "100% T-Bills": ["%100 Hazine bonosu", "100% buoni del Tesoro"],
  "Adaptive (median)": ["Uyarlamalı (medyan)", "Adattivo (mediana)"],
  "60/40 (median)": ["60/40 (medyan)", "60/40 (mediana)"],
  "T-Bills (median)": [
    "Hazine bonoları (medyan)",
    "Buoni del Tesoro (mediana)",
  ],
  now: ["şimdi", "ora"],
  Now: ["Şimdi", "Ora"],
  Year: ["Yıl", "Anno"],
  year: ["yıl", "anno"],
  years: ["yıl", "anni"],
  yr: ["yıl", "anni"],
  y: ["y", "a"],
  paths: ["yol", "traiettorie"],
  monthly: ["aylık", "mensili"],
  quarterly: ["üç aylık", "trimestrali"],
  steps: ["adım", "passi"],
  views: ["görüş", "opinioni"],
  "(clamped)": ["(sınırlandı)", "(limitato)"],
  Conservative: ["Temkinli", "Prudente"],
  Moderate: ["Dengeli", "Moderato"],
  Aggressive: ["Agresif", "Aggressivo"],
  "Geopolitical-Hedged": ["Jeopolitik korumalı", "Copertura geopolitica"],
  "Capital preservation; near the minimum-CVaR frontier point.": [
    "Sermaye koruması; minimum CVaR sınırına yakın.",
    "Conservazione del capitale; vicino al punto di minimo CVaR.",
  ],
  "Balanced growth with a bounded tail.": [
    "Kuyruk riski sınırlı dengeli büyüme.",
    "Crescita equilibrata con rischio di coda limitato.",
  ],
  "Return-seeking; accepts a fatter left tail.": [
    "Getiri odaklı; daha kalın bir sol kuyruğu kabul eder.",
    "Ricerca del rendimento; accetta una coda sinistra più pesante.",
  ],
  "Minimax: optimises the worse of the current and conflict regimes.": [
    "Minimaks: mevcut rejim ile çatışma rejiminin kötüsünü optimize eder.",
    "Minimax: ottimizza il peggiore tra il regime attuale e quello di conflitto.",
  ],
  "Cooperative Global Growth": [
    "İş birliğine dayalı küresel büyüme",
    "Crescita globale cooperativa",
  ],
  "High Inflation / Resource Nationalism": [
    "Yüksek enflasyon / kaynak milliyetçiliği",
    "Alta inflazione / nazionalismo delle risorse",
  ],
  "Geopolitical Fracturing / Conflict": [
    "Jeopolitik parçalanma / çatışma",
    "Frammentazione geopolitica / conflitto",
  ],
  "Disinflationary Stagnation": [
    "Dezenflasyonist durgunluk",
    "Stagnazione disinflazionistica",
  ],
  "Cyclical data dominates; regime views barely move the prior.": [
    "Döngüsel veriler baskın; rejim görüşleri önseli çok az değiştirir.",
    "Dominano i dati ciclici; le opinioni di regime modificano poco la distribuzione a priori.",
  ],
  "Structural trends tilt the posterior modestly.": [
    "Yapısal eğilimler sonsalı sınırlı ölçüde değiştirir.",
    "Le tendenze strutturali modificano moderatamente la distribuzione a posteriori.",
  ],
  "Structural trends carry most of the weight.": [
    "Ağırlığın çoğunu yapısal eğilimler taşır.",
    "Le tendenze strutturali hanno il peso maggiore.",
  ],
  "Regime views applied at near-full conviction.": [
    "Rejim görüşleri neredeyse tam güvenle uygulanır.",
    "Opinioni di regime applicate con convinzione quasi piena.",
  ],
  Equities: ["Hisse senetleri", "Azioni"],
  "Rates & Cash": ["Faiz ve nakit", "Tassi e liquidità"],
  "Real Assets": ["Reel varlıklar", "Attivi reali"],
  "US Large-Cap Equities": [
    "ABD büyük ölçekli hisseleri",
    "Azioni USA a grande capitalizzazione",
  ],
  "Developed Markets ex-US": [
    "ABD dışı gelişmiş piyasalar",
    "Mercati sviluppati esclusi USA",
  ],
  "Emerging Markets": ["Gelişen piyasalar", "Mercati emergenti"],
  "US 7-10Y Treasuries": [
    "ABD 7–10 yıllık tahvilleri",
    "Treasury USA a 7–10 anni",
  ],
  "US TIPS": ["ABD enflasyona endeksli tahvilleri", "TIPS USA"],
  "Commodities / Energy": ["Emtia / enerji", "Materie prime / energia"],
  Gold: ["Altın", "Oro"],
  "Cash / T-Bills": ["Nakit / Hazine bonoları", "Liquidità / buoni del Tesoro"],
  "Open trade, synchronised expansion, low political risk premia. Risk assets and EM lead; hedges earn little.":
    [
      "Açık ticaret, eş zamanlı büyüme ve düşük siyasi risk primleri. Riskli varlıklar ve gelişen piyasalar önde; koruma araçlarının getirisi düşük.",
      "Commercio aperto, espansione sincronizzata e bassi premi per il rischio politico. Guidano gli attivi rischiosi e i mercati emergenti; le coperture rendono poco.",
    ],
  "Export controls and cartelised supply keep prices elevated. Real assets and inflation-linked bonds lead; nominal duration suffers.":
    [
      "İhracat kontrolleri ve kartelleşmiş arz fiyatları yüksek tutar. Reel varlıklar ve enflasyona endeksli tahviller önde; nominal durasyon olumsuz etkilenir.",
      "Controlli sulle esportazioni e offerta cartellizzata mantengono alti i prezzi. Guidano attivi reali e obbligazioni indicizzate; soffre la duration nominale.",
    ],
  "Bloc formation, sanctions and kinetic risk. Gold and energy spike, US assets attract safe-haven flows, EM and Europe de-rate.":
    [
      "Bloklaşma, yaptırımlar ve silahlı çatışma riski. Altın ve enerji yükselir; ABD varlıkları güvenli liman akımları çeker, gelişen piyasalar ve Avrupa değer kaybeder.",
      "Formazione di blocchi, sanzioni e rischio bellico. Oro ed energia salgono, gli attivi USA attraggono flussi rifugio, emergenti ed Europa subiscono una svalutazione.",
    ],
  "Demographic drag, deleveraging and falling real rates. Duration wins, commodities lose their bid, equities grind.":
    [
      "Demografik baskı, borç azaltma ve düşen reel faizler. Durasyon kazandırır, emtia talebi azalır, hisseler zorlanır.",
      "Freno demografico, riduzione della leva e tassi reali in calo. La duration guadagna, cala la domanda di materie prime, le azioni faticano.",
    ],
  "EM outperforms US by 200bp": [
    "Gelişen piyasalar ABD'yi 200 bp aşar",
    "Emergenti sopra gli USA di 200 bp",
  ],
  "Developed ex-US beats US by 100bp": [
    "ABD dışı gelişmiş piyasalar ABD'yi 100 bp aşar",
    "Sviluppati ex USA sopra gli USA di 100 bp",
  ],
  "Gold returns 3% (hedge premium fades)": [
    "Altın getirisi %3 (koruma primi azalır)",
    "Oro al 3% (premio di copertura in calo)",
  ],
  "Commodities return 4%": ["Emtia getirisi %4", "Materie prime al 4%"],
  "Treasuries return 3.5%": ["ABD tahvil getirisi %3,5", "Treasury al 3,5%"],
  "Commodities return 9%": ["Emtia getirisi %9", "Materie prime al 9%"],
  "TIPS beat Treasuries by 250bp": [
    "TIPS, ABD tahvillerini 250 bp aşar",
    "TIPS sopra i Treasury di 250 bp",
  ],
  "Gold returns 7%": ["Altın getirisi %7", "Oro al 7%"],
  "US equities return 5% (margin squeeze)": [
    "ABD hisseleri %5 getirir (marj baskısı)",
    "Azioni USA al 5% (margini compressi)",
  ],
  "Resource-heavy EM beats DM ex-US by 150bp": [
    "Kaynak ağırlıklı gelişen piyasalar ABD dışı gelişmiş piyasaları 150 bp aşar",
    "Emergenti ricchi di risorse sopra gli sviluppati ex USA di 150 bp",
  ],
  "Treasuries return 2%": ["ABD tahvil getirisi %2", "Treasury al 2%"],
  "Gold returns 10% (safe-haven bid)": [
    "Altın getirisi %10 (güvenli liman talebi)",
    "Oro al 10% (domanda di beni rifugio)",
  ],
  "US beats Europe/Japan by 300bp": [
    "ABD, Avrupa/Japonya'yı 300 bp aşar",
    "USA sopra Europa/Giappone di 300 bp",
  ],
  "EM returns 1.5% (sanctions, capital flight)": [
    "Gelişen piyasalar %1,5 getirir (yaptırımlar, sermaye kaçışı)",
    "Emergenti all'1,5% (sanzioni, fuga di capitali)",
  ],
  "Energy-led commodities return 8.5%": [
    "Enerji öncülüğünde emtia getirisi %8,5",
    "Materie prime guidate dall'energia all'8,5%",
  ],
  "Treasuries return 4.5% (flight to quality)": [
    "ABD tahvil getirisi %4,5 (kaliteye kaçış)",
    "Treasury al 4,5% (ricerca di qualità)",
  ],
  "Developed ex-US returns 3%": [
    "ABD dışı gelişmiş piyasalar %3 getirir",
    "Sviluppati ex USA al 3%",
  ],
  "Treasuries return 5.8% (rate cuts)": [
    "ABD tahvil getirisi %5,8 (faiz indirimleri)",
    "Treasury al 5,8% (tagli dei tassi)",
  ],
  "US equities return 4.5%": ["ABD hisse getirisi %4,5", "Azioni USA al 4,5%"],
  "EM returns 3% (weak global demand)": [
    "Gelişen piyasalar %3 getirir (zayıf küresel talep)",
    "Emergenti al 3% (domanda globale debole)",
  ],
  "Commodities return 0%": ["Emtia getirisi %0", "Materie prime allo 0%"],
  "Gold returns 4% (real rates fall)": [
    "Altın getirisi %4 (reel faizler düşer)",
    "Oro al 4% (tassi reali in calo)",
  ],
  "TIPS lag Treasuries by 120bp": [
    "TIPS, ABD tahvillerinin 120 bp gerisinde",
    "TIPS sotto i Treasury di 120 bp",
  ],
  "S&P 500 exposure; the core growth engine.": [
    "S&P 500 riski; temel büyüme kaynağı.",
    "Esposizione S&P 500; principale motore di crescita.",
  ],
  "Europe, Japan, Australasia; currency-exposed growth.": [
    "Avrupa, Japonya, Avustralasya; kur riskine açık büyüme.",
    "Europa, Giappone, Australasia; crescita esposta al cambio.",
  ],
  "Higher growth, higher political and FX risk.": [
    "Daha yüksek büyüme, siyasi risk ve kur riski.",
    "Crescita maggiore, maggior rischio politico e valutario.",
  ],
  "Duration ballast; the classic flight-to-quality asset.": [
    "Durasyon dengesi; klasik güvenli liman varlığı.",
    "Stabilizzatore di duration; classico bene rifugio.",
  ],
  "Inflation-linked Treasuries; real-rate exposure.": [
    "Enflasyona endeksli ABD tahvilleri; reel faiz riski.",
    "Treasury indicizzati all'inflazione; esposizione ai tassi reali.",
  ],
  "Broad commodity basket; supply-shock hedge.": [
    "Geniş emtia sepeti; arz şokuna karşı koruma.",
    "Paniere ampio di materie prime; copertura dagli shock di offerta.",
  ],
  "Monetary metal; conflict and debasement hedge.": [
    "Parasal metal; çatışma ve para değer kaybına karşı koruma.",
    "Metallo monetario; copertura da conflitti e svalutazione.",
  ],
  "Short-dated bills; the risk-free anchor.": [
    "Kısa vadeli bonolar; risksiz dayanak.",
    "Buoni a breve termine; riferimento privo di rischio.",
  ],
  "Projected wealth": ["Öngörülen servet", "Patrimonio previsto"],
  Median: ["Medyan", "Mediana"],
  cash: ["nakit", "liquidità"],
  sentiment: ["duyarlılık", "sentiment"],
  "Stylised capital-market assumptions; not investment advice. Posterior μ_BL and Σ_BL follow the He–Litterman closed form with τ = 0.05 and Ω from view confidence. Weights minimise the 95% CVaR of the one-year loss under an elliptical t(ν=5) model, subject to 0 ≤ wᵢ ≤ 40%, Σw = 1 and a return target set by the risk profile; the hedged profile minimises the worse of the current and full-conflict regimes. The fan simulates 1,000 paths with a shared fat-tail mixing variable so the three strategies are compared on identical shocks.":
    [
      "Basitleştirilmiş sermaye piyasası varsayımlarıdır; yatırım tavsiyesi değildir. Sonsal μ_BL ve Σ_BL, τ = 0.05 ve görüş güveninden türetilen Ω ile He–Litterman kapalı formunu izler. Ağırlıklar, eliptik t(ν=5) modeli altında bir yıllık kaybın %95 CVaR değerini minimize eder; kısıtlar 0 ≤ wᵢ ≤ %40, Σw = 1 ve risk profiline bağlı getiri hedefidir. Korumalı profil, mevcut rejim ile tam çatışma rejiminin kötüsünü minimize eder. Üç stratejinin aynı şoklarla karşılaştırılması için dağılım grafiği, ortak kalın kuyruk karışım değişkeniyle 1.000 yol simüle eder.",
      "Ipotesi stilizzate sui mercati dei capitali; non costituiscono consulenza finanziaria. μ_BL e Σ_BL a posteriori seguono la forma chiusa di He–Litterman con τ = 0.05 e Ω derivata dalla fiducia nelle opinioni. I pesi minimizzano il CVaR al 95% della perdita a un anno sotto un modello ellittico t(ν=5), con 0 ≤ wᵢ ≤ 40%, Σw = 1 e un obiettivo di rendimento fissato dal profilo di rischio; il profilo coperto minimizza il peggiore tra il regime attuale e quello di pieno conflitto. Il ventaglio simula 1.000 traiettorie con una variabile comune di mescolamento a coda pesante, confrontando le tre strategie sugli stessi shock.",
    ],
};
export function useOptimizerCopy() {
  const locale = useContext(OptimizerLocale);
  return (text: string) =>
    locale === "en"
      ? text
      : (OPTIMIZER_COPY[text]?.[locale === "tr" ? 0 : 1] ?? text);
}
