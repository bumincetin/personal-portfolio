# Content manifest — redesign baseline

Captured from the uncommitted working tree on 2026-09-25, before production UI edits. Existing user work is authoritative. Exact source copies, 110 hashes and 5,375 extracted literals are in artifacts/redesign/baseline. The semantic inventory below preserves original strings in all three languages.

## Route and preservation matrix

| Old location | New location | Content / behavior |
|---|---|---|
| /{en,tr,it} hero | Same route, atlas entry + context | Exact headline, identity, intro, browse and contact actions |
| Homepage seven catalogue entries | Same route, service index + research chapters | Every title, discipline, category, note, format, read URL, legal boundary |
| Homepage shelf invitation | Same route, exploration chapter | Both invitation strings, optional 3D library, pause, exit, loading, errors |
| Homepage endnote / footer | Same route, conversion chapter / footer | Fallback note, approach, contact, social links, location, copyright, disclaimer |
| /{locale}/front-matter | Same URL, editorial reader | All original leaves, headings, lists, evidence, links, anchors, article/book modes |
| /{locale}/volumes/{slug} | Same URLs, editorial reader | All 7 complete volumes, every leaf, figure, caption, evidence limitation and CTA; optimizer retained |
| /{locale}/chapters | Same URL, biographical sequence | Career timeline, photos, 5 chapters, education, jobs, languages, print CV, JSON-LD |
| /{locale}/contact | Same URL, conversation workspace | Direct channels; simple/guided draft; labels, fields, errors, preview, clipboard, email/Outlook/WhatsApp; optional sculpture |
| API /api/contact | Unchanged | Validation, rate limits, honeypot and provider behavior |
| Legacy redirects | Unchanged next.config.js | Existing permanent migration map |
| robots.txt, sitemap.xml | Unchanged generators | Locale URLs and crawling rules |

## Technology inventory

Next.js 15 App Router; React 18; TypeScript; Tailwind and CSS; Motion; Three.js; Cloudflare OpenNext deployment. Native HTML remains authoritative. No dependency additions planned. Existing uncommitted files will not be reset.

## SEO and functional contract

Titles, descriptions, canonical, reciprocal en/tr/it/x-default alternates, robots, Open Graph, Twitter images, person structured data and all legacy redirects retain their original helpers. Route metadata is captured separately in baseline/routes.json. No URL migrations. No pre-existing downloadable file was found: CV and article downloads are browser print/save-PDF actions.

Contact drafts are reviewed and sent in the user's messaging app, not automatically sent by the redesigned interface. Name/company/topic/timing are optional in simple mode; the existing guided validation and API remain intact. No credentials are copied into the inventory.

## Identity and destinations

```json
{
  "PROFILE": {
    "name": "Bumin Kağan Çetin",
    "shortName": "Bumin Çetin",
    "initials": "BKÇ",
    "city": "Milan",
    "country": "Italy",
    "workingLanguages": [
      "English",
      "Italian",
      "Turkish"
    ],
    "siteUrl": "https://bumincetin.com"
  },
  "CONTACT": {
    "email": {
      "address": "cetinbumink@gmail.com",
      "verified": true
    },
    "whatsapp": {
      "number": "393481705207",
      "display": "+39 348 170 5207",
      "verified": true
    },
    "linkedin": {
      "url": "https://linkedin.com/in/buminkcetin",
      "handle": "buminkcetin",
      "verified": true
    },
    "github": {
      "url": "https://github.com/bumincetin",
      "handle": "bumincetin",
      "verified": true
    },
    "scheduling": {
      "url": null,
      "verified": false
    }
  }
}
```

## EN exact route content

### /en

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "home": {
    "hero": "Applied AI and financial analytics for clearer business decisions.",
    "intro": "I help finance and operations teams turn document queues, forecasts, and fragmented reports into workflows they can check and use.",
    "directory": "Services & work",
    "about": "About / CV",
    "approach": "Approach",
    "home": "Home",
    "service": "Service offering",
    "research": "Research project",
    "synthetic": "Synthetic demonstration",
    "browse": "Browse the work",
    "contact": "Discuss your project",
    "read": "Read this volume",
    "takeaway": "What you receive / learn",
    "collection": "A working library",
    "collectionNote": "Four services, two research projects, and one synthetic demonstration. Open any volume to examine its scope, evidence, and limitations.",
    "shelfTitle": "Take a book off the shelf.",
    "shelfNote": "Explore the same seven volumes in the interactive library.",
    "activate": "Enter the 3D library",
    "exit": "Return to catalogue",
    "pause": "Pause decorative motion",
    "play": "Resume decorative motion",
    "shelfLoading": "Preparing the library…",
    "shelfFailed": "The interactive library could not load. Every volume is available in the catalogue.",
    "boundary": "Italy–Turkey commercial coordination is a separate, scoped service. Regulated legal, tax, accounting, and investment work remains with licensed professionals.",
    "view": "Reading view",
    "article": "Article",
    "book": "Book",
    "contents": "In this volume",
    "readingFailed": "Book view could not load. You can read the full article below.",
    "print": "Print / save article",
    "offered": "What is in scope",
    "launchOptimizer": "Open the synthetic optimizer",
    "optimizerFailed": "The instrument could not load. Its methods, examples, and limitations remain in this article.",
    "simple": "Write a message",
    "guided": "Use guided questions",
    "topic": "Topic",
    "timing": "Timing",
    "regenerate": "Replace draft with current answers",
    "email": "Open email draft",
    "whatsapp": "Open WhatsApp draft",
    "outlook": "Open Outlook draft",
    "contactIntro": "Describe the problem or outcome you have in mind. You can write directly, or use a few optional questions to shape your message.",
    "messageRequired": "Please add a message.",
    "copyFallback": "If your email app does not open, copy your message and paste it into your preferred app.",
    "longDraft": "This draft is long for an app link. Copy it and paste it into your email or WhatsApp app.",
    "scene": "Explore the book sculpture",
    "closeScene": "Close sculpture",
    "optionalDetails": "Name, topic & timing (optional)"
  },
  "volumes": [
    {
      "id": "document-intelligence",
      "kind": "service",
      "href": "/volumes/document-intelligence",
      "motifKey": "brackets",
      "color": "#182a43",
      "foil": "#c87046",
      "palette": {
        "paper": "#1b1613",
        "paperDeep": "#120e0b",
        "paperPale": "#f1eadf",
        "ink": "#f4eee6",
        "inkSoft": "#b9b4ae",
        "wall": "#1b1613",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f4d7b9",
        "fill": "#c2a184"
      },
      "width": 1.02,
      "height": 1.58,
      "depth": 0.26,
      "seed": 11,
      "title": "The Unread Pile",
      "discipline": "Document intelligence",
      "note": "The document nobody has time to read — and one person is the bottleneck.",
      "deck": "Contracts, invoices, disclosures, policy files — read by hand, one person deep, and inconsistently between people. The cost is rarely the reading. It is the renewal clause found after it renewed, and the decision nobody can reconstruct six months later.",
      "binding": "Client engagement · bounded pilot",
      "format": "A workflow over one document type, evaluated on your own examples",
      "theme": "A queue that only one person can clear",
      "motif": "Triage, not replacement",
      "chapters": [
        "The queue",
        "What the model may decide",
        "The exception path"
      ],
      "roman": "I"
    },
    {
      "id": "forecasting",
      "kind": "service",
      "href": "/volumes/forecasting",
      "motifKey": "paths",
      "color": "#c24d24",
      "foil": "#efc16d",
      "palette": {
        "paper": "#1e1813",
        "paperDeep": "#130f0b",
        "paperPale": "#f4ece1",
        "ink": "#f6efe6",
        "inkSoft": "#c0b3a6",
        "wall": "#1e1813",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f7d9ad",
        "fill": "#c99a6a"
      },
      "width": 1.1,
      "height": 1.46,
      "depth": 0.29,
      "seed": 22,
      "title": "The Naked Number",
      "discipline": "Forecasting & financial analytics",
      "note": "A single figure, presented as certainty and planned against as fact.",
      "deck": "You have to commit now to something that depends on later — stock, cash, price, capacity. The spreadsheet returns one number and nobody can say how wrong it could be, so the plan has no contingency in it and the surprise arrives at full cost.",
      "binding": "Client engagement · assessment first",
      "format": "A baseline comparison, a validation approach, and a recommendation",
      "theme": "A plan with no room for being wrong",
      "motif": "A range, and the assumption that moves it",
      "chapters": [
        "The decision",
        "Beating the naive baseline",
        "Where it breaks"
      ],
      "roman": "II"
    },
    {
      "id": "reporting",
      "kind": "service",
      "href": "/volumes/reporting",
      "motifKey": "caret",
      "color": "#afc400",
      "foil": "#171a16",
      "palette": {
        "paper": "#1c1a11",
        "paperDeep": "#12110a",
        "paperPale": "#eef0e2",
        "ink": "#f1f3e8",
        "inkSoft": "#b5bba7",
        "wall": "#1c1a11",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f2e4b4",
        "fill": "#b0a377"
      },
      "width": 0.92,
      "height": 1.52,
      "depth": 0.22,
      "seed": 33,
      "title": "The Week-Long Month",
      "discipline": "Business intelligence & reporting",
      "note": "Two departments, two revenue figures, and a meeting that has already moved on.",
      "deck": "The numbers are assembled by hand from several systems. It takes days, two teams quote different figures for the same month, and by the time the pack is ready the decision it was built for has already been taken on instinct.",
      "binding": "Client engagement · diagnostic first",
      "format": "Source-data assessment, written KPI definitions, reporting priorities",
      "theme": "A week of skilled time, every month, for numbers nobody trusts",
      "motif": "One view, defined once",
      "chapters": [
        "The decisions first",
        "Where the systems disagree",
        "Definitions that hold"
      ],
      "roman": "III"
    },
    {
      "id": "cross-border",
      "kind": "service",
      "href": "/volumes/cross-border",
      "motifKey": "orbits",
      "color": "#1537a1",
      "foil": "#dbe8f1",
      "palette": {
        "paper": "#1a1614",
        "paperDeep": "#110e0c",
        "paperPale": "#e8eef6",
        "ink": "#eef3f9",
        "inkSoft": "#adb8c9",
        "wall": "#1a1614",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f4dcc0",
        "fill": "#b08f74"
      },
      "width": 1.08,
      "height": 1.68,
      "depth": 0.25,
      "seed": 44,
      "title": "Two Rulebooks",
      "discipline": "Cross-border advisory · Italy & Türkiye",
      "note": "Two regulatory systems at once. The expensive mistake is not knowing which question to ask.",
      "deck": "Operating between Italy and Türkiye means two regulatory systems, two languages and two sets of professional norms at once. What costs money is rarely the visible step — it is not knowing which professional a given step legally requires, and finding out late.",
      "binding": "Coordination · regulated work referred out",
      "format": "A confirmed scope, a responsibility map, and the professionals it needs",
      "theme": "A process stalled on a step nobody started",
      "motif": "Sequence, and who is qualified for each part",
      "chapters": [
        "The commercial objective",
        "Who is allowed to do what",
        "The sequence"
      ],
      "roman": "IV"
    },
    {
      "id": "greenwashing-risk-scoring",
      "kind": "evidence",
      "href": "/volumes/greenwashing-risk-scoring",
      "motifKey": "modules",
      "color": "#c83222",
      "foil": "#efb0aa",
      "palette": {
        "paper": "#1e1514",
        "paperDeep": "#140d0c",
        "paperPale": "#f6e9e6",
        "ink": "#f8eeec",
        "inkSoft": "#c5aeaa",
        "wall": "#1e1514",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f7cfc6",
        "fill": "#c08278"
      },
      "width": 1,
      "height": 1.48,
      "depth": 0.3,
      "seed": 55,
      "title": "The Overrun Claim",
      "discipline": "Research · document intelligence",
      "note": "A claim that outruns the commitment. Evaluated on 29 claims — and it misses most of them.",
      "deck": "A detector that ranks environmental claims by how far the language runs ahead of the commitment. It tracks expert judgement closely — Pearson 0.906 — and still finds at best 40% of what a reviewer would flag. Published here because that second number is the one that decides how it can be used.",
      "binding": "Research · published repository",
      "format": "Per-claim scores, a validation harness, and the numbers that failed",
      "theme": "A reading queue with no defensible order",
      "motif": "Rank the queue; never issue the verdict",
      "chapters": [
        "Twenty-nine claims",
        "Why the simple model won",
        "What it still misses"
      ],
      "roman": "V"
    },
    {
      "id": "parliamentary-seat-forecast",
      "kind": "evidence",
      "href": "/volumes/parliamentary-seat-forecast",
      "motifKey": "frames",
      "color": "#da3b2f",
      "foil": "#ff8eab",
      "palette": {
        "paper": "#1f1615",
        "paperDeep": "#150e0c",
        "paperPale": "#f7e9ec",
        "ink": "#f9eff1",
        "inkSoft": "#c7adb3",
        "wall": "#1f1615",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f9cdd6",
        "fill": "#c2808f"
      },
      "width": 0.96,
      "height": 1.57,
      "depth": 0.24,
      "seed": 66,
      "title": "The Threshold Cliff",
      "discipline": "Research · forecasting",
      "note": "When an outcome passes through a threshold, it is the threshold that must be modelled.",
      "deck": "A bachelor thesis that treated an election as a forecasting problem. The interesting uncertainty was never in the polling — it was in a rule where a fraction of a point either side of a threshold changes the answer completely. Tax bands, covenants and volume tiers behave the same way.",
      "binding": "Research · published repository",
      "format": "Method, data provenance, and no accuracy claim, because none was published",
      "theme": "A forecast that smooths away the part that matters",
      "motif": "Model the rule, not the average",
      "chapters": [
        "Share is not seats",
        "Where it is sensitive",
        "What is not claimed"
      ],
      "roman": "VI"
    },
    {
      "id": "portfolio-optimizer",
      "kind": "evidence",
      "href": "/volumes/portfolio-optimizer",
      "motifKey": "compass",
      "color": "#78a7bd",
      "foil": "#e4e7e5",
      "palette": {
        "paper": "#1a1715",
        "paperDeep": "#110f0d",
        "paperPale": "#e9eff2",
        "ink": "#eff4f6",
        "inkSoft": "#aebcc4",
        "wall": "#1a1715",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f2ddc6",
        "fill": "#b39a80"
      },
      "width": 1.12,
      "height": 1.63,
      "depth": 0.28,
      "seed": 77,
      "title": "The Sealed Model",
      "discipline": "Demonstration · synthetic data",
      "note": "An allocation you cannot interrogate. Invented assumptions, shown in full.",
      "deck": "Allocation models arrive as a pie chart with no visible link between the assumptions and the answer, so nobody can ask what happens if a view is wrong. This one runs in your browser on assumptions written into the source, and publishes every one of them.",
      "binding": "Synthetic demonstration · built for this site",
      "format": "A solver you can argue with, and the assumptions table behind it",
      "theme": "A recommendation nobody can check",
      "motif": "Show the working, or do not show the chart",
      "chapters": [
        "The prior",
        "Your view, weighted",
        "A distribution, not a number"
      ],
      "roman": "VII"
    }
  ],
  "ui": {
    "nav": {
      "mainLabel": "Main navigation",
      "shelf": "The shelf",
      "volumes": "Volumes",
      "frontMatter": "Front matter",
      "contact": "Contact",
      "primaryCta": "Discuss your project",
      "menu": "Open menu",
      "closeMenu": "Close menu",
      "language": "Language",
      "skipToContent": "Skip to content"
    },
    "home": {
      "metaTitle": "Applied AI & Financial Analytics Consulting",
      "heroEyebrow": "Applied AI and financial analytics",
      "heroLede": "I help finance and operations teams build forecasting models, automate document review, and create reporting systems they can actually use.",
      "brandLine": "Bridging the gap between code & capital",
      "ctaPrimary": "Discuss your project",
      "ctaSecondary": "Open the first volume",
      "locationLine": "Milan, Italy · working in English, Italian and Turkish",
      "evidenceLabel": "Evidence",
      "evidenceTitle": "What the work looks like when you check it",
      "evidenceLede": "Three things I can show you rather than assert. Each links to the artefact and the numbers behind it, including where they fall short.",
      "problemsLabel": "Problems",
      "problemsTitle": "Three problems I am usually called about",
      "problemsLede": "If one of these is the reason you are reading this page, the linked service explains how the engagement is scoped and what you would receive.",
      "featuredLabel": "Case study",
      "processLabel": "Process",
      "processTitle": "How an engagement runs",
      "costLabel": "The problem",
      "costTitle": "The expensive part is never the work. It is the delay, the rework, and the decision taken without the number.",
      "costLede": "Every problem on the shelf above has the same shape. Something that should take an afternoon takes a week; something that should be checkable is taken on trust; and a decision that will cost real money gets made before the figure that should inform it arrives. None of that shows up as a line item, which is exactly why it persists.",
      "costPoints": [
        {
          "cost": "Skilled time spent assembling, not deciding",
          "body": "A finance lead spending the first week of every month reconciling four systems is the most expensive data pipeline in the company, and the least maintained one."
        },
        {
          "cost": "Decisions made before the number arrives",
          "body": "When the pack lands after the meeting, the decision was made on instinct and the reporting became a record of what already happened rather than an input to what happens next."
        },
        {
          "cost": "Numbers nobody will stand behind",
          "body": "A figure two departments compute differently is worse than no figure: it gets argued about instead of acted on, and the argument recurs every month."
        },
        {
          "cost": "The clause found after it renewed",
          "body": "Documents read by one person, under time pressure, produce misses that surface as a cost months later — with no record of why that document was treated the way it was."
        }
      ],
      "processLede": "Four stages, each ending in something you can hold rather than a status update.",
      "process": [
        {
          "stage": "Discovery",
          "body": "We look at the actual decision and the actual data, and agree what a good outcome would be before anything is built. Often this is where a project gets smaller.",
          "output": "A written problem statement, and an honest view of whether it is worth doing."
        },
        {
          "stage": "Bounded pilot",
          "body": "One workflow, one document type, one forecast. Small enough that finding out it does not work is a cheap answer rather than a sunk cost.",
          "output": "A working prototype and an evaluation on your own data."
        },
        {
          "stage": "Delivery",
          "body": "The thing that survived the pilot gets built where the work actually happens, with the review step in place from the first day rather than added later.",
          "output": "The deployed workflow, its documentation, and the checks that show when it drifts."
        },
        {
          "stage": "Handover",
          "body": "Your team runs it without me. That includes knowing how to re-evaluate it when the inputs change, because they will.",
          "output": "Documentation, the evaluation harness, and a walkthrough with whoever owns it next."
        }
      ],
      "storyLabel": "Background",
      "storyTitle": "Why a data scientist keeps reading balance sheets",
      "storyLede": "I trained in economics and computer science at Bocconi, worked in bank risk, shipped forecasting models on a factory floor, and spent two years teaching models to read corporate disclosures. The through-line is that a model only matters once someone has to sign off on what it says.",
      "storyCta": "Read the full background",
      "contactTitle": "What decision or workflow are you trying to improve?",
      "contactLede": "Tell me the problem in a few sentences. I reply personally, usually within a couple of working days, and I will say plainly if it is not something I should take on."
    },
    "work": {
      "readCaseStudy": "Read the case study",
      "sections": {
        "problem": "The problem",
        "context": "Context",
        "role": "My role",
        "audience": "Who it is for",
        "data": "Data provenance",
        "constraints": "Constraints",
        "approach": "Approach",
        "decisions": "Decisions that mattered",
        "baseline": "Baseline",
        "evaluation": "How it was evaluated",
        "results": "Results",
        "deliverables": "What was delivered",
        "consequences": "What it changes in practice",
        "limitations": "Limitations",
        "humanReview": "Human review",
        "evidence": "Evidence record",
        "links": "Source material"
      },
      "evidenceIntro": "Every figure quoted above, with its source and what it does not tell you.",
      "evidenceSource": "Source",
      "evidenceMethod": "Method",
      "evidenceBaseline": "Compared with",
      "evidenceAsOf": "As of",
      "evidenceLimits": "Limitations",
      "noResults": "No performance figure is published for this project, so none is claimed.",
      "relatedService": "Related service",
      "repository": "Repository",
      "report": "Performance report",
      "figureLabel": "Figure",
      "nextStepTitle": "Have a problem shaped like this?",
      "nextStepLede": "Tell me what you are trying to decide and I will tell you whether this approach fits."
    },
    "maturity": {
      "research": {
        "label": "Research",
        "description": "Investigative work with a published artefact. Not deployed, and not in use by anyone."
      },
      "prototype": {
        "label": "Prototype",
        "description": "Built to test whether an approach works. Not hardened for regular use."
      },
      "internal-deployment": {
        "label": "Internal deployment",
        "description": "Running inside an organisation for its own staff."
      },
      "client-engagement": {
        "label": "Client engagement",
        "description": "Commissioned and delivered for a client."
      },
      "maintained-product": {
        "label": "Maintained product",
        "description": "In continuous use and actively maintained."
      },
      "synthetic-demo": {
        "label": "Synthetic demonstration",
        "description": "Built for this site on invented data to show a method. Not an engagement, not a client result, and not in use by anyone."
      }
    },
    "contact": {
      "label": "Contact",
      "title": "What decision or workflow are you trying to improve?",
      "lede": "A few sentences is enough to start. I reply personally, and I will say plainly if your problem is better served by someone else.",
      "nameLabel": "Name",
      "namePlaceholder": "Your name",
      "emailLabel": "Email",
      "emailPlaceholder": "you@company.com",
      "companyLabel": "Company",
      "companyOptional": "optional",
      "companyPlaceholder": "Where you work",
      "topicLabel": "What is this about?",
      "topicPlaceholder": "Select a topic",
      "messageLabel": "What are you trying to improve?",
      "messagePlaceholder": "For example: our monthly reporting is assembled by hand from four systems and takes a week, and nobody trusts the numbers by the time it lands.",
      "messageHint": "The problem, roughly. No need to prepare a brief.",
      "submit": "Send inquiry",
      "submitting": "Sending…",
      "required": "This field is required",
      "invalidEmail": "Enter an email address that can receive a reply",
      "tooShort": "A sentence or two, so I know what you need",
      "tooLong": "Please shorten this a little",
      "errorSummary": "Your message has not been sent. Please check the fields marked below.",
      "successTitle": "Received",
      "successBody": "Your inquiry reached my inbox. I read these myself and reply to the address you gave, usually within a couple of working days.",
      "failureTitle": "That did not go through",
      "failureBody": "Nothing was sent. Your message is still in the form — you can try again, or email it directly using the address below.",
      "disabledTitle": "Start a conversation by email",
      "disabledBody": "The inquiry form is currently unavailable. Send me a few sentences about your project by email; your message reaches me directly.",
      "whatHappensNext": "What happens next",
      "nextSteps": [
        "I read your message myself. Nothing is routed through an assistant or an autoresponder.",
        "You get a reply at the address you gave — normally within two working days — saying whether I think I can help.",
        "If it looks like a fit, we spend thirty minutes on the actual problem before anyone discusses scope or a proposal."
      ],
      "privacyTitle": "What happens to what you send",
      "privacyBody": "Your name, email, company and message are sent to my email provider so I can reply, and are kept in that inbox. They are not added to a mailing list, not passed to anyone else, and the contents are never sent to analytics. Ask at any time and I will delete the thread.",
      "directTitle": "Or reach me directly",
      "directBody": "If a form is not how you want to start, either of these reaches me.",
      "whatsappDirect": "WhatsApp",
      "noScheduling": "There is no calendar link here on purpose: I do not keep a public booking calendar, so a time gets agreed in the first reply.",
      "charactersRemaining": "characters remaining"
    },
    "labels": {
      "disclaimer": "Nothing on this site is accounting, audit, tax, legal or investment advice, and no figure here is a promise of a result. Where a number appears, its source and its limits appear with it.",
      "synthetic": "Synthetic illustration",
      "syntheticHint": "Invented data, used to demonstrate a method. Not a real result.",
      "interactiveCalculation": "Interactive calculation",
      "interactiveHint": "Computed in your browser from the stated assumptions. No external data.",
      "recordedExample": "Recorded example",
      "liveData": "Live data"
    }
  }
}
```

### /en/front-matter

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "front-matter",
    "kind": "service",
    "href": "/front-matter",
    "motifKey": "brackets",
    "color": "#182a43",
    "foil": "#c87046",
    "palette": {
      "paper": "#1b1613",
      "paperDeep": "#120e0b",
      "paperPale": "#f1eadf",
      "ink": "#f4eee6",
      "inkSoft": "#b9b4ae",
      "wall": "#1b1613",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f4d7b9",
      "fill": "#c2a184"
    },
    "width": 1.02,
    "height": 1.58,
    "depth": 0.26,
    "seed": 11
  },
  "title": "Seven expensive problems.",
  "discipline": "The problem",
  "note": "I help finance and operations teams build forecasting models, automate document review, and create reporting systems they can actually use.",
  "deck": "Every problem on the shelf above has the same shape. Something that should take an afternoon takes a week; something that should be checkable is taken on trust; and a decision that will cost real money gets made before the figure that should inform it arrives. None of that shows up as a line item, which is exactly why it persists.",
  "theme": "The problem",
  "binding": "The problem",
  "format": "Process",
  "roman": "Front matter",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "",
        "label": "Front matter",
        "discipline": "The problem",
        "title": "Seven expensive problems.",
        "note": "The expensive part is never the work. It is the delay, the rework, and the decision taken without the number."
      }
    },
    {
      "id": "thesis",
      "block": {
        "kind": "prose",
        "heading": "The problem",
        "body": "Every problem on the shelf above has the same shape. Something that should take an afternoon takes a week; something that should be checkable is taken on trust; and a decision that will cost real money gets made before the figure that should inform it arrives. None of that shows up as a line item, which is exactly why it persists."
      }
    },
    {
      "id": "cost-1",
      "block": {
        "kind": "prose",
        "heading": "Skilled time spent assembling, not deciding",
        "body": "A finance lead spending the first week of every month reconciling four systems is the most expensive data pipeline in the company, and the least maintained one."
      }
    },
    {
      "id": "cost-2",
      "block": {
        "kind": "prose",
        "heading": "Decisions made before the number arrives",
        "body": "When the pack lands after the meeting, the decision was made on instinct and the reporting became a record of what already happened rather than an input to what happens next."
      }
    },
    {
      "id": "cost-3",
      "block": {
        "kind": "prose",
        "heading": "Numbers nobody will stand behind",
        "body": "A figure two departments compute differently is worse than no figure: it gets argued about instead of acted on, and the argument recurs every month."
      }
    },
    {
      "id": "cost-4",
      "block": {
        "kind": "prose",
        "heading": "The clause found after it renewed",
        "body": "Documents read by one person, under time pressure, produce misses that surface as a cost months later — with no record of why that document was treated the way it was."
      }
    },
    {
      "id": "process-intro",
      "block": {
        "kind": "prose",
        "heading": "How an engagement runs",
        "body": "Four stages, each ending in something you can hold rather than a status update."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Process · 01",
        "lede": "We look at the actual decision and the actual data, and agree what a good outcome would be before anything is built. Often this is where a project gets smaller.",
        "items": [
          {
            "term": "Discovery",
            "detail": "A written problem statement, and an honest view of whether it is worth doing."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Process · 02",
        "lede": "One workflow, one document type, one forecast. Small enough that finding out it does not work is a cheap answer rather than a sunk cost.",
        "items": [
          {
            "term": "Bounded pilot",
            "detail": "A working prototype and an evaluation on your own data."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Process · 03",
        "lede": "The thing that survived the pilot gets built where the work actually happens, with the review step in place from the first day rather than added later.",
        "items": [
          {
            "term": "Delivery",
            "detail": "The deployed workflow, its documentation, and the checks that show when it drifts."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Process · 04",
        "lede": "Your team runs it without me. That includes knowing how to re-evaluate it when the inputs change, because they will.",
        "items": [
          {
            "term": "Handover",
            "detail": "Documentation, the evaluation harness, and a walkthrough with whoever owns it next."
          }
        ]
      }
    },
    {
      "id": "evidence-1",
      "block": {
        "kind": "evidence",
        "heading": "What the work looks like when you check it",
        "lede": "Three things I can show you rather than assert. Each links to the artefact and the numbers behind it, including where they fall short.",
        "entries": [
          {
            "metric": "Evaluation set",
            "value": "29 claims",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Environmental claims extracted from corporate communications and rated for greenwashing risk by human reviewers, forming the reference set the detector is scored against. Human expert ratings collected via a structured questionnaire, then used as ground truth.",
            "asOf": "2026-01-29",
            "limitations": "Twenty-nine items is a small evaluation set. Every figure derived from it carries wide uncertainty and none of it should be read as a population estimate."
          }
        ]
      }
    },
    {
      "id": "evidence-2",
      "block": {
        "kind": "evidence",
        "heading": "Evidence",
        "lede": "",
        "entries": [
          {
            "metric": "Krippendorff's α",
            "value": "0.69",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Agreement between the human raters who produced the reference ratings. Krippendorff's alpha across raters; pairwise agreement ≈ 0.852.",
            "asOf": "2026-01-29",
            "limitations": "α = 0.69 is substantial but not strong agreement: the humans themselves disagree on roughly a third of the signal, which caps how well any model can be expected to match them."
          }
        ]
      }
    },
    {
      "id": "evidence-3",
      "block": {
        "kind": "evidence",
        "heading": "Evidence",
        "lede": "",
        "entries": [
          {
            "metric": "Pearson r (v1)",
            "value": "0.906",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Correlation between the v1 detector score and the human reference rating, over the 29-claim set. Pearson correlation on continuous scores. Spearman 0.811, Kendall 0.627, MAE 0.206, RMSE 0.237.",
            "baseline": "v3 rule-based detector, r = 0.793; v2 semantic detector, r = 0.557.",
            "asOf": "2026-01-29",
            "limitations": "Correlation on 29 items. It says the score moves with reviewer judgement, not that the score is calibrated as a probability of greenwashing."
          }
        ]
      }
    },
    {
      "id": "evidence-4",
      "block": {
        "kind": "evidence",
        "heading": "Evidence",
        "lede": "",
        "entries": [
          {
            "metric": "Recall / precision (v3)",
            "value": "0.40 recall at 1.00 precision",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Binary flag / no-flag performance of the v3 rule-based detector against the human reference labels. Thresholded score compared with binarised human labels on the same 29-claim set.",
            "baseline": "v1 baseline: recall 0.15 at precision 1.00 (F1 0.261). v3 reaches F1 0.571.",
            "asOf": "2026-01-29",
            "limitations": "Recall of 0.40 means roughly three in five flaggable claims are missed. Precision of 1.00 on a set this small is a handful of correct positives, not a guarantee. The tool is a reviewer aid; it cannot be a filter that runs unattended."
          }
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "What decision or workflow are you trying to improve?",
        "body": "Tell me the problem in a few sentences. I reply personally, usually within a couple of working days, and I will say plainly if it is not something I should take on.",
        "cta": "Discuss your project",
        "href": "/en/contact"
      }
    }
  ]
}
```

### /en/chapters

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "copy": {
    "carouselTitle": "The story so far.",
    "swipeChapters": "Swipe to explore",
    "scrollChapters": "Scroll to explore",
    "chapters": "Chapters",
    "cv": "Career & curriculum vitae",
    "title": "A career in",
    "titleAccent": "five chapters.",
    "intro": "From economics to algorithms. From understanding risk to building something of my own. The experiences that shaped how I work.",
    "scroll": "Scroll through the story",
    "record": "The full record",
    "recordNote": "Education, experience and working languages. Dates as recorded in my CV.",
    "scenes": [
      "The foundations",
      "Learning the stakes",
      "Models meet reality",
      "Reading between lines",
      "Building the practice"
    ],
    "sceneLabels": [
      "Economics × computer science",
      "Risk × responsibility",
      "Data × industry",
      "Language × evidence",
      "Italy × Turkey"
    ],
    "nextTitle": "What comes next starts",
    "nextAccent": "with a conversation.",
    "nextLink": "Start a conversation",
    "print": "Print / save CV",
    "contact": "Contact",
    "contactEyebrow": "An idea starts with a connection",
    "contactTitle": "Let’s give your idea",
    "contactAccent": "a first page.",
    "contactIntro": "Four small questions. A thoughtful first message. Tell me what you have in mind, and we’ll take it from there.",
    "guide": "Your conversation guide",
    "sceneAlt": "An illuminated neuron suspended inside an open three-dimensional book.",
    "sceneNote": "Every answer makes another connection.",
    "pause": "Pause animation",
    "play": "Play animation",
    "steps": [
      "Introduction",
      "Direction",
      "Your idea",
      "Timing"
    ],
    "questions": [
      "First, what should I call you?",
      "What brings you here?",
      "What would a good outcome look like?",
      "When would you like to begin?"
    ],
    "hints": [
      "A name is enough. Add your company if it helps.",
      "Choose the closest fit. There is room to explain in the next step.",
      "A problem, a possibility, or something you’d like to build. A few sentences will do.",
      "An estimate is fine. This simply helps frame the conversation."
    ],
    "name": "Your name",
    "namePlaceholder": "How you’d like to be addressed",
    "company": "Company / organisation",
    "optional": "optional",
    "idea": "Your idea",
    "ideaPlaceholder": "We are working on… The part we would like help with is…",
    "topics": [
      "Document intelligence & AI",
      "Forecasting & financial analytics",
      "Reporting & business intelligence",
      "Italy–Turkey advisory",
      "Something else"
    ],
    "timings": [
      "As soon as possible",
      "In the next 1–3 months",
      "Later this year",
      "Just exploring"
    ],
    "next": "Continue",
    "back": "Back",
    "review": "Review my message",
    "step": "Question",
    "of": "of",
    "nameError": "Please tell me your name.",
    "ideaError": "Please add at least 20 characters so I can understand your idea.",
    "previewTitle": "Your first page is ready.",
    "previewHint": "Make it sound like you, then choose where to continue.",
    "messageLabel": "Your message",
    "whatsapp": "Open WhatsApp",
    "outlook": "Open Outlook app",
    "email": "Open email app",
    "outlookWeb": "Outlook in browser",
    "mailHint": "On desktop, the email button opens your default mail app. Choose Outlook as your default to use it here.",
    "sendNote": "You review and send the message in the app. Nothing is sent automatically.",
    "privacy": "Your answers stay in this page until you choose a messaging app. No account needed.",
    "edit": "Edit answers",
    "copy": "Copy message",
    "copied": "Copied",
    "copyFailed": "Select and copy the message above.",
    "direct": "Prefer to start directly?",
    "careerLink": "Looking for my background? Explore Chapters",
    "greeting": "Hi Bumin,",
    "introduction": "My name is",
    "from": "from",
    "interest": "I’d like to discuss",
    "timingLabel": "Timing",
    "closing": "Would you be available to discuss the next steps?",
    "subject": "Project inquiry"
  },
  "record": {
    "about": {
      "desc1": "I build applied AI and financial analytics for finance and operations teams — document review, forecasting, and reporting people can act on. I studied economics, management and computer science at Bocconi, then data science and business analytics, and founded Alvolo Consulting for advisory work in the Italy-Türkiye corridor."
    },
    "aboutPage": {
      "education": "Education",
      "experience": "Experience",
      "languages": "Languages",
      "thesis": "Thesis",
      "educationData": [
        {
          "school": "Bocconi University",
          "degree": "Master of Science in Data Science and Business Analytics",
          "location": "Milan, Italy",
          "period": "2023 - 2025",
          "coursework": [
            "Deep Learning for Computer Vision",
            "Simulation & Modeling",
            "Natural Language Processing"
          ],
          "thesis": "Auditable Detection of Greenwashing Risk in Corporate Communications"
        },
        {
          "school": "Bocconi University",
          "degree": "Bachelor of Science in Economics, Management, and Computer Science",
          "location": "Milan, Italy",
          "period": "2020 - 2023",
          "coursework": [
            "Econometrics",
            "Big Data and Databases",
            "Programming",
            "IT Law",
            "Machine Learning"
          ],
          "thesis": "A Study of Predictive Techniques for Parliamentary Elections: A Case Study of Turkish Parliament"
        }
      ],
      "experienceData": [
        {
          "company": "IMPACTSCOPE",
          "role": "AI Specialist | NLP Researcher",
          "location": "Remote, Switzerland",
          "period": "December 2024 - December 2025",
          "highlights": [
            "Built a data product that scores greenwashing risk in corporate sustainability claims, so reviewers can triage a queue instead of reading it in order",
            "Developed a semantic contradiction index (SCI) using stance detection and sentiment drift",
            "Cross-referenced sentiment-based ESG risk scores with historical greenwashing controversies"
          ]
        },
        {
          "company": "ALVOLO CONSULTING",
          "role": "Founder",
          "location": "Milan, Italy",
          "period": "March 2025 - November 2025",
          "highlights": [
            "Founded financial advisory hub in Italy helping clients achieve their financial goals",
            "Mastered Italian financial system to provide accurate information and guidance",
            "Managed full customer lifecycle from acquisition to retention"
          ]
        },
        {
          "company": "FEDRIGONI SPA",
          "role": "Junior Data Scientist",
          "location": "Milan, Italy",
          "period": "April 2024 - October 2024",
          "highlights": [
            "Developed time-series algorithms and custom predictive models utilizing LSTM",
            "Developed custom AI model incorporating unsupervised models and NLP to optimize pricing",
            "Utilized Knime and PowerBI to develop new analytical prototypes"
          ]
        },
        {
          "company": "N26 BANK AG",
          "role": "Risk Management Intern",
          "location": "Berlin, Germany",
          "period": "November 2022 - February 2023",
          "highlights": [
            "Supported Internal Control System (ICS), loss database, risk register and reporting",
            "Interacted with stakeholders supporting New Product Process (NPP)",
            "Helped in identifying, assessing, mitigating and monitoring non-financial risks"
          ]
        }
      ],
      "languageData": [
        {
          "lang": "Turkish",
          "level": "Native"
        },
        {
          "lang": "English",
          "level": "Native"
        },
        {
          "lang": "Italian",
          "level": "Advanced (C1)"
        },
        {
          "lang": "German",
          "level": "Intermediate (B1)"
        }
      ]
    }
  },
  "story": {
    "chaptersLabel": "Chapters",
    "chapters": [
      {
        "numeral": "I",
        "years": "2020 — 2023",
        "place": "Milan",
        "institution": "Bocconi University",
        "role": "B.Sc. Economics, Management & Computer Science",
        "title": "An economist who learned to code, at a school that taught both.",
        "body": "Bocconi put econometrics and programming in the same week, every week. I left with a thesis that treated a national election as a forecasting problem — and the habit of asking what a model is for before asking how it works."
      },
      {
        "numeral": "II",
        "years": "2022 — 2023",
        "place": "Berlin",
        "institution": "N26 Bank AG",
        "role": "Risk Management Intern",
        "title": "Inside a bank, risk is not a chart. It is a register, a control, a decision.",
        "body": "In N26’s risk team I worked on the internal control system, the loss database and the risk register, and sat in the new-product process where every launch is weighed against what could go wrong. An elegant model only matters if it survives contact with a committee."
      },
      {
        "numeral": "III",
        "years": "2024",
        "place": "Milan",
        "institution": "Fedrigoni S.p.A.",
        "role": "Junior Data Scientist",
        "title": "A century-old paper maker, and the first models I shipped to a factory floor.",
        "body": "At Fedrigoni I built LSTM time-series models for demand, a pricing model that combined unsupervised learning with NLP, and the Knime and PowerBI prototypes that let the business see them. Manufacturing does not care about your architecture; it cares whether the number on the dashboard is right on Monday morning."
      },
      {
        "numeral": "IV",
        "years": "2023 — 2025",
        "place": "Milan & Switzerland",
        "institution": "Bocconi University · ImpactScope",
        "role": "M.Sc. Data Science · AI Specialist, NLP Researcher",
        "title": "Teaching a language model to tell a promise from a plan.",
        "body": "My master’s thesis and my work at ImpactScope converged on one question: can a model audit what companies claim about sustainability? The answer that survived evaluation was narrower and more useful than the one I set out to find — a detector that tracks expert judgement closely enough to rank a reading queue, and nowhere near well enough to replace the reader."
      },
      {
        "numeral": "V",
        "years": "2025",
        "place": "Milan",
        "institution": "Alvolo Consulting",
        "role": "Founder",
        "title": "Then I built the firm I would have wanted to hire.",
        "body": "Alvolo Consulting is a financial advisory practice for businesses crossing between Turkey and Italy: company formation, tax structuring, banking, negotiation. Founding it meant learning the Italian financial system from the inside — and it is where the models and the advisory finally sit at the same table."
      }
    ]
  }
}
```

### /en/contact

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "copy": {
    "carouselTitle": "The story so far.",
    "swipeChapters": "Swipe to explore",
    "scrollChapters": "Scroll to explore",
    "chapters": "Chapters",
    "cv": "Career & curriculum vitae",
    "title": "A career in",
    "titleAccent": "five chapters.",
    "intro": "From economics to algorithms. From understanding risk to building something of my own. The experiences that shaped how I work.",
    "scroll": "Scroll through the story",
    "record": "The full record",
    "recordNote": "Education, experience and working languages. Dates as recorded in my CV.",
    "scenes": [
      "The foundations",
      "Learning the stakes",
      "Models meet reality",
      "Reading between lines",
      "Building the practice"
    ],
    "sceneLabels": [
      "Economics × computer science",
      "Risk × responsibility",
      "Data × industry",
      "Language × evidence",
      "Italy × Turkey"
    ],
    "nextTitle": "What comes next starts",
    "nextAccent": "with a conversation.",
    "nextLink": "Start a conversation",
    "print": "Print / save CV",
    "contact": "Contact",
    "contactEyebrow": "An idea starts with a connection",
    "contactTitle": "Let’s give your idea",
    "contactAccent": "a first page.",
    "contactIntro": "Four small questions. A thoughtful first message. Tell me what you have in mind, and we’ll take it from there.",
    "guide": "Your conversation guide",
    "sceneAlt": "An illuminated neuron suspended inside an open three-dimensional book.",
    "sceneNote": "Every answer makes another connection.",
    "pause": "Pause animation",
    "play": "Play animation",
    "steps": [
      "Introduction",
      "Direction",
      "Your idea",
      "Timing"
    ],
    "questions": [
      "First, what should I call you?",
      "What brings you here?",
      "What would a good outcome look like?",
      "When would you like to begin?"
    ],
    "hints": [
      "A name is enough. Add your company if it helps.",
      "Choose the closest fit. There is room to explain in the next step.",
      "A problem, a possibility, or something you’d like to build. A few sentences will do.",
      "An estimate is fine. This simply helps frame the conversation."
    ],
    "name": "Your name",
    "namePlaceholder": "How you’d like to be addressed",
    "company": "Company / organisation",
    "optional": "optional",
    "idea": "Your idea",
    "ideaPlaceholder": "We are working on… The part we would like help with is…",
    "topics": [
      "Document intelligence & AI",
      "Forecasting & financial analytics",
      "Reporting & business intelligence",
      "Italy–Turkey advisory",
      "Something else"
    ],
    "timings": [
      "As soon as possible",
      "In the next 1–3 months",
      "Later this year",
      "Just exploring"
    ],
    "next": "Continue",
    "back": "Back",
    "review": "Review my message",
    "step": "Question",
    "of": "of",
    "nameError": "Please tell me your name.",
    "ideaError": "Please add at least 20 characters so I can understand your idea.",
    "previewTitle": "Your first page is ready.",
    "previewHint": "Make it sound like you, then choose where to continue.",
    "messageLabel": "Your message",
    "whatsapp": "Open WhatsApp",
    "outlook": "Open Outlook app",
    "email": "Open email app",
    "outlookWeb": "Outlook in browser",
    "mailHint": "On desktop, the email button opens your default mail app. Choose Outlook as your default to use it here.",
    "sendNote": "You review and send the message in the app. Nothing is sent automatically.",
    "privacy": "Your answers stay in this page until you choose a messaging app. No account needed.",
    "edit": "Edit answers",
    "copy": "Copy message",
    "copied": "Copied",
    "copyFailed": "Select and copy the message above.",
    "direct": "Prefer to start directly?",
    "careerLink": "Looking for my background? Explore Chapters",
    "greeting": "Hi Bumin,",
    "introduction": "My name is",
    "from": "from",
    "interest": "I’d like to discuss",
    "timingLabel": "Timing",
    "closing": "Would you be available to discuss the next steps?",
    "subject": "Project inquiry"
  },
  "controls": {
    "hero": "Applied AI and financial analytics for clearer business decisions.",
    "intro": "I help finance and operations teams turn document queues, forecasts, and fragmented reports into workflows they can check and use.",
    "directory": "Services & work",
    "about": "About / CV",
    "approach": "Approach",
    "home": "Home",
    "service": "Service offering",
    "research": "Research project",
    "synthetic": "Synthetic demonstration",
    "browse": "Browse the work",
    "contact": "Discuss your project",
    "read": "Read this volume",
    "takeaway": "What you receive / learn",
    "collection": "A working library",
    "collectionNote": "Four services, two research projects, and one synthetic demonstration. Open any volume to examine its scope, evidence, and limitations.",
    "shelfTitle": "Take a book off the shelf.",
    "shelfNote": "Explore the same seven volumes in the interactive library.",
    "activate": "Enter the 3D library",
    "exit": "Return to catalogue",
    "pause": "Pause decorative motion",
    "play": "Resume decorative motion",
    "shelfLoading": "Preparing the library…",
    "shelfFailed": "The interactive library could not load. Every volume is available in the catalogue.",
    "boundary": "Italy–Turkey commercial coordination is a separate, scoped service. Regulated legal, tax, accounting, and investment work remains with licensed professionals.",
    "view": "Reading view",
    "article": "Article",
    "book": "Book",
    "contents": "In this volume",
    "readingFailed": "Book view could not load. You can read the full article below.",
    "print": "Print / save article",
    "offered": "What is in scope",
    "launchOptimizer": "Open the synthetic optimizer",
    "optimizerFailed": "The instrument could not load. Its methods, examples, and limitations remain in this article.",
    "simple": "Write a message",
    "guided": "Use guided questions",
    "topic": "Topic",
    "timing": "Timing",
    "regenerate": "Replace draft with current answers",
    "email": "Open email draft",
    "whatsapp": "Open WhatsApp draft",
    "outlook": "Open Outlook draft",
    "contactIntro": "Describe the problem or outcome you have in mind. You can write directly, or use a few optional questions to shape your message.",
    "messageRequired": "Please add a message.",
    "copyFallback": "If your email app does not open, copy your message and paste it into your preferred app.",
    "longDraft": "This draft is long for an app link. Copy it and paste it into your email or WhatsApp app.",
    "scene": "Explore the book sculpture",
    "closeScene": "Close sculpture",
    "optionalDetails": "Name, topic & timing (optional)"
  }
}
```

### /en/volumes/document-intelligence

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "document-intelligence",
    "kind": "service",
    "href": "/volumes/document-intelligence",
    "motifKey": "brackets",
    "color": "#182a43",
    "foil": "#c87046",
    "palette": {
      "paper": "#1b1613",
      "paperDeep": "#120e0b",
      "paperPale": "#f1eadf",
      "ink": "#f4eee6",
      "inkSoft": "#b9b4ae",
      "wall": "#1b1613",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f4d7b9",
      "fill": "#c2a184"
    },
    "width": 1.02,
    "height": 1.58,
    "depth": 0.26,
    "seed": 11
  },
  "title": "The Unread Pile",
  "discipline": "Document intelligence",
  "note": "The document nobody has time to read — and one person is the bottleneck.",
  "deck": "Contracts, invoices, disclosures, policy files — read by hand, one person deep, and inconsistently between people. The cost is rarely the reading. It is the renewal clause found after it renewed, and the decision nobody can reconstruct six months later.",
  "theme": "A queue that only one person can clear",
  "binding": "Client engagement · bounded pilot",
  "format": "A workflow over one document type, evaluated on your own examples",
  "roman": "I",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "I",
        "discipline": "Document intelligence",
        "title": "The Unread Pile",
        "note": "The document nobody has time to read — and one person is the bottleneck."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "The problem",
        "body": "Somebody on your team reads the same kind of document over and over: supplier contracts, incoming invoices, policy files, sustainability reports. The reading is slow, it is inconsistent between people, and when a decision is questioned months later there is no record of why that document was treated the way it was."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Who it is for",
        "body": "Teams with a recurring queue of documents and a person whose judgement is the bottleneck. It fits best where being wrong is expensive, so the output has to be defensible rather than merely fast."
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "What you end up with",
        "lede": "A bounded workflow over one document type, with an evaluation you can read and an exception path for everything the model should not decide alone.",
        "items": [
          "A pipeline that turns a document into structured fields with the source passage retained for each one.",
          "An evaluation on a sample your team labelled, reporting where the system agrees with your reviewers and where it does not."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "What you end up with",
        "items": [
          "An exception queue: the cases routed to a person, and the rule that decides what lands there.",
          "A written account of the failure modes found during evaluation."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Evidence record",
        "body": "The greenwashing case study is the honest version of this work: it shows a detector that tracks expert judgement closely on a continuous score while still missing most of the items it should flag, and explains why that combination makes it a triage aid rather than a filter."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Process · 01",
        "lede": "We look at real examples of the document and the decision made from it, and agree what \"correct\" means before anything is built.",
        "items": [
          {
            "term": "Discovery",
            "detail": "A written problem statement with the decision, the document type, and the definition of a correct output."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Process · 02",
        "lede": "One document type, one workflow. Your team labels a sample; I build against it and evaluate on held-out examples.",
        "items": [
          {
            "term": "Bounded pilot",
            "detail": "A working pipeline, evaluation results on your own documents, and the exception-review process."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Process · 03",
        "lede": "The pipeline is integrated where the work actually happens, with the review step in place from day one.",
        "items": [
          {
            "term": "Delivery",
            "detail": "Deployed workflow, runbook, and the monitoring that shows when quality drifts."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Process · 04",
        "lede": "Your team runs it. I document how to re-evaluate it when the documents change, because they will.",
        "items": [
          {
            "term": "Handover",
            "detail": "Documentation, the evaluation harness, and a walkthrough with the people who will own it."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Data provenance",
        "items": [
          "A representative sample of the documents, including the awkward ones.",
          "Access to a person who can say what a correct output looks like.",
          "Time from your reviewers to label a sample — this is usually the real constraint.",
          "Clarity on what may leave your infrastructure and what may not."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "What is in scope",
        "items": [
          "Extraction, classification, ranking and routing over a defined document type.",
          "Evaluation against labels your team produced.",
          "The exception process and the interface a reviewer works in."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Limitations",
        "items": [
          "Unattended decisions. Everything consequential keeps a human in the loop.",
          "Legal, tax or audit opinions about what a document means.",
          "A general-purpose system that handles any document you have. Pilots are scoped to one type."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Have a problem shaped like this?",
        "name": "Document-intelligence pilot",
        "output": "A bounded workflow, evaluation results on your own documents, and an exception-review process."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "Will this replace the person who reads these today?",
        "body": "No, and I would not build it that way. It changes what they read first and gives them the reason for the ranking. On the research project behind this service, the best detector still missed most of the items a reviewer would flag — which is exactly why the review step stays."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "Does our data leave our systems?",
        "body": "That is a decision we make in discovery, not a default. Some approaches run entirely on your infrastructure; others use a hosted model, which means the document text goes to that provider. I will tell you which one a given approach requires before we commit to it."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "How accurate is it?",
        "body": "Unanswerable before we have your documents and your labels. Any number quoted to you in advance of that is about someone else’s data. Establishing the number for yours is what the pilot is for."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "What if the evaluation shows it does not work well enough?",
        "body": "Then that is the pilot’s result and you have spent a bounded amount to learn it. That outcome is why the pilot is scoped small and evaluated before anything is integrated."
      }
    },
    {
      "id": "stack",
      "block": {
        "kind": "list",
        "heading": "Approach",
        "items": [
          "Python",
          "spaCy",
          "Hugging Face Transformers",
          "Sentence Transformers",
          "PyTorch",
          "scikit-learn"
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Have a document queue that is slowing a decision down?",
        "body": "Tell me which document and which decision, and I will tell you whether a pilot is worth running.",
        "cta": "Discuss a document-intelligence pilot",
        "href": "/en/contact?topic=document-intelligence"
      }
    }
  ]
}
```

### /en/volumes/forecasting

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "forecasting",
    "kind": "service",
    "href": "/volumes/forecasting",
    "motifKey": "paths",
    "color": "#c24d24",
    "foil": "#efc16d",
    "palette": {
      "paper": "#1e1813",
      "paperDeep": "#130f0b",
      "paperPale": "#f4ece1",
      "ink": "#f6efe6",
      "inkSoft": "#c0b3a6",
      "wall": "#1e1813",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f7d9ad",
      "fill": "#c99a6a"
    },
    "width": 1.1,
    "height": 1.46,
    "depth": 0.29,
    "seed": 22
  },
  "title": "The Naked Number",
  "discipline": "Forecasting & financial analytics",
  "note": "A single figure, presented as certainty and planned against as fact.",
  "deck": "You have to commit now to something that depends on later — stock, cash, price, capacity. The spreadsheet returns one number and nobody can say how wrong it could be, so the plan has no contingency in it and the surprise arrives at full cost.",
  "theme": "A plan with no room for being wrong",
  "binding": "Client engagement · assessment first",
  "format": "A baseline comparison, a validation approach, and a recommendation",
  "roman": "II",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "II",
        "discipline": "Forecasting & financial analytics",
        "title": "The Naked Number",
        "note": "A single figure, presented as certainty and planned against as fact."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "The problem",
        "body": "You need to decide something now that depends on what happens later — how much to hold, whether cash covers the next two quarters, whether a price change pays for itself. The spreadsheet that answers it produces one number, and nobody can say how wrong that number could be."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Who it is for",
        "body": "Finance and operations teams making recurring decisions under uncertainty: demand and cash planning, pricing, capacity, scenario work for a board."
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "What you end up with",
        "lede": "A model you can interrogate, compared against the simple baseline it has to beat, with the uncertainty stated rather than implied.",
        "items": [
          "A forecast with intervals, and a validation showing how it performed on periods it never saw.",
          "A comparison against a naive baseline, because a model that cannot beat last month’s number is not worth maintaining.",
          "The assumptions written down as parameters you can change, not constants buried in code."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "What you end up with",
        "items": [
          "A recommendation on whether to build further, keep it simple, or stop."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Evidence record",
        "body": "The portfolio optimizer on this page is the method made inspectable: assumptions visible, views adjustable, and outcomes shown as a distribution rather than a projection. It runs on invented capital-market assumptions, which is stated on its face — it demonstrates how I build, not what a market will do."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Process · 01",
        "lede": "We identify the decision the forecast serves and how much accuracy it actually needs. Often less than expected.",
        "items": [
          {
            "term": "Discovery",
            "detail": "The decision, its cadence, and the accuracy that would change it — written down."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Process · 02",
        "lede": "I establish what a naive forecast achieves on your history, then test whether anything more elaborate beats it.",
        "items": [
          {
            "term": "Baseline & assessment",
            "detail": "A baseline comparison, a validation approach, and a recommended next step."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Process · 03",
        "lede": "The chosen model is built where your team can run it, with the intervals surfaced rather than hidden.",
        "items": [
          {
            "term": "Delivery",
            "detail": "The model, its interface, and documentation of every assumption in it."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Process · 04",
        "lede": "Re-validation is part of the handover: how to tell when the model has stopped working.",
        "items": [
          {
            "term": "Handover",
            "detail": "Runbook, re-validation procedure, and the monitoring to support it."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Data provenance",
        "items": [
          "Historical data at the grain the decision is made at, with its known gaps.",
          "The decision itself and who makes it.",
          "Any structural rules the outcome passes through — tax bands, tiers, covenants, thresholds.",
          "Known one-off events in the history, so they are not learned as patterns."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "What is in scope",
        "items": [
          "Time-series forecasting, scenario modelling, sensitivity and stress analysis.",
          "Baseline comparison and out-of-sample validation.",
          "Financial models with the assumptions exposed."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Limitations",
        "items": [
          "Predictions of market prices, and any suggestion that a forecast removes uncertainty.",
          "Investment advice, portfolio management, or trading of any kind.",
          "Guaranteed accuracy. What is achievable is established by validation, not promised in advance."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Have a problem shaped like this?",
        "name": "Forecasting assessment",
        "output": "A baseline comparison, a validation approach, and a recommended next step."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "How accurate will the forecast be?",
        "body": "Not knowable until it has been validated on your history. The assessment exists to answer this honestly, and sometimes the answer is that a simple baseline is already good enough and you should not pay for more."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "We have messy, incomplete history. Is that disqualifying?",
        "body": "No, but it changes what is achievable and you should hear that early. Part of the assessment is establishing what the data will and will not support."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "Can you forecast our share price or a market?",
        "body": "No. I do not take that work, and anyone who offers it with confidence is telling you something about themselves."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "Why do you insist on showing a range?",
        "body": "Because the range is the decision-relevant part. A single number invites a plan with no contingency in it."
      }
    },
    {
      "id": "stack",
      "block": {
        "kind": "list",
        "heading": "Approach",
        "items": [
          "Python",
          "pandas",
          "statsmodels",
          "scikit-learn",
          "PyTorch",
          "SQL"
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Making a decision that depends on a forecast?",
        "body": "Describe the decision and the data you hold, and I will tell you what is realistically achievable.",
        "cta": "Discuss a forecasting assessment",
        "href": "/en/contact?topic=forecasting"
      }
    }
  ]
}
```

### /en/volumes/reporting

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "reporting",
    "kind": "service",
    "href": "/volumes/reporting",
    "motifKey": "caret",
    "color": "#afc400",
    "foil": "#171a16",
    "palette": {
      "paper": "#1c1a11",
      "paperDeep": "#12110a",
      "paperPale": "#eef0e2",
      "ink": "#f1f3e8",
      "inkSoft": "#b5bba7",
      "wall": "#1c1a11",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f2e4b4",
      "fill": "#b0a377"
    },
    "width": 0.92,
    "height": 1.52,
    "depth": 0.22,
    "seed": 33
  },
  "title": "The Week-Long Month",
  "discipline": "Business intelligence & reporting",
  "note": "Two departments, two revenue figures, and a meeting that has already moved on.",
  "deck": "The numbers are assembled by hand from several systems. It takes days, two teams quote different figures for the same month, and by the time the pack is ready the decision it was built for has already been taken on instinct.",
  "theme": "A week of skilled time, every month, for numbers nobody trusts",
  "binding": "Client engagement · diagnostic first",
  "format": "Source-data assessment, written KPI definitions, reporting priorities",
  "roman": "III",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "III",
        "discipline": "Business intelligence & reporting",
        "title": "The Week-Long Month",
        "note": "Two departments, two revenue figures, and a meeting that has already moved on."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "The problem",
        "body": "Replace fragmented monthly reporting with one dependable management view. Right now the numbers are assembled by hand from several systems, two departments quote different figures for the same month, and by the time the pack is ready the meeting it was built for has moved on."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Who it is for",
        "body": "Owner-managers and finance leads who have outgrown spreadsheets but do not need — and should not buy — an enterprise data platform."
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "What you end up with",
        "lede": "A small set of metrics everyone agrees on, computed the same way every time, from sources that have been reconciled.",
        "items": [
          "An assessment of your source data: what is trustworthy, what conflicts, and what is missing.",
          "Written KPI definitions — the exact calculation and the source for each, so two people cannot compute it differently.",
          "A reporting view built on those definitions, refreshed on a schedule rather than by hand."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "What you end up with",
        "items": [
          "The reconciliation notes explaining any figure that differs from what a system used to report."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Evidence record",
        "body": "This is the service with the least published evidence behind it, and I would rather say so than pad it. What I can show is the approach: the demo portal applies the same principle to a single statement, exposing every figure with the rows it came from instead of asking you to trust the total."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Process · 01",
        "lede": "Start by identifying the decisions your team needs to make, then work backwards to the smallest set of metrics that would inform them.",
        "items": [
          {
            "term": "Discovery",
            "detail": "A decision list and a candidate metric set, deliberately short."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Process · 02",
        "lede": "Reconcile the source data and find where the systems disagree. This is usually where the real problem turns out to be.",
        "items": [
          {
            "term": "Diagnostic",
            "detail": "Source-data assessment, KPI definitions, and reporting priorities."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Process · 03",
        "lede": "Build the view on the agreed definitions, with the refresh automated and the lineage visible.",
        "items": [
          {
            "term": "Delivery",
            "detail": "The reporting view, its data pipeline, and documentation of every definition."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Process · 04",
        "lede": "Your team owns it, including how to add a metric without breaking the ones already agreed.",
        "items": [
          {
            "term": "Handover",
            "detail": "Documentation, a walkthrough, and the procedure for changing a definition."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Data provenance",
        "items": [
          "Access to the systems the numbers come from, read-only.",
          "Whoever currently assembles the report — they know where the bodies are buried.",
          "The existing reporting pack, however imperfect.",
          "A decision-maker who can settle what a metric means when two departments disagree."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "What is in scope",
        "items": [
          "Source reconciliation, metric definition, pipeline and reporting views.",
          "Automating a report that is currently assembled by hand.",
          "Making a figure traceable back to its source rows."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Limitations",
        "items": [
          "Replacing your accounting or ERP system.",
          "Statutory or regulatory reporting, which belongs with your accountant.",
          "A dashboard for its own sake. If the decisions do not need it, I will say so."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Have a problem shaped like this?",
        "name": "Reporting diagnostic",
        "output": "A source-data assessment, KPI definitions, and reporting priorities."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "We already have dashboards nobody looks at. How is this different?",
        "body": "Those usually start from what the data can show rather than from a decision. Starting from the decision is what keeps the metric set small enough to maintain and relevant enough to open."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "Which tool will you use?",
        "body": "Whatever you already have, wherever that works. Introducing a new platform is a cost your team carries afterwards, so it needs a reason beyond my familiarity with it."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "Our two systems disagree about revenue. Can you fix that?",
        "body": "I can find where they diverge and document it precisely. Deciding which one is right is a business judgement, and it stays with you."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "Is this statutory reporting?",
        "body": "No. This is management reporting for internal decisions. Statutory accounts stay with your accountant."
      }
    },
    {
      "id": "stack",
      "block": {
        "kind": "list",
        "heading": "Approach",
        "items": [
          "SQL",
          "Python",
          "Power BI",
          "KNIME",
          "Excel"
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Spending the first week of every month assembling a report?",
        "body": "Tell me which decisions it feeds and where the numbers come from.",
        "cta": "Discuss a reporting diagnostic",
        "href": "/en/contact?topic=reporting"
      }
    }
  ]
}
```

### /en/volumes/cross-border

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "cross-border",
    "kind": "service",
    "href": "/volumes/cross-border",
    "motifKey": "orbits",
    "color": "#1537a1",
    "foil": "#dbe8f1",
    "palette": {
      "paper": "#1a1614",
      "paperDeep": "#110e0c",
      "paperPale": "#e8eef6",
      "ink": "#eef3f9",
      "inkSoft": "#adb8c9",
      "wall": "#1a1614",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f4dcc0",
      "fill": "#b08f74"
    },
    "width": 1.08,
    "height": 1.68,
    "depth": 0.25,
    "seed": 44
  },
  "title": "Two Rulebooks",
  "discipline": "Cross-border advisory · Italy & Türkiye",
  "note": "Two regulatory systems at once. The expensive mistake is not knowing which question to ask.",
  "deck": "Operating between Italy and Türkiye means two regulatory systems, two languages and two sets of professional norms at once. What costs money is rarely the visible step — it is not knowing which professional a given step legally requires, and finding out late.",
  "theme": "A process stalled on a step nobody started",
  "binding": "Coordination · regulated work referred out",
  "format": "A confirmed scope, a responsibility map, and the professionals it needs",
  "roman": "IV",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "IV",
        "discipline": "Cross-border advisory · Italy & Türkiye",
        "title": "Two Rulebooks",
        "note": "Two regulatory systems at once. The expensive mistake is not knowing which question to ask."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "The problem",
        "body": "Operating between Italy and Türkiye means dealing with two regulatory systems, two languages and two sets of professional norms at once. The expensive mistakes are rarely the visible ones — they come from not knowing which questions to ask, or which professional is legally required for a given step."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Who it is for",
        "body": "Businesses and founders moving between the Italian and Turkish markets who need the ground mapped before committing."
      }
    },
    {
      "id": "boundary",
      "block": {
        "kind": "prose",
        "heading": "Limitations",
        "body": "Company formation, tax structuring, legal advice and statutory accounting are reserved in Italy to licensed professionals. Those services are not provided here. What is provided is the scoping and coordination around them, and the introductions to the people qualified to do them."
      }
    },
    {
      "id": "responsibilities-1",
      "block": {
        "kind": "pairs",
        "heading": "My role",
        "items": [
          {
            "term": "What I do personally",
            "detail": "Scoping, sequencing, coordination, and commercial and cultural translation between the parties."
          },
          {
            "term": "What Alvolo Consulting does",
            "detail": "Alvolo Consulting is the advisory practice I founded for work in this corridor. Engagements run through it where that is the appropriate vehicle."
          }
        ]
      }
    },
    {
      "id": "responsibilities-2",
      "block": {
        "kind": "pairs",
        "heading": "My role",
        "items": [
          {
            "term": "What a licensed professional does",
            "detail": "Notarial acts, company formation filings, tax advice and opinions, legal advice, statutory accounting and audit. These are performed by qualified professionals with whom you hold a direct relationship — never by me."
          }
        ]
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "What you end up with",
        "lede": "A clear picture of what your situation actually requires, who is qualified to do each part, and what it will involve — before you commit to any of it.",
        "items": [
          "A written scope: what you are trying to do and the steps it decomposes into.",
          "A responsibility map naming which steps require a licensed professional and which do not.",
          "Introductions to the qualified professionals each regulated step needs."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "What you end up with",
        "items": [
          "The sequence and the dependencies, so nothing stalls waiting on a step nobody started."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Evidence record",
        "body": "This is advisory and coordination work, and the engagements behind it are private. There is no case study on this site for it, and I would rather leave that gap visible than fill it with something unverifiable."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Process · 01",
        "lede": "Understand what you are actually trying to achieve commercially, before anyone talks about structures.",
        "items": [
          {
            "term": "Discovery",
            "detail": "A written statement of the commercial objective and the constraints on it."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Process · 02",
        "lede": "Break the objective into steps and identify which require a licensed professional in which jurisdiction.",
        "items": [
          {
            "term": "Scoping",
            "detail": "Confirmed scope, responsibilities, and the necessary professional partners."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Process · 03",
        "lede": "Introduce the right professionals, keep the sequence moving, and translate between the parties — linguistically and commercially.",
        "items": [
          {
            "term": "Coordination",
            "detail": "An active workstream with named owners and a sequence everyone can see."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Process · 04",
        "lede": "You hold direct relationships with the professionals doing the regulated work. That is the point, not a side effect.",
        "items": [
          {
            "term": "Handover",
            "detail": "Direct relationships and a record of what was decided and why."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Data provenance",
        "items": [
          "What you are trying to achieve commercially, and by when.",
          "Your existing corporate structure, if there is one.",
          "Any professional relationships you already hold in either country.",
          "Your appetite for complexity — some structures are legal and still not worth the overhead."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "What is in scope",
        "items": [
          "Scoping, sequencing and coordination of a cross-border project.",
          "Identifying which regulated professionals a given step requires.",
          "Commercial and cultural translation between the parties."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Limitations",
        "items": [
          "Tax advice, legal advice, notarial acts, statutory accounting and company formation filings. These are reserved to licensed professionals and are not performed here.",
          "Investment advice and any regulated financial service.",
          "Any representation that a particular tax or legal outcome will be achieved."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Have a problem shaped like this?",
        "name": "Cross-border discovery",
        "output": "A confirmed scope, a responsibility map, and the necessary professional partners identified."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "Can you set up my Italian company?",
        "body": "No. Company formation in Italy involves notarial acts and filings reserved to licensed professionals. I can scope what your situation requires, tell you which professionals it needs, and coordinate the work — which is a different and narrower thing than doing it."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "Can you advise on my tax position?",
        "body": "No. Tax advice is regulated and belongs with a qualified commercialista or tax lawyer. I can make sure the right questions reach them and that their answers are understood on both sides."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "Then what am I paying you for?",
        "body": "For knowing what the project actually consists of, which professional each step requires, and how to keep a process moving across two languages and two systems. That is coordination, and it is worth being precise about its limits."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "Do you guarantee an outcome?",
        "body": "No. Nobody in a position to be honest with you does, and outcomes here depend on authorities and professionals neither of us controls."
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Moving a business between Italy and Türkiye?",
        "body": "Describe what you are trying to do and I will tell you what it actually involves — including the parts I would refer elsewhere.",
        "cta": "Discuss a cross-border discovery",
        "href": "/en/contact?topic=cross-border"
      }
    }
  ]
}
```

### /en/volumes/greenwashing-risk-scoring

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "greenwashing-risk-scoring",
    "kind": "evidence",
    "href": "/volumes/greenwashing-risk-scoring",
    "motifKey": "modules",
    "color": "#c83222",
    "foil": "#efb0aa",
    "palette": {
      "paper": "#1e1514",
      "paperDeep": "#140d0c",
      "paperPale": "#f6e9e6",
      "ink": "#f8eeec",
      "inkSoft": "#c5aeaa",
      "wall": "#1e1514",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f7cfc6",
      "fill": "#c08278"
    },
    "width": 1,
    "height": 1.48,
    "depth": 0.3,
    "seed": 55
  },
  "title": "The Overrun Claim",
  "discipline": "Research · document intelligence",
  "note": "A claim that outruns the commitment. Evaluated on 29 claims — and it misses most of them.",
  "deck": "A detector that ranks environmental claims by how far the language runs ahead of the commitment. It tracks expert judgement closely — Pearson 0.906 — and still finds at best 40% of what a reviewer would flag. Published here because that second number is the one that decides how it can be used.",
  "theme": "A reading queue with no defensible order",
  "binding": "Research · published repository",
  "format": "Per-claim scores, a validation harness, and the numbers that failed",
  "roman": "V",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "V",
        "discipline": "Research · document intelligence",
        "title": "The Overrun Claim",
        "note": "A claim that outruns the commitment. Evaluated on 29 claims — and it misses most of them."
      }
    },
    {
      "id": "maturity",
      "block": {
        "kind": "prose",
        "heading": "Research",
        "body": "Investigative work with a published artefact. Not deployed, and not in use by anyone."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "The problem",
        "body": "A sustainability analyst reading corporate disclosures has to decide which environmental claims are worth challenging. The claims that matter are rarely false outright; they are vague where they should be specific, and the reading is slow, subjective and hard to defend when two analysts disagree."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Who it is for",
        "body": "Sustainability and ESG analysts, and the risk teams who have to justify why a particular claim was escalated."
      }
    },
    {
      "id": "context",
      "block": {
        "kind": "prose",
        "heading": "Context",
        "body": "This began as my master’s thesis at Bocconi and became a working codebase with a validation harness. It is research: it was never deployed to a client and has no production users."
      }
    },
    {
      "id": "role",
      "block": {
        "kind": "prose",
        "heading": "My role",
        "body": "I designed and built the whole system — claim extraction, the scoring components, the questionnaire used to collect expert ratings, and the validation scripts that produce the numbers below."
      }
    },
    {
      "id": "data",
      "block": {
        "kind": "prose",
        "heading": "Data provenance",
        "body": "Environmental claims extracted from public corporate communications. The reference ratings are human judgements collected through a structured questionnaire, stored in the repository alongside the code."
      }
    },
    {
      "id": "constraints",
      "block": {
        "kind": "prose",
        "heading": "Constraints",
        "body": "A reference set of twenty-nine rated claims. That was the honest ceiling on how much expert rating time was available, and it constrains every conclusion drawn from it."
      }
    },
    {
      "id": "approach-1",
      "block": {
        "kind": "list",
        "heading": "Approach",
        "items": [
          "Extract discrete environmental claims from a document with spaCy rather than scoring the document as a whole, so a score can always be traced back to a sentence.",
          "Score each claim on several components — lexical density of promotional language, semantic specificity via ClimateBERT, and similarity to known narrative patterns via Sentence Transformers — and combine them under weights held in one config file."
        ]
      }
    },
    {
      "id": "approach-2",
      "block": {
        "kind": "list",
        "heading": "Approach",
        "items": [
          "Validate against the human ratings with correlation and error metrics, not accuracy alone, because the underlying quantity is a degree of risk rather than a class.",
          "Keep three detector versions side by side and compare them on the same set, instead of reporting only the one that looks best."
        ]
      }
    },
    {
      "id": "decisions-1",
      "block": {
        "kind": "pairs",
        "heading": "Decisions that mattered",
        "items": [
          {
            "term": "Reported correlation and error against continuous expert ratings before reporting any binary accuracy.",
            "detail": "Greenwashing risk is a matter of degree. Binarising it first would have hidden that the model tracks reviewer judgement well while still being a poor filter."
          }
        ]
      }
    },
    {
      "id": "decisions-2",
      "block": {
        "kind": "pairs",
        "heading": "Decisions that mattered",
        "items": [
          {
            "term": "Kept the simple lexical version (v1) as the reference model even though a transformer version existed.",
            "detail": "The semantic version (v2) correlated worse — 0.557 against v1’s 0.906 — and was retired. Using the more sophisticated architecture would have made a better story and a worse tool."
          }
        ]
      }
    },
    {
      "id": "decisions-3",
      "block": {
        "kind": "pairs",
        "heading": "Decisions that mattered",
        "items": [
          {
            "term": "Tuned v3 toward recall while holding precision at 1.00.",
            "detail": "A reviewer aid that raises a false alarm burns trust much faster than one that stays quiet. Missing items is recoverable by reading; a wrong accusation is not."
          }
        ]
      }
    },
    {
      "id": "figure",
      "block": {
        "kind": "figure",
        "heading": "Figure",
        "slug": "greenwashing-risk-scoring",
        "caption": "Detector score against expert rating across the 29 evaluated claims, with the three detector versions compared. Reproduced from the repository’s validation output, 29 January 2026.",
        "alt": "A comparison of three detector versions against expert ratings on 29 claims. Version 1 has the highest correlation at Pearson 0.906 and mean absolute error 0.206; version 3 reaches 0.793 with error 0.256; version 2 is the weakest at 0.557 and was retired. On binary flagging, version 1 recalls 15% of flaggable claims and version 3 recalls 40%, both at 100% precision.",
        "synthetic": false
      }
    },
    {
      "id": "baseline",
      "block": {
        "kind": "prose",
        "heading": "Baseline",
        "body": "Two internal comparisons: a keyword-density detector, and the earlier v1 and v2 detectors scored on the same claims. There is no external published benchmark for this task to compare against."
      }
    },
    {
      "id": "evaluation",
      "block": {
        "kind": "prose",
        "heading": "How it was evaluated",
        "body": "Every detector version is scored on the same 29 human-rated claims. Continuous agreement is measured with Pearson, Spearman and Kendall correlation plus MAE and RMSE; flag/no-flag behaviour is measured with precision, recall and F1. Rater reliability is reported so the human ceiling is visible. The published figures were re-run and reproduced on 29 January 2026."
      }
    },
    {
      "id": "results",
      "block": {
        "kind": "list",
        "heading": "Results",
        "items": [
          "The v1 detector tracks expert ratings closely: Pearson r = 0.906, Spearman 0.811, MAE 0.206.",
          "As a flagging tool it is weak. v1 catches 15% of flaggable claims; the tuned v3 rule-based detector reaches 40%, at F1 0.571.",
          "Neither version produced a false positive on this set — precision was 1.00 — but on twenty-nine items that is a handful of correct calls, not a property of the method.",
          "The human raters agreed at Krippendorff’s α = 0.69, which is the ceiling any model is being measured against."
        ]
      }
    },
    {
      "id": "deliverables",
      "block": {
        "kind": "list",
        "heading": "What was delivered",
        "items": [
          "A Python package that turns a document into per-claim scores with the contributing components exposed.",
          "A validation harness that regenerates every published metric from the stored ratings.",
          "Written reports covering the algorithm, the detector versions and the performance comparison."
        ]
      }
    },
    {
      "id": "consequences",
      "block": {
        "kind": "prose",
        "heading": "What it changes in practice",
        "body": "Used as intended, this shortens the queue rather than clearing it: an analyst reads the highest-scoring claims first and has a component breakdown to point at when explaining the ranking. It does not reduce the number of claims that must ultimately be read by a person."
      }
    },
    {
      "id": "limitations",
      "block": {
        "kind": "list",
        "heading": "Limitations",
        "items": [
          "Twenty-nine evaluated claims. Every figure here has wide uncertainty and none of it generalises to a new corpus without re-evaluation.",
          "The score is a ranking signal. It is not a calibrated probability, and a high score is not a finding that a company has greenwashed.",
          "Recall of 0.40 at best. Most flaggable claims are still missed.",
          "Evaluated on English-language corporate communications only.",
          "The scoring weights were tuned on the same small set they are reported against, so the figures are optimistic."
        ]
      }
    },
    {
      "id": "human-review",
      "block": {
        "kind": "prose",
        "heading": "Human review",
        "body": "Every score is reviewed by a person before it reaches a conclusion. The system ranks and explains; it never issues a verdict about a company."
      }
    },
    {
      "id": "evidence-1",
      "block": {
        "kind": "evidence",
        "heading": "Evidence record · 01",
        "lede": "Every figure quoted above, with its source and what it does not tell you.",
        "entries": [
          {
            "metric": "Evaluation set",
            "value": "29 claims",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Environmental claims extracted from corporate communications and rated for greenwashing risk by human reviewers, forming the reference set the detector is scored against. Human expert ratings collected via a structured questionnaire, then used as ground truth.",
            "asOf": "2026-01-29",
            "limitations": "Twenty-nine items is a small evaluation set. Every figure derived from it carries wide uncertainty and none of it should be read as a population estimate."
          }
        ]
      }
    },
    {
      "id": "evidence-2",
      "block": {
        "kind": "evidence",
        "heading": "Evidence record · 02",
        "lede": "",
        "entries": [
          {
            "metric": "Krippendorff's α",
            "value": "0.69",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Agreement between the human raters who produced the reference ratings. Krippendorff's alpha across raters; pairwise agreement ≈ 0.852.",
            "asOf": "2026-01-29",
            "limitations": "α = 0.69 is substantial but not strong agreement: the humans themselves disagree on roughly a third of the signal, which caps how well any model can be expected to match them."
          }
        ]
      }
    },
    {
      "id": "evidence-3",
      "block": {
        "kind": "evidence",
        "heading": "Evidence record · 03",
        "lede": "",
        "entries": [
          {
            "metric": "Pearson r (v1)",
            "value": "0.906",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Correlation between the v1 detector score and the human reference rating, over the 29-claim set. Pearson correlation on continuous scores. Spearman 0.811, Kendall 0.627, MAE 0.206, RMSE 0.237.",
            "baseline": "v3 rule-based detector, r = 0.793; v2 semantic detector, r = 0.557.",
            "asOf": "2026-01-29",
            "limitations": "Correlation on 29 items. It says the score moves with reviewer judgement, not that the score is calibrated as a probability of greenwashing."
          }
        ]
      }
    },
    {
      "id": "evidence-4",
      "block": {
        "kind": "evidence",
        "heading": "Evidence record · 04",
        "lede": "",
        "entries": [
          {
            "metric": "Recall / precision (v3)",
            "value": "0.40 recall at 1.00 precision",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Binary flag / no-flag performance of the v3 rule-based detector against the human reference labels. Thresholded score compared with binarised human labels on the same 29-claim set.",
            "baseline": "v1 baseline: recall 0.15 at precision 1.00 (F1 0.261). v3 reaches F1 0.571.",
            "asOf": "2026-01-29",
            "limitations": "Recall of 0.40 means roughly three in five flaggable claims are missed. Precision of 1.00 on a set this small is a handful of correct positives, not a guarantee. The tool is a reviewer aid; it cannot be a filter that runs unattended."
          }
        ]
      }
    },
    {
      "id": "sources",
      "block": {
        "kind": "links",
        "heading": "Source material",
        "items": [
          {
            "label": "Repository",
            "href": "https://github.com/bumincetin/greenwashing-detection",
            "external": true
          },
          {
            "label": "Performance report",
            "href": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "external": true
          }
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Have a problem shaped like this?",
        "body": "Tell me what you are trying to decide and I will tell you whether this approach fits. Related service: Document intelligence.",
        "cta": "Discuss your project",
        "href": "/en/contact?topic=document-intelligence"
      }
    }
  ]
}
```

### /en/volumes/parliamentary-seat-forecast

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "parliamentary-seat-forecast",
    "kind": "evidence",
    "href": "/volumes/parliamentary-seat-forecast",
    "motifKey": "frames",
    "color": "#da3b2f",
    "foil": "#ff8eab",
    "palette": {
      "paper": "#1f1615",
      "paperDeep": "#150e0c",
      "paperPale": "#f7e9ec",
      "ink": "#f9eff1",
      "inkSoft": "#c7adb3",
      "wall": "#1f1615",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f9cdd6",
      "fill": "#c2808f"
    },
    "width": 0.96,
    "height": 1.57,
    "depth": 0.24,
    "seed": 66
  },
  "title": "The Threshold Cliff",
  "discipline": "Research · forecasting",
  "note": "When an outcome passes through a threshold, it is the threshold that must be modelled.",
  "deck": "A bachelor thesis that treated an election as a forecasting problem. The interesting uncertainty was never in the polling — it was in a rule where a fraction of a point either side of a threshold changes the answer completely. Tax bands, covenants and volume tiers behave the same way.",
  "theme": "A forecast that smooths away the part that matters",
  "binding": "Research · published repository",
  "format": "Method, data provenance, and no accuracy claim, because none was published",
  "roman": "VI",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "VI",
        "discipline": "Research · forecasting",
        "title": "The Threshold Cliff",
        "note": "When an outcome passes through a threshold, it is the threshold that must be modelled."
      }
    },
    {
      "id": "maturity",
      "block": {
        "kind": "prose",
        "heading": "Research",
        "body": "Investigative work with a published artefact. Not deployed, and not in use by anyone."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "The problem",
        "body": "Vote-share polling does not answer the question people actually ask about an election. Under D’Hondt allocation with an electoral threshold, small changes in share produce large, discontinuous changes in seats, and the interesting uncertainty lives in that conversion rather than in the polling."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Who it is for",
        "body": "A methodological audience. It is published here as evidence of how I handle forecasting under structural rules, not as political analysis."
      }
    },
    {
      "id": "context",
      "block": {
        "kind": "prose",
        "heading": "Context",
        "body": "My bachelor thesis in Economics, Management and Computer Science at Bocconi, completed in 2023. It is research, and it has not been maintained since."
      }
    },
    {
      "id": "role",
      "block": {
        "kind": "prose",
        "heading": "My role",
        "body": "Sole author: data collection, modelling and the written thesis."
      }
    },
    {
      "id": "data",
      "block": {
        "kind": "prose",
        "heading": "Data provenance",
        "body": "Published historical results from the Supreme Election Council (YSK), demographic and socio-economic indicators from the Turkish Statistical Institute (TurkStat), public polling, and administrative boundary shapefiles."
      }
    },
    {
      "id": "constraints",
      "block": {
        "kind": "prose",
        "heading": "Constraints",
        "body": "Province-level published data only, and a polling record whose historical accuracy is itself uncertain — which pushes the work toward modelling the conversion rules rather than trying to out-predict the polls."
      }
    },
    {
      "id": "approach-1",
      "block": {
        "kind": "list",
        "heading": "Approach",
        "items": [
          "Assemble province-level historical results and align them with demographic and socio-economic indicators.",
          "Model vote share at province level rather than nationally, since seat allocation happens per constituency.",
          "Apply the actual seat-allocation rules, including the electoral threshold, so the discontinuities are reproduced rather than smoothed away."
        ]
      }
    },
    {
      "id": "approach-2",
      "block": {
        "kind": "list",
        "heading": "Approach",
        "items": [
          "Examine where the forecast is most sensitive — which is concentrated in a small number of provinces near allocation boundaries."
        ]
      }
    },
    {
      "id": "decisions",
      "block": {
        "kind": "pairs",
        "heading": "Decisions that mattered",
        "items": [
          {
            "term": "Forecast seats through the allocation rules rather than regressing on seat counts directly.",
            "detail": "Seat counts are a deterministic function of vote shares and rules. Learning that function from a handful of past elections would be fitting noise where the rule is already known exactly."
          },
          {
            "term": "Kept the analysis at province level.",
            "detail": "A national vote-share error of one point matters enormously in some provinces and not at all in others."
          }
        ]
      }
    },
    {
      "id": "figure",
      "block": {
        "kind": "figure",
        "heading": "Figure",
        "slug": "parliamentary-seat-forecast",
        "caption": "How a small change in vote share moves seats under threshold-based allocation. Drawn from the thesis method; an illustration of the mechanism, not a forecast.",
        "alt": "A chart showing seat allocation as a function of vote share, with a sharp step at the electoral threshold: parties below it receive no seats, and parties just above it gain a disproportionate number. The relationship between share and seats is flat in the middle of the range and steep near the boundaries.",
        "synthetic": false
      }
    },
    {
      "id": "evaluation",
      "block": {
        "kind": "prose",
        "heading": "How it was evaluated",
        "body": "The repository documents the method and the data sources; it does not report a held-out accuracy figure. No performance claim is made here because none is published, and inventing one after the fact would not be a measurement."
      }
    },
    {
      "id": "results",
      "block": {
        "kind": "prose",
        "heading": "Results",
        "body": "No performance figure is published for this project, so none is claimed."
      }
    },
    {
      "id": "deliverables",
      "block": {
        "kind": "list",
        "heading": "What was delivered",
        "items": [
          "Notebooks covering vote-share estimation, seat allocation and the presidential race.",
          "An assembled province-level dataset joining electoral, demographic and socio-economic sources.",
          "The written thesis."
        ]
      }
    },
    {
      "id": "consequences",
      "block": {
        "kind": "prose",
        "heading": "What it changes in practice",
        "body": "The transferable point is about structure, not politics: when an outcome passes through a rule with cliffs in it, the forecast has to model the rule. The same reasoning applies to tax bands, covenant tests and volume tiers."
      }
    },
    {
      "id": "limitations",
      "block": {
        "kind": "list",
        "heading": "Limitations",
        "items": [
          "No held-out accuracy is published, so no predictive performance is claimed.",
          "Built for one election under one set of rules; it is not a general election model.",
          "Not maintained since 2023."
        ]
      }
    },
    {
      "id": "human-review",
      "block": {
        "kind": "prose",
        "heading": "Human review",
        "body": "Research output, read as such. Nothing here is a prediction offered for decision-making."
      }
    },
    {
      "id": "sources",
      "block": {
        "kind": "links",
        "heading": "Source material",
        "items": [
          {
            "label": "Repository",
            "href": "https://github.com/bumincetin/TurkishElection2023",
            "external": true
          }
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Have a problem shaped like this?",
        "body": "Tell me what you are trying to decide and I will tell you whether this approach fits. Related service: Forecasting & financial analytics.",
        "cta": "Discuss your project",
        "href": "/en/contact?topic=forecasting"
      }
    }
  ]
}
```

### /en/volumes/portfolio-optimizer

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "portfolio-optimizer",
    "kind": "evidence",
    "href": "/volumes/portfolio-optimizer",
    "motifKey": "compass",
    "color": "#78a7bd",
    "foil": "#e4e7e5",
    "palette": {
      "paper": "#1a1715",
      "paperDeep": "#110f0d",
      "paperPale": "#e9eff2",
      "ink": "#eff4f6",
      "inkSoft": "#aebcc4",
      "wall": "#1a1715",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f2ddc6",
      "fill": "#b39a80"
    },
    "width": 1.12,
    "height": 1.63,
    "depth": 0.28,
    "seed": 77
  },
  "title": "The Sealed Model",
  "discipline": "Demonstration · synthetic data",
  "note": "An allocation you cannot interrogate. Invented assumptions, shown in full.",
  "deck": "Allocation models arrive as a pie chart with no visible link between the assumptions and the answer, so nobody can ask what happens if a view is wrong. This one runs in your browser on assumptions written into the source, and publishes every one of them.",
  "theme": "A recommendation nobody can check",
  "binding": "Synthetic demonstration · built for this site",
  "format": "A solver you can argue with, and the assumptions table behind it",
  "roman": "VII",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "VII",
        "discipline": "Demonstration · synthetic data",
        "title": "The Sealed Model",
        "note": "An allocation you cannot interrogate. Invented assumptions, shown in full."
      }
    },
    {
      "id": "maturity",
      "block": {
        "kind": "prose",
        "heading": "Synthetic demonstration",
        "body": "Built for this site on invented data to show a method. Not an engagement, not a client result, and not in use by anyone."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "The problem",
        "body": "Allocation models are usually presented as an answer: a pie chart with no visible link between the assumptions and the output. Anyone being shown one has no way to ask what happens if a view is wrong."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Who it is for",
        "body": "Anyone evaluating whether I can build a quantitative tool that a non-specialist can actually use. It is a demonstration of method."
      }
    },
    {
      "id": "context",
      "block": {
        "kind": "prose",
        "heading": "Context",
        "body": "Built for this site. It is a synthetic demonstration, not an engagement and not a product: no client commissioned it and no one is using it to allocate money."
      }
    },
    {
      "id": "role",
      "block": {
        "kind": "prose",
        "heading": "My role",
        "body": "Designed and built entirely by me — the solver, the simulation and the interface."
      }
    },
    {
      "id": "data",
      "block": {
        "kind": "prose",
        "heading": "Data provenance",
        "body": "None. Every input is an invented long-run assumption written into the source, not a market feed: eight asset classes with stylised expected returns, volatilities, a correlation matrix and benchmark weights. No live prices are fetched, and there is no market data anywhere in this tool."
      }
    },
    {
      "id": "constraints",
      "block": {
        "kind": "prose",
        "heading": "Constraints",
        "body": "It has to run in a browser with no server, and it has to stay honest about being synthetic while still behaving like the real method."
      }
    },
    {
      "id": "approach-1",
      "block": {
        "kind": "list",
        "heading": "Approach",
        "items": [
          "Start from benchmark weights and reverse-engineer the equilibrium returns they imply, as Black–Litterman does.",
          "Let the visitor state views as scenarios, blend them with the equilibrium prior at a confidence they control, and re-solve.",
          "Run Monte Carlo paths from the resulting allocation to show the spread of outcomes rather than a single expected return."
        ]
      }
    },
    {
      "id": "approach-2",
      "block": {
        "kind": "list",
        "heading": "Approach",
        "items": [
          "Expose the assumptions and the formulas in an advanced view, so the numbers can be checked rather than trusted."
        ]
      }
    },
    {
      "id": "decisions",
      "block": {
        "kind": "pairs",
        "heading": "Decisions that mattered",
        "items": [
          {
            "term": "Kept the assumptions visible and editable instead of hiding them behind the chart.",
            "detail": "The point of the tool is that the output follows from stated inputs. Hiding them would make it decoration."
          },
          {
            "term": "Show a distribution of outcomes, never a single projected return.",
            "detail": "A single number invites being read as a forecast. It is not one."
          },
          {
            "term": "Everything runs client-side.",
            "detail": "No server means nothing a visitor types is transmitted or stored anywhere."
          }
        ]
      }
    },
    {
      "id": "figure",
      "block": {
        "kind": "figure",
        "heading": "Figure",
        "slug": "portfolio-optimizer",
        "caption": "Allocation and outcome spread produced by the optimizer from its built-in assumptions. Synthetic illustration — the inputs are invented and no market data is involved.",
        "alt": "An allocation across eight asset classes shown against benchmark weights, beside a fan of simulated outcome paths widening over time. The fan shows a broad range of outcomes rather than a single line, with the median path in the middle and progressively wider bands around it.",
        "synthetic": true
      }
    },
    {
      "id": "baseline",
      "block": {
        "kind": "prose",
        "heading": "Baseline",
        "body": "Each allocation is shown against the benchmark weights it started from, so the effect of a view is visible as a difference."
      }
    },
    {
      "id": "evaluation",
      "block": {
        "kind": "prose",
        "heading": "How it was evaluated",
        "body": "The solver is covered by unit tests that check its mathematical properties — that weights sum to one, that a neutral view reproduces the benchmark, that the covariance matrix stays positive definite. There is no accuracy claim to evaluate, because there is nothing being predicted."
      }
    },
    {
      "id": "results",
      "block": {
        "kind": "prose",
        "heading": "Results",
        "body": "No performance figure is published for this project, so none is claimed."
      }
    },
    {
      "id": "deliverables",
      "block": {
        "kind": "list",
        "heading": "What was delivered",
        "items": [
          "A client-side Black–Litterman solver with a Monte Carlo simulator.",
          "Simple and advanced views over the same computation.",
          "Regression tests over the financial logic."
        ]
      }
    },
    {
      "id": "consequences",
      "block": {
        "kind": "prose",
        "heading": "What it changes in practice",
        "body": "It shows the working. The method is the same one used on real mandates; only the numbers are invented, and the tool says so on its face."
      }
    },
    {
      "id": "limitations",
      "block": {
        "kind": "list",
        "heading": "Limitations",
        "items": [
          "Every input is invented. Nothing here is a market observation, a backtest, or a track record.",
          "Not investment advice, and it produces no recommendation about any real security.",
          "Long-run assumptions with no regime changes, no transaction costs and no taxes."
        ]
      }
    },
    {
      "id": "human-review",
      "block": {
        "kind": "prose",
        "heading": "Human review",
        "body": "Not applicable — it is a demonstration, and its output is not used for any decision."
      }
    },
    {
      "id": "demo",
      "block": {
        "kind": "demo",
        "heading": "Interactive calculation",
        "lede": "Computed in your browser from the stated assumptions. No external data."
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Have a problem shaped like this?",
        "body": "Tell me what you are trying to decide and I will tell you whether this approach fits. Related service: Forecasting & financial analytics.",
        "cta": "Discuss your project",
        "href": "/en/contact?topic=forecasting"
      }
    }
  ]
}
```

## TR exact route content

### /tr

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "home": {
    "hero": "Daha net iş kararları için uygulamalı yapay zekâ ve finansal analitik.",
    "intro": "Finans ve operasyon ekiplerinin belge kuyruklarını, tahminlerini ve dağınık raporlarını kontrol edebilecekleri, kullanışlı iş akışlarına dönüştürmelerine yardımcı oluyorum.",
    "directory": "Hizmetler ve çalışmalar",
    "about": "Hakkımda / CV",
    "approach": "Yaklaşım",
    "home": "Ana sayfa",
    "service": "Hizmet",
    "research": "Araştırma projesi",
    "synthetic": "Sentetik gösterim",
    "browse": "Çalışmaları inceleyin",
    "contact": "Projenizi konuşalım",
    "read": "Bu cildi okuyun",
    "takeaway": "Çıktı / öğrenilecekler",
    "collection": "Bir çalışma kütüphanesi",
    "collectionNote": "Dört hizmet, iki araştırma projesi ve bir sentetik gösterim. Kapsamı, kanıtları ve sınırlamaları incelemek için bir cilt açın.",
    "shelfTitle": "Raftan bir kitap alın.",
    "shelfNote": "Aynı yedi cildi etkileşimli kütüphanede keşfedin.",
    "activate": "3B kütüphaneye girin",
    "exit": "Kataloga dönün",
    "pause": "Dekoratif hareketi duraklat",
    "play": "Dekoratif hareketi sürdür",
    "shelfLoading": "Kütüphane hazırlanıyor…",
    "shelfFailed": "Etkileşimli kütüphane yüklenemedi. Tüm ciltler katalogda kullanılabilir.",
    "boundary": "İtalya–Türkiye ticari koordinasyonu, kapsamı belirlenmiş ayrı bir hizmettir. Düzenlemeye tabi hukuk, vergi, muhasebe ve yatırım işleri yetkili uzmanların sorumluluğundadır.",
    "view": "Okuma görünümü",
    "article": "Makale",
    "book": "Kitap",
    "contents": "Bu ciltte",
    "readingFailed": "Kitap görünümü yüklenemedi. Makalenin tamamını aşağıda okuyabilirsiniz.",
    "print": "Makaleyi yazdır / kaydet",
    "offered": "Kapsama dahil olanlar",
    "launchOptimizer": "Sentetik optimizasyon aracını aç",
    "optimizerFailed": "Araç yüklenemedi. Yöntemler, örnekler ve sınırlamalar bu makalede yer alıyor.",
    "simple": "Mesaj yazın",
    "guided": "Rehber soruları kullanın",
    "topic": "Konu",
    "timing": "Zamanlama",
    "regenerate": "Taslağı güncel yanıtlarla değiştir",
    "email": "E-posta taslağını aç",
    "whatsapp": "WhatsApp taslağını aç",
    "outlook": "Outlook taslağını aç",
    "contactIntro": "Aklınızdaki sorunu veya hedeflediğiniz sonucu anlatın. Doğrudan yazabilir veya mesajınızı şekillendirmek için isteğe bağlı birkaç sorudan yararlanabilirsiniz.",
    "messageRequired": "Lütfen bir mesaj yazın.",
    "copyFallback": "E-posta uygulamanız açılmazsa mesajınızı kopyalayıp tercih ettiğiniz uygulamaya yapıştırın.",
    "longDraft": "Bu taslak, uygulama bağlantısı için uzun. Kopyalayıp e-posta veya WhatsApp uygulamanıza yapıştırın.",
    "scene": "Kitap heykelini keşfet",
    "closeScene": "Heykeli kapat",
    "optionalDetails": "Ad, konu ve zamanlama (isteğe bağlı)"
  },
  "volumes": [
    {
      "id": "document-intelligence",
      "kind": "service",
      "href": "/volumes/document-intelligence",
      "motifKey": "brackets",
      "color": "#182a43",
      "foil": "#c87046",
      "palette": {
        "paper": "#1b1613",
        "paperDeep": "#120e0b",
        "paperPale": "#f1eadf",
        "ink": "#f4eee6",
        "inkSoft": "#b9b4ae",
        "wall": "#1b1613",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f4d7b9",
        "fill": "#c2a184"
      },
      "width": 1.02,
      "height": 1.58,
      "depth": 0.26,
      "seed": 11,
      "title": "Okunmayan Yığın",
      "discipline": "Belge zekâsı",
      "note": "Kimsenin okumaya vakti olmayan belge — ve darboğaz tek bir kişi.",
      "deck": "Sözleşmeler, faturalar, raporlar, poliçe dosyaları — elle, tek kişiye bağlı ve kişiden kişiye tutarsız biçimde okunuyor. Maliyet nadiren okumanın kendisidir. Maliyet, yenilendikten sonra fark edilen yenileme maddesi ve altı ay sonra kimsenin yeniden kuramadığı karardır.",
      "binding": "Müşteri işi · sınırlanmış pilot",
      "format": "Tek belge türü üzerinde bir iş akışı, kendi örneklerinizle değerlendirilmiş",
      "theme": "Yalnızca bir kişinin eritebildiği bir kuyruk",
      "motif": "Yerine geçmek değil, önceliklendirmek",
      "chapters": [
        "Kuyruk",
        "Modelin karar verebileceği",
        "İstisna yolu"
      ],
      "roman": "I"
    },
    {
      "id": "forecasting",
      "kind": "service",
      "href": "/volumes/forecasting",
      "motifKey": "paths",
      "color": "#c24d24",
      "foil": "#efc16d",
      "palette": {
        "paper": "#1e1813",
        "paperDeep": "#130f0b",
        "paperPale": "#f4ece1",
        "ink": "#f6efe6",
        "inkSoft": "#c0b3a6",
        "wall": "#1e1813",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f7d9ad",
        "fill": "#c99a6a"
      },
      "width": 1.1,
      "height": 1.46,
      "depth": 0.29,
      "seed": 22,
      "title": "Çıplak Sayı",
      "discipline": "Tahmin & finansal analitik",
      "note": "Tek bir rakam; kesinlik gibi sunulmuş, gerçek gibi plana alınmış.",
      "deck": "Şimdi, sonrasına bağlı bir şeye bağlanmanız gerekiyor — stok, nakit, fiyat, kapasite. Tablo tek bir sayı veriyor ve kimse onun ne kadar yanlış olabileceğini söyleyemiyor; dolayısıyla planın içinde acil durum payı yok ve sürpriz tam bedeliyle geliyor.",
      "binding": "Müşteri işi · önce değerlendirme",
      "format": "Bir kıyas karşılaştırması, bir doğrulama yaklaşımı ve bir öneri",
      "theme": "Yanılmaya yer bırakmayan bir plan",
      "motif": "Bir aralık ve onu oynatan varsayım",
      "chapters": [
        "Karar",
        "Naif kıyası geçmek",
        "Nerede kırılıyor"
      ],
      "roman": "II"
    },
    {
      "id": "reporting",
      "kind": "service",
      "href": "/volumes/reporting",
      "motifKey": "caret",
      "color": "#afc400",
      "foil": "#171a16",
      "palette": {
        "paper": "#1c1a11",
        "paperDeep": "#12110a",
        "paperPale": "#eef0e2",
        "ink": "#f1f3e8",
        "inkSoft": "#b5bba7",
        "wall": "#1c1a11",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f2e4b4",
        "fill": "#b0a377"
      },
      "width": 0.92,
      "height": 1.52,
      "depth": 0.22,
      "seed": 33,
      "title": "Bir Haftalık Ay",
      "discipline": "İş zekâsı & raporlama",
      "note": "İki departman, iki ciro rakamı ve çoktan geçmiş bir toplantı.",
      "deck": "Sayılar birkaç sistemden elle birleştiriliyor. Günler sürüyor, iki ekip aynı ay için farklı rakam söylüyor ve rapor hazır olduğunda kurulduğu karar çoktan sezgiyle verilmiş oluyor.",
      "binding": "Müşteri işi · önce tanılama",
      "format": "Kaynak veri değerlendirmesi, yazılı KPI tanımları, raporlama öncelikleri",
      "theme": "Her ay, kimsenin güvenmediği sayılar için bir haftalık nitelikli zaman",
      "motif": "Tek bir görünüm, bir kez tanımlanmış",
      "chapters": [
        "Önce kararlar",
        "Sistemler nerede ayrışıyor",
        "Kalıcı tanımlar"
      ],
      "roman": "III"
    },
    {
      "id": "cross-border",
      "kind": "service",
      "href": "/volumes/cross-border",
      "motifKey": "orbits",
      "color": "#1537a1",
      "foil": "#dbe8f1",
      "palette": {
        "paper": "#1a1614",
        "paperDeep": "#110e0c",
        "paperPale": "#e8eef6",
        "ink": "#eef3f9",
        "inkSoft": "#adb8c9",
        "wall": "#1a1614",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f4dcc0",
        "fill": "#b08f74"
      },
      "width": 1.08,
      "height": 1.68,
      "depth": 0.25,
      "seed": 44,
      "title": "İki Kural Kitabı",
      "discipline": "Sınır ötesi danışmanlık · İtalya & Türkiye",
      "note": "Aynı anda iki düzenleyici sistem. Pahalı hata, hangi soruyu soracağını bilmemektir.",
      "deck": "İtalya ile Türkiye arasında iş yapmak, aynı anda iki düzenleyici sistem, iki dil ve iki meslek normları kümesi demektir. Para kaybettiren şey nadiren görünür adımdır — belirli bir adımın yasal olarak hangi meslek mensubunu gerektirdiğini bilmemek ve bunu geç öğrenmektir.",
      "binding": "Koordinasyon · düzenlemeye tabi iş dışarı yönlendirilir",
      "format": "Doğrulanmış kapsam, sorumluluk haritası ve gereken meslek mensupları",
      "theme": "Kimsenin başlamadığı bir adımda tıkanmış bir süreç",
      "motif": "Sıra ve her parçaya kimin yetkili olduğu",
      "chapters": [
        "Ticari hedef",
        "Kim neyi yapabilir",
        "Sıra"
      ],
      "roman": "IV"
    },
    {
      "id": "greenwashing-risk-scoring",
      "kind": "evidence",
      "href": "/volumes/greenwashing-risk-scoring",
      "motifKey": "modules",
      "color": "#c83222",
      "foil": "#efb0aa",
      "palette": {
        "paper": "#1e1514",
        "paperDeep": "#140d0c",
        "paperPale": "#f6e9e6",
        "ink": "#f8eeec",
        "inkSoft": "#c5aeaa",
        "wall": "#1e1514",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f7cfc6",
        "fill": "#c08278"
      },
      "width": 1,
      "height": 1.48,
      "depth": 0.3,
      "seed": 55,
      "title": "Taşan İddia",
      "discipline": "Araştırma · belge zekâsı",
      "note": "Taahhüdü aşan bir iddia. 29 iddia üzerinde ölçüldü — ve çoğunu kaçırıyor.",
      "deck": "Çevre iddialarını, dilin taahhüdün ne kadar önüne geçtiğine göre sıralayan bir dedektör. Uzman yargısını yakından izliyor — Pearson 0,906 — ve yine de bir inceleyicinin işaretleyeceğinin en iyi ihtimalle %40’ını buluyor. Burada yayımlanmasının nedeni, nasıl kullanılabileceğine karar veren şeyin bu ikinci sayı olması.",
      "binding": "Araştırma · yayımlanmış depo",
      "format": "İddia başına puanlar, bir doğrulama düzeneği ve başarısız olan sayılar",
      "theme": "Savunulabilir bir sırası olmayan bir okuma kuyruğu",
      "motif": "Kuyruğu sırala; hükmü asla verme",
      "chapters": [
        "Yirmi dokuz iddia",
        "Basit model neden kazandı",
        "Hâlâ neyi kaçırıyor"
      ],
      "roman": "V"
    },
    {
      "id": "parliamentary-seat-forecast",
      "kind": "evidence",
      "href": "/volumes/parliamentary-seat-forecast",
      "motifKey": "frames",
      "color": "#da3b2f",
      "foil": "#ff8eab",
      "palette": {
        "paper": "#1f1615",
        "paperDeep": "#150e0c",
        "paperPale": "#f7e9ec",
        "ink": "#f9eff1",
        "inkSoft": "#c7adb3",
        "wall": "#1f1615",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f9cdd6",
        "fill": "#c2808f"
      },
      "width": 0.96,
      "height": 1.57,
      "depth": 0.24,
      "seed": 66,
      "title": "Eşik Uçurumu",
      "discipline": "Araştırma · tahmin",
      "note": "Bir sonuç bir eşikten geçiyorsa, modellenmesi gereken eşiktir.",
      "deck": "Bir seçimi tahmin problemi olarak ele alan bir lisans tezi. İlginç belirsizlik hiçbir zaman anketlerde değildi — bir eşiğin iki yanındaki puanın kesri cevabı tamamen değiştiren bir kuraldaydı. Vergi dilimleri, kredi sözleşmesi koşulları ve hacim kademeleri de aynı şekilde davranır.",
      "binding": "Araştırma · yayımlanmış depo",
      "format": "Yöntem, verinin kaynağı ve doğruluk iddiası yok; çünkü yayımlanmadı",
      "theme": "Asıl önemli kısmı yumuşatarak yok eden bir tahmin",
      "motif": "Ortalamayı değil, kuralı modelle",
      "chapters": [
        "Oran sandalye değildir",
        "Nerede duyarlı",
        "Neyin iddia edilmediği"
      ],
      "roman": "VI"
    },
    {
      "id": "portfolio-optimizer",
      "kind": "evidence",
      "href": "/volumes/portfolio-optimizer",
      "motifKey": "compass",
      "color": "#78a7bd",
      "foil": "#e4e7e5",
      "palette": {
        "paper": "#1a1715",
        "paperDeep": "#110f0d",
        "paperPale": "#e9eff2",
        "ink": "#eff4f6",
        "inkSoft": "#aebcc4",
        "wall": "#1a1715",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f2ddc6",
        "fill": "#b39a80"
      },
      "width": 1.12,
      "height": 1.63,
      "depth": 0.28,
      "seed": 77,
      "title": "Mühürlü Model",
      "discipline": "Gösterim · sentetik veri",
      "note": "Sorgulayamadığınız bir dağıtım. Uydurma varsayımlar, tümü açıkta.",
      "deck": "Dağıtım modelleri, varsayımlarla cevap arasında görünür bir bağ olmayan bir pasta grafiği olarak gelir; kimse bir görüş yanlışsa ne olacağını soramaz. Bu araç, kaynağa yazılmış varsayımlarla tarayıcınızda çalışır ve varsayımların hepsini yayımlar.",
      "binding": "Sentetik gösterim · bu site için yapıldı",
      "format": "Tartışabileceğiniz bir çözücü ve arkasındaki varsayım tablosu",
      "theme": "Kimsenin denetleyemediği bir öneri",
      "motif": "Ya hesabı göster ya da grafiği gösterme",
      "chapters": [
        "Önsel",
        "Görüşünüz, ağırlıklandırılmış",
        "Bir sayı değil, bir dağılım"
      ],
      "roman": "VII"
    }
  ],
  "ui": {
    "nav": {
      "mainLabel": "Ana gezinme",
      "shelf": "Raf",
      "volumes": "Ciltler",
      "frontMatter": "Ön söz",
      "contact": "İletişim",
      "primaryCta": "Projenizi konuşalım",
      "menu": "Menüyü aç",
      "closeMenu": "Menüyü kapat",
      "language": "Dil",
      "skipToContent": "İçeriğe geç"
    },
    "home": {
      "metaTitle": "Uygulamalı Yapay Zekâ ve Finansal Analitik Danışmanlığı",
      "heroEyebrow": "Uygulamalı yapay zekâ ve finansal analitik",
      "heroLede": "Finans ve operasyon ekiplerinin tahmin modelleri kurmasına, belge incelemesini otomatikleştirmesine ve gerçekten kullanabilecekleri raporlama sistemleri oluşturmasına yardım ediyorum.",
      "brandLine": "Kod ile sermaye arasında köprü",
      "ctaPrimary": "Projenizi konuşalım",
      "ctaSecondary": "İlk cildi açın",
      "locationLine": "Milano, İtalya · İngilizce, İtalyanca ve Türkçe çalışıyorum",
      "evidenceLabel": "Kanıt",
      "evidenceTitle": "Denetlediğinizde çalışma neye benziyor",
      "evidenceLede": "İddia etmek yerine gösterebileceğim üç şey. Her biri, eksik kaldıkları yerler dâhil olmak üzere arkasındaki ürüne ve sayılara bağlanıyor.",
      "problemsLabel": "Problemler",
      "problemsTitle": "Genellikle bunlar için aranıyorum",
      "problemsLede": "Bu sayfayı okuma nedeniniz bunlardan biriyse, bağlantılı hizmet işin nasıl kapsamlandığını ve size ne teslim edileceğini anlatıyor.",
      "featuredLabel": "Vaka çalışması",
      "processLabel": "Süreç",
      "processTitle": "Bir iş nasıl yürüyor",
      "costLabel": "Problem",
      "costTitle": "Pahalı olan asla işin kendisi değildir. Gecikme, yeniden yapım ve sayı olmadan verilen karardır.",
      "costLede": "Yukarıdaki raftaki her problem aynı biçime sahip. Bir öğleden sonra sürmesi gereken bir iş bir hafta sürüyor; denetlenebilir olması gereken bir şey güvene dayanıyor; ve gerçek para maliyeti olan bir karar, onu besleyecek rakam gelmeden veriliyor. Bunların hiçbiri bir gider kalemi olarak görünmez — tam da bu yüzden sürer.",
      "costPoints": [
        {
          "cost": "Karar vermeye değil, derlemeye harcanan nitelikli zaman",
          "body": "Her ayın ilk haftasını dört sistemi mutabakata getirerek geçiren bir finans yöneticisi, şirketteki en pahalı ve en bakımsız veri hattıdır."
        },
        {
          "cost": "Sayı gelmeden verilen kararlar",
          "body": "Rapor toplantıdan sonra masaya geldiğinde karar sezgiyle verilmiştir; raporlama da bundan sonra ne olacağının girdisi değil, çoktan olanın kaydı hâline gelir."
        },
        {
          "cost": "Kimsenin arkasında duramayacağı sayılar",
          "body": "İki departmanın farklı hesapladığı bir rakam, hiç rakam olmamasından kötüdür: üzerinde işlem yapılmak yerine tartışılır ve tartışma her ay tekrarlanır."
        },
        {
          "cost": "Yenilendikten sonra bulunan madde",
          "body": "Zaman baskısı altında tek kişi tarafından okunan belgeler, aylar sonra maliyet olarak ortaya çıkan atlamalar üretir — üstelik o belgenin neden öyle değerlendirildiğine dair hiçbir kayıt olmadan."
        }
      ],
      "processLede": "Dört aşama; her biri bir durum güncellemesiyle değil, elinize geçen bir çıktıyla bitiyor.",
      "process": [
        {
          "stage": "Keşif",
          "body": "Asıl karara ve asıl veriye bakarız; hiçbir şey inşa edilmeden önce iyi bir sonucun ne olacağını kararlaştırırız. Projeler çoğu zaman burada küçülür.",
          "output": "Yazılı bir problem tanımı ve yapmaya değip değmeyeceğine dair dürüst bir görüş."
        },
        {
          "stage": "Sınırlanmış pilot",
          "body": "Tek iş akışı, tek belge türü, tek tahmin. İşe yaramadığını öğrenmenin batık maliyet değil, ucuz bir cevap olacağı kadar küçük.",
          "output": "Çalışan bir prototip ve kendi verileriniz üzerinde bir değerlendirme."
        },
        {
          "stage": "Teslim",
          "body": "Pilotu geçen şey, işin gerçekten yapıldığı yerde kurulur; inceleme adımı sonradan eklenmek yerine ilk günden yerindedir.",
          "output": "Devreye alınmış iş akışı, dokümantasyonu ve ne zaman saptığını gösteren kontroller."
        },
        {
          "stage": "Devir",
          "body": "Ekibiniz onu bensiz çalıştırır. Buna, girdiler değiştiğinde nasıl yeniden değerlendirileceğini bilmek de dâhildir; çünkü değişecekler.",
          "output": "Dokümantasyon, değerlendirme düzeneği ve sonraki sahibiyle bir gözden geçirme."
        }
      ],
      "storyLabel": "Arka plan",
      "storyTitle": "Bir veri bilimci neden bilanço okumayı sürdürüyor",
      "storyLede": "Bocconi’de ekonomi ve bilgisayar bilimi okudum, banka riskinde çalıştım, bir fabrikada tahmin modelleri devreye aldım ve iki yıl boyunca modellere kurumsal raporları okumayı öğrettim. Ortak çizgi şu: bir model, ancak birinin söylediğini imzalaması gerektiğinde önem kazanır.",
      "storyCta": "Tüm geçmişi okuyun",
      "contactTitle": "Hangi kararı veya iş akışını iyileştirmeye çalışıyorsunuz?",
      "contactLede": "Problemi birkaç cümleyle anlatın. Yanıtları bizzat ben yazıyorum, genelde birkaç iş günü içinde; üstlenmemem gereken bir işse bunu açıkça söylerim."
    },
    "work": {
      "readCaseStudy": "Vaka çalışmasını okuyun",
      "sections": {
        "problem": "Problem",
        "context": "Bağlam",
        "role": "Benim rolüm",
        "audience": "Kimin için",
        "data": "Verinin kaynağı",
        "constraints": "Kısıtlar",
        "approach": "Yaklaşım",
        "decisions": "Önem taşıyan kararlar",
        "baseline": "Kıyas noktası",
        "evaluation": "Nasıl değerlendirildi",
        "results": "Sonuçlar",
        "deliverables": "Teslim edilenler",
        "consequences": "Pratikte neyi değiştiriyor",
        "limitations": "Sınırlar",
        "humanReview": "İnsan incelemesi",
        "evidence": "Kanıt kaydı",
        "links": "Kaynak malzeme"
      },
      "evidenceIntro": "Yukarıda geçen her rakam; kaynağı ve size söylemedikleriyle birlikte.",
      "evidenceSource": "Kaynak",
      "evidenceMethod": "Yöntem",
      "evidenceBaseline": "Karşılaştırıldığı",
      "evidenceAsOf": "Tarih",
      "evidenceLimits": "Sınırlar",
      "noResults": "Bu proje için yayımlanmış bir performans rakamı yok, dolayısıyla iddia da edilmiyor.",
      "relatedService": "İlgili hizmet",
      "repository": "Depo",
      "report": "Performans raporu",
      "figureLabel": "Şekil",
      "nextStepTitle": "Buna benzer bir probleminiz mi var?",
      "nextStepLede": "Neye karar vermeye çalıştığınızı anlatın, bu yaklaşımın uyup uymadığını söyleyeyim."
    },
    "maturity": {
      "research": {
        "label": "Araştırma",
        "description": "Yayımlanmış bir ürünü olan araştırma çalışması. Kurulmadı ve kimse kullanmıyor."
      },
      "prototype": {
        "label": "Prototip",
        "description": "Bir yaklaşımın işe yarayıp yaramadığını sınamak için yapıldı. Düzenli kullanım için sağlamlaştırılmadı."
      },
      "internal-deployment": {
        "label": "Kurum içi kullanım",
        "description": "Bir kuruluşun kendi çalışanları için içeride çalışıyor."
      },
      "client-engagement": {
        "label": "Müşteri işi",
        "description": "Bir müşteri için sipariş edildi ve teslim edildi."
      },
      "maintained-product": {
        "label": "Bakımı yapılan ürün",
        "description": "Sürekli kullanımda ve etkin biçimde bakımı yapılıyor."
      },
      "synthetic-demo": {
        "label": "Sentetik gösterim",
        "description": "Bir yöntemi göstermek için bu site adına uydurma veriyle yapıldı. Bir iş değil, bir müşteri sonucu değil ve kimse kullanmıyor."
      }
    },
    "contact": {
      "label": "İletişim",
      "title": "Hangi kararı veya iş akışını iyileştirmeye çalışıyorsunuz?",
      "lede": "Başlamak için birkaç cümle yeterli. Yanıtları bizzat ben yazıyorum ve probleminiz için başka biri daha uygunsa bunu açıkça söylerim.",
      "nameLabel": "Ad",
      "namePlaceholder": "Adınız",
      "emailLabel": "E-posta",
      "emailPlaceholder": "siz@sirket.com",
      "companyLabel": "Şirket",
      "companyOptional": "isteğe bağlı",
      "companyPlaceholder": "Nerede çalışıyorsunuz",
      "topicLabel": "Konu nedir?",
      "topicPlaceholder": "Bir konu seçin",
      "messageLabel": "Neyi iyileştirmeye çalışıyorsunuz?",
      "messagePlaceholder": "Örneğin: aylık raporlamamız dört ayrı sistemden elle birleştiriliyor, bir hafta sürüyor ve rapor masaya geldiğinde kimse sayılara güvenmiyor.",
      "messageHint": "Problem, kabaca. Hazır bir brief gerekmiyor.",
      "submit": "Mesajı gönder",
      "submitting": "Gönderiliyor…",
      "required": "Bu alan zorunlu",
      "invalidEmail": "Yanıt alabileceğiniz bir e-posta adresi girin",
      "tooShort": "Neye ihtiyacınız olduğunu anlamam için bir iki cümle",
      "tooLong": "Lütfen biraz kısaltın",
      "errorSummary": "Mesajınız gönderilmedi. Lütfen aşağıda işaretlenen alanları kontrol edin.",
      "successTitle": "Alındı",
      "successBody": "Mesajınız gelen kutuma ulaştı. Bunları kendim okuyorum ve verdiğiniz adrese genelde birkaç iş günü içinde yanıt veriyorum.",
      "failureTitle": "Bu gönderilemedi",
      "failureBody": "Hiçbir şey gönderilmedi. Mesajınız hâlâ formda duruyor — yeniden deneyebilir veya aşağıdaki adresi kullanarak doğrudan e-posta atabilirsiniz.",
      "disabledTitle": "E-posta ile iletişime geçin",
      "disabledBody": "İletişim formu şu anda kullanılamıyor. Projenizi birkaç cümleyle e-posta ile anlatın; mesajınız doğrudan bana ulaşır.",
      "whatHappensNext": "Bundan sonra ne oluyor",
      "nextSteps": [
        "Mesajınızı kendim okuyorum. Hiçbir şey bir asistana veya otomatik yanıtlayıcıya yönlendirilmiyor.",
        "Verdiğiniz adrese, genelde iki iş günü içinde, yardımcı olabileceğimi düşünüp düşünmediğimi belirten bir yanıt geliyor.",
        "Uygun görünüyorsa, kapsam veya teklif konuşulmadan önce otuz dakikayı asıl problemin kendisine ayırıyoruz."
      ],
      "privacyTitle": "Gönderdiklerinize ne oluyor",
      "privacyBody": "Adınız, e-postanız, şirketiniz ve mesajınız yanıt verebilmem için e-posta sağlayıcıma gönderilir ve o gelen kutusunda saklanır. Bir e-posta listesine eklenmez, başka kimseye aktarılmaz ve içerik hiçbir zaman analitiğe gönderilmez. İstediğiniz an söyleyin, yazışmayı silerim.",
      "directTitle": "Ya da doğrudan ulaşın",
      "directBody": "Form ile başlamak istemiyorsanız, bunların ikisi de bana ulaşır.",
      "whatsappDirect": "WhatsApp",
      "noScheduling": "Burada bilerek bir takvim bağlantısı yok: herkese açık bir randevu takvimi tutmuyorum, dolayısıyla saat ilk yanıtta kararlaştırılıyor.",
      "charactersRemaining": "karakter kaldı"
    },
    "labels": {
      "disclaimer": "Bu sitedeki hiçbir şey muhasebe, denetim, vergi, hukuk veya yatırım tavsiyesi değildir ve buradaki hiçbir rakam bir sonuç vaadi değildir. Bir sayı görünüyorsa, kaynağı ve sınırları da onunla birlikte görünür.",
      "synthetic": "Sentetik gösterim",
      "syntheticHint": "Bir yöntemi göstermek için kullanılan uydurma veri. Gerçek bir sonuç değil.",
      "interactiveCalculation": "Etkileşimli hesaplama",
      "interactiveHint": "Belirtilen varsayımlardan tarayıcınızda hesaplanır. Dış veri yok.",
      "recordedExample": "Kayıtlı örnek",
      "liveData": "Canlı veri"
    }
  }
}
```

### /tr/front-matter

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "front-matter",
    "kind": "service",
    "href": "/front-matter",
    "motifKey": "brackets",
    "color": "#182a43",
    "foil": "#c87046",
    "palette": {
      "paper": "#1b1613",
      "paperDeep": "#120e0b",
      "paperPale": "#f1eadf",
      "ink": "#f4eee6",
      "inkSoft": "#b9b4ae",
      "wall": "#1b1613",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f4d7b9",
      "fill": "#c2a184"
    },
    "width": 1.02,
    "height": 1.58,
    "depth": 0.26,
    "seed": 11
  },
  "title": "Yedi pahalı problem.",
  "discipline": "Problem",
  "note": "Finans ve operasyon ekiplerinin tahmin modelleri kurmasına, belge incelemesini otomatikleştirmesine ve gerçekten kullanabilecekleri raporlama sistemleri oluşturmasına yardım ediyorum.",
  "deck": "Yukarıdaki raftaki her problem aynı biçime sahip. Bir öğleden sonra sürmesi gereken bir iş bir hafta sürüyor; denetlenebilir olması gereken bir şey güvene dayanıyor; ve gerçek para maliyeti olan bir karar, onu besleyecek rakam gelmeden veriliyor. Bunların hiçbiri bir gider kalemi olarak görünmez — tam da bu yüzden sürer.",
  "theme": "Problem",
  "binding": "Problem",
  "format": "Süreç",
  "roman": "Ön söz",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "",
        "label": "Ön söz",
        "discipline": "Problem",
        "title": "Yedi pahalı problem.",
        "note": "Pahalı olan asla işin kendisi değildir. Gecikme, yeniden yapım ve sayı olmadan verilen karardır."
      }
    },
    {
      "id": "thesis",
      "block": {
        "kind": "prose",
        "heading": "Problem",
        "body": "Yukarıdaki raftaki her problem aynı biçime sahip. Bir öğleden sonra sürmesi gereken bir iş bir hafta sürüyor; denetlenebilir olması gereken bir şey güvene dayanıyor; ve gerçek para maliyeti olan bir karar, onu besleyecek rakam gelmeden veriliyor. Bunların hiçbiri bir gider kalemi olarak görünmez — tam da bu yüzden sürer."
      }
    },
    {
      "id": "cost-1",
      "block": {
        "kind": "prose",
        "heading": "Karar vermeye değil, derlemeye harcanan nitelikli zaman",
        "body": "Her ayın ilk haftasını dört sistemi mutabakata getirerek geçiren bir finans yöneticisi, şirketteki en pahalı ve en bakımsız veri hattıdır."
      }
    },
    {
      "id": "cost-2",
      "block": {
        "kind": "prose",
        "heading": "Sayı gelmeden verilen kararlar",
        "body": "Rapor toplantıdan sonra masaya geldiğinde karar sezgiyle verilmiştir; raporlama da bundan sonra ne olacağının girdisi değil, çoktan olanın kaydı hâline gelir."
      }
    },
    {
      "id": "cost-3",
      "block": {
        "kind": "prose",
        "heading": "Kimsenin arkasında duramayacağı sayılar",
        "body": "İki departmanın farklı hesapladığı bir rakam, hiç rakam olmamasından kötüdür: üzerinde işlem yapılmak yerine tartışılır ve tartışma her ay tekrarlanır."
      }
    },
    {
      "id": "cost-4",
      "block": {
        "kind": "prose",
        "heading": "Yenilendikten sonra bulunan madde",
        "body": "Zaman baskısı altında tek kişi tarafından okunan belgeler, aylar sonra maliyet olarak ortaya çıkan atlamalar üretir — üstelik o belgenin neden öyle değerlendirildiğine dair hiçbir kayıt olmadan."
      }
    },
    {
      "id": "process-intro",
      "block": {
        "kind": "prose",
        "heading": "Bir iş nasıl yürüyor",
        "body": "Dört aşama; her biri bir durum güncellemesiyle değil, elinize geçen bir çıktıyla bitiyor."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 01",
        "lede": "Asıl karara ve asıl veriye bakarız; hiçbir şey inşa edilmeden önce iyi bir sonucun ne olacağını kararlaştırırız. Projeler çoğu zaman burada küçülür.",
        "items": [
          {
            "term": "Keşif",
            "detail": "Yazılı bir problem tanımı ve yapmaya değip değmeyeceğine dair dürüst bir görüş."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 02",
        "lede": "Tek iş akışı, tek belge türü, tek tahmin. İşe yaramadığını öğrenmenin batık maliyet değil, ucuz bir cevap olacağı kadar küçük.",
        "items": [
          {
            "term": "Sınırlanmış pilot",
            "detail": "Çalışan bir prototip ve kendi verileriniz üzerinde bir değerlendirme."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 03",
        "lede": "Pilotu geçen şey, işin gerçekten yapıldığı yerde kurulur; inceleme adımı sonradan eklenmek yerine ilk günden yerindedir.",
        "items": [
          {
            "term": "Teslim",
            "detail": "Devreye alınmış iş akışı, dokümantasyonu ve ne zaman saptığını gösteren kontroller."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 04",
        "lede": "Ekibiniz onu bensiz çalıştırır. Buna, girdiler değiştiğinde nasıl yeniden değerlendirileceğini bilmek de dâhildir; çünkü değişecekler.",
        "items": [
          {
            "term": "Devir",
            "detail": "Dokümantasyon, değerlendirme düzeneği ve sonraki sahibiyle bir gözden geçirme."
          }
        ]
      }
    },
    {
      "id": "evidence-1",
      "block": {
        "kind": "evidence",
        "heading": "Denetlediğinizde çalışma neye benziyor",
        "lede": "İddia etmek yerine gösterebileceğim üç şey. Her biri, eksik kaldıkları yerler dâhil olmak üzere arkasındaki ürüne ve sayılara bağlanıyor.",
        "entries": [
          {
            "metric": "Evaluation set",
            "value": "29 claims",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Environmental claims extracted from corporate communications and rated for greenwashing risk by human reviewers, forming the reference set the detector is scored against. Human expert ratings collected via a structured questionnaire, then used as ground truth.",
            "asOf": "2026-01-29",
            "limitations": "Twenty-nine items is a small evaluation set. Every figure derived from it carries wide uncertainty and none of it should be read as a population estimate."
          }
        ]
      }
    },
    {
      "id": "evidence-2",
      "block": {
        "kind": "evidence",
        "heading": "Kanıt",
        "lede": "",
        "entries": [
          {
            "metric": "Krippendorff's α",
            "value": "0.69",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Agreement between the human raters who produced the reference ratings. Krippendorff's alpha across raters; pairwise agreement ≈ 0.852.",
            "asOf": "2026-01-29",
            "limitations": "α = 0.69 is substantial but not strong agreement: the humans themselves disagree on roughly a third of the signal, which caps how well any model can be expected to match them."
          }
        ]
      }
    },
    {
      "id": "evidence-3",
      "block": {
        "kind": "evidence",
        "heading": "Kanıt",
        "lede": "",
        "entries": [
          {
            "metric": "Pearson r (v1)",
            "value": "0.906",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Correlation between the v1 detector score and the human reference rating, over the 29-claim set. Pearson correlation on continuous scores. Spearman 0.811, Kendall 0.627, MAE 0.206, RMSE 0.237.",
            "baseline": "v3 rule-based detector, r = 0.793; v2 semantic detector, r = 0.557.",
            "asOf": "2026-01-29",
            "limitations": "Correlation on 29 items. It says the score moves with reviewer judgement, not that the score is calibrated as a probability of greenwashing."
          }
        ]
      }
    },
    {
      "id": "evidence-4",
      "block": {
        "kind": "evidence",
        "heading": "Kanıt",
        "lede": "",
        "entries": [
          {
            "metric": "Recall / precision (v3)",
            "value": "0.40 recall at 1.00 precision",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Binary flag / no-flag performance of the v3 rule-based detector against the human reference labels. Thresholded score compared with binarised human labels on the same 29-claim set.",
            "baseline": "v1 baseline: recall 0.15 at precision 1.00 (F1 0.261). v3 reaches F1 0.571.",
            "asOf": "2026-01-29",
            "limitations": "Recall of 0.40 means roughly three in five flaggable claims are missed. Precision of 1.00 on a set this small is a handful of correct positives, not a guarantee. The tool is a reviewer aid; it cannot be a filter that runs unattended."
          }
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Hangi kararı veya iş akışını iyileştirmeye çalışıyorsunuz?",
        "body": "Problemi birkaç cümleyle anlatın. Yanıtları bizzat ben yazıyorum, genelde birkaç iş günü içinde; üstlenmemem gereken bir işse bunu açıkça söylerim.",
        "cta": "Projenizi konuşalım",
        "href": "/tr/contact"
      }
    }
  ]
}
```

### /tr/chapters

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "copy": {
    "carouselTitle": "Buraya kadar gelen hikâye.",
    "swipeChapters": "Keşfetmek için kaydır",
    "scrollChapters": "Keşfetmek için kaydır",
    "chapters": "Bölümler",
    "cv": "Kariyer ve özgeçmiş",
    "title": "Beş bölümde",
    "titleAccent": "bir kariyer.",
    "intro": "Ekonomiden algoritmalara. Riski anlamaktan kendi işimi kurmaya. Çalışma biçimimi şekillendiren deneyimler.",
    "scroll": "Hikâyeyi kaydırarak keşfet",
    "record": "Özgeçmiş",
    "recordNote": "Eğitim, deneyim ve çalışma dilleri. Tarihler özgeçmişimdeki kayıtlara göredir.",
    "scenes": [
      "Temeller",
      "Sorumluluğu öğrenmek",
      "Modeller gerçeklikle buluşuyor",
      "Satır aralarını okumak",
      "Kendi işimi kurmak"
    ],
    "sceneLabels": [
      "Ekonomi × bilgisayar bilimi",
      "Risk × sorumluluk",
      "Veri × endüstri",
      "Dil × kanıt",
      "İtalya × Türkiye"
    ],
    "nextTitle": "Sıradaki bölüm",
    "nextAccent": "bir sohbetle başlar.",
    "nextLink": "Bir sohbet başlat",
    "print": "Yazdır / CV kaydet",
    "contact": "İletişim",
    "contactEyebrow": "Bir fikir bir bağlantıyla başlar",
    "contactTitle": "Fikrinize bir",
    "contactAccent": "ilk sayfa açalım.",
    "contactIntro": "Dört küçük soru. Özenli bir ilk mesaj. Aklınızdakini anlatın, birlikte devamını getirelim.",
    "guide": "Sohbet rehberiniz",
    "sceneAlt": "Açık, üç boyutlu bir kitabın içinde asılı duran ışıklı bir nöron.",
    "sceneNote": "Her yanıt yeni bir bağlantı kurar.",
    "pause": "Animasyonu duraklat",
    "play": "Animasyonu oynat",
    "steps": [
      "Tanışma",
      "Yön",
      "Fikriniz",
      "Zamanlama"
    ],
    "questions": [
      "Önce size nasıl hitap edeyim?",
      "Sizi buraya getiren nedir?",
      "İyi bir sonuç sizin için ne olurdu?",
      "Ne zaman başlamak istersiniz?"
    ],
    "hints": [
      "İsminiz yeterli. İsterseniz şirketinizi de ekleyin.",
      "En yakın seçeneği seçin. Sonraki adımda ayrıntıları anlatabilirsiniz.",
      "Bir sorun, bir fırsat veya geliştirmek istediğiniz bir şey. Birkaç cümle yeterli.",
      "Bir tahmin yeterli. Bu, sohbetin çerçevesini belirlemeye yardımcı olur."
    ],
    "name": "Adınız",
    "namePlaceholder": "Size nasıl hitap etmemi istersiniz?",
    "company": "Şirket / kuruluş",
    "optional": "isteğe bağlı",
    "idea": "Fikriniz",
    "ideaPlaceholder": "Üzerinde çalıştığımız konu… Yardım istediğimiz kısım…",
    "topics": [
      "Belge zekâsı ve yapay zekâ",
      "Tahminleme ve finansal analitik",
      "Raporlama ve iş zekâsı",
      "İtalya–Türkiye danışmanlığı",
      "Başka bir konu"
    ],
    "timings": [
      "Mümkün olan en kısa sürede",
      "Önümüzdeki 1–3 ay içinde",
      "Bu yılın ilerleyen döneminde",
      "Henüz araştırıyorum"
    ],
    "next": "Devam",
    "back": "Geri",
    "review": "Mesajımı gözden geçir",
    "step": "Soru",
    "of": "/",
    "nameError": "Lütfen adınızı yazın.",
    "ideaError": "Fikrinizi anlayabilmem için en az 20 karakter yazın.",
    "previewTitle": "İlk sayfanız hazır.",
    "previewHint": "Mesajı dilediğiniz gibi düzenleyin, ardından nerede devam edeceğinizi seçin.",
    "messageLabel": "Mesajınız",
    "whatsapp": "WhatsApp’ı aç",
    "outlook": "Outlook uygulamasını aç",
    "email": "E-posta uygulamasını aç",
    "outlookWeb": "Tarayıcıda Outlook",
    "mailHint": "Masaüstünde e-posta düğmesi varsayılan posta uygulamanızı açar. Outlook’u kullanmak için onu varsayılan olarak seçin.",
    "sendNote": "Mesajı uygulamada gözden geçirip siz gönderirsiniz. Hiçbir şey otomatik gönderilmez.",
    "privacy": "Bir mesajlaşma uygulaması seçene kadar yanıtlarınız bu sayfada kalır. Hesap gerekmez.",
    "edit": "Yanıtları düzenle",
    "copy": "Mesajı kopyala",
    "copied": "Kopyalandı",
    "copyFailed": "Yukarıdaki mesajı seçip kopyalayın.",
    "direct": "Doğrudan başlamak ister misiniz?",
    "careerLink": "Geçmişimi mi merak ediyorsunuz? Bölümleri keşfedin",
    "greeting": "Merhaba Bumin,",
    "introduction": "Ben",
    "from": "şirketinden",
    "interest": "Görüşmek istediğim konu",
    "timingLabel": "Zamanlama",
    "closing": "Sonraki adımları görüşmek için müsait olur musunuz?",
    "subject": "Proje hakkında görüşme"
  },
  "record": {
    "about": {
      "desc1": "Finans ve operasyon ekipleri için uygulamalı yapay zekâ ve finansal analitik kuruyorum — belge incelemesi, tahmin ve üzerine karar verilebilecek raporlama. Bocconi'de ekonomi, yönetim ve bilgisayar bilimi, ardından veri bilimi ve iş analitiği okudum; İtalya-Türkiye koridorundaki danışmanlık işi için Alvolo Consulting'i kurdum."
    },
    "aboutPage": {
      "education": "Eğitim",
      "experience": "Deneyim",
      "languages": "Diller",
      "thesis": "Tez",
      "educationData": [
        {
          "school": "Bocconi Üniversitesi",
          "degree": "Veri Bilimi ve İş Analitiği Yüksek Lisansı",
          "location": "Milano, İtalya",
          "period": "2023 - 2025",
          "coursework": [
            "Bilgisayarlı Görü için Derin Öğrenme",
            "Simülasyon ve Modelleme",
            "Doğal Dil İşleme"
          ],
          "thesis": "Kurumsal İletişimlerde Greenwashing Riskinin Denetlenebilir Tespiti"
        },
        {
          "school": "Bocconi Üniversitesi",
          "degree": "Ekonomi, Yönetim ve Bilgisayar Bilimleri Lisansı",
          "location": "Milano, İtalya",
          "period": "2020 - 2023",
          "coursework": [
            "Ekonometri",
            "Büyük Veri ve Veritabanları",
            "Programlama",
            "Bilişim Hukuku",
            "Makine Öğrenmesi"
          ],
          "thesis": "Parlamento Seçimleri için Analitik Tahmin Teknikleri: 2023 Türkiye Genel Seçimleri Örneği"
        }
      ],
      "experienceData": [
        {
          "company": "IMPACTSCOPE",
          "role": "Yapay Zeka Uzmanı & NLP Araştırmacısı",
          "location": "Uzaktan, İsviçre",
          "period": "Aralık 2024 - Aralık 2025",
          "highlights": [
            "Kurumsal sürdürülebilirlik iddialarındaki greenwashing riskini puanlayan bir veri ürünü geliştirdim; böylece inceleyiciler bir kuyruğu sırayla okumak yerine önceliklendirebiliyor",
            "Duruş tespiti ve duygu kayması kullanarak anlamsal çelişki endeksi (SCI) geliştirdim",
            "Duygu tabanlı ESG risk puanlarını geçmiş \"greenwashing\" tartışmalarıyla çapraz referanslayarak, kamuoyu duygu kutupluluğu ile greenwashing suçlamaları arasında güçlü bir korelasyon olduğunu gösterdim."
          ]
        },
        {
          "company": "ALVOLO CONSULTING",
          "role": "Kurucu",
          "location": "Milano, İtalya",
          "period": "Mart 2025 - Kasım 2025",
          "highlights": [
            "İtalya'da, Türkiye-İtalya koridorunda çalışan işletmeler için bir danışmanlık pratiği kurdum",
            "Hangi adımların lisanslı meslek mensubu gerektirdiğini belirleyerek İtalyan finansal ve idari sistemini kapsamlandırmayı öğrendim",
            "Edinimden sürdürmeye kadar müşteri ilişkisini yönettim ve tarafların doğru uzmanlara ulaşmasını koordine ettim"
          ]
        },
        {
          "company": "FEDRIGONI SPA",
          "role": "Junior Veri Bilimci",
          "location": "Milano, İtalya",
          "period": "Nisan 2024 - Ekim 2024",
          "highlights": [
            "İş içgörüleri ve önerileri sunmak için en son derin öğrenme yöntemlerini (LSTM) kullanarak zaman serisi algoritmaları ve özel tahmin modelleri geliştirdim.",
            "Fiyatlamayı optimize etmek için denetimsiz modeller ve Doğal Dil İşleme (NLP) içeren özel yapay zeka modeli geliştirdim.",
            "Yeni analitik prototipler geliştirmek için Knime ve PowerBI gibi araçları kullanarak, verileri daha iyi anlamlandırıp, müşterilerimize daha iyi hizmet sunmak için çalıştım."
          ]
        },
        {
          "company": "N26 BANK AG",
          "role": "Risk Yönetimi Stajyeri",
          "location": "Berlin, Almanya",
          "period": "Kasım 2022 - Şubat 2023",
          "highlights": [
            "İç Kontrol Sistemi (İKS), kayıp veritabanı, risk kaydı ve raporlamayı destekledim",
            "Yeni Ürün Sürecini (NPP) destekleyen paydaşlarla etkileşim kurdum",
            "Finansal olmayan risklerin belirlenmesi, değerlendirilmesi, azaltılması ve izlenmesine yardımcı oldum"
          ]
        }
      ],
      "languageData": [
        {
          "lang": "Türkçe",
          "level": "Ana Dil"
        },
        {
          "lang": "İngilizce",
          "level": "Ana Dil"
        },
        {
          "lang": "İtalyanca",
          "level": "İleri (C1)"
        },
        {
          "lang": "Almanca",
          "level": "Orta (B1)"
        }
      ]
    }
  },
  "story": {
    "chaptersLabel": "Bölümler",
    "chapters": [
      {
        "numeral": "I",
        "years": "2020 — 2023",
        "place": "Milano",
        "institution": "Bocconi Üniversitesi",
        "role": "Ekonomi, Yönetim ve Bilgisayar Bilimleri Lisansı",
        "title": "Kod yazmayı öğrenen bir ekonomist, ikisini birden öğreten bir okulda.",
        "body": "Bocconi ekonometri ile programlamayı her hafta aynı haftaya koydu. Oradan, bir genel seçimi tahmin problemi olarak ele alan bir tezle — ve bir modelin nasıl çalıştığını sormadan önce ne için olduğunu sorma alışkanlığıyla ayrıldım."
      },
      {
        "numeral": "II",
        "years": "2022 — 2023",
        "place": "Berlin",
        "institution": "N26 Bank AG",
        "role": "Risk Yönetimi Stajyeri",
        "title": "Bir bankanın içinde risk bir grafik değildir. Bir kayıt, bir kontrol, bir karardır.",
        "body": "N26’nın risk ekibinde iç kontrol sistemi, kayıp veritabanı ve risk sicili üzerinde çalıştım; her lansmanın neyin ters gidebileceğine karşı tartıldığı yeni ürün sürecinde yer aldım. Zarif bir model ancak bir komiteyle temastan sağ çıkarsa önemlidir."
      },
      {
        "numeral": "III",
        "years": "2024",
        "place": "Milano",
        "institution": "Fedrigoni S.p.A.",
        "role": "Junior Veri Bilimci",
        "title": "Yüz yıllık bir kâğıt üreticisi ve fabrika sahasına gönderdiğim ilk modeller.",
        "body": "Fedrigoni’de talep için LSTM zaman serisi modelleri, denetimsiz öğrenmeyle NLP’yi birleştiren bir fiyatlama modeli ve işin bunları görmesini sağlayan Knime ile PowerBI prototiplerini geliştirdim. Üretim mimarinizi umursamaz; pazartesi sabahı panodaki sayının doğru olup olmadığını umursar."
      },
      {
        "numeral": "IV",
        "years": "2023 — 2025",
        "place": "Milano ve İsviçre",
        "institution": "Bocconi Üniversitesi · ImpactScope",
        "role": "Veri Bilimi Yüksek Lisansı · Yapay Zekâ Uzmanı, NLP Araştırmacısı",
        "title": "Bir dil modeline vaat ile planı ayırt etmeyi öğretmek.",
        "body": "Yüksek lisans tezim ve ImpactScope’taki çalışmam tek bir soruda birleşti: bir model, şirketlerin sürdürülebilirlik iddialarını denetleyebilir mi? Değerlendirmeden sağ çıkan cevap, aradığımdan daha dar ve daha kullanışlıydı — bir okuma kuyruğunu sıralayacak kadar uzman yargısını izleyen, okuyucunun yerini almaya ise hiç yaklaşmayan bir dedektör."
      },
      {
        "numeral": "V",
        "years": "2025",
        "place": "Milano",
        "institution": "Alvolo Consulting",
        "role": "Kurucu",
        "title": "Sonra, kendim işe almak isteyeceğim firmayı kurdum.",
        "body": "Alvolo Consulting, Türkiye ile İtalya arasında iş yapan şirketler için bir finansal danışmanlık pratiği: şirket kuruluşu, vergi yapılandırması, bankacılık, müzakere. Onu kurmak İtalyan finans sistemini içeriden öğrenmek demekti — ve modellerle danışmanlığın nihayet aynı masaya oturduğu yer burası."
      }
    ]
  }
}
```

### /tr/contact

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "copy": {
    "carouselTitle": "Buraya kadar gelen hikâye.",
    "swipeChapters": "Keşfetmek için kaydır",
    "scrollChapters": "Keşfetmek için kaydır",
    "chapters": "Bölümler",
    "cv": "Kariyer ve özgeçmiş",
    "title": "Beş bölümde",
    "titleAccent": "bir kariyer.",
    "intro": "Ekonomiden algoritmalara. Riski anlamaktan kendi işimi kurmaya. Çalışma biçimimi şekillendiren deneyimler.",
    "scroll": "Hikâyeyi kaydırarak keşfet",
    "record": "Özgeçmiş",
    "recordNote": "Eğitim, deneyim ve çalışma dilleri. Tarihler özgeçmişimdeki kayıtlara göredir.",
    "scenes": [
      "Temeller",
      "Sorumluluğu öğrenmek",
      "Modeller gerçeklikle buluşuyor",
      "Satır aralarını okumak",
      "Kendi işimi kurmak"
    ],
    "sceneLabels": [
      "Ekonomi × bilgisayar bilimi",
      "Risk × sorumluluk",
      "Veri × endüstri",
      "Dil × kanıt",
      "İtalya × Türkiye"
    ],
    "nextTitle": "Sıradaki bölüm",
    "nextAccent": "bir sohbetle başlar.",
    "nextLink": "Bir sohbet başlat",
    "print": "Yazdır / CV kaydet",
    "contact": "İletişim",
    "contactEyebrow": "Bir fikir bir bağlantıyla başlar",
    "contactTitle": "Fikrinize bir",
    "contactAccent": "ilk sayfa açalım.",
    "contactIntro": "Dört küçük soru. Özenli bir ilk mesaj. Aklınızdakini anlatın, birlikte devamını getirelim.",
    "guide": "Sohbet rehberiniz",
    "sceneAlt": "Açık, üç boyutlu bir kitabın içinde asılı duran ışıklı bir nöron.",
    "sceneNote": "Her yanıt yeni bir bağlantı kurar.",
    "pause": "Animasyonu duraklat",
    "play": "Animasyonu oynat",
    "steps": [
      "Tanışma",
      "Yön",
      "Fikriniz",
      "Zamanlama"
    ],
    "questions": [
      "Önce size nasıl hitap edeyim?",
      "Sizi buraya getiren nedir?",
      "İyi bir sonuç sizin için ne olurdu?",
      "Ne zaman başlamak istersiniz?"
    ],
    "hints": [
      "İsminiz yeterli. İsterseniz şirketinizi de ekleyin.",
      "En yakın seçeneği seçin. Sonraki adımda ayrıntıları anlatabilirsiniz.",
      "Bir sorun, bir fırsat veya geliştirmek istediğiniz bir şey. Birkaç cümle yeterli.",
      "Bir tahmin yeterli. Bu, sohbetin çerçevesini belirlemeye yardımcı olur."
    ],
    "name": "Adınız",
    "namePlaceholder": "Size nasıl hitap etmemi istersiniz?",
    "company": "Şirket / kuruluş",
    "optional": "isteğe bağlı",
    "idea": "Fikriniz",
    "ideaPlaceholder": "Üzerinde çalıştığımız konu… Yardım istediğimiz kısım…",
    "topics": [
      "Belge zekâsı ve yapay zekâ",
      "Tahminleme ve finansal analitik",
      "Raporlama ve iş zekâsı",
      "İtalya–Türkiye danışmanlığı",
      "Başka bir konu"
    ],
    "timings": [
      "Mümkün olan en kısa sürede",
      "Önümüzdeki 1–3 ay içinde",
      "Bu yılın ilerleyen döneminde",
      "Henüz araştırıyorum"
    ],
    "next": "Devam",
    "back": "Geri",
    "review": "Mesajımı gözden geçir",
    "step": "Soru",
    "of": "/",
    "nameError": "Lütfen adınızı yazın.",
    "ideaError": "Fikrinizi anlayabilmem için en az 20 karakter yazın.",
    "previewTitle": "İlk sayfanız hazır.",
    "previewHint": "Mesajı dilediğiniz gibi düzenleyin, ardından nerede devam edeceğinizi seçin.",
    "messageLabel": "Mesajınız",
    "whatsapp": "WhatsApp’ı aç",
    "outlook": "Outlook uygulamasını aç",
    "email": "E-posta uygulamasını aç",
    "outlookWeb": "Tarayıcıda Outlook",
    "mailHint": "Masaüstünde e-posta düğmesi varsayılan posta uygulamanızı açar. Outlook’u kullanmak için onu varsayılan olarak seçin.",
    "sendNote": "Mesajı uygulamada gözden geçirip siz gönderirsiniz. Hiçbir şey otomatik gönderilmez.",
    "privacy": "Bir mesajlaşma uygulaması seçene kadar yanıtlarınız bu sayfada kalır. Hesap gerekmez.",
    "edit": "Yanıtları düzenle",
    "copy": "Mesajı kopyala",
    "copied": "Kopyalandı",
    "copyFailed": "Yukarıdaki mesajı seçip kopyalayın.",
    "direct": "Doğrudan başlamak ister misiniz?",
    "careerLink": "Geçmişimi mi merak ediyorsunuz? Bölümleri keşfedin",
    "greeting": "Merhaba Bumin,",
    "introduction": "Ben",
    "from": "şirketinden",
    "interest": "Görüşmek istediğim konu",
    "timingLabel": "Zamanlama",
    "closing": "Sonraki adımları görüşmek için müsait olur musunuz?",
    "subject": "Proje hakkında görüşme"
  },
  "controls": {
    "hero": "Daha net iş kararları için uygulamalı yapay zekâ ve finansal analitik.",
    "intro": "Finans ve operasyon ekiplerinin belge kuyruklarını, tahminlerini ve dağınık raporlarını kontrol edebilecekleri, kullanışlı iş akışlarına dönüştürmelerine yardımcı oluyorum.",
    "directory": "Hizmetler ve çalışmalar",
    "about": "Hakkımda / CV",
    "approach": "Yaklaşım",
    "home": "Ana sayfa",
    "service": "Hizmet",
    "research": "Araştırma projesi",
    "synthetic": "Sentetik gösterim",
    "browse": "Çalışmaları inceleyin",
    "contact": "Projenizi konuşalım",
    "read": "Bu cildi okuyun",
    "takeaway": "Çıktı / öğrenilecekler",
    "collection": "Bir çalışma kütüphanesi",
    "collectionNote": "Dört hizmet, iki araştırma projesi ve bir sentetik gösterim. Kapsamı, kanıtları ve sınırlamaları incelemek için bir cilt açın.",
    "shelfTitle": "Raftan bir kitap alın.",
    "shelfNote": "Aynı yedi cildi etkileşimli kütüphanede keşfedin.",
    "activate": "3B kütüphaneye girin",
    "exit": "Kataloga dönün",
    "pause": "Dekoratif hareketi duraklat",
    "play": "Dekoratif hareketi sürdür",
    "shelfLoading": "Kütüphane hazırlanıyor…",
    "shelfFailed": "Etkileşimli kütüphane yüklenemedi. Tüm ciltler katalogda kullanılabilir.",
    "boundary": "İtalya–Türkiye ticari koordinasyonu, kapsamı belirlenmiş ayrı bir hizmettir. Düzenlemeye tabi hukuk, vergi, muhasebe ve yatırım işleri yetkili uzmanların sorumluluğundadır.",
    "view": "Okuma görünümü",
    "article": "Makale",
    "book": "Kitap",
    "contents": "Bu ciltte",
    "readingFailed": "Kitap görünümü yüklenemedi. Makalenin tamamını aşağıda okuyabilirsiniz.",
    "print": "Makaleyi yazdır / kaydet",
    "offered": "Kapsama dahil olanlar",
    "launchOptimizer": "Sentetik optimizasyon aracını aç",
    "optimizerFailed": "Araç yüklenemedi. Yöntemler, örnekler ve sınırlamalar bu makalede yer alıyor.",
    "simple": "Mesaj yazın",
    "guided": "Rehber soruları kullanın",
    "topic": "Konu",
    "timing": "Zamanlama",
    "regenerate": "Taslağı güncel yanıtlarla değiştir",
    "email": "E-posta taslağını aç",
    "whatsapp": "WhatsApp taslağını aç",
    "outlook": "Outlook taslağını aç",
    "contactIntro": "Aklınızdaki sorunu veya hedeflediğiniz sonucu anlatın. Doğrudan yazabilir veya mesajınızı şekillendirmek için isteğe bağlı birkaç sorudan yararlanabilirsiniz.",
    "messageRequired": "Lütfen bir mesaj yazın.",
    "copyFallback": "E-posta uygulamanız açılmazsa mesajınızı kopyalayıp tercih ettiğiniz uygulamaya yapıştırın.",
    "longDraft": "Bu taslak, uygulama bağlantısı için uzun. Kopyalayıp e-posta veya WhatsApp uygulamanıza yapıştırın.",
    "scene": "Kitap heykelini keşfet",
    "closeScene": "Heykeli kapat",
    "optionalDetails": "Ad, konu ve zamanlama (isteğe bağlı)"
  }
}
```

### /tr/volumes/document-intelligence

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "document-intelligence",
    "kind": "service",
    "href": "/volumes/document-intelligence",
    "motifKey": "brackets",
    "color": "#182a43",
    "foil": "#c87046",
    "palette": {
      "paper": "#1b1613",
      "paperDeep": "#120e0b",
      "paperPale": "#f1eadf",
      "ink": "#f4eee6",
      "inkSoft": "#b9b4ae",
      "wall": "#1b1613",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f4d7b9",
      "fill": "#c2a184"
    },
    "width": 1.02,
    "height": 1.58,
    "depth": 0.26,
    "seed": 11
  },
  "title": "Okunmayan Yığın",
  "discipline": "Belge zekâsı",
  "note": "Kimsenin okumaya vakti olmayan belge — ve darboğaz tek bir kişi.",
  "deck": "Sözleşmeler, faturalar, raporlar, poliçe dosyaları — elle, tek kişiye bağlı ve kişiden kişiye tutarsız biçimde okunuyor. Maliyet nadiren okumanın kendisidir. Maliyet, yenilendikten sonra fark edilen yenileme maddesi ve altı ay sonra kimsenin yeniden kuramadığı karardır.",
  "theme": "Yalnızca bir kişinin eritebildiği bir kuyruk",
  "binding": "Müşteri işi · sınırlanmış pilot",
  "format": "Tek belge türü üzerinde bir iş akışı, kendi örneklerinizle değerlendirilmiş",
  "roman": "I",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "I",
        "discipline": "Belge zekâsı",
        "title": "Okunmayan Yığın",
        "note": "Kimsenin okumaya vakti olmayan belge — ve darboğaz tek bir kişi."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Problem",
        "body": "Ekibinizden biri aynı tür belgeyi tekrar tekrar okuyor: tedarikçi sözleşmeleri, gelen faturalar, poliçe dosyaları, sürdürülebilirlik raporları. Okuma yavaş, kişiden kişiye tutarsız ve aylar sonra bir karar sorgulandığında o belgenin neden öyle değerlendirildiğine dair bir kayıt yok."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Kimin için",
        "body": "Yinelenen bir belge kuyruğu olan ve darboğazı bir kişinin yargısı olan ekipler. En iyi, yanılmanın pahalı olduğu yerlere oturur; orada çıktının hızlı olmaktan çok savunulabilir olması gerekir."
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "Elinize ne geçiyor",
        "lede": "Tek bir belge türü üzerinde sınırlanmış bir iş akışı, okuyabileceğiniz bir değerlendirme ve modelin tek başına karar vermemesi gereken her şey için bir istisna yolu.",
        "items": [
          "Bir belgeyi, her alan için kaynak pasajı saklanmış yapılandırılmış alanlara dönüştüren bir hat.",
          "Ekibinizin etiketlediği bir örnek üzerinde değerlendirme; sistemin inceleyicilerinizle nerede uyuştuğunu ve nerede uyuşmadığını raporlar."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "Elinize ne geçiyor",
        "items": [
          "Bir istisna kuyruğu: bir kişiye yönlendirilen durumlar ve oraya neyin düşeceğini belirleyen kural.",
          "Değerlendirme sırasında bulunan hata biçimlerinin yazılı dökümü."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Kanıt kaydı",
        "body": "Yeşil aklama vaka çalışması bu işin dürüst hâlidir: sürekli bir puan üzerinde uzman yargısını yakından izlerken, işaretlemesi gereken maddelerin çoğunu yine de kaçıran bir dedektör gösterir ve bu birleşimin onu neden bir filtre değil, bir önceliklendirme aracı yaptığını açıklar."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 01",
        "lede": "Belgenin gerçek örneklerine ve ondan verilen karara bakarız; hiçbir şey inşa edilmeden önce “doğru”nun ne demek olduğunu kararlaştırırız.",
        "items": [
          {
            "term": "Keşif",
            "detail": "Kararı, belge türünü ve doğru çıktının tanımını içeren yazılı bir problem tanımı."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 02",
        "lede": "Tek belge türü, tek iş akışı. Ekibiniz bir örneği etiketler; ben ona karşı geliştirir ve ayrılmış örnekler üzerinde değerlendiririm.",
        "items": [
          {
            "term": "Sınırlanmış pilot",
            "detail": "Çalışan bir hat, kendi belgeleriniz üzerinde değerlendirme sonuçları ve istisna inceleme süreci."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 03",
        "lede": "Hat, işin gerçekte yapıldığı yere entegre edilir; inceleme adımı ilk günden yerindedir.",
        "items": [
          {
            "term": "Teslim",
            "detail": "Devreye alınmış iş akışı, çalıştırma kılavuzu ve kalitenin ne zaman sapmaya başladığını gösteren izleme."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 04",
        "lede": "Ekibiniz çalıştırır. Belgeler değiştiğinde nasıl yeniden değerlendirileceğini belgelerim; çünkü değişecekler.",
        "items": [
          {
            "term": "Devir",
            "detail": "Dokümantasyon, değerlendirme düzeneği ve sahiplenecek kişilerle birlikte bir gözden geçirme."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Verinin kaynağı",
        "items": [
          "Zor olanlar dâhil, belgelerin temsili bir örneği.",
          "Doğru çıktının neye benzediğini söyleyebilecek bir kişiye erişim.",
          "İnceleyicilerinizden bir örneği etiketlemek için zaman — asıl kısıt genelde budur.",
          "Altyapınızdan neyin çıkabileceği ve neyin çıkamayacağı konusunda netlik."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "Kapsama dahil olanlar",
        "items": [
          "Tanımlı bir belge türü üzerinde çıkarım, sınıflandırma, sıralama ve yönlendirme.",
          "Ekibinizin ürettiği etiketlere karşı değerlendirme.",
          "İstisna süreci ve bir inceleyicinin çalıştığı arayüz."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Sınırlar",
        "items": [
          "Gözetimsiz kararlar. Sonuç doğuran her şeyde döngüde bir insan kalır.",
          "Bir belgenin ne anlama geldiğine dair hukuki, vergisel veya denetim görüşleri.",
          "Elinizdeki her belgeyi işleyen genel amaçlı bir sistem. Pilotlar tek bir türle sınırlanır."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Buna benzer bir probleminiz mi var?",
        "name": "Belge zekâsı pilotu",
        "output": "Sınırlanmış bir iş akışı, kendi belgeleriniz üzerinde değerlendirme sonuçları ve bir istisna inceleme süreci."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "Bu, bugün bunları okuyan kişinin yerini alacak mı?",
        "body": "Hayır ve öyle kurmam. Önce neyi okuyacaklarını değiştirir ve sıralamanın gerekçesini verir. Bu hizmetin arkasındaki araştırma projesinde en iyi dedektör bile bir inceleyicinin işaretleyeceği maddelerin çoğunu kaçırdı — inceleme adımının kalmasının nedeni tam olarak bu."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "Verimiz sistemlerimizden çıkıyor mu?",
        "body": "Bu, varsayılan değil, keşifte verdiğimiz bir karardır. Bazı yaklaşımlar tamamen sizin altyapınızda çalışır; diğerleri barındırılan bir model kullanır, bu da belge metninin o sağlayıcıya gitmesi demektir. Bir yaklaşıma bağlanmadan önce hangisinin gerektiğini size söylerim."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "Doğruluğu ne kadar?",
        "body": "Belgeleriniz ve etiketleriniz olmadan yanıtlanamaz. Bundan önce size söylenen her rakam başkasının verisi hakkındadır. Sizinki için rakamı belirlemek pilotun işidir."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "Değerlendirme yeterince iyi çalışmadığını gösterirse ne olur?",
        "body": "O zaman pilotun sonucu budur ve bunu öğrenmek için sınırlı bir bütçe harcamış olursunuz. Pilotun küçük kapsamlanmasının ve entegrasyondan önce değerlendirilmesinin nedeni bu sonuçtur."
      }
    },
    {
      "id": "stack",
      "block": {
        "kind": "list",
        "heading": "Yaklaşım",
        "items": [
          "Python",
          "spaCy",
          "Hugging Face Transformers",
          "Sentence Transformers",
          "PyTorch",
          "scikit-learn"
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Bir kararı yavaşlatan bir belge kuyruğunuz mu var?",
        "body": "Hangi belge ve hangi karar olduğunu anlatın, pilotun çalıştırmaya değip değmeyeceğini söyleyeyim.",
        "cta": "Belge zekâsı pilotunu konuşalım",
        "href": "/tr/contact?topic=document-intelligence"
      }
    }
  ]
}
```

### /tr/volumes/forecasting

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "forecasting",
    "kind": "service",
    "href": "/volumes/forecasting",
    "motifKey": "paths",
    "color": "#c24d24",
    "foil": "#efc16d",
    "palette": {
      "paper": "#1e1813",
      "paperDeep": "#130f0b",
      "paperPale": "#f4ece1",
      "ink": "#f6efe6",
      "inkSoft": "#c0b3a6",
      "wall": "#1e1813",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f7d9ad",
      "fill": "#c99a6a"
    },
    "width": 1.1,
    "height": 1.46,
    "depth": 0.29,
    "seed": 22
  },
  "title": "Çıplak Sayı",
  "discipline": "Tahmin & finansal analitik",
  "note": "Tek bir rakam; kesinlik gibi sunulmuş, gerçek gibi plana alınmış.",
  "deck": "Şimdi, sonrasına bağlı bir şeye bağlanmanız gerekiyor — stok, nakit, fiyat, kapasite. Tablo tek bir sayı veriyor ve kimse onun ne kadar yanlış olabileceğini söyleyemiyor; dolayısıyla planın içinde acil durum payı yok ve sürpriz tam bedeliyle geliyor.",
  "theme": "Yanılmaya yer bırakmayan bir plan",
  "binding": "Müşteri işi · önce değerlendirme",
  "format": "Bir kıyas karşılaştırması, bir doğrulama yaklaşımı ve bir öneri",
  "roman": "II",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "II",
        "discipline": "Tahmin & finansal analitik",
        "title": "Çıplak Sayı",
        "note": "Tek bir rakam; kesinlik gibi sunulmuş, gerçek gibi plana alınmış."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Problem",
        "body": "Şimdi vermeniz gereken bir karar sonradan olacaklara bağlı — ne kadar stok tutulacağı, nakdin önümüzdeki iki çeyreği karşılayıp karşılamayacağı, bir fiyat değişikliğinin kendini amorti edip etmeyeceği. Buna cevap veren tablo tek bir sayı üretiyor ve o sayının ne kadar yanlış olabileceğini kimse söyleyemiyor."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Kimin için",
        "body": "Belirsizlik altında yinelenen kararlar veren finans ve operasyon ekipleri: talep ve nakit planlaması, fiyatlama, kapasite, yönetim kurulu için senaryo çalışmaları."
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "Elinize ne geçiyor",
        "lede": "Sorgulayabileceğiniz bir model; aşması gereken basit kıyas noktasıyla karşılaştırılmış ve belirsizliği ima edilmek yerine belirtilmiş hâlde.",
        "items": [
          "Aralıklarıyla birlikte bir tahmin ve hiç görmediği dönemlerde nasıl performans gösterdiğini gösteren bir doğrulama.",
          "Naif bir kıyas noktasıyla karşılaştırma; çünkü geçen ayın sayısını geçemeyen bir model bakım yapmaya değmez."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "Elinize ne geçiyor",
        "items": [
          "Varsayımlar, koda gömülü sabitler olarak değil, değiştirebileceğiniz parametreler olarak yazılı.",
          "Daha ileri gitmek, basit tutmak veya durmak konusunda bir öneri."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Kanıt kaydı",
        "body": "Bu sayfadaki portföy optimizasyon aracı yöntemin incelenebilir hâlidir: varsayımlar görünür, görüşler ayarlanabilir ve sonuçlar bir öngörü olarak değil bir dağılım olarak gösterilir. Uydurma sermaye piyasası varsayımlarıyla çalışır ve bunu açıkça söyler — bir piyasanın ne yapacağını değil, nasıl kurduğumu gösterir."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 01",
        "lede": "Tahminin hizmet ettiği kararı ve gerçekte ne kadar doğruluk gerektirdiğini belirleriz. Genelde beklenenden az.",
        "items": [
          {
            "term": "Keşif",
            "detail": "Karar, sıklığı ve onu değiştirecek doğruluk düzeyi — yazılı olarak."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 02",
        "lede": "Naif bir tahminin sizin geçmişinizde ne başardığını belirler, ardından daha ayrıntılı bir şeyin onu geçip geçmediğini sınarım.",
        "items": [
          {
            "term": "Kıyas & değerlendirme",
            "detail": "Bir kıyas karşılaştırması, bir doğrulama yaklaşımı ve önerilen bir sonraki adım."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 03",
        "lede": "Seçilen model, ekibinizin çalıştırabileceği yerde kurulur; aralıklar gizlenmek yerine öne çıkarılır.",
        "items": [
          {
            "term": "Teslim",
            "detail": "Model, arayüzü ve içindeki her varsayımın dokümantasyonu."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 04",
        "lede": "Yeniden doğrulama devrin bir parçasıdır: modelin ne zaman çalışmayı bıraktığı nasıl anlaşılır.",
        "items": [
          {
            "term": "Devir",
            "detail": "Çalıştırma kılavuzu, yeniden doğrulama yordamı ve bunu destekleyen izleme."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Verinin kaynağı",
        "items": [
          "Kararın verildiği ayrıntı düzeyinde, bilinen boşluklarıyla birlikte geçmiş veri.",
          "Kararın kendisi ve onu kimin verdiği.",
          "Sonucun içinden geçtiği yapısal kurallar — vergi dilimleri, kademeler, sözleşme koşulları, eşikler.",
          "Geçmişteki bilinen tek seferlik olaylar; böylece örüntü olarak öğrenilmezler."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "Kapsama dahil olanlar",
        "items": [
          "Zaman serisi tahmini, senaryo modelleme, duyarlılık ve stres analizi.",
          "Kıyas karşılaştırması ve örneklem dışı doğrulama.",
          "Varsayımları açıkta olan finansal modeller."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Sınırlar",
        "items": [
          "Piyasa fiyatı öngörüleri ve bir tahminin belirsizliği ortadan kaldırdığı imasının her türlüsü.",
          "Yatırım tavsiyesi, portföy yönetimi veya her türlü alım satım.",
          "Garantili doğruluk. Neyin başarılabileceği doğrulamayla belirlenir, önceden vaat edilmez."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Buna benzer bir probleminiz mi var?",
        "name": "Tahmin değerlendirmesi",
        "output": "Bir kıyas karşılaştırması, bir doğrulama yaklaşımı ve önerilen bir sonraki adım."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "Tahmin ne kadar doğru olacak?",
        "body": "Sizin geçmişiniz üzerinde doğrulanmadan bilinemez. Değerlendirme bunu dürüstçe yanıtlamak için vardır ve bazen yanıt, basit bir kıyas noktasının zaten yeterli olduğu ve fazlası için para ödememeniz gerektiğidir."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "Dağınık ve eksik bir geçmişimiz var. Bu diskalifiye eder mi?",
        "body": "Hayır, ama neyin başarılabileceğini değiştirir ve bunu erken duymalısınız. Verinin neyi destekleyip desteklemeyeceğini belirlemek değerlendirmenin bir parçasıdır."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "Hisse fiyatımızı veya bir piyasayı tahmin edebilir misiniz?",
        "body": "Hayır. Bu işi almıyorum ve bunu güvenle teklif eden biri size kendisi hakkında bir şey söylüyordur."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "Neden bir aralık göstermekte ısrar ediyorsunuz?",
        "body": "Çünkü karar açısından anlamlı olan kısım aralıktır. Tek bir sayı, içinde acil durum planı olmayan bir plana davetiye çıkarır."
      }
    },
    {
      "id": "stack",
      "block": {
        "kind": "list",
        "heading": "Yaklaşım",
        "items": [
          "Python",
          "pandas",
          "statsmodels",
          "scikit-learn",
          "PyTorch",
          "SQL"
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Bir tahmine bağlı bir karar mı veriyorsunuz?",
        "body": "Kararı ve elinizdeki veriyi anlatın, gerçekçi olarak neyin başarılabileceğini söyleyeyim.",
        "cta": "Tahmin değerlendirmesini konuşalım",
        "href": "/tr/contact?topic=forecasting"
      }
    }
  ]
}
```

### /tr/volumes/reporting

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "reporting",
    "kind": "service",
    "href": "/volumes/reporting",
    "motifKey": "caret",
    "color": "#afc400",
    "foil": "#171a16",
    "palette": {
      "paper": "#1c1a11",
      "paperDeep": "#12110a",
      "paperPale": "#eef0e2",
      "ink": "#f1f3e8",
      "inkSoft": "#b5bba7",
      "wall": "#1c1a11",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f2e4b4",
      "fill": "#b0a377"
    },
    "width": 0.92,
    "height": 1.52,
    "depth": 0.22,
    "seed": 33
  },
  "title": "Bir Haftalık Ay",
  "discipline": "İş zekâsı & raporlama",
  "note": "İki departman, iki ciro rakamı ve çoktan geçmiş bir toplantı.",
  "deck": "Sayılar birkaç sistemden elle birleştiriliyor. Günler sürüyor, iki ekip aynı ay için farklı rakam söylüyor ve rapor hazır olduğunda kurulduğu karar çoktan sezgiyle verilmiş oluyor.",
  "theme": "Her ay, kimsenin güvenmediği sayılar için bir haftalık nitelikli zaman",
  "binding": "Müşteri işi · önce tanılama",
  "format": "Kaynak veri değerlendirmesi, yazılı KPI tanımları, raporlama öncelikleri",
  "roman": "III",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "III",
        "discipline": "İş zekâsı & raporlama",
        "title": "Bir Haftalık Ay",
        "note": "İki departman, iki ciro rakamı ve çoktan geçmiş bir toplantı."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Problem",
        "body": "Parçalı aylık raporlamayı tek bir güvenilir yönetim görünümüyle değiştirin. Şu anda sayılar birkaç sistemden elle birleştiriliyor, iki departman aynı ay için farklı rakamlar söylüyor ve rapor hazır olduğunda kurulduğu toplantı çoktan geçmiş oluyor."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Kimin için",
        "body": "Elektronik tabloları aşmış ama kurumsal bir veri platformuna ihtiyacı olmayan — ve almaması gereken — işletme sahipleri ve finans yöneticileri."
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "Elinize ne geçiyor",
        "lede": "Herkesin üzerinde uzlaştığı küçük bir ölçüt kümesi; her seferinde aynı şekilde ve mutabakatı yapılmış kaynaklardan hesaplanıyor.",
        "items": [
          "Kaynak verinizin değerlendirmesi: neye güvenilir, ne çelişiyor ve ne eksik.",
          "Yazılı KPI tanımları — her biri için tam hesap ve kaynak; böylece iki kişi farklı hesaplayamaz.",
          "Bu tanımlar üzerine kurulmuş, elle değil bir programa göre yenilenen bir raporlama görünümü."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "Elinize ne geçiyor",
        "items": [
          "Bir sistemin eskiden raporladığından farklı çıkan her rakamı açıklayan mutabakat notları."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Kanıt kaydı",
        "body": "Arkasında en az yayımlanmış kanıt bulunan hizmet budur ve bunu şişirmektense söylemeyi tercih ederim. Gösterebileceğim şey yaklaşımdır: demo portalı aynı ilkeyi tek bir tabloya uygular; toplama güvenmenizi istemek yerine her rakamı geldiği satırlarla birlikte açığa çıkarır."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 01",
        "lede": "Ekibinizin vermesi gereken kararları belirleyerek başlayın, sonra geriye doğru çalışıp onları besleyecek en küçük ölçüt kümesine ulaşın.",
        "items": [
          {
            "term": "Keşif",
            "detail": "Bir karar listesi ve bilinçli olarak kısa tutulmuş bir aday ölçüt kümesi."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 02",
        "lede": "Kaynak verinin mutabakatını yapar ve sistemlerin nerede ayrıştığını bulurum. Asıl problem genellikle burada çıkar.",
        "items": [
          {
            "term": "Tanılama",
            "detail": "Kaynak veri değerlendirmesi, KPI tanımları ve raporlama öncelikleri."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 03",
        "lede": "Görünüm, uzlaşılan tanımlar üzerine kurulur; yenileme otomatikleştirilir ve veri soyağacı görünür kılınır.",
        "items": [
          {
            "term": "Teslim",
            "detail": "Raporlama görünümü, veri hattı ve her tanımın dokümantasyonu."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 04",
        "lede": "Ekibiniz sahiplenir; buna, üzerinde uzlaşılmışları bozmadan yeni bir ölçüt eklemenin nasıl yapılacağı da dâhildir.",
        "items": [
          {
            "term": "Devir",
            "detail": "Dokümantasyon, bir gözden geçirme ve bir tanımı değiştirme yordamı."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Verinin kaynağı",
        "items": [
          "Sayıların geldiği sistemlere salt okunur erişim.",
          "Şu anda raporu kim birleştiriyorsa o kişi — cesetlerin nerede gömülü olduğunu bilir.",
          "Ne kadar kusurlu olursa olsun mevcut rapor paketi.",
          "İki departman anlaşamadığında bir ölçütün ne anlama geldiğini karara bağlayabilecek bir karar verici."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "Kapsama dahil olanlar",
        "items": [
          "Kaynak mutabakatı, ölçüt tanımı, veri hattı ve raporlama görünümleri.",
          "Şu anda elle birleştirilen bir raporun otomatikleştirilmesi.",
          "Bir rakamın kaynak satırlarına kadar izlenebilir kılınması."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Sınırlar",
        "items": [
          "Muhasebe veya ERP sisteminizin değiştirilmesi.",
          "Mali müşavirinize ait olan yasal veya düzenleyici raporlama.",
          "Kendisi için var olan bir pano. Kararlar buna ihtiyaç duymuyorsa bunu söylerim."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Buna benzer bir probleminiz mi var?",
        "name": "Raporlama tanılaması",
        "output": "Bir kaynak veri değerlendirmesi, KPI tanımları ve raporlama öncelikleri."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "Zaten kimsenin bakmadığı panolarımız var. Bunun farkı ne?",
        "body": "Onlar genelde bir karardan değil, verinin neyi gösterebileceğinden yola çıkar. Karardan başlamak, ölçüt kümesini bakımı yapılabilecek kadar küçük ve açılmaya değecek kadar ilgili tutan şeydir."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "Hangi aracı kullanacaksınız?",
        "body": "İşe yaradığı sürece elinizde ne varsa onu. Yeni bir platform getirmek sonrasında ekibinizin taşıdığı bir maliyettir; dolayısıyla benim ona aşinalığımdan öte bir gerekçesi olmalı."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "İki sistemimiz ciro konusunda anlaşmıyor. Bunu düzeltebilir misiniz?",
        "body": "Nerede ayrıştıklarını bulup tam olarak belgeleyebilirim. Hangisinin doğru olduğuna karar vermek bir iş yargısıdır ve sizde kalır."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "Bu yasal raporlama mı?",
        "body": "Hayır. Bu, iç kararlar için yönetim raporlamasıdır. Yasal beyanlar mali müşavirinizde kalır."
      }
    },
    {
      "id": "stack",
      "block": {
        "kind": "list",
        "heading": "Yaklaşım",
        "items": [
          "SQL",
          "Python",
          "Power BI",
          "KNIME",
          "Excel"
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Her ayın ilk haftasını rapor birleştirerek mi geçiriyorsunuz?",
        "body": "Hangi kararları beslediğini ve sayıların nereden geldiğini anlatın.",
        "cta": "Raporlama tanılamasını konuşalım",
        "href": "/tr/contact?topic=reporting"
      }
    }
  ]
}
```

### /tr/volumes/cross-border

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "cross-border",
    "kind": "service",
    "href": "/volumes/cross-border",
    "motifKey": "orbits",
    "color": "#1537a1",
    "foil": "#dbe8f1",
    "palette": {
      "paper": "#1a1614",
      "paperDeep": "#110e0c",
      "paperPale": "#e8eef6",
      "ink": "#eef3f9",
      "inkSoft": "#adb8c9",
      "wall": "#1a1614",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f4dcc0",
      "fill": "#b08f74"
    },
    "width": 1.08,
    "height": 1.68,
    "depth": 0.25,
    "seed": 44
  },
  "title": "İki Kural Kitabı",
  "discipline": "Sınır ötesi danışmanlık · İtalya & Türkiye",
  "note": "Aynı anda iki düzenleyici sistem. Pahalı hata, hangi soruyu soracağını bilmemektir.",
  "deck": "İtalya ile Türkiye arasında iş yapmak, aynı anda iki düzenleyici sistem, iki dil ve iki meslek normları kümesi demektir. Para kaybettiren şey nadiren görünür adımdır — belirli bir adımın yasal olarak hangi meslek mensubunu gerektirdiğini bilmemek ve bunu geç öğrenmektir.",
  "theme": "Kimsenin başlamadığı bir adımda tıkanmış bir süreç",
  "binding": "Koordinasyon · düzenlemeye tabi iş dışarı yönlendirilir",
  "format": "Doğrulanmış kapsam, sorumluluk haritası ve gereken meslek mensupları",
  "roman": "IV",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "IV",
        "discipline": "Sınır ötesi danışmanlık · İtalya & Türkiye",
        "title": "İki Kural Kitabı",
        "note": "Aynı anda iki düzenleyici sistem. Pahalı hata, hangi soruyu soracağını bilmemektir."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Problem",
        "body": "İtalya ile Türkiye arasında iş yapmak, aynı anda iki düzenleyici sistem, iki dil ve iki meslek normları kümesiyle uğraşmak demektir. Pahalı hatalar nadiren görünür olanlardır — hangi soruların sorulacağını ya da belirli bir adım için hangi meslek mensubunun yasal olarak gerektiğini bilmemekten doğarlar."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Kimin için",
        "body": "İtalyan ve Türk pazarları arasında hareket eden ve bağlanmadan önce zemini haritalandırması gereken şirketler ve kurucular."
      }
    },
    {
      "id": "boundary",
      "block": {
        "kind": "prose",
        "heading": "Sınırlar",
        "body": "İtalya’da şirket kuruluşu, vergi yapılandırması, hukuki danışmanlık ve yasal muhasebe lisanslı meslek mensuplarına ayrılmıştır. Bu hizmetler burada verilmez. Verilen şey, bunların etrafındaki kapsamlama ve koordinasyon ile bunları yapmaya yetkili kişilerle tanıştırmadır."
      }
    },
    {
      "id": "responsibilities-1",
      "block": {
        "kind": "pairs",
        "heading": "Benim rolüm",
        "items": [
          {
            "term": "Bizzat yaptıklarım",
            "detail": "Kapsamlama, sıralama, koordinasyon ve taraflar arasında ticari ile kültürel çeviri."
          },
          {
            "term": "Alvolo Consulting’in yaptıkları",
            "detail": "Alvolo Consulting, bu koridordaki iş için kurduğum danışmanlık pratiğidir. Uygun araç olduğunda işler onun üzerinden yürür."
          }
        ]
      }
    },
    {
      "id": "responsibilities-2",
      "block": {
        "kind": "pairs",
        "heading": "Benim rolüm",
        "items": [
          {
            "term": "Lisanslı meslek mensubunun yaptıkları",
            "detail": "Noter işlemleri, şirket kuruluş tescilleri, vergi danışmanlığı ve görüşleri, hukuki danışmanlık, yasal muhasebe ve denetim. Bunlar, doğrudan ilişki kurduğunuz nitelikli meslek mensuplarınca yapılır — asla benim tarafımdan değil."
          }
        ]
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "Elinize ne geçiyor",
        "lede": "Durumunuzun gerçekte neyi gerektirdiğine, her parçayı yapmaya kimin yetkili olduğuna ve neyi kapsayacağına dair net bir tablo — hiçbirine bağlanmadan önce.",
        "items": [
          "Yazılı bir kapsam: ne yapmaya çalıştığınız ve bunun hangi adımlara ayrıldığı.",
          "Hangi adımların lisanslı bir meslek mensubu gerektirdiğini, hangilerinin gerektirmediğini adlandıran bir sorumluluk haritası."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "Elinize ne geçiyor",
        "items": [
          "Düzenlemeye tabi her adımın ihtiyaç duyduğu nitelikli meslek mensuplarıyla tanıştırma.",
          "Sıra ve bağımlılıklar; böylece hiçbir şey kimsenin başlamadığı bir adımı bekleyerek tıkanmaz."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Kanıt kaydı",
        "body": "Bu, danışmanlık ve koordinasyon işidir ve arkasındaki işler özeldir. Bu sitede buna dair bir vaka çalışması yok; bu boşluğu doğrulanamayacak bir şeyle doldurmaktansa görünür bırakmayı tercih ederim."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 01",
        "lede": "Kimse yapılardan söz etmeden önce ticari olarak neyi başarmaya çalıştığınızı anlamak.",
        "items": [
          {
            "term": "Keşif",
            "detail": "Ticari hedefin ve üzerindeki kısıtların yazılı beyanı."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 02",
        "lede": "Hedefi adımlara ayırmak ve hangilerinin hangi ülkede lisanslı bir meslek mensubu gerektirdiğini belirlemek.",
        "items": [
          {
            "term": "Kapsamlama",
            "detail": "Doğrulanmış kapsam, sorumluluklar ve gerekli meslek ortakları."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 03",
        "lede": "Doğru meslek mensuplarını tanıştırmak, sırayı akışta tutmak ve taraflar arasında dilsel ve ticari çeviri yapmak.",
        "items": [
          {
            "term": "Koordinasyon",
            "detail": "Adlandırılmış sahipleri ve herkesin görebildiği bir sırası olan etkin bir iş akışı."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Süreç · 04",
        "lede": "Düzenlemeye tabi işi yapan meslek mensuplarıyla doğrudan ilişkiler sizde olur. Bu bir yan etki değil, asıl amaçtır.",
        "items": [
          {
            "term": "Devir",
            "detail": "Doğrudan ilişkiler ve neyin neden kararlaştırıldığının kaydı."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Verinin kaynağı",
        "items": [
          "Ticari olarak neyi, ne zamana kadar başarmak istediğiniz.",
          "Varsa mevcut şirket yapınız.",
          "İki ülkede hâlihazırda sahip olduğunuz meslek ilişkileri.",
          "Karmaşıklık iştahınız — bazı yapılar yasaldır ama yine de yükü değmez."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "Kapsama dahil olanlar",
        "items": [
          "Sınır ötesi bir projenin kapsamlanması, sıralanması ve koordinasyonu.",
          "Belirli bir adımın hangi düzenlemeye tabi meslek mensubunu gerektirdiğinin belirlenmesi.",
          "Taraflar arasında ticari ve kültürel çeviri."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Sınırlar",
        "items": [
          "Vergi danışmanlığı, hukuki danışmanlık, noter işlemleri, yasal muhasebe ve şirket kuruluş tescilleri. Bunlar lisanslı meslek mensuplarına ayrılmıştır ve burada yapılmaz.",
          "Yatırım tavsiyesi ve düzenlemeye tabi her türlü finansal hizmet.",
          "Belirli bir vergi veya hukuk sonucunun elde edileceğine dair her türlü beyan."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Buna benzer bir probleminiz mi var?",
        "name": "Sınır ötesi keşif",
        "output": "Doğrulanmış bir kapsam, bir sorumluluk haritası ve belirlenmiş gerekli meslek ortakları."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "İtalyan şirketimi kurabilir misiniz?",
        "body": "Hayır. İtalya’da şirket kuruluşu, lisanslı meslek mensuplarına ayrılmış noter işlemleri ve tescilleri içerir. Durumunuzun neyi gerektirdiğini kapsamlayabilir, hangi meslek mensuplarının gerektiğini söyleyebilir ve işi koordine edebilirim — bu, onu yapmaktan farklı ve daha dar bir şeydir."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "Vergi durumum hakkında danışmanlık verebilir misiniz?",
        "body": "Hayır. Vergi danışmanlığı düzenlemeye tabidir ve nitelikli bir commercialista ya da vergi avukatına aittir. Doğru soruların onlara ulaşmasını ve yanıtlarının iki tarafta da anlaşılmasını sağlayabilirim."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "O hâlde size ne için ödeme yapıyorum?",
        "body": "Projenin gerçekte nelerden oluştuğunu, her adımın hangi meslek mensubunu gerektirdiğini ve iki dil ile iki sistem arasında bir süreci nasıl akışta tutacağınızı bilmek için. Bu koordinasyondur ve sınırları konusunda net olmaya değer."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "Bir sonuç garanti ediyor musunuz?",
        "body": "Hayır. Size karşı dürüst olabilecek konumdaki hiç kimse etmez; buradaki sonuçlar ikimizin de kontrol etmediği kurumlara ve meslek mensuplarına bağlıdır."
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "İtalya ile Türkiye arasında bir iş mi taşıyorsunuz?",
        "body": "Ne yapmak istediğinizi anlatın, bunun gerçekte neyi kapsadığını söyleyeyim — başka yere yönlendireceğim kısımlar dâhil.",
        "cta": "Sınır ötesi keşfi konuşalım",
        "href": "/tr/contact?topic=cross-border"
      }
    }
  ]
}
```

### /tr/volumes/greenwashing-risk-scoring

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "greenwashing-risk-scoring",
    "kind": "evidence",
    "href": "/volumes/greenwashing-risk-scoring",
    "motifKey": "modules",
    "color": "#c83222",
    "foil": "#efb0aa",
    "palette": {
      "paper": "#1e1514",
      "paperDeep": "#140d0c",
      "paperPale": "#f6e9e6",
      "ink": "#f8eeec",
      "inkSoft": "#c5aeaa",
      "wall": "#1e1514",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f7cfc6",
      "fill": "#c08278"
    },
    "width": 1,
    "height": 1.48,
    "depth": 0.3,
    "seed": 55
  },
  "title": "Taşan İddia",
  "discipline": "Araştırma · belge zekâsı",
  "note": "Taahhüdü aşan bir iddia. 29 iddia üzerinde ölçüldü — ve çoğunu kaçırıyor.",
  "deck": "Çevre iddialarını, dilin taahhüdün ne kadar önüne geçtiğine göre sıralayan bir dedektör. Uzman yargısını yakından izliyor — Pearson 0,906 — ve yine de bir inceleyicinin işaretleyeceğinin en iyi ihtimalle %40’ını buluyor. Burada yayımlanmasının nedeni, nasıl kullanılabileceğine karar veren şeyin bu ikinci sayı olması.",
  "theme": "Savunulabilir bir sırası olmayan bir okuma kuyruğu",
  "binding": "Araştırma · yayımlanmış depo",
  "format": "İddia başına puanlar, bir doğrulama düzeneği ve başarısız olan sayılar",
  "roman": "V",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "V",
        "discipline": "Araştırma · belge zekâsı",
        "title": "Taşan İddia",
        "note": "Taahhüdü aşan bir iddia. 29 iddia üzerinde ölçüldü — ve çoğunu kaçırıyor."
      }
    },
    {
      "id": "maturity",
      "block": {
        "kind": "prose",
        "heading": "Araştırma",
        "body": "Yayımlanmış bir ürünü olan araştırma çalışması. Kurulmadı ve kimse kullanmıyor."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Problem",
        "body": "Kurumsal raporları okuyan bir sürdürülebilirlik analisti, hangi çevre iddiasının sorgulanmaya değer olduğuna karar vermek zorundadır. Önemli olan iddialar nadiren açıkça yanlıştır; spesifik olmaları gereken yerde muğlaktırlar. Bu okuma yavaş, özneldir ve iki analist anlaşmazlığa düştüğünde savunulması zordur."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Kimin için",
        "body": "Sürdürülebilirlik ve ESG analistleri ile bir iddianın neden yükseltildiğini gerekçelendirmek zorunda olan risk ekipleri."
      }
    },
    {
      "id": "context",
      "block": {
        "kind": "prose",
        "heading": "Bağlam",
        "body": "Bocconi’deki yüksek lisans tezim olarak başladı ve doğrulama düzeneği olan çalışır bir kod tabanına dönüştü. Bu bir araştırmadır: hiçbir müşteriye kurulmadı ve üretimde kullanıcısı yok."
      }
    },
    {
      "id": "role",
      "block": {
        "kind": "prose",
        "heading": "Benim rolüm",
        "body": "Sistemin tamamını ben tasarladım ve yazdım — iddia çıkarımı, puanlama bileşenleri, uzman değerlendirmelerini toplamak için kullanılan anket ve aşağıdaki sayıları üreten doğrulama betikleri."
      }
    },
    {
      "id": "data",
      "block": {
        "kind": "prose",
        "heading": "Verinin kaynağı",
        "body": "Kamuya açık kurumsal iletişim metinlerinden çıkarılan çevre iddiaları. Referans değerlendirmeler, yapılandırılmış bir anketle toplanan ve kodla birlikte depoda saklanan insan yargılarıdır."
      }
    },
    {
      "id": "constraints",
      "block": {
        "kind": "prose",
        "heading": "Kısıtlar",
        "body": "Yirmi dokuz değerlendirilmiş iddiadan oluşan bir referans küme. Ayrılabilen uzman değerlendirme süresinin dürüst sınırı buydu ve buradan çıkarılan her sonucu kısıtlıyor."
      }
    },
    {
      "id": "approach-1",
      "block": {
        "kind": "list",
        "heading": "Yaklaşım",
        "items": [
          "Belgeyi bütün olarak puanlamak yerine spaCy ile ayrı çevre iddialarını çıkarmak; böylece bir puan her zaman bir cümleye kadar izlenebilir.",
          "Her iddiayı birkaç bileşen üzerinden puanlamak — tanıtım dilinin sözcüksel yoğunluğu, ClimateBERT ile anlamsal spesifiklik, Sentence Transformers ile bilinen anlatı kalıplarına benzerlik — ve bunları tek bir yapılandırma dosyasındaki ağırlıklarla birleştirmek."
        ]
      }
    },
    {
      "id": "approach-2",
      "block": {
        "kind": "list",
        "heading": "Yaklaşım",
        "items": [
          "Yalnızca doğrulukla değil, korelasyon ve hata ölçütleriyle doğrulamak; çünkü ölçülen büyüklük bir sınıf değil, bir risk derecesidir.",
          "Yalnızca en iyi görüneni raporlamak yerine üç dedektör sürümünü aynı küme üzerinde yan yana tutmak."
        ]
      }
    },
    {
      "id": "decisions-1",
      "block": {
        "kind": "pairs",
        "heading": "Önem taşıyan kararlar",
        "items": [
          {
            "term": "İkili doğruluktan önce, sürekli uzman değerlendirmelerine karşı korelasyon ve hata raporlandı.",
            "detail": "Yeşil aklama riski bir derece meselesidir. Önce ikilileştirmek, modelin uzman yargısını iyi izlerken yine de zayıf bir filtre olduğunu gizlerdi."
          }
        ]
      }
    },
    {
      "id": "decisions-2",
      "block": {
        "kind": "pairs",
        "heading": "Önem taşıyan kararlar",
        "items": [
          {
            "term": "Bir transformer sürümü mevcut olmasına rağmen basit sözcüksel sürüm (v1) referans model olarak korundu.",
            "detail": "Anlamsal sürüm (v2) daha kötü korele oldu — v1’in 0,906’sına karşı 0,557 — ve emekliye ayrıldı. Daha gelişmiş mimariyi kullanmak daha iyi bir hikâye, daha kötü bir araç üretirdi."
          }
        ]
      }
    },
    {
      "id": "decisions-3",
      "block": {
        "kind": "pairs",
        "heading": "Önem taşıyan kararlar",
        "items": [
          {
            "term": "v3, kesinlik 1,00’de tutulurken duyarlılığa doğru ayarlandı.",
            "detail": "Yanlış alarm veren bir inceleme aracı, sessiz kalan birine göre güveni çok daha hızlı tüketir. Atlanan maddeler okunarak telafi edilebilir; yanlış bir suçlama edilemez."
          }
        ]
      }
    },
    {
      "id": "figure",
      "block": {
        "kind": "figure",
        "heading": "Şekil",
        "slug": "greenwashing-risk-scoring",
        "caption": "Değerlendirilen 29 iddia için dedektör puanına karşı uzman değerlendirmesi ve üç dedektör sürümünün karşılaştırması. Deponun doğrulama çıktısından yeniden üretildi, 29 Ocak 2026.",
        "alt": "29 iddia üzerinde üç dedektör sürümünün uzman değerlendirmeleriyle karşılaştırılması. Sürüm 1, Pearson 0,906 korelasyon ve 0,206 ortalama mutlak hata ile en yüksek uyuma sahip; sürüm 3, 0,256 hata ile 0,793’e ulaşıyor; sürüm 2 ise 0,557 ile en zayıfı ve emekliye ayrıldı. İkili işaretlemede sürüm 1 işaretlenebilir iddiaların %15’ini, sürüm 3 ise %40’ını yakalıyor; ikisi de %100 kesinlikte.",
        "synthetic": false
      }
    },
    {
      "id": "baseline",
      "block": {
        "kind": "prose",
        "heading": "Kıyas noktası",
        "body": "İki iç karşılaştırma: bir anahtar kelime yoğunluğu dedektörü ve aynı iddialar üzerinde puanlanan önceki v1 ile v2 dedektörleri. Bu görev için karşılaştırılacak yayımlanmış harici bir kıyas ölçütü yoktur."
      }
    },
    {
      "id": "evaluation",
      "block": {
        "kind": "prose",
        "heading": "Nasıl değerlendirildi",
        "body": "Her dedektör sürümü aynı 29 insan değerlendirmeli iddia üzerinde puanlanır. Sürekli uyum Pearson, Spearman ve Kendall korelasyonları ile MAE ve RMSE üzerinden; işaretle/işaretleme davranışı kesinlik, duyarlılık ve F1 ile ölçülür. İnsan tavanının görünür olması için değerlendiriciler arası güvenilirlik de raporlanır. Yayımlanan rakamlar 29 Ocak 2026’da yeniden çalıştırılıp aynen üretildi."
      }
    },
    {
      "id": "results",
      "block": {
        "kind": "list",
        "heading": "Sonuçlar",
        "items": [
          "v1 dedektörü uzman değerlendirmelerini yakından izliyor: Pearson r = 0,906, Spearman 0,811, MAE 0,206.",
          "Bir işaretleme aracı olarak zayıf. v1 işaretlenebilir iddiaların %15’ini yakalıyor; ayarlanmış kural tabanlı v3 ise F1 0,571 ile %40’a ulaşıyor.",
          "Bu küme üzerinde hiçbir sürüm yanlış pozitif üretmedi — kesinlik 1,00 — ancak yirmi dokuz maddede bu, yöntemin bir özelliği değil, bir avuç doğru karardır.",
          "İnsan değerlendiriciler Krippendorff α = 0,69 düzeyinde anlaştı; bu, herhangi bir modelin karşısında ölçüldüğü tavandır."
        ]
      }
    },
    {
      "id": "deliverables",
      "block": {
        "kind": "list",
        "heading": "Teslim edilenler",
        "items": [
          "Bir belgeyi, katkıda bulunan bileşenleri açıkta bırakarak iddia başına puanlara dönüştüren bir Python paketi.",
          "Yayımlanan her ölçütü saklanan değerlendirmelerden yeniden üreten bir doğrulama düzeneği.",
          "Algoritmayı, dedektör sürümlerini ve performans karşılaştırmasını kapsayan yazılı raporlar."
        ]
      }
    },
    {
      "id": "consequences",
      "block": {
        "kind": "prose",
        "heading": "Pratikte neyi değiştiriyor",
        "body": "Amaçlandığı gibi kullanıldığında kuyruğu boşaltmaz, kısaltır: analist en yüksek puanlı iddiaları önce okur ve sıralamayı açıklarken gösterebileceği bir bileşen dökümüne sahip olur. Sonunda bir insan tarafından okunması gereken iddia sayısını azaltmaz."
      }
    },
    {
      "id": "limitations",
      "block": {
        "kind": "list",
        "heading": "Sınırlar",
        "items": [
          "Yirmi dokuz değerlendirilmiş iddia. Buradaki her rakam geniş bir belirsizlik taşır ve hiçbiri yeniden değerlendirilmeden yeni bir derlemeye genellenemez.",
          "Puan bir sıralama sinyalidir. Kalibre edilmiş bir olasılık değildir ve yüksek bir puan, bir şirketin yeşil aklama yaptığı bulgusu değildir.",
          "En iyi durumda 0,40 duyarlılık. İşaretlenebilir iddiaların çoğu hâlâ atlanıyor.",
          "Yalnızca İngilizce kurumsal iletişim metinleri üzerinde değerlendirildi.",
          "Puanlama ağırlıkları, karşısında raporlandıkları aynı küçük küme üzerinde ayarlandı; dolayısıyla rakamlar iyimserdir."
        ]
      }
    },
    {
      "id": "human-review",
      "block": {
        "kind": "prose",
        "heading": "İnsan incelemesi",
        "body": "Her puan, bir sonuca ulaşmadan önce bir kişi tarafından incelenir. Sistem sıralar ve açıklar; bir şirket hakkında asla hüküm vermez."
      }
    },
    {
      "id": "evidence-1",
      "block": {
        "kind": "evidence",
        "heading": "Kanıt kaydı · 01",
        "lede": "Yukarıda geçen her rakam; kaynağı ve size söylemedikleriyle birlikte.",
        "entries": [
          {
            "metric": "Evaluation set",
            "value": "29 claims",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Environmental claims extracted from corporate communications and rated for greenwashing risk by human reviewers, forming the reference set the detector is scored against. Human expert ratings collected via a structured questionnaire, then used as ground truth.",
            "asOf": "2026-01-29",
            "limitations": "Twenty-nine items is a small evaluation set. Every figure derived from it carries wide uncertainty and none of it should be read as a population estimate."
          }
        ]
      }
    },
    {
      "id": "evidence-2",
      "block": {
        "kind": "evidence",
        "heading": "Kanıt kaydı · 02",
        "lede": "",
        "entries": [
          {
            "metric": "Krippendorff's α",
            "value": "0.69",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Agreement between the human raters who produced the reference ratings. Krippendorff's alpha across raters; pairwise agreement ≈ 0.852.",
            "asOf": "2026-01-29",
            "limitations": "α = 0.69 is substantial but not strong agreement: the humans themselves disagree on roughly a third of the signal, which caps how well any model can be expected to match them."
          }
        ]
      }
    },
    {
      "id": "evidence-3",
      "block": {
        "kind": "evidence",
        "heading": "Kanıt kaydı · 03",
        "lede": "",
        "entries": [
          {
            "metric": "Pearson r (v1)",
            "value": "0.906",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Correlation between the v1 detector score and the human reference rating, over the 29-claim set. Pearson correlation on continuous scores. Spearman 0.811, Kendall 0.627, MAE 0.206, RMSE 0.237.",
            "baseline": "v3 rule-based detector, r = 0.793; v2 semantic detector, r = 0.557.",
            "asOf": "2026-01-29",
            "limitations": "Correlation on 29 items. It says the score moves with reviewer judgement, not that the score is calibrated as a probability of greenwashing."
          }
        ]
      }
    },
    {
      "id": "evidence-4",
      "block": {
        "kind": "evidence",
        "heading": "Kanıt kaydı · 04",
        "lede": "",
        "entries": [
          {
            "metric": "Recall / precision (v3)",
            "value": "0.40 recall at 1.00 precision",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Binary flag / no-flag performance of the v3 rule-based detector against the human reference labels. Thresholded score compared with binarised human labels on the same 29-claim set.",
            "baseline": "v1 baseline: recall 0.15 at precision 1.00 (F1 0.261). v3 reaches F1 0.571.",
            "asOf": "2026-01-29",
            "limitations": "Recall of 0.40 means roughly three in five flaggable claims are missed. Precision of 1.00 on a set this small is a handful of correct positives, not a guarantee. The tool is a reviewer aid; it cannot be a filter that runs unattended."
          }
        ]
      }
    },
    {
      "id": "sources",
      "block": {
        "kind": "links",
        "heading": "Kaynak malzeme",
        "items": [
          {
            "label": "Depo",
            "href": "https://github.com/bumincetin/greenwashing-detection",
            "external": true
          },
          {
            "label": "Performans raporu",
            "href": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "external": true
          }
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Buna benzer bir probleminiz mi var?",
        "body": "Neye karar vermeye çalıştığınızı anlatın, bu yaklaşımın uyup uymadığını söyleyeyim. İlgili hizmet: Belge zekâsı.",
        "cta": "Projenizi konuşalım",
        "href": "/tr/contact?topic=document-intelligence"
      }
    }
  ]
}
```

### /tr/volumes/parliamentary-seat-forecast

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "parliamentary-seat-forecast",
    "kind": "evidence",
    "href": "/volumes/parliamentary-seat-forecast",
    "motifKey": "frames",
    "color": "#da3b2f",
    "foil": "#ff8eab",
    "palette": {
      "paper": "#1f1615",
      "paperDeep": "#150e0c",
      "paperPale": "#f7e9ec",
      "ink": "#f9eff1",
      "inkSoft": "#c7adb3",
      "wall": "#1f1615",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f9cdd6",
      "fill": "#c2808f"
    },
    "width": 0.96,
    "height": 1.57,
    "depth": 0.24,
    "seed": 66
  },
  "title": "Eşik Uçurumu",
  "discipline": "Araştırma · tahmin",
  "note": "Bir sonuç bir eşikten geçiyorsa, modellenmesi gereken eşiktir.",
  "deck": "Bir seçimi tahmin problemi olarak ele alan bir lisans tezi. İlginç belirsizlik hiçbir zaman anketlerde değildi — bir eşiğin iki yanındaki puanın kesri cevabı tamamen değiştiren bir kuraldaydı. Vergi dilimleri, kredi sözleşmesi koşulları ve hacim kademeleri de aynı şekilde davranır.",
  "theme": "Asıl önemli kısmı yumuşatarak yok eden bir tahmin",
  "binding": "Araştırma · yayımlanmış depo",
  "format": "Yöntem, verinin kaynağı ve doğruluk iddiası yok; çünkü yayımlanmadı",
  "roman": "VI",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "VI",
        "discipline": "Araştırma · tahmin",
        "title": "Eşik Uçurumu",
        "note": "Bir sonuç bir eşikten geçiyorsa, modellenmesi gereken eşiktir."
      }
    },
    {
      "id": "maturity",
      "block": {
        "kind": "prose",
        "heading": "Araştırma",
        "body": "Yayımlanmış bir ürünü olan araştırma çalışması. Kurulmadı ve kimse kullanmıyor."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Problem",
        "body": "Oy oranı anketleri, insanların bir seçim hakkında gerçekten sorduğu soruyu yanıtlamaz. Barajlı D’Hondt dağıtımı altında oranlardaki küçük değişimler sandalyelerde büyük ve süreksiz değişimler üretir; ilginç belirsizlik anketlerde değil, bu dönüşümde yaşar."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Kimin için",
        "body": "Yöntemsel bir okuyucu kitlesi. Burada siyasi analiz olarak değil, yapısal kurallar altında tahmini nasıl ele aldığıma dair kanıt olarak yayımlanıyor."
      }
    },
    {
      "id": "context",
      "block": {
        "kind": "prose",
        "heading": "Bağlam",
        "body": "Bocconi’de Ekonomi, Yönetim ve Bilgisayar Bilimi lisans tezim; 2023’te tamamlandı. Bir araştırmadır ve o tarihten beri bakımı yapılmamıştır."
      }
    },
    {
      "id": "role",
      "block": {
        "kind": "prose",
        "heading": "Benim rolüm",
        "body": "Tek yazar: veri toplama, modelleme ve tezin yazımı."
      }
    },
    {
      "id": "data",
      "block": {
        "kind": "prose",
        "heading": "Verinin kaynağı",
        "body": "YSK’nın yayımlanmış geçmiş sonuçları, TÜİK’ten demografik ve sosyoekonomik göstergeler, kamuya açık anketler ve idari sınır dosyaları."
      }
    },
    {
      "id": "constraints",
      "block": {
        "kind": "prose",
        "heading": "Kısıtlar",
        "body": "Yalnızca il düzeyinde yayımlanmış veri ve geçmiş isabeti kendi başına belirsiz olan bir anket kaydı — bu da çalışmayı anketleri geçmeye çalışmak yerine dönüşüm kurallarını modellemeye itiyor."
      }
    },
    {
      "id": "approach",
      "block": {
        "kind": "list",
        "heading": "Yaklaşım",
        "items": [
          "İl düzeyinde geçmiş sonuçları toplamak ve demografik ile sosyoekonomik göstergelerle eşleştirmek.",
          "Sandalye dağıtımı seçim çevresi başına gerçekleştiği için oy oranını ulusal değil il düzeyinde modellemek.",
          "Baraj dâhil gerçek sandalye dağıtım kurallarını uygulamak; böylece süreksizlikler yumuşatılmak yerine yeniden üretilir.",
          "Tahminin en duyarlı olduğu yerleri incelemek — bu, dağıtım sınırlarına yakın az sayıda ilde yoğunlaşıyor."
        ]
      }
    },
    {
      "id": "decisions",
      "block": {
        "kind": "pairs",
        "heading": "Önem taşıyan kararlar",
        "items": [
          {
            "term": "Sandalye sayıları üzerinde doğrudan regresyon yerine, dağıtım kuralları üzerinden tahmin yapıldı.",
            "detail": "Sandalye sayıları, oy oranlarının ve kuralların deterministik bir fonksiyonudur. Kural zaten tam olarak bilinirken bu fonksiyonu bir avuç geçmiş seçimden öğrenmek, gürültüye uydurmak olurdu."
          },
          {
            "term": "Analiz il düzeyinde tutuldu.",
            "detail": "Ulusal oy oranındaki bir puanlık hata bazı illerde çok şey ifade eder, bazılarında hiçbir şey."
          }
        ]
      }
    },
    {
      "id": "figure",
      "block": {
        "kind": "figure",
        "heading": "Şekil",
        "slug": "parliamentary-seat-forecast",
        "caption": "Barajlı dağıtım altında oy oranındaki küçük bir değişimin sandalyeleri nasıl hareket ettirdiği. Tez yönteminden çizildi; bir tahmin değil, mekanizmanın gösterimi.",
        "alt": "Sandalye dağıtımını oy oranının bir fonksiyonu olarak gösteren, seçim barajında keskin bir basamak içeren bir grafik: barajın altındaki partiler hiç sandalye almıyor, hemen üstündekiler ise orantısız biçimde çok sandalye kazanıyor. Oran ile sandalye arasındaki ilişki aralığın ortasında düz, sınırlara yakın diktir.",
        "synthetic": false
      }
    },
    {
      "id": "evaluation",
      "block": {
        "kind": "prose",
        "heading": "Nasıl değerlendirildi",
        "body": "Depo, yöntemi ve veri kaynaklarını belgeliyor; ayrılmış küme üzerinde bir doğruluk rakamı raporlamıyor. Yayımlanmış bir rakam olmadığı için burada performans iddiasında bulunulmuyor; sonradan bir rakam uydurmak ölçüm olmazdı."
      }
    },
    {
      "id": "results",
      "block": {
        "kind": "prose",
        "heading": "Sonuçlar",
        "body": "Bu proje için yayımlanmış bir performans rakamı yok, dolayısıyla iddia da edilmiyor."
      }
    },
    {
      "id": "deliverables",
      "block": {
        "kind": "list",
        "heading": "Teslim edilenler",
        "items": [
          "Oy oranı kestirimi, sandalye dağıtımı ve cumhurbaşkanlığı yarışını kapsayan defterler.",
          "Seçim, demografik ve sosyoekonomik kaynakları birleştiren il düzeyinde bir veri kümesi.",
          "Yazılı tez."
        ]
      }
    },
    {
      "id": "consequences",
      "block": {
        "kind": "prose",
        "heading": "Pratikte neyi değiştiriyor",
        "body": "Aktarılabilir nokta siyaset değil yapı hakkındadır: bir sonuç, içinde uçurumlar olan bir kuraldan geçiyorsa, tahminin o kuralı modellemesi gerekir. Aynı akıl yürütme vergi dilimlerine, kredi sözleşmesi testlerine ve hacim kademelerine de uygulanır."
      }
    },
    {
      "id": "limitations",
      "block": {
        "kind": "list",
        "heading": "Sınırlar",
        "items": [
          "Ayrılmış küme üzerinde doğruluk yayımlanmadığı için tahmin performansı iddia edilmiyor.",
          "Tek bir kural kümesi altında tek bir seçim için kuruldu; genel bir seçim modeli değildir.",
          "2023’ten beri bakımı yapılmamıştır."
        ]
      }
    },
    {
      "id": "human-review",
      "block": {
        "kind": "prose",
        "heading": "İnsan incelemesi",
        "body": "Bir araştırma çıktısıdır ve öyle okunur. Buradaki hiçbir şey karar almak için sunulmuş bir öngörü değildir."
      }
    },
    {
      "id": "sources",
      "block": {
        "kind": "links",
        "heading": "Kaynak malzeme",
        "items": [
          {
            "label": "Depo",
            "href": "https://github.com/bumincetin/TurkishElection2023",
            "external": true
          }
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Buna benzer bir probleminiz mi var?",
        "body": "Neye karar vermeye çalıştığınızı anlatın, bu yaklaşımın uyup uymadığını söyleyeyim. İlgili hizmet: Tahmin & finansal analitik.",
        "cta": "Projenizi konuşalım",
        "href": "/tr/contact?topic=forecasting"
      }
    }
  ]
}
```

### /tr/volumes/portfolio-optimizer

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "portfolio-optimizer",
    "kind": "evidence",
    "href": "/volumes/portfolio-optimizer",
    "motifKey": "compass",
    "color": "#78a7bd",
    "foil": "#e4e7e5",
    "palette": {
      "paper": "#1a1715",
      "paperDeep": "#110f0d",
      "paperPale": "#e9eff2",
      "ink": "#eff4f6",
      "inkSoft": "#aebcc4",
      "wall": "#1a1715",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f2ddc6",
      "fill": "#b39a80"
    },
    "width": 1.12,
    "height": 1.63,
    "depth": 0.28,
    "seed": 77
  },
  "title": "Mühürlü Model",
  "discipline": "Gösterim · sentetik veri",
  "note": "Sorgulayamadığınız bir dağıtım. Uydurma varsayımlar, tümü açıkta.",
  "deck": "Dağıtım modelleri, varsayımlarla cevap arasında görünür bir bağ olmayan bir pasta grafiği olarak gelir; kimse bir görüş yanlışsa ne olacağını soramaz. Bu araç, kaynağa yazılmış varsayımlarla tarayıcınızda çalışır ve varsayımların hepsini yayımlar.",
  "theme": "Kimsenin denetleyemediği bir öneri",
  "binding": "Sentetik gösterim · bu site için yapıldı",
  "format": "Tartışabileceğiniz bir çözücü ve arkasındaki varsayım tablosu",
  "roman": "VII",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "VII",
        "discipline": "Gösterim · sentetik veri",
        "title": "Mühürlü Model",
        "note": "Sorgulayamadığınız bir dağıtım. Uydurma varsayımlar, tümü açıkta."
      }
    },
    {
      "id": "maturity",
      "block": {
        "kind": "prose",
        "heading": "Sentetik gösterim",
        "body": "Bir yöntemi göstermek için bu site adına uydurma veriyle yapıldı. Bir iş değil, bir müşteri sonucu değil ve kimse kullanmıyor."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Problem",
        "body": "Dağıtım modelleri genellikle bir cevap olarak sunulur: varsayımlarla çıktı arasında görünür bir bağ olmayan bir pasta grafiği. Kendisine böyle bir şey gösterilen kişinin, bir görüş yanlışsa ne olacağını sorma imkânı yoktur."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "Kimin için",
        "body": "Uzman olmayan birinin gerçekten kullanabileceği nicel bir araç kurup kuramayacağımı değerlendiren herkes. Bu bir yöntem gösterimidir."
      }
    },
    {
      "id": "context",
      "block": {
        "kind": "prose",
        "heading": "Bağlam",
        "body": "Bu site için yapıldı. Sentetik bir gösterimdir; bir iş değil, bir ürün de değil: kimse sipariş etmedi ve kimse bununla para dağıtmıyor."
      }
    },
    {
      "id": "role",
      "block": {
        "kind": "prose",
        "heading": "Benim rolüm",
        "body": "Tamamen benim tarafımdan tasarlandı ve yazıldı — çözücü, benzetim ve arayüz."
      }
    },
    {
      "id": "data",
      "block": {
        "kind": "prose",
        "heading": "Verinin kaynağı",
        "body": "Yok. Her girdi, bir piyasa akışı değil, kaynağa yazılmış uydurma bir uzun vadeli varsayımdır: stilize beklenen getiriler, oynaklıklar, bir korelasyon matrisi ve kıyas ağırlıklarıyla sekiz varlık sınıfı. Hiçbir canlı fiyat çekilmez ve bu araçta hiçbir yerde piyasa verisi yoktur."
      }
    },
    {
      "id": "constraints",
      "block": {
        "kind": "prose",
        "heading": "Kısıtlar",
        "body": "Sunucusuz olarak tarayıcıda çalışmak zorunda ve gerçek yöntem gibi davranırken sentetik olduğu konusunda dürüst kalmak zorunda."
      }
    },
    {
      "id": "approach-1",
      "block": {
        "kind": "list",
        "heading": "Yaklaşım",
        "items": [
          "Black–Litterman’ın yaptığı gibi kıyas ağırlıklarından başlayıp bunların ima ettiği denge getirilerini tersine çözmek.",
          "Ziyaretçinin görüşlerini senaryo olarak belirtmesine izin vermek, bunları kendi kontrol ettiği bir güven düzeyinde denge önseliyle harmanlamak ve yeniden çözmek.",
          "Tek bir beklenen getiri yerine sonuç dağılımını göstermek için elde edilen dağılımdan Monte Carlo yolları çalıştırmak."
        ]
      }
    },
    {
      "id": "approach-2",
      "block": {
        "kind": "list",
        "heading": "Yaklaşım",
        "items": [
          "Varsayımları ve formülleri gelişmiş görünümde açığa çıkarmak; böylece sayılara güvenilmek yerine denetlenebilirler."
        ]
      }
    },
    {
      "id": "decisions-1",
      "block": {
        "kind": "pairs",
        "heading": "Önem taşıyan kararlar",
        "items": [
          {
            "term": "Varsayımlar grafiğin arkasına saklanmak yerine görünür ve düzenlenebilir tutuldu.",
            "detail": "Aracın amacı, çıktının belirtilen girdilerden çıkmasıdır. Onları saklamak aracı bir süse dönüştürürdü."
          },
          {
            "term": "Tek bir öngörülen getiri değil, her zaman bir sonuç dağılımı gösteriliyor.",
            "detail": "Tek bir sayı, tahmin olarak okunmaya davet eder. Oysa tahmin değildir."
          }
        ]
      }
    },
    {
      "id": "decisions-2",
      "block": {
        "kind": "pairs",
        "heading": "Önem taşıyan kararlar",
        "items": [
          {
            "term": "Her şey istemci tarafında çalışıyor.",
            "detail": "Sunucu olmaması, ziyaretçinin yazdığı hiçbir şeyin hiçbir yere iletilmemesi veya saklanmaması demektir."
          }
        ]
      }
    },
    {
      "id": "figure",
      "block": {
        "kind": "figure",
        "heading": "Şekil",
        "slug": "portfolio-optimizer",
        "caption": "Optimizasyon aracının kendi yerleşik varsayımlarından ürettiği dağıtım ve sonuç aralığı. Sentetik gösterim — girdiler uydurmadır ve hiçbir piyasa verisi kullanılmaz.",
        "alt": "Sekiz varlık sınıfı üzerinde kıyas ağırlıklarına karşı gösterilen bir dağıtım grafiği ve yanında zamanla genişleyen benzetilmiş sonuç yollarından oluşan bir yelpaze grafiği. Yelpaze tek bir çizgi yerine geniş bir sonuç aralığı gösteriyor; ortada medyan yol ve çevresinde giderek genişleyen bantlar var.",
        "synthetic": true
      }
    },
    {
      "id": "baseline",
      "block": {
        "kind": "prose",
        "heading": "Kıyas noktası",
        "body": "Her dağıtım, başladığı kıyas ağırlıklarına karşı gösterilir; böylece bir görüşün etkisi fark olarak görünür."
      }
    },
    {
      "id": "evaluation",
      "block": {
        "kind": "prose",
        "heading": "Nasıl değerlendirildi",
        "body": "Çözücü, matematiksel özelliklerini denetleyen birim testleriyle kapsanır — ağırlıkların bire toplanması, nötr bir görüşün kıyası yeniden üretmesi, kovaryans matrisinin pozitif tanımlı kalması. Değerlendirilecek bir doğruluk iddiası yoktur, çünkü tahmin edilen bir şey yoktur."
      }
    },
    {
      "id": "results",
      "block": {
        "kind": "prose",
        "heading": "Sonuçlar",
        "body": "Bu proje için yayımlanmış bir performans rakamı yok, dolayısıyla iddia da edilmiyor."
      }
    },
    {
      "id": "deliverables",
      "block": {
        "kind": "list",
        "heading": "Teslim edilenler",
        "items": [
          "Monte Carlo benzeticisiyle birlikte istemci tarafında bir Black–Litterman çözücüsü.",
          "Aynı hesaplama üzerinde basit ve gelişmiş görünümler.",
          "Finansal mantık üzerinde gerileme testleri."
        ]
      }
    },
    {
      "id": "consequences",
      "block": {
        "kind": "prose",
        "heading": "Pratikte neyi değiştiriyor",
        "body": "Hesabı gösterir. Yöntem, gerçek görevlerde kullanılanın aynısıdır; yalnızca sayılar uydurmadır ve araç bunu açıkça söyler."
      }
    },
    {
      "id": "limitations",
      "block": {
        "kind": "list",
        "heading": "Sınırlar",
        "items": [
          "Her girdi uydurmadır. Buradaki hiçbir şey bir piyasa gözlemi, geriye dönük test veya geçmiş performans değildir.",
          "Yatırım tavsiyesi değildir ve gerçek hiçbir menkul kıymet hakkında öneri üretmez.",
          "Rejim değişimi, işlem maliyeti ve vergi içermeyen uzun vadeli varsayımlar."
        ]
      }
    },
    {
      "id": "human-review",
      "block": {
        "kind": "prose",
        "heading": "İnsan incelemesi",
        "body": "Uygulanabilir değil — bir gösterimdir ve çıktısı hiçbir kararda kullanılmaz."
      }
    },
    {
      "id": "demo",
      "block": {
        "kind": "demo",
        "heading": "Etkileşimli hesaplama",
        "lede": "Belirtilen varsayımlardan tarayıcınızda hesaplanır. Dış veri yok."
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Buna benzer bir probleminiz mi var?",
        "body": "Neye karar vermeye çalıştığınızı anlatın, bu yaklaşımın uyup uymadığını söyleyeyim. İlgili hizmet: Tahmin & finansal analitik.",
        "cta": "Projenizi konuşalım",
        "href": "/tr/contact?topic=forecasting"
      }
    }
  ]
}
```

## IT exact route content

### /it

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "home": {
    "hero": "AI applicata e analisi finanziaria per decisioni aziendali più chiare.",
    "intro": "Aiuto i team finanziari e operativi a trasformare code di documenti, previsioni e report frammentati in flussi di lavoro verificabili e utilizzabili.",
    "directory": "Servizi e progetti",
    "about": "Profilo / CV",
    "approach": "Approccio",
    "home": "Home",
    "service": "Servizio",
    "research": "Progetto di ricerca",
    "synthetic": "Dimostrazione sintetica",
    "browse": "Esplora i progetti",
    "contact": "Parliamo del tuo progetto",
    "read": "Leggi questo volume",
    "takeaway": "Cosa ricevi / impari",
    "collection": "Una biblioteca di lavoro",
    "collectionNote": "Quattro servizi, due progetti di ricerca e una dimostrazione sintetica. Apri un volume per esaminarne ambito, prove e limiti.",
    "shelfTitle": "Prendi un libro dallo scaffale.",
    "shelfNote": "Esplora gli stessi sette volumi nella biblioteca interattiva.",
    "activate": "Entra nella biblioteca 3D",
    "exit": "Torna al catalogo",
    "pause": "Pausa il movimento decorativo",
    "play": "Riprendi il movimento decorativo",
    "shelfLoading": "Preparazione della biblioteca…",
    "shelfFailed": "La biblioteca interattiva non si è caricata. Tutti i volumi restano disponibili nel catalogo.",
    "boundary": "Il coordinamento commerciale Italia–Turchia è un servizio separato con un ambito definito. Le attività regolamentate in materia legale, fiscale, contabile e di investimento restano affidate a professionisti abilitati.",
    "view": "Vista di lettura",
    "article": "Articolo",
    "book": "Libro",
    "contents": "In questo volume",
    "readingFailed": "La vista libro non si è caricata. Puoi leggere l’articolo completo qui sotto.",
    "print": "Stampa / salva articolo",
    "offered": "Cosa è incluso",
    "launchOptimizer": "Apri l’ottimizzatore sintetico",
    "optimizerFailed": "Lo strumento non si è caricato. Metodi, esempi e limiti restano disponibili in questo articolo.",
    "simple": "Scrivi un messaggio",
    "guided": "Usa le domande guidate",
    "topic": "Argomento",
    "timing": "Tempistiche",
    "regenerate": "Sostituisci la bozza con le risposte attuali",
    "email": "Apri bozza email",
    "whatsapp": "Apri bozza WhatsApp",
    "outlook": "Apri bozza Outlook",
    "contactIntro": "Descrivi il problema o il risultato che hai in mente. Puoi scrivere direttamente o usare alcune domande facoltative per formulare il messaggio.",
    "messageRequired": "Aggiungi un messaggio.",
    "copyFallback": "Se l’app email non si apre, copia il messaggio e incollalo nell’app che preferisci.",
    "longDraft": "Questa bozza è lunga per un collegamento all’app. Copiala e incollala nella tua app email o WhatsApp.",
    "scene": "Esplora la scultura del libro",
    "closeScene": "Chiudi la scultura",
    "optionalDetails": "Nome, argomento e tempistiche (facoltativi)"
  },
  "volumes": [
    {
      "id": "document-intelligence",
      "kind": "service",
      "href": "/volumes/document-intelligence",
      "motifKey": "brackets",
      "color": "#182a43",
      "foil": "#c87046",
      "palette": {
        "paper": "#1b1613",
        "paperDeep": "#120e0b",
        "paperPale": "#f1eadf",
        "ink": "#f4eee6",
        "inkSoft": "#b9b4ae",
        "wall": "#1b1613",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f4d7b9",
        "fill": "#c2a184"
      },
      "width": 1.02,
      "height": 1.58,
      "depth": 0.26,
      "seed": 11,
      "title": "La Pila Non Letta",
      "discipline": "Document intelligence",
      "note": "Il documento che nessuno ha tempo di leggere — e il collo di bottiglia è una persona sola.",
      "deck": "Contratti, fatture, dichiarazioni, polizze — letti a mano, dipendenti da una persona sola e in modo incoerente da persona a persona. Il costo raramente è la lettura. È la clausola di rinnovo scoperta dopo il rinnovo, e la decisione che sei mesi dopo nessuno sa ricostruire.",
      "binding": "Incarico cliente · pilota delimitato",
      "format": "Un flusso su un tipo di documento, valutato sui vostri esempi",
      "theme": "Una coda che solo una persona sa smaltire",
      "motif": "Dare priorità, non sostituire",
      "chapters": [
        "La coda",
        "Cosa può decidere il modello",
        "Il percorso di eccezione"
      ],
      "roman": "I"
    },
    {
      "id": "forecasting",
      "kind": "service",
      "href": "/volumes/forecasting",
      "motifKey": "paths",
      "color": "#c24d24",
      "foil": "#efc16d",
      "palette": {
        "paper": "#1e1813",
        "paperDeep": "#130f0b",
        "paperPale": "#f4ece1",
        "ink": "#f6efe6",
        "inkSoft": "#c0b3a6",
        "wall": "#1e1813",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f7d9ad",
        "fill": "#c99a6a"
      },
      "width": 1.1,
      "height": 1.46,
      "depth": 0.29,
      "seed": 22,
      "title": "Il Numero Nudo",
      "discipline": "Previsione & analisi finanziaria",
      "note": "Una cifra sola, presentata come certezza e pianificata come un fatto.",
      "deck": "Dovete impegnarvi ora su qualcosa che dipende da dopo — magazzino, cassa, prezzo, capacità. Il foglio restituisce un numero solo e nessuno sa dire quanto possa essere sbagliato: così il piano non ha alternative dentro e la sorpresa arriva a prezzo pieno.",
      "binding": "Incarico cliente · prima la valutazione",
      "format": "Un confronto con la baseline, un approccio di validazione e una raccomandazione",
      "theme": "Un piano senza spazio per sbagliarsi",
      "motif": "Un intervallo, e l’ipotesi che lo sposta",
      "chapters": [
        "La decisione",
        "Battere la baseline naive",
        "Dove si rompe"
      ],
      "roman": "II"
    },
    {
      "id": "reporting",
      "kind": "service",
      "href": "/volumes/reporting",
      "motifKey": "caret",
      "color": "#afc400",
      "foil": "#171a16",
      "palette": {
        "paper": "#1c1a11",
        "paperDeep": "#12110a",
        "paperPale": "#eef0e2",
        "ink": "#f1f3e8",
        "inkSoft": "#b5bba7",
        "wall": "#1c1a11",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f2e4b4",
        "fill": "#b0a377"
      },
      "width": 0.92,
      "height": 1.52,
      "depth": 0.22,
      "seed": 33,
      "title": "Il Mese Lungo",
      "discipline": "Business intelligence & reporting",
      "note": "Due reparti, due fatturati, e una riunione che è già passata.",
      "deck": "I numeri si assemblano a mano da più sistemi. Servono giorni, due squadre dichiarano cifre diverse per lo stesso mese, e quando il pacchetto è pronto la decisione per cui era stato costruito è già stata presa a intuito.",
      "binding": "Incarico cliente · prima la diagnostica",
      "format": "Valutazione dei dati di origine, definizioni scritte dei KPI, priorità",
      "theme": "Una settimana di tempo qualificato, ogni mese, per numeri di cui nessuno si fida",
      "motif": "Una vista sola, definita una volta",
      "chapters": [
        "Prima le decisioni",
        "Dove i sistemi divergono",
        "Definizioni che tengono"
      ],
      "roman": "III"
    },
    {
      "id": "cross-border",
      "kind": "service",
      "href": "/volumes/cross-border",
      "motifKey": "orbits",
      "color": "#1537a1",
      "foil": "#dbe8f1",
      "palette": {
        "paper": "#1a1614",
        "paperDeep": "#110e0c",
        "paperPale": "#e8eef6",
        "ink": "#eef3f9",
        "inkSoft": "#adb8c9",
        "wall": "#1a1614",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f4dcc0",
        "fill": "#b08f74"
      },
      "width": 1.08,
      "height": 1.68,
      "depth": 0.25,
      "seed": 44,
      "title": "Due Regolamenti",
      "discipline": "Consulenza transfrontaliera · Italia & Turchia",
      "note": "Due sistemi normativi insieme. L’errore costoso è non sapere quale domanda porre.",
      "deck": "Operare tra Italia e Turchia significa due sistemi normativi, due lingue e due insiemi di prassi professionali insieme. Ciò che costa raramente è il passaggio visibile: è non sapere quale professionista un dato passaggio richieda per legge, e scoprirlo tardi.",
      "binding": "Coordinamento · il lavoro regolamentato è affidato a terzi",
      "format": "Un perimetro confermato, una mappa delle responsabilità e i professionisti necessari",
      "theme": "Un processo bloccato su un passaggio che nessuno ha avviato",
      "motif": "La sequenza, e chi è qualificato per ciascuna parte",
      "chapters": [
        "L’obiettivo commerciale",
        "Chi può fare cosa",
        "La sequenza"
      ],
      "roman": "IV"
    },
    {
      "id": "greenwashing-risk-scoring",
      "kind": "evidence",
      "href": "/volumes/greenwashing-risk-scoring",
      "motifKey": "modules",
      "color": "#c83222",
      "foil": "#efb0aa",
      "palette": {
        "paper": "#1e1514",
        "paperDeep": "#140d0c",
        "paperPale": "#f6e9e6",
        "ink": "#f8eeec",
        "inkSoft": "#c5aeaa",
        "wall": "#1e1514",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f7cfc6",
        "fill": "#c08278"
      },
      "width": 1,
      "height": 1.48,
      "depth": 0.3,
      "seed": 55,
      "title": "La Promessa Eccedente",
      "discipline": "Ricerca · document intelligence",
      "note": "Una dichiarazione che supera l’impegno. Valutata su 29 casi — e ne manca la maggior parte.",
      "deck": "Un rilevatore che ordina le dichiarazioni ambientali in base a quanto il linguaggio corra avanti rispetto all’impegno. Segue da vicino il giudizio esperto — Pearson 0,906 — e trova comunque al massimo il 40% di ciò che un revisore segnalerebbe. È pubblicato qui perché è il secondo numero a decidere come possa essere usato.",
      "binding": "Ricerca · repository pubblico",
      "format": "Punteggi per dichiarazione, un impianto di validazione e i numeri che non hanno retto",
      "theme": "Una coda di lettura senza un ordine difendibile",
      "motif": "Ordina la coda; non emettere mai il verdetto",
      "chapters": [
        "Ventinove dichiarazioni",
        "Perché ha vinto il modello semplice",
        "Cosa manca ancora"
      ],
      "roman": "V"
    },
    {
      "id": "parliamentary-seat-forecast",
      "kind": "evidence",
      "href": "/volumes/parliamentary-seat-forecast",
      "motifKey": "frames",
      "color": "#da3b2f",
      "foil": "#ff8eab",
      "palette": {
        "paper": "#1f1615",
        "paperDeep": "#150e0c",
        "paperPale": "#f7e9ec",
        "ink": "#f9eff1",
        "inkSoft": "#c7adb3",
        "wall": "#1f1615",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f9cdd6",
        "fill": "#c2808f"
      },
      "width": 0.96,
      "height": 1.57,
      "depth": 0.24,
      "seed": 66,
      "title": "Il Salto di Soglia",
      "discipline": "Ricerca · previsione",
      "note": "Se un esito attraversa una soglia, è la soglia che va modellata.",
      "deck": "Una tesi triennale che ha trattato un’elezione come un problema di previsione. L’incertezza interessante non è mai stata nei sondaggi: stava in una regola dove una frazione di punto da una parte o dall’altra di una soglia cambia del tutto la risposta. Scaglioni fiscali, covenant e soglie di volume si comportano allo stesso modo.",
      "binding": "Ricerca · repository pubblico",
      "format": "Metodo, provenienza dei dati, e nessuna dichiarazione di accuratezza perché nessuna è pubblicata",
      "theme": "Una previsione che appiana proprio la parte che conta",
      "motif": "Modella la regola, non la media",
      "chapters": [
        "La quota non sono i seggi",
        "Dove è sensibile",
        "Cosa non viene dichiarato"
      ],
      "roman": "VI"
    },
    {
      "id": "portfolio-optimizer",
      "kind": "evidence",
      "href": "/volumes/portfolio-optimizer",
      "motifKey": "compass",
      "color": "#78a7bd",
      "foil": "#e4e7e5",
      "palette": {
        "paper": "#1a1715",
        "paperDeep": "#110f0d",
        "paperPale": "#e9eff2",
        "ink": "#eff4f6",
        "inkSoft": "#aebcc4",
        "wall": "#1a1715",
        "shelf": "#3a2118",
        "shelfDark": "#1c0e0a",
        "light": "#f2ddc6",
        "fill": "#b39a80"
      },
      "width": 1.12,
      "height": 1.63,
      "depth": 0.28,
      "seed": 77,
      "title": "Il Modello Sigillato",
      "discipline": "Dimostrazione · dati sintetici",
      "note": "Un’allocazione che non puoi interrogare. Ipotesi inventate, mostrate per intero.",
      "deck": "I modelli di allocazione arrivano come un grafico a torta senza un legame visibile tra ipotesi e risultato, così nessuno può chiedere cosa succede se una view è sbagliata. Questo gira nel tuo browser su ipotesi scritte nel codice, e le pubblica tutte.",
      "binding": "Dimostrazione sintetica · costruita per questo sito",
      "format": "Un solutore con cui discutere, e la tabella delle ipotesi che lo alimenta",
      "theme": "Una raccomandazione che nessuno può verificare",
      "motif": "Mostra i passaggi, o non mostrare il grafico",
      "chapters": [
        "La distribuzione a priori",
        "La tua view, pesata",
        "Una distribuzione, non un numero"
      ],
      "roman": "VII"
    }
  ],
  "ui": {
    "nav": {
      "mainLabel": "Navigazione principale",
      "shelf": "Lo scaffale",
      "volumes": "Volumi",
      "frontMatter": "Prefazione",
      "contact": "Contatti",
      "primaryCta": "Parliamo del tuo progetto",
      "menu": "Apri il menu",
      "closeMenu": "Chiudi il menu",
      "language": "Lingua",
      "skipToContent": "Vai al contenuto"
    },
    "home": {
      "metaTitle": "Consulenza in AI Applicata e Analisi Finanziaria",
      "heroEyebrow": "AI applicata e analisi finanziaria",
      "heroLede": "Aiuto i team di finanza e operations a costruire modelli previsionali, automatizzare la revisione documentale e creare sistemi di reporting che si possano davvero usare.",
      "brandLine": "Un ponte tra codice e capitale",
      "ctaPrimary": "Parliamo del tuo progetto",
      "ctaSecondary": "Apri il primo volume",
      "locationLine": "Milano, Italia · lavoro in inglese, italiano e turco",
      "evidenceLabel": "Prove",
      "evidenceTitle": "Che aspetto ha il lavoro quando lo verifichi",
      "evidenceLede": "Tre cose che posso mostrarti invece di affermarle. Ognuna rimanda all’artefatto e ai numeri che ci stanno dietro, compreso dove non arrivano.",
      "problemsLabel": "Problemi",
      "problemsTitle": "Tre problemi per cui di solito mi cercano",
      "problemsLede": "Se uno di questi è il motivo per cui stai leggendo, il servizio collegato spiega come viene definito l’incarico e che cosa riceveresti.",
      "featuredLabel": "Caso di studio",
      "processLabel": "Processo",
      "processTitle": "Come si svolge un incarico",
      "costLabel": "Il problema",
      "costTitle": "La parte costosa non è mai il lavoro. È il ritardo, il rifacimento e la decisione presa senza il numero.",
      "costLede": "Ogni problema sullo scaffale qui sopra ha la stessa forma. Qualcosa che dovrebbe richiedere un pomeriggio richiede una settimana; qualcosa che dovrebbe essere verificabile viene preso per buono; e una decisione che costerà denaro vero viene presa prima che arrivi la cifra che dovrebbe informarla. Nulla di tutto ciò compare come voce di costo, ed è esattamente per questo che dura.",
      "costPoints": [
        {
          "cost": "Tempo qualificato speso ad assemblare, non a decidere",
          "body": "Un responsabile finanziario che passa la prima settimana di ogni mese a riconciliare quattro sistemi è la pipeline di dati più costosa dell’azienda, e la meno mantenuta."
        },
        {
          "cost": "Decisioni prese prima che arrivi il numero",
          "body": "Quando il pacchetto arriva dopo la riunione, la decisione è stata presa a intuito e il reporting è diventato il verbale di ciò che è già successo anziché un input per ciò che succederà."
        },
        {
          "cost": "Numeri che nessuno è disposto a difendere",
          "body": "Una cifra che due reparti calcolano in modo diverso è peggio di nessuna cifra: se ne discute invece di agire, e la discussione torna ogni mese."
        },
        {
          "cost": "La clausola trovata dopo il rinnovo",
          "body": "Documenti letti da una persona sola, sotto pressione, producono omissioni che riemergono come costo mesi dopo — senza alcuna traccia del perché quel documento sia stato trattato così."
        }
      ],
      "processLede": "Quattro fasi, ognuna delle quali termina con qualcosa di concreto e non con un aggiornamento di stato.",
      "process": [
        {
          "stage": "Discovery",
          "body": "Guardiamo la decisione vera e i dati veri, e concordiamo cosa sarebbe un buon risultato prima di costruire qualsiasi cosa. Spesso è qui che un progetto diventa più piccolo.",
          "output": "Una definizione scritta del problema e un parere onesto se valga la pena farlo."
        },
        {
          "stage": "Pilota delimitato",
          "body": "Un flusso, un tipo di documento, una previsione. Abbastanza piccolo perché scoprire che non funziona sia una risposta economica e non un costo affondato.",
          "output": "Un prototipo funzionante e una valutazione sui vostri dati."
        },
        {
          "stage": "Consegna",
          "body": "Ciò che è sopravvissuto al pilota viene costruito dove il lavoro avviene davvero, con il passaggio di revisione presente dal primo giorno anziché aggiunto dopo.",
          "output": "Il flusso in produzione, la sua documentazione e i controlli che mostrano quando si degrada."
        },
        {
          "stage": "Passaggio di consegne",
          "body": "Il vostro team lo gestisce senza di me. Questo include sapere come rivalutarlo quando gli input cambiano, perché cambieranno.",
          "output": "Documentazione, impianto di valutazione e una sessione con chi lo prenderà in carico."
        }
      ],
      "storyLabel": "Percorso",
      "storyTitle": "Perché un data scientist continua a leggere bilanci",
      "storyLede": "Ho studiato economia e informatica alla Bocconi, ho lavorato nel rischio bancario, ho messo in produzione modelli previsionali in stabilimento e ho passato due anni a insegnare ai modelli a leggere le comunicazioni aziendali. Il filo conduttore è che un modello conta solo quando qualcuno deve firmare ciò che dice.",
      "storyCta": "Leggi il percorso completo",
      "contactTitle": "Quale decisione o processo stai cercando di migliorare?",
      "contactLede": "Bastano poche frasi. Rispondo personalmente, di solito entro un paio di giorni lavorativi, e dico apertamente se non è qualcosa di cui dovrei occuparmi io."
    },
    "work": {
      "readCaseStudy": "Leggi il caso di studio",
      "sections": {
        "problem": "Il problema",
        "context": "Contesto",
        "role": "Il mio ruolo",
        "audience": "A chi serve",
        "data": "Provenienza dei dati",
        "constraints": "Vincoli",
        "approach": "Approccio",
        "decisions": "Decisioni che hanno contato",
        "baseline": "Riferimento",
        "evaluation": "Come è stato valutato",
        "results": "Risultati",
        "deliverables": "Cosa è stato consegnato",
        "consequences": "Cosa cambia nella pratica",
        "limitations": "Limiti",
        "humanReview": "Revisione umana",
        "evidence": "Registro delle prove",
        "links": "Materiale di origine"
      },
      "evidenceIntro": "Ogni cifra citata sopra, con la sua fonte e ciò che non dice.",
      "evidenceSource": "Fonte",
      "evidenceMethod": "Metodo",
      "evidenceBaseline": "Confrontato con",
      "evidenceAsOf": "Al",
      "evidenceLimits": "Limiti",
      "noResults": "Per questo progetto non è pubblicata alcuna misura di prestazione, quindi non ne viene dichiarata alcuna.",
      "relatedService": "Servizio collegato",
      "repository": "Repository",
      "report": "Relazione sulle prestazioni",
      "figureLabel": "Figura",
      "nextStepTitle": "Hai un problema di questa forma?",
      "nextStepLede": "Dimmi che cosa stai cercando di decidere e ti dirò se questo approccio è adatto."
    },
    "maturity": {
      "research": {
        "label": "Ricerca",
        "description": "Lavoro di indagine con un artefatto pubblicato. Non installato e non usato da nessuno."
      },
      "prototype": {
        "label": "Prototipo",
        "description": "Costruito per verificare se un approccio funziona. Non irrobustito per l’uso regolare."
      },
      "internal-deployment": {
        "label": "Uso interno",
        "description": "In funzione dentro un’organizzazione per il proprio personale."
      },
      "client-engagement": {
        "label": "Incarico cliente",
        "description": "Commissionato e consegnato per un cliente."
      },
      "maintained-product": {
        "label": "Prodotto mantenuto",
        "description": "In uso continuo e mantenuto attivamente."
      },
      "synthetic-demo": {
        "label": "Dimostrazione sintetica",
        "description": "Costruita per questo sito su dati inventati per mostrare un metodo. Non è un incarico, non è un risultato di cliente e non è usata da nessuno."
      }
    },
    "contact": {
      "label": "Contatti",
      "title": "Quale decisione o processo stai cercando di migliorare?",
      "lede": "Per iniziare bastano poche frasi. Rispondo personalmente e dico apertamente se il tuo problema è servito meglio da qualcun altro.",
      "nameLabel": "Nome",
      "namePlaceholder": "Il tuo nome",
      "emailLabel": "Email",
      "emailPlaceholder": "tu@azienda.com",
      "companyLabel": "Azienda",
      "companyOptional": "facoltativo",
      "companyPlaceholder": "Dove lavori",
      "topicLabel": "Di cosa si tratta?",
      "topicPlaceholder": "Scegli un argomento",
      "messageLabel": "Che cosa stai cercando di migliorare?",
      "messagePlaceholder": "Per esempio: il nostro reporting mensile viene assemblato a mano da quattro sistemi, richiede una settimana e quando arriva nessuno si fida dei numeri.",
      "messageHint": "Il problema, a grandi linee. Non serve preparare un brief.",
      "submit": "Invia il messaggio",
      "submitting": "Invio in corso…",
      "required": "Questo campo è obbligatorio",
      "invalidEmail": "Inserisci un indirizzo email che possa ricevere una risposta",
      "tooShort": "Una o due frasi, così capisco di cosa hai bisogno",
      "tooLong": "Per favore accorcia un po’",
      "errorSummary": "Il messaggio non è stato inviato. Controlla i campi segnalati qui sotto.",
      "successTitle": "Ricevuto",
      "successBody": "Il tuo messaggio è arrivato nella mia casella. Li leggo io e rispondo all’indirizzo che hai indicato, di solito entro un paio di giorni lavorativi.",
      "failureTitle": "Non è andato a buon fine",
      "failureBody": "Non è stato inviato nulla. Il messaggio è ancora nel modulo — puoi riprovare oppure scrivermi direttamente all’indirizzo qui sotto.",
      "disabledTitle": "Iniziamo con un’email",
      "disabledBody": "Il modulo di contatto non è al momento disponibile. Raccontami il tuo progetto in poche righe via email; il messaggio arriva direttamente a me.",
      "whatHappensNext": "Cosa succede dopo",
      "nextSteps": [
        "Leggo io il tuo messaggio. Nulla passa da un assistente o da una risposta automatica.",
        "Ricevi una risposta all’indirizzo che hai indicato — normalmente entro due giorni lavorativi — in cui ti dico se penso di poterti aiutare.",
        "Se sembra adatto, dedichiamo trenta minuti al problema vero prima di parlare di perimetro o di proposta."
      ],
      "privacyTitle": "Che fine fa quello che invii",
      "privacyBody": "Nome, email, azienda e messaggio vengono inviati al mio provider di posta perché io possa rispondere, e restano in quella casella. Non finiscono in una mailing list, non vengono passati a nessuno e il contenuto non viene mai inviato agli strumenti di analisi. Chiedimelo in qualsiasi momento e cancello la conversazione.",
      "directTitle": "Oppure scrivimi direttamente",
      "directBody": "Se non vuoi iniziare da un modulo, entrambi questi canali mi raggiungono.",
      "whatsappDirect": "WhatsApp",
      "noScheduling": "Qui non c’è un link al calendario, ed è voluto: non tengo un’agenda di prenotazione pubblica, quindi l’orario si concorda nella prima risposta.",
      "charactersRemaining": "caratteri rimanenti"
    },
    "labels": {
      "disclaimer": "Nulla in questo sito è consulenza contabile, di revisione, fiscale, legale o in materia di investimenti, e nessuna cifra qui è una promessa di risultato. Dove compare un numero, compaiono con esso la sua fonte e i suoi limiti.",
      "synthetic": "Illustrazione sintetica",
      "syntheticHint": "Dati inventati, usati per dimostrare un metodo. Non è un risultato reale.",
      "interactiveCalculation": "Calcolo interattivo",
      "interactiveHint": "Calcolato nel tuo browser dalle ipotesi dichiarate. Nessun dato esterno.",
      "recordedExample": "Esempio registrato",
      "liveData": "Dati in tempo reale"
    }
  }
}
```

### /it/front-matter

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "front-matter",
    "kind": "service",
    "href": "/front-matter",
    "motifKey": "brackets",
    "color": "#182a43",
    "foil": "#c87046",
    "palette": {
      "paper": "#1b1613",
      "paperDeep": "#120e0b",
      "paperPale": "#f1eadf",
      "ink": "#f4eee6",
      "inkSoft": "#b9b4ae",
      "wall": "#1b1613",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f4d7b9",
      "fill": "#c2a184"
    },
    "width": 1.02,
    "height": 1.58,
    "depth": 0.26,
    "seed": 11
  },
  "title": "Sette problemi costosi.",
  "discipline": "Il problema",
  "note": "Aiuto i team di finanza e operations a costruire modelli previsionali, automatizzare la revisione documentale e creare sistemi di reporting che si possano davvero usare.",
  "deck": "Ogni problema sullo scaffale qui sopra ha la stessa forma. Qualcosa che dovrebbe richiedere un pomeriggio richiede una settimana; qualcosa che dovrebbe essere verificabile viene preso per buono; e una decisione che costerà denaro vero viene presa prima che arrivi la cifra che dovrebbe informarla. Nulla di tutto ciò compare come voce di costo, ed è esattamente per questo che dura.",
  "theme": "Il problema",
  "binding": "Il problema",
  "format": "Processo",
  "roman": "Prefazione",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "",
        "label": "Prefazione",
        "discipline": "Il problema",
        "title": "Sette problemi costosi.",
        "note": "La parte costosa non è mai il lavoro. È il ritardo, il rifacimento e la decisione presa senza il numero."
      }
    },
    {
      "id": "thesis",
      "block": {
        "kind": "prose",
        "heading": "Il problema",
        "body": "Ogni problema sullo scaffale qui sopra ha la stessa forma. Qualcosa che dovrebbe richiedere un pomeriggio richiede una settimana; qualcosa che dovrebbe essere verificabile viene preso per buono; e una decisione che costerà denaro vero viene presa prima che arrivi la cifra che dovrebbe informarla. Nulla di tutto ciò compare come voce di costo, ed è esattamente per questo che dura."
      }
    },
    {
      "id": "cost-1",
      "block": {
        "kind": "prose",
        "heading": "Tempo qualificato speso ad assemblare, non a decidere",
        "body": "Un responsabile finanziario che passa la prima settimana di ogni mese a riconciliare quattro sistemi è la pipeline di dati più costosa dell’azienda, e la meno mantenuta."
      }
    },
    {
      "id": "cost-2",
      "block": {
        "kind": "prose",
        "heading": "Decisioni prese prima che arrivi il numero",
        "body": "Quando il pacchetto arriva dopo la riunione, la decisione è stata presa a intuito e il reporting è diventato il verbale di ciò che è già successo anziché un input per ciò che succederà."
      }
    },
    {
      "id": "cost-3",
      "block": {
        "kind": "prose",
        "heading": "Numeri che nessuno è disposto a difendere",
        "body": "Una cifra che due reparti calcolano in modo diverso è peggio di nessuna cifra: se ne discute invece di agire, e la discussione torna ogni mese."
      }
    },
    {
      "id": "cost-4",
      "block": {
        "kind": "prose",
        "heading": "La clausola trovata dopo il rinnovo",
        "body": "Documenti letti da una persona sola, sotto pressione, producono omissioni che riemergono come costo mesi dopo — senza alcuna traccia del perché quel documento sia stato trattato così."
      }
    },
    {
      "id": "process-intro",
      "block": {
        "kind": "prose",
        "heading": "Come si svolge un incarico",
        "body": "Quattro fasi, ognuna delle quali termina con qualcosa di concreto e non con un aggiornamento di stato."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 01",
        "lede": "Guardiamo la decisione vera e i dati veri, e concordiamo cosa sarebbe un buon risultato prima di costruire qualsiasi cosa. Spesso è qui che un progetto diventa più piccolo.",
        "items": [
          {
            "term": "Discovery",
            "detail": "Una definizione scritta del problema e un parere onesto se valga la pena farlo."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 02",
        "lede": "Un flusso, un tipo di documento, una previsione. Abbastanza piccolo perché scoprire che non funziona sia una risposta economica e non un costo affondato.",
        "items": [
          {
            "term": "Pilota delimitato",
            "detail": "Un prototipo funzionante e una valutazione sui vostri dati."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 03",
        "lede": "Ciò che è sopravvissuto al pilota viene costruito dove il lavoro avviene davvero, con il passaggio di revisione presente dal primo giorno anziché aggiunto dopo.",
        "items": [
          {
            "term": "Consegna",
            "detail": "Il flusso in produzione, la sua documentazione e i controlli che mostrano quando si degrada."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 04",
        "lede": "Il vostro team lo gestisce senza di me. Questo include sapere come rivalutarlo quando gli input cambiano, perché cambieranno.",
        "items": [
          {
            "term": "Passaggio di consegne",
            "detail": "Documentazione, impianto di valutazione e una sessione con chi lo prenderà in carico."
          }
        ]
      }
    },
    {
      "id": "evidence-1",
      "block": {
        "kind": "evidence",
        "heading": "Che aspetto ha il lavoro quando lo verifichi",
        "lede": "Tre cose che posso mostrarti invece di affermarle. Ognuna rimanda all’artefatto e ai numeri che ci stanno dietro, compreso dove non arrivano.",
        "entries": [
          {
            "metric": "Evaluation set",
            "value": "29 claims",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Environmental claims extracted from corporate communications and rated for greenwashing risk by human reviewers, forming the reference set the detector is scored against. Human expert ratings collected via a structured questionnaire, then used as ground truth.",
            "asOf": "2026-01-29",
            "limitations": "Twenty-nine items is a small evaluation set. Every figure derived from it carries wide uncertainty and none of it should be read as a population estimate."
          }
        ]
      }
    },
    {
      "id": "evidence-2",
      "block": {
        "kind": "evidence",
        "heading": "Prove",
        "lede": "",
        "entries": [
          {
            "metric": "Krippendorff's α",
            "value": "0.69",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Agreement between the human raters who produced the reference ratings. Krippendorff's alpha across raters; pairwise agreement ≈ 0.852.",
            "asOf": "2026-01-29",
            "limitations": "α = 0.69 is substantial but not strong agreement: the humans themselves disagree on roughly a third of the signal, which caps how well any model can be expected to match them."
          }
        ]
      }
    },
    {
      "id": "evidence-3",
      "block": {
        "kind": "evidence",
        "heading": "Prove",
        "lede": "",
        "entries": [
          {
            "metric": "Pearson r (v1)",
            "value": "0.906",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Correlation between the v1 detector score and the human reference rating, over the 29-claim set. Pearson correlation on continuous scores. Spearman 0.811, Kendall 0.627, MAE 0.206, RMSE 0.237.",
            "baseline": "v3 rule-based detector, r = 0.793; v2 semantic detector, r = 0.557.",
            "asOf": "2026-01-29",
            "limitations": "Correlation on 29 items. It says the score moves with reviewer judgement, not that the score is calibrated as a probability of greenwashing."
          }
        ]
      }
    },
    {
      "id": "evidence-4",
      "block": {
        "kind": "evidence",
        "heading": "Prove",
        "lede": "",
        "entries": [
          {
            "metric": "Recall / precision (v3)",
            "value": "0.40 recall at 1.00 precision",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Binary flag / no-flag performance of the v3 rule-based detector against the human reference labels. Thresholded score compared with binarised human labels on the same 29-claim set.",
            "baseline": "v1 baseline: recall 0.15 at precision 1.00 (F1 0.261). v3 reaches F1 0.571.",
            "asOf": "2026-01-29",
            "limitations": "Recall of 0.40 means roughly three in five flaggable claims are missed. Precision of 1.00 on a set this small is a handful of correct positives, not a guarantee. The tool is a reviewer aid; it cannot be a filter that runs unattended."
          }
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Quale decisione o processo stai cercando di migliorare?",
        "body": "Bastano poche frasi. Rispondo personalmente, di solito entro un paio di giorni lavorativi, e dico apertamente se non è qualcosa di cui dovrei occuparmi io.",
        "cta": "Parliamo del tuo progetto",
        "href": "/it/contact"
      }
    }
  ]
}
```

### /it/chapters

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "copy": {
    "carouselTitle": "La storia, fin qui.",
    "swipeChapters": "Scorri per esplorare",
    "scrollChapters": "Scorri per esplorare",
    "chapters": "Capitoli",
    "cv": "Carriera e curriculum vitae",
    "title": "Una carriera in",
    "titleAccent": "cinque capitoli.",
    "intro": "Dall’economia agli algoritmi. Dalla comprensione del rischio alla costruzione di una mia attività. Le esperienze che hanno formato il mio modo di lavorare.",
    "scroll": "Scorri la storia",
    "record": "Il curriculum completo",
    "recordNote": "Formazione, esperienze e lingue di lavoro. Date come riportate nel mio CV.",
    "scenes": [
      "Le fondamenta",
      "Imparare la responsabilità",
      "I modelli incontrano la realtà",
      "Leggere tra le righe",
      "Costruire la pratica"
    ],
    "sceneLabels": [
      "Economia × informatica",
      "Rischio × responsabilità",
      "Dati × industria",
      "Linguaggio × evidenza",
      "Italia × Turchia"
    ],
    "nextTitle": "Il prossimo capitolo inizia",
    "nextAccent": "con una conversazione.",
    "nextLink": "Inizia una conversazione",
    "print": "Stampa / salva CV",
    "contact": "Contatti",
    "contactEyebrow": "Un’idea inizia con una connessione",
    "contactTitle": "Diamo alla tua idea",
    "contactAccent": "una prima pagina.",
    "contactIntro": "Quattro piccole domande. Un primo messaggio curato. Raccontami cosa hai in mente, poi ne parliamo.",
    "guide": "La tua guida alla conversazione",
    "sceneAlt": "Un neurone luminoso sospeso all’interno di un libro tridimensionale aperto.",
    "sceneNote": "Ogni risposta crea una nuova connessione.",
    "pause": "Pausa animazione",
    "play": "Riprendi animazione",
    "steps": [
      "Presentazione",
      "Direzione",
      "La tua idea",
      "Tempistiche"
    ],
    "questions": [
      "Prima di tutto, come ti chiami?",
      "Cosa ti porta qui?",
      "Quale sarebbe un buon risultato?",
      "Quando vorresti iniziare?"
    ],
    "hints": [
      "Basta il nome. Aggiungi l’azienda se è utile.",
      "Scegli l’opzione più vicina. Nel prossimo passo potrai raccontare di più.",
      "Un problema, una possibilità o qualcosa che vorresti costruire. Bastano poche frasi.",
      "Va bene una stima. Serve solo a inquadrare la conversazione."
    ],
    "name": "Il tuo nome",
    "namePlaceholder": "Come vorresti essere chiamato?",
    "company": "Azienda / organizzazione",
    "optional": "facoltativo",
    "idea": "La tua idea",
    "ideaPlaceholder": "Stiamo lavorando a… La parte su cui vorremmo aiuto è…",
    "topics": [
      "Document intelligence e AI",
      "Previsioni e analisi finanziaria",
      "Reporting e business intelligence",
      "Consulenza Italia–Turchia",
      "Qualcos’altro"
    ],
    "timings": [
      "Il prima possibile",
      "Nei prossimi 1–3 mesi",
      "Più avanti quest’anno",
      "Sto solo esplorando"
    ],
    "next": "Continua",
    "back": "Indietro",
    "review": "Rivedi il messaggio",
    "step": "Domanda",
    "of": "di",
    "nameError": "Inserisci il tuo nome.",
    "ideaError": "Aggiungi almeno 20 caratteri per aiutarmi a capire la tua idea.",
    "previewTitle": "La tua prima pagina è pronta.",
    "previewHint": "Rendila tua, poi scegli dove continuare.",
    "messageLabel": "Il tuo messaggio",
    "whatsapp": "Apri WhatsApp",
    "outlook": "Apri l’app Outlook",
    "email": "Apri l’app email",
    "outlookWeb": "Outlook nel browser",
    "mailHint": "Su desktop, il pulsante email apre l’app di posta predefinita. Imposta Outlook come predefinita per usarla qui.",
    "sendNote": "Rivedi e invii il messaggio nell’app. Nulla viene inviato automaticamente.",
    "privacy": "Le risposte restano in questa pagina finché non scegli un’app di messaggistica. Nessun account necessario.",
    "edit": "Modifica le risposte",
    "copy": "Copia messaggio",
    "copied": "Copiato",
    "copyFailed": "Seleziona e copia il messaggio qui sopra.",
    "direct": "Preferisci iniziare direttamente?",
    "careerLink": "Cerchi il mio percorso? Esplora i Capitoli",
    "greeting": "Ciao Bumin,",
    "introduction": "Mi chiamo",
    "from": "di",
    "interest": "Vorrei parlare di",
    "timingLabel": "Tempistiche",
    "closing": "Saresti disponibile per discutere i prossimi passi?",
    "subject": "Richiesta di progetto"
  },
  "record": {
    "about": {
      "desc1": "Costruisco AI applicata e analisi finanziaria per team di finanza e operations — revisione documentale, previsione e reporting su cui si possa davvero decidere. Ho studiato economia, management e informatica alla Bocconi, poi data science e business analytics, e ho fondato Alvolo Consulting per la consulenza sul corridoio Italia-Turchia."
    },
    "aboutPage": {
      "education": "Istruzione",
      "experience": "Esperienza",
      "languages": "Lingue",
      "thesis": "Tesi",
      "educationData": [
        {
          "school": "Università Bocconi",
          "degree": "Laurea Magistrale in Data Science and Business Analytics",
          "location": "Milano, Italia",
          "period": "2023 - 2025",
          "coursework": [
            "Deep Learning per Computer Vision",
            "Simulazione e Modellazione",
            "Elaborazione del Linguaggio Naturale"
          ],
          "thesis": "Rilevamento Verificabile del Rischio di Greenwashing nelle Comunicazioni Aziendali"
        },
        {
          "school": "Università Bocconi",
          "degree": "Laurea Triennale in Economia, Management e Informatica",
          "location": "Milano, Italia",
          "period": "2020 - 2023",
          "coursework": [
            "Econometria",
            "Big Data e Database",
            "Programmazione",
            "Diritto Informatico",
            "Machine Learning"
          ],
          "thesis": "Studio delle Tecniche Predittive per le Elezioni Parlamentari: Caso Studio del Parlamento Turco"
        }
      ],
      "experienceData": [
        {
          "company": "IMPACTSCOPE",
          "role": "Specialista AI | Ricercatore NLP",
          "location": "Remoto, Svizzera",
          "period": "Dicembre 2024 - Dicembre 2025",
          "highlights": [
            "Sviluppato un prodotto dati che valuta il rischio di greenwashing nelle dichiarazioni di sostenibilità aziendali, così chi rivede può dare priorità invece di leggere una coda in ordine",
            "Sviluppato indice di contraddizione semantica (SCI) utilizzando rilevamento di posizione e deriva del sentiment",
            "Confrontato punteggi di rischio ESG basati sul sentiment con storiche controversie di greenwashing"
          ]
        },
        {
          "company": "ALVOLO CONSULTING",
          "role": "Fondatore",
          "location": "Milano, Italia",
          "period": "Marzo 2025 - Novembre 2025",
          "highlights": [
            "Fondato hub di consulenza finanziaria in Italia aiutando i clienti a raggiungere i loro obiettivi finanziari",
            "Padroneggiato il sistema finanziario italiano per fornire informazioni e guida accurate",
            "Gestito l'intero ciclo di vita del cliente dall'acquisizione alla fidelizzazione"
          ]
        },
        {
          "company": "FEDRIGONI SPA",
          "role": "Junior Data Scientist",
          "location": "Milano, Italia",
          "period": "Aprile 2024 - Ottobre 2024",
          "highlights": [
            "Sviluppato algoritmi di serie temporali e modelli predittivi personalizzati utilizzando LSTM",
            "Sviluppato modello AI personalizzato incorporando modelli non supervisionati e NLP per ottimizzare i prezzi",
            "Utilizzato Knime e PowerBI per sviluppare nuovi prototipi analitici"
          ]
        },
        {
          "company": "N26 BANK AG",
          "role": "Stagista Risk Management",
          "location": "Berlino, Germania",
          "period": "Novembre 2022 - Febbraio 2023",
          "highlights": [
            "Supportato il Sistema di Controllo Interno (ICS), database perdite, registro rischi e reporting",
            "Interagito con stakeholder supportando il New Product Process (NPP)",
            "Aiutato nell'identificazione, valutazione, mitigazione e monitoraggio dei rischi non finanziari"
          ]
        }
      ],
      "languageData": [
        {
          "lang": "Turco",
          "level": "Madrelingua"
        },
        {
          "lang": "Inglese",
          "level": "Madrelingua"
        },
        {
          "lang": "Italiano",
          "level": "Avanzato (C1)"
        },
        {
          "lang": "Tedesco",
          "level": "Intermedio (B1)"
        }
      ]
    }
  },
  "story": {
    "chaptersLabel": "Capitoli",
    "chapters": [
      {
        "numeral": "I",
        "years": "2020 — 2023",
        "place": "Milano",
        "institution": "Università Bocconi",
        "role": "Laurea in Economia, Management e Informatica",
        "title": "Un economista che ha imparato a programmare, in una scuola che insegnava entrambi.",
        "body": "La Bocconi metteva econometria e programmazione nella stessa settimana, ogni settimana. Ne sono uscito con una tesi che trattava un’elezione nazionale come un problema di previsione — e con l’abitudine di chiedere a cosa serve un modello prima di chiedere come funziona."
      },
      {
        "numeral": "II",
        "years": "2022 — 2023",
        "place": "Berlino",
        "institution": "N26 Bank AG",
        "role": "Stagista Risk Management",
        "title": "Dentro una banca il rischio non è un grafico. È un registro, un controllo, una decisione.",
        "body": "Nel team rischio di N26 ho lavorato al sistema di controllo interno, al database delle perdite e al registro dei rischi, e ho seguito il processo nuovi prodotti, dove ogni lancio viene pesato contro ciò che potrebbe andare storto. Un modello elegante conta solo se sopravvive al contatto con un comitato."
      },
      {
        "numeral": "III",
        "years": "2024",
        "place": "Milano",
        "institution": "Fedrigoni S.p.A.",
        "role": "Junior Data Scientist",
        "title": "Una cartiera centenaria, e i primi modelli che ho portato in fabbrica.",
        "body": "In Fedrigoni ho costruito modelli LSTM per la domanda, un modello di pricing che univa apprendimento non supervisionato e NLP, e i prototipi Knime e PowerBI che permettevano al business di vederli. La manifattura non si cura della tua architettura; si cura che il numero sul cruscotto sia giusto il lunedì mattina."
      },
      {
        "numeral": "IV",
        "years": "2023 — 2025",
        "place": "Milano e Svizzera",
        "institution": "Università Bocconi · ImpactScope",
        "role": "M.Sc. Data Science · AI Specialist, ricercatore NLP",
        "title": "Insegnare a un modello linguistico a distinguere una promessa da un piano.",
        "body": "La mia tesi magistrale e il lavoro in ImpactScope sono convergiti su una domanda: un modello può verificare ciò che le aziende dichiarano sulla sostenibilità? La risposta sopravvissuta alla valutazione era più stretta e più utile di quella che cercavo — un rilevatore che segue il giudizio esperto abbastanza da ordinare una coda di lettura, e per nulla abbastanza da sostituire chi legge."
      },
      {
        "numeral": "V",
        "years": "2025",
        "place": "Milano",
        "institution": "Alvolo Consulting",
        "role": "Fondatore",
        "title": "Poi ho costruito la società che avrei voluto assumere.",
        "body": "Alvolo Consulting è una pratica di consulenza finanziaria per le imprese che attraversano Turchia e Italia: costituzione societaria, strutturazione fiscale, banche, negoziazione. Fondarla ha significato imparare il sistema finanziario italiano dall’interno — ed è il luogo dove modelli e consulenza siedono finalmente allo stesso tavolo."
      }
    ]
  }
}
```

### /it/contact

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "copy": {
    "carouselTitle": "La storia, fin qui.",
    "swipeChapters": "Scorri per esplorare",
    "scrollChapters": "Scorri per esplorare",
    "chapters": "Capitoli",
    "cv": "Carriera e curriculum vitae",
    "title": "Una carriera in",
    "titleAccent": "cinque capitoli.",
    "intro": "Dall’economia agli algoritmi. Dalla comprensione del rischio alla costruzione di una mia attività. Le esperienze che hanno formato il mio modo di lavorare.",
    "scroll": "Scorri la storia",
    "record": "Il curriculum completo",
    "recordNote": "Formazione, esperienze e lingue di lavoro. Date come riportate nel mio CV.",
    "scenes": [
      "Le fondamenta",
      "Imparare la responsabilità",
      "I modelli incontrano la realtà",
      "Leggere tra le righe",
      "Costruire la pratica"
    ],
    "sceneLabels": [
      "Economia × informatica",
      "Rischio × responsabilità",
      "Dati × industria",
      "Linguaggio × evidenza",
      "Italia × Turchia"
    ],
    "nextTitle": "Il prossimo capitolo inizia",
    "nextAccent": "con una conversazione.",
    "nextLink": "Inizia una conversazione",
    "print": "Stampa / salva CV",
    "contact": "Contatti",
    "contactEyebrow": "Un’idea inizia con una connessione",
    "contactTitle": "Diamo alla tua idea",
    "contactAccent": "una prima pagina.",
    "contactIntro": "Quattro piccole domande. Un primo messaggio curato. Raccontami cosa hai in mente, poi ne parliamo.",
    "guide": "La tua guida alla conversazione",
    "sceneAlt": "Un neurone luminoso sospeso all’interno di un libro tridimensionale aperto.",
    "sceneNote": "Ogni risposta crea una nuova connessione.",
    "pause": "Pausa animazione",
    "play": "Riprendi animazione",
    "steps": [
      "Presentazione",
      "Direzione",
      "La tua idea",
      "Tempistiche"
    ],
    "questions": [
      "Prima di tutto, come ti chiami?",
      "Cosa ti porta qui?",
      "Quale sarebbe un buon risultato?",
      "Quando vorresti iniziare?"
    ],
    "hints": [
      "Basta il nome. Aggiungi l’azienda se è utile.",
      "Scegli l’opzione più vicina. Nel prossimo passo potrai raccontare di più.",
      "Un problema, una possibilità o qualcosa che vorresti costruire. Bastano poche frasi.",
      "Va bene una stima. Serve solo a inquadrare la conversazione."
    ],
    "name": "Il tuo nome",
    "namePlaceholder": "Come vorresti essere chiamato?",
    "company": "Azienda / organizzazione",
    "optional": "facoltativo",
    "idea": "La tua idea",
    "ideaPlaceholder": "Stiamo lavorando a… La parte su cui vorremmo aiuto è…",
    "topics": [
      "Document intelligence e AI",
      "Previsioni e analisi finanziaria",
      "Reporting e business intelligence",
      "Consulenza Italia–Turchia",
      "Qualcos’altro"
    ],
    "timings": [
      "Il prima possibile",
      "Nei prossimi 1–3 mesi",
      "Più avanti quest’anno",
      "Sto solo esplorando"
    ],
    "next": "Continua",
    "back": "Indietro",
    "review": "Rivedi il messaggio",
    "step": "Domanda",
    "of": "di",
    "nameError": "Inserisci il tuo nome.",
    "ideaError": "Aggiungi almeno 20 caratteri per aiutarmi a capire la tua idea.",
    "previewTitle": "La tua prima pagina è pronta.",
    "previewHint": "Rendila tua, poi scegli dove continuare.",
    "messageLabel": "Il tuo messaggio",
    "whatsapp": "Apri WhatsApp",
    "outlook": "Apri l’app Outlook",
    "email": "Apri l’app email",
    "outlookWeb": "Outlook nel browser",
    "mailHint": "Su desktop, il pulsante email apre l’app di posta predefinita. Imposta Outlook come predefinita per usarla qui.",
    "sendNote": "Rivedi e invii il messaggio nell’app. Nulla viene inviato automaticamente.",
    "privacy": "Le risposte restano in questa pagina finché non scegli un’app di messaggistica. Nessun account necessario.",
    "edit": "Modifica le risposte",
    "copy": "Copia messaggio",
    "copied": "Copiato",
    "copyFailed": "Seleziona e copia il messaggio qui sopra.",
    "direct": "Preferisci iniziare direttamente?",
    "careerLink": "Cerchi il mio percorso? Esplora i Capitoli",
    "greeting": "Ciao Bumin,",
    "introduction": "Mi chiamo",
    "from": "di",
    "interest": "Vorrei parlare di",
    "timingLabel": "Tempistiche",
    "closing": "Saresti disponibile per discutere i prossimi passi?",
    "subject": "Richiesta di progetto"
  },
  "controls": {
    "hero": "AI applicata e analisi finanziaria per decisioni aziendali più chiare.",
    "intro": "Aiuto i team finanziari e operativi a trasformare code di documenti, previsioni e report frammentati in flussi di lavoro verificabili e utilizzabili.",
    "directory": "Servizi e progetti",
    "about": "Profilo / CV",
    "approach": "Approccio",
    "home": "Home",
    "service": "Servizio",
    "research": "Progetto di ricerca",
    "synthetic": "Dimostrazione sintetica",
    "browse": "Esplora i progetti",
    "contact": "Parliamo del tuo progetto",
    "read": "Leggi questo volume",
    "takeaway": "Cosa ricevi / impari",
    "collection": "Una biblioteca di lavoro",
    "collectionNote": "Quattro servizi, due progetti di ricerca e una dimostrazione sintetica. Apri un volume per esaminarne ambito, prove e limiti.",
    "shelfTitle": "Prendi un libro dallo scaffale.",
    "shelfNote": "Esplora gli stessi sette volumi nella biblioteca interattiva.",
    "activate": "Entra nella biblioteca 3D",
    "exit": "Torna al catalogo",
    "pause": "Pausa il movimento decorativo",
    "play": "Riprendi il movimento decorativo",
    "shelfLoading": "Preparazione della biblioteca…",
    "shelfFailed": "La biblioteca interattiva non si è caricata. Tutti i volumi restano disponibili nel catalogo.",
    "boundary": "Il coordinamento commerciale Italia–Turchia è un servizio separato con un ambito definito. Le attività regolamentate in materia legale, fiscale, contabile e di investimento restano affidate a professionisti abilitati.",
    "view": "Vista di lettura",
    "article": "Articolo",
    "book": "Libro",
    "contents": "In questo volume",
    "readingFailed": "La vista libro non si è caricata. Puoi leggere l’articolo completo qui sotto.",
    "print": "Stampa / salva articolo",
    "offered": "Cosa è incluso",
    "launchOptimizer": "Apri l’ottimizzatore sintetico",
    "optimizerFailed": "Lo strumento non si è caricato. Metodi, esempi e limiti restano disponibili in questo articolo.",
    "simple": "Scrivi un messaggio",
    "guided": "Usa le domande guidate",
    "topic": "Argomento",
    "timing": "Tempistiche",
    "regenerate": "Sostituisci la bozza con le risposte attuali",
    "email": "Apri bozza email",
    "whatsapp": "Apri bozza WhatsApp",
    "outlook": "Apri bozza Outlook",
    "contactIntro": "Descrivi il problema o il risultato che hai in mente. Puoi scrivere direttamente o usare alcune domande facoltative per formulare il messaggio.",
    "messageRequired": "Aggiungi un messaggio.",
    "copyFallback": "Se l’app email non si apre, copia il messaggio e incollalo nell’app che preferisci.",
    "longDraft": "Questa bozza è lunga per un collegamento all’app. Copiala e incollala nella tua app email o WhatsApp.",
    "scene": "Esplora la scultura del libro",
    "closeScene": "Chiudi la scultura",
    "optionalDetails": "Nome, argomento e tempistiche (facoltativi)"
  }
}
```

### /it/volumes/document-intelligence

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "document-intelligence",
    "kind": "service",
    "href": "/volumes/document-intelligence",
    "motifKey": "brackets",
    "color": "#182a43",
    "foil": "#c87046",
    "palette": {
      "paper": "#1b1613",
      "paperDeep": "#120e0b",
      "paperPale": "#f1eadf",
      "ink": "#f4eee6",
      "inkSoft": "#b9b4ae",
      "wall": "#1b1613",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f4d7b9",
      "fill": "#c2a184"
    },
    "width": 1.02,
    "height": 1.58,
    "depth": 0.26,
    "seed": 11
  },
  "title": "La Pila Non Letta",
  "discipline": "Document intelligence",
  "note": "Il documento che nessuno ha tempo di leggere — e il collo di bottiglia è una persona sola.",
  "deck": "Contratti, fatture, dichiarazioni, polizze — letti a mano, dipendenti da una persona sola e in modo incoerente da persona a persona. Il costo raramente è la lettura. È la clausola di rinnovo scoperta dopo il rinnovo, e la decisione che sei mesi dopo nessuno sa ricostruire.",
  "theme": "Una coda che solo una persona sa smaltire",
  "binding": "Incarico cliente · pilota delimitato",
  "format": "Un flusso su un tipo di documento, valutato sui vostri esempi",
  "roman": "I",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "I",
        "discipline": "Document intelligence",
        "title": "La Pila Non Letta",
        "note": "Il documento che nessuno ha tempo di leggere — e il collo di bottiglia è una persona sola."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Il problema",
        "body": "Qualcuno nel tuo team legge lo stesso tipo di documento in continuazione: contratti fornitori, fatture in entrata, polizze, report di sostenibilità. La lettura è lenta, cambia da persona a persona e, quando mesi dopo una decisione viene messa in discussione, non c’è traccia del perché quel documento sia stato trattato così."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "A chi serve",
        "body": "Team con una coda ricorrente di documenti dove il collo di bottiglia è il giudizio di una persona. Funziona meglio dove sbagliare costa, perché lì il risultato deve essere difendibile prima che veloce."
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "Cosa ti resta",
        "lede": "Un flusso di lavoro delimitato su un tipo di documento, con una valutazione leggibile e un percorso di eccezione per tutto ciò che il modello non deve decidere da solo.",
        "items": [
          "Una pipeline che trasforma un documento in campi strutturati, conservando per ciascuno il passaggio di origine.",
          "Una valutazione su un campione etichettato dal tuo team, che riporta dove il sistema concorda con i tuoi revisori e dove no."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "Cosa ti resta",
        "items": [
          "Una coda di eccezioni: i casi instradati a una persona e la regola che decide cosa ci finisce.",
          "Un resoconto scritto delle modalità di errore emerse in valutazione."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Registro delle prove",
        "body": "Il caso di studio sul greenwashing è la versione onesta di questo lavoro: mostra un rilevatore che segue da vicino il giudizio esperto su un punteggio continuo, pur mancando la maggior parte degli elementi che dovrebbe segnalare, e spiega perché questa combinazione lo rende uno strumento di triage e non un filtro."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 01",
        "lede": "Guardiamo esempi reali del documento e la decisione che ne discende, e concordiamo cosa significhi «corretto» prima di costruire qualsiasi cosa.",
        "items": [
          {
            "term": "Discovery",
            "detail": "Una definizione scritta del problema, con la decisione, il tipo di documento e la definizione di risultato corretto."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 02",
        "lede": "Un tipo di documento, un flusso. Il tuo team etichetta un campione; io ci lavoro sopra e valuto su esempi tenuti da parte.",
        "items": [
          {
            "term": "Pilota delimitato",
            "detail": "Una pipeline funzionante, risultati di valutazione sui tuoi documenti e il processo di revisione delle eccezioni."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 03",
        "lede": "La pipeline viene integrata dove il lavoro avviene davvero, con il passaggio di revisione presente dal primo giorno.",
        "items": [
          {
            "term": "Consegna",
            "detail": "Flusso in produzione, runbook e il monitoraggio che segnala quando la qualità si degrada."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 04",
        "lede": "Il tuo team lo gestisce. Documento come rivalutarlo quando i documenti cambiano, perché cambieranno.",
        "items": [
          {
            "term": "Passaggio di consegne",
            "detail": "Documentazione, impianto di valutazione e una sessione con chi lo prenderà in carico."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Provenienza dei dati",
        "items": [
          "Un campione rappresentativo dei documenti, compresi quelli scomodi.",
          "Accesso a una persona che possa dire com’è fatto un risultato corretto.",
          "Tempo dei tuoi revisori per etichettare un campione — di solito è il vero vincolo.",
          "Chiarezza su cosa può uscire dalla vostra infrastruttura e cosa no."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "Cosa è incluso",
        "items": [
          "Estrazione, classificazione, ordinamento e instradamento su un tipo di documento definito.",
          "Valutazione rispetto a etichette prodotte dal tuo team.",
          "Il processo di eccezione e l’interfaccia in cui lavora chi rivede."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Limiti",
        "items": [
          "Decisioni non presidiate. Tutto ciò che ha conseguenze mantiene una persona nel ciclo.",
          "Pareri legali, fiscali o di revisione su cosa significhi un documento.",
          "Un sistema generico che gestisca qualsiasi documento abbiate. I piloti riguardano un solo tipo."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Hai un problema di questa forma?",
        "name": "Pilota di document intelligence",
        "output": "Un flusso delimitato, risultati di valutazione sui tuoi documenti e un processo di revisione delle eccezioni."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "Sostituirà la persona che oggi li legge?",
        "body": "No, e non lo costruirei così. Cambia cosa legge per prima e le dà la ragione dell’ordinamento. Nel progetto di ricerca dietro questo servizio, il rilevatore migliore mancava comunque la maggior parte degli elementi che un revisore avrebbe segnalato — ed è esattamente per questo che il passaggio di revisione resta."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "I nostri dati escono dai nostri sistemi?",
        "body": "È una decisione che prendiamo in discovery, non un’impostazione predefinita. Alcuni approcci girano interamente sulla vostra infrastruttura; altri usano un modello ospitato, il che significa che il testo del documento va a quel fornitore. Vi dico quale serve prima di impegnarci."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "Quanto è accurato?",
        "body": "Non è rispondibile prima di avere i vostri documenti e le vostre etichette. Qualsiasi numero citato prima riguarda i dati di qualcun altro. Stabilire il numero per i vostri è ciò a cui serve il pilota."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "E se la valutazione dicesse che non funziona abbastanza bene?",
        "body": "Allora quello è il risultato del pilota e avete speso una cifra delimitata per scoprirlo. È proprio per questo esito che il pilota è piccolo e valutato prima di qualsiasi integrazione."
      }
    },
    {
      "id": "stack",
      "block": {
        "kind": "list",
        "heading": "Approccio",
        "items": [
          "Python",
          "spaCy",
          "Hugging Face Transformers",
          "Sentence Transformers",
          "PyTorch",
          "scikit-learn"
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Hai una coda di documenti che rallenta una decisione?",
        "body": "Dimmi quale documento e quale decisione, e ti dirò se vale la pena fare un pilota.",
        "cta": "Parliamo di un pilota di document intelligence",
        "href": "/it/contact?topic=document-intelligence"
      }
    }
  ]
}
```

### /it/volumes/forecasting

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "forecasting",
    "kind": "service",
    "href": "/volumes/forecasting",
    "motifKey": "paths",
    "color": "#c24d24",
    "foil": "#efc16d",
    "palette": {
      "paper": "#1e1813",
      "paperDeep": "#130f0b",
      "paperPale": "#f4ece1",
      "ink": "#f6efe6",
      "inkSoft": "#c0b3a6",
      "wall": "#1e1813",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f7d9ad",
      "fill": "#c99a6a"
    },
    "width": 1.1,
    "height": 1.46,
    "depth": 0.29,
    "seed": 22
  },
  "title": "Il Numero Nudo",
  "discipline": "Previsione & analisi finanziaria",
  "note": "Una cifra sola, presentata come certezza e pianificata come un fatto.",
  "deck": "Dovete impegnarvi ora su qualcosa che dipende da dopo — magazzino, cassa, prezzo, capacità. Il foglio restituisce un numero solo e nessuno sa dire quanto possa essere sbagliato: così il piano non ha alternative dentro e la sorpresa arriva a prezzo pieno.",
  "theme": "Un piano senza spazio per sbagliarsi",
  "binding": "Incarico cliente · prima la valutazione",
  "format": "Un confronto con la baseline, un approccio di validazione e una raccomandazione",
  "roman": "II",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "II",
        "discipline": "Previsione & analisi finanziaria",
        "title": "Il Numero Nudo",
        "note": "Una cifra sola, presentata come certezza e pianificata come un fatto."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Il problema",
        "body": "Devi decidere ora qualcosa che dipende da cosa succederà dopo — quanto tenere a magazzino, se la cassa copre i prossimi due trimestri, se un cambio di prezzo si ripaga. Il foglio di calcolo che risponde produce un numero solo, e nessuno sa dire quanto quel numero possa essere sbagliato."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "A chi serve",
        "body": "Team di finanza e operations che prendono decisioni ricorrenti in condizioni di incertezza: pianificazione della domanda e della cassa, prezzi, capacità, scenari per il consiglio."
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "Cosa ti resta",
        "lede": "Un modello interrogabile, confrontato con la baseline semplice che deve battere, con l’incertezza dichiarata e non sottintesa.",
        "items": [
          "Una previsione con intervalli e una validazione che mostra come si è comportata su periodi mai visti.",
          "Un confronto con una baseline naive, perché un modello che non batte il numero del mese scorso non vale la manutenzione.",
          "Le ipotesi scritte come parametri modificabili, non come costanti sepolte nel codice."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "Cosa ti resta",
        "items": [
          "Una raccomandazione: proseguire, tenerlo semplice o fermarsi."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Registro delle prove",
        "body": "L’ottimizzatore di portafoglio su questa pagina è il metodo reso ispezionabile: ipotesi visibili, view modificabili ed esiti mostrati come distribuzione anziché come proiezione. Gira su ipotesi di mercato inventate, ed è dichiarato apertamente — dimostra come costruisco, non cosa farà un mercato."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 01",
        "lede": "Individuiamo la decisione a cui la previsione serve e quanta accuratezza le occorra davvero. Spesso meno del previsto.",
        "items": [
          {
            "term": "Discovery",
            "detail": "La decisione, la sua cadenza e l’accuratezza che la cambierebbe — messe per iscritto."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 02",
        "lede": "Stabilisco cosa ottiene una previsione naive sul vostro storico, poi verifico se qualcosa di più elaborato la batte.",
        "items": [
          {
            "term": "Baseline e valutazione",
            "detail": "Un confronto con la baseline, un approccio di validazione e un passo successivo raccomandato."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 03",
        "lede": "Il modello scelto viene costruito dove il vostro team può eseguirlo, con gli intervalli in evidenza e non nascosti.",
        "items": [
          {
            "term": "Consegna",
            "detail": "Il modello, la sua interfaccia e la documentazione di ogni ipotesi."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 04",
        "lede": "La rivalidazione fa parte della consegna: come accorgersi che il modello ha smesso di funzionare.",
        "items": [
          {
            "term": "Passaggio di consegne",
            "detail": "Runbook, procedura di rivalidazione e il monitoraggio che la sostiene."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Provenienza dei dati",
        "items": [
          "Storico al livello di dettaglio a cui si prende la decisione, con le sue lacune note.",
          "La decisione stessa e chi la prende.",
          "Le regole strutturali che l’esito attraversa — scaglioni fiscali, soglie, covenant.",
          "Gli eventi una tantum noti nello storico, così da non impararli come schemi."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "Cosa è incluso",
        "items": [
          "Previsione su serie storiche, modellazione di scenari, analisi di sensitività e di stress.",
          "Confronto con la baseline e validazione fuori campione.",
          "Modelli finanziari con le ipotesi esposte."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Limiti",
        "items": [
          "Previsioni di prezzi di mercato e qualsiasi suggerimento che una previsione elimini l’incertezza.",
          "Consulenza in materia di investimenti, gestione di portafoglio o negoziazione di qualsiasi tipo.",
          "Accuratezza garantita. Ciò che è ottenibile si stabilisce con la validazione, non si promette prima."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Hai un problema di questa forma?",
        "name": "Valutazione previsionale",
        "output": "Un confronto con la baseline, un approccio di validazione e un passo successivo raccomandato."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "Quanto sarà accurata la previsione?",
        "body": "Non è conoscibile prima di averla validata sul vostro storico. La valutazione serve a rispondere onestamente, e a volte la risposta è che una baseline semplice basta già e non conviene pagare di più."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "Il nostro storico è disordinato e incompleto. È squalificante?",
        "body": "No, ma cambia ciò che è ottenibile e va detto subito. Parte della valutazione è stabilire cosa i dati sosterranno e cosa no."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "Potete prevedere il nostro titolo o un mercato?",
        "body": "No. Non prendo quel tipo di lavoro, e chi ve lo offre con sicurezza vi sta dicendo qualcosa su di sé."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "Perché insistete nel mostrare un intervallo?",
        "body": "Perché l’intervallo è la parte rilevante per la decisione. Un numero solo invita a un piano privo di alternative."
      }
    },
    {
      "id": "stack",
      "block": {
        "kind": "list",
        "heading": "Approccio",
        "items": [
          "Python",
          "pandas",
          "statsmodels",
          "scikit-learn",
          "PyTorch",
          "SQL"
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Stai prendendo una decisione che dipende da una previsione?",
        "body": "Descrivi la decisione e i dati che hai, e ti dirò cosa è realisticamente ottenibile.",
        "cta": "Parliamo di una valutazione previsionale",
        "href": "/it/contact?topic=forecasting"
      }
    }
  ]
}
```

### /it/volumes/reporting

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "reporting",
    "kind": "service",
    "href": "/volumes/reporting",
    "motifKey": "caret",
    "color": "#afc400",
    "foil": "#171a16",
    "palette": {
      "paper": "#1c1a11",
      "paperDeep": "#12110a",
      "paperPale": "#eef0e2",
      "ink": "#f1f3e8",
      "inkSoft": "#b5bba7",
      "wall": "#1c1a11",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f2e4b4",
      "fill": "#b0a377"
    },
    "width": 0.92,
    "height": 1.52,
    "depth": 0.22,
    "seed": 33
  },
  "title": "Il Mese Lungo",
  "discipline": "Business intelligence & reporting",
  "note": "Due reparti, due fatturati, e una riunione che è già passata.",
  "deck": "I numeri si assemblano a mano da più sistemi. Servono giorni, due squadre dichiarano cifre diverse per lo stesso mese, e quando il pacchetto è pronto la decisione per cui era stato costruito è già stata presa a intuito.",
  "theme": "Una settimana di tempo qualificato, ogni mese, per numeri di cui nessuno si fida",
  "binding": "Incarico cliente · prima la diagnostica",
  "format": "Valutazione dei dati di origine, definizioni scritte dei KPI, priorità",
  "roman": "III",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "III",
        "discipline": "Business intelligence & reporting",
        "title": "Il Mese Lungo",
        "note": "Due reparti, due fatturati, e una riunione che è già passata."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Il problema",
        "body": "Sostituisci un reporting mensile frammentato con un’unica vista gestionale affidabile. Oggi i numeri si assemblano a mano da più sistemi, due reparti citano cifre diverse per lo stesso mese e quando il pacchetto è pronto la riunione per cui era stato costruito è già passata."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "A chi serve",
        "body": "Imprenditori e responsabili finanziari che hanno superato i fogli di calcolo ma non hanno bisogno — e non dovrebbero comprare — una piattaforma dati enterprise."
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "Cosa ti resta",
        "lede": "Un piccolo insieme di metriche su cui tutti concordano, calcolate sempre allo stesso modo, da fonti riconciliate.",
        "items": [
          "Una valutazione dei dati di origine: cosa è affidabile, cosa è in conflitto e cosa manca.",
          "Definizioni scritte dei KPI — calcolo esatto e fonte per ciascuno, così che due persone non possano calcolarlo in modo diverso.",
          "Una vista di reporting costruita su quelle definizioni, aggiornata su base pianificata anziché a mano."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "Cosa ti resta",
        "items": [
          "Le note di riconciliazione che spiegano ogni cifra diversa da quanto un sistema riportava prima."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Registro delle prove",
        "body": "È il servizio con meno prove pubblicate alle spalle, e preferisco dirlo che gonfiarlo. Ciò che posso mostrare è l’approccio: il portale demo applica lo stesso principio a un singolo bilancio, esponendo ogni cifra con le righe da cui deriva invece di chiedervi di fidarvi del totale."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 01",
        "lede": "Si parte individuando le decisioni che il tuo team deve prendere, e si risale al più piccolo insieme di metriche che le informerebbe.",
        "items": [
          {
            "term": "Discovery",
            "detail": "Un elenco di decisioni e un insieme candidato di metriche, deliberatamente breve."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 02",
        "lede": "Riconcilio i dati di origine e trovo dove i sistemi divergono. Di solito è lì che sta il problema vero.",
        "items": [
          {
            "term": "Diagnostica",
            "detail": "Valutazione dei dati di origine, definizioni dei KPI e priorità di reporting."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 03",
        "lede": "Costruisco la vista sulle definizioni concordate, con l’aggiornamento automatizzato e la tracciabilità visibile.",
        "items": [
          {
            "term": "Consegna",
            "detail": "La vista di reporting, la sua pipeline e la documentazione di ogni definizione."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 04",
        "lede": "Il team la possiede, compreso come aggiungere una metrica senza rompere quelle già concordate.",
        "items": [
          {
            "term": "Passaggio di consegne",
            "detail": "Documentazione, una sessione guidata e la procedura per cambiare una definizione."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Provenienza dei dati",
        "items": [
          "Accesso in sola lettura ai sistemi da cui provengono i numeri.",
          "Chi oggi assembla il report — sa dove sono sepolti i cadaveri.",
          "Il pacchetto di reporting esistente, per quanto imperfetto.",
          "Un decisore che possa stabilire cosa significhi una metrica quando due reparti non concordano."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "Cosa è incluso",
        "items": [
          "Riconciliazione delle fonti, definizione delle metriche, pipeline e viste di reporting.",
          "Automazione di un report oggi assemblato a mano.",
          "Rendere una cifra tracciabile fino alle righe di origine."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Limiti",
        "items": [
          "Sostituire il vostro gestionale o ERP.",
          "Reporting civilistico o regolamentare, che resta al vostro commercialista.",
          "Una dashboard fine a sé stessa. Se le decisioni non ne hanno bisogno, ve lo dico."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Hai un problema di questa forma?",
        "name": "Diagnostica di reporting",
        "output": "Una valutazione dei dati di origine, le definizioni dei KPI e le priorità di reporting."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "Abbiamo già dashboard che nessuno guarda. In cosa è diverso?",
        "body": "Di solito quelle partono da cosa i dati possono mostrare invece che da una decisione. Partire dalla decisione è ciò che tiene l’insieme di metriche abbastanza piccolo da mantenere e abbastanza rilevante da aprire."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "Quale strumento userete?",
        "body": "Quello che avete già, dove funziona. Introdurre una nuova piattaforma è un costo che il vostro team porta dopo, quindi serve una ragione oltre alla mia familiarità."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "Due sistemi non concordano sul fatturato. Potete sistemarlo?",
        "body": "Posso trovare dove divergono e documentarlo con precisione. Decidere quale sia giusto è un giudizio aziendale, e resta a voi."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "È reporting civilistico?",
        "body": "No. Questo è reporting gestionale per decisioni interne. Il bilancio d’esercizio resta al vostro commercialista."
      }
    },
    {
      "id": "stack",
      "block": {
        "kind": "list",
        "heading": "Approccio",
        "items": [
          "SQL",
          "Python",
          "Power BI",
          "KNIME",
          "Excel"
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Passi la prima settimana di ogni mese ad assemblare un report?",
        "body": "Dimmi quali decisioni alimenta e da dove arrivano i numeri.",
        "cta": "Parliamo di una diagnostica di reporting",
        "href": "/it/contact?topic=reporting"
      }
    }
  ]
}
```

### /it/volumes/cross-border

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "cross-border",
    "kind": "service",
    "href": "/volumes/cross-border",
    "motifKey": "orbits",
    "color": "#1537a1",
    "foil": "#dbe8f1",
    "palette": {
      "paper": "#1a1614",
      "paperDeep": "#110e0c",
      "paperPale": "#e8eef6",
      "ink": "#eef3f9",
      "inkSoft": "#adb8c9",
      "wall": "#1a1614",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f4dcc0",
      "fill": "#b08f74"
    },
    "width": 1.08,
    "height": 1.68,
    "depth": 0.25,
    "seed": 44
  },
  "title": "Due Regolamenti",
  "discipline": "Consulenza transfrontaliera · Italia & Turchia",
  "note": "Due sistemi normativi insieme. L’errore costoso è non sapere quale domanda porre.",
  "deck": "Operare tra Italia e Turchia significa due sistemi normativi, due lingue e due insiemi di prassi professionali insieme. Ciò che costa raramente è il passaggio visibile: è non sapere quale professionista un dato passaggio richieda per legge, e scoprirlo tardi.",
  "theme": "Un processo bloccato su un passaggio che nessuno ha avviato",
  "binding": "Coordinamento · il lavoro regolamentato è affidato a terzi",
  "format": "Un perimetro confermato, una mappa delle responsabilità e i professionisti necessari",
  "roman": "IV",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "IV",
        "discipline": "Consulenza transfrontaliera · Italia & Turchia",
        "title": "Due Regolamenti",
        "note": "Due sistemi normativi insieme. L’errore costoso è non sapere quale domanda porre."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Il problema",
        "body": "Operare tra Italia e Turchia significa avere a che fare con due sistemi normativi, due lingue e due insiemi di prassi professionali insieme. Gli errori costosi sono raramente quelli visibili: nascono dal non sapere quali domande porre, o quale professionista sia legalmente necessario per un dato passaggio."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "A chi serve",
        "body": "Imprese e fondatori che si muovono tra il mercato italiano e quello turco e hanno bisogno di mappare il terreno prima di impegnarsi."
      }
    },
    {
      "id": "boundary",
      "block": {
        "kind": "prose",
        "heading": "Limiti",
        "body": "In Italia costituzione societaria, strutturazione fiscale, consulenza legale e contabilità civilistica sono riservate a professionisti abilitati. Quei servizi non sono forniti qui. Ciò che viene fornito è la perimetrazione e il coordinamento attorno a essi, e le presentazioni alle persone qualificate a svolgerli."
      }
    },
    {
      "id": "responsibilities-1",
      "block": {
        "kind": "pairs",
        "heading": "Il mio ruolo",
        "items": [
          {
            "term": "Cosa faccio personalmente",
            "detail": "Perimetrazione, sequenziamento, coordinamento e traduzione commerciale e culturale tra le parti."
          },
          {
            "term": "Cosa fa Alvolo Consulting",
            "detail": "Alvolo Consulting è la pratica di consulenza che ho fondato per il lavoro su questo corridoio. Gli incarichi passano da lì quando è il veicolo appropriato."
          }
        ]
      }
    },
    {
      "id": "responsibilities-2",
      "block": {
        "kind": "pairs",
        "heading": "Il mio ruolo",
        "items": [
          {
            "term": "Cosa fa un professionista abilitato",
            "detail": "Atti notarili, pratiche di costituzione, consulenza e pareri fiscali, consulenza legale, contabilità civilistica e revisione. Sono svolti da professionisti qualificati con cui avete un rapporto diretto — mai da me."
          }
        ]
      }
    },
    {
      "id": "deliverable-1",
      "block": {
        "kind": "list",
        "heading": "Cosa ti resta",
        "lede": "Un quadro chiaro di cosa la tua situazione richieda davvero, chi sia qualificato per ciascuna parte e cosa comporterà — prima di impegnarti su qualunque cosa.",
        "items": [
          "Un perimetro scritto: cosa stai cercando di fare e in quali passaggi si scompone.",
          "Una mappa delle responsabilità che indica quali passaggi richiedono un professionista abilitato e quali no.",
          "Presentazioni ai professionisti qualificati che ogni passaggio regolamentato richiede."
        ]
      }
    },
    {
      "id": "deliverable-2",
      "block": {
        "kind": "list",
        "heading": "Cosa ti resta",
        "items": [
          "La sequenza e le dipendenze, così che nulla si blocchi in attesa di un passaggio che nessuno ha avviato."
        ]
      }
    },
    {
      "id": "evidence",
      "block": {
        "kind": "prose",
        "heading": "Registro delle prove",
        "body": "Questo è lavoro di consulenza e coordinamento, e gli incarichi che ci stanno dietro sono privati. Su questo sito non c’è un caso di studio, e preferisco lasciare la lacuna visibile piuttosto che riempirla con qualcosa di non verificabile."
      }
    },
    {
      "id": "process-1",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 01",
        "lede": "Capire cosa stai davvero cercando di ottenere sul piano commerciale, prima che qualcuno parli di strutture.",
        "items": [
          {
            "term": "Discovery",
            "detail": "Una formulazione scritta dell’obiettivo commerciale e dei suoi vincoli."
          }
        ]
      }
    },
    {
      "id": "process-2",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 02",
        "lede": "Scomporre l’obiettivo in passaggi e individuare quali richiedono un professionista abilitato e in quale giurisdizione.",
        "items": [
          {
            "term": "Perimetrazione",
            "detail": "Perimetro confermato, responsabilità e partner professionali necessari."
          }
        ]
      }
    },
    {
      "id": "process-3",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 03",
        "lede": "Presentare i professionisti giusti, tenere in movimento la sequenza e tradurre tra le parti — linguisticamente e commercialmente.",
        "items": [
          {
            "term": "Coordinamento",
            "detail": "Un flusso di lavoro attivo con responsabili nominati e una sequenza visibile a tutti."
          }
        ]
      }
    },
    {
      "id": "process-4",
      "block": {
        "kind": "pairs",
        "heading": "Processo · 04",
        "lede": "I rapporti diretti con i professionisti che svolgono il lavoro regolamentato restano tuoi. È il punto, non un effetto collaterale.",
        "items": [
          {
            "term": "Passaggio di consegne",
            "detail": "Rapporti diretti e un resoconto di cosa è stato deciso e perché."
          }
        ]
      }
    },
    {
      "id": "inputs",
      "block": {
        "kind": "list",
        "heading": "Provenienza dei dati",
        "items": [
          "Cosa vuoi ottenere commercialmente, ed entro quando.",
          "La struttura societaria esistente, se c’è.",
          "I rapporti professionali che già hai in uno dei due paesi.",
          "La tua tolleranza alla complessità — alcune strutture sono legittime e comunque non valgono il peso gestionale."
        ]
      }
    },
    {
      "id": "scope-in",
      "block": {
        "kind": "list",
        "heading": "Cosa è incluso",
        "items": [
          "Perimetrazione, sequenziamento e coordinamento di un progetto transfrontaliero.",
          "Individuazione di quali professionisti regolamentati richieda un dato passaggio.",
          "Traduzione commerciale e culturale tra le parti."
        ]
      }
    },
    {
      "id": "scope-out",
      "block": {
        "kind": "list",
        "heading": "Limiti",
        "items": [
          "Consulenza fiscale, consulenza legale, atti notarili, contabilità civilistica e pratiche di costituzione societaria. Sono riservate a professionisti abilitati e non vengono svolte qui.",
          "Consulenza in materia di investimenti e qualsiasi servizio finanziario regolamentato.",
          "Qualsiasi assicurazione che un determinato esito fiscale o legale sarà ottenuto."
        ]
      }
    },
    {
      "id": "offer",
      "block": {
        "kind": "offer",
        "heading": "Hai un problema di questa forma?",
        "name": "Discovery transfrontaliera",
        "output": "Un perimetro confermato, una mappa delle responsabilità e i partner professionali necessari individuati."
      }
    },
    {
      "id": "faq-1",
      "block": {
        "kind": "prose",
        "heading": "Potete costituire la mia società italiana?",
        "body": "No. La costituzione in Italia comporta atti notarili e adempimenti riservati a professionisti abilitati. Posso definire cosa richieda la vostra situazione, dirvi quali professionisti servano e coordinare il lavoro — cosa diversa e più circoscritta dal farlo."
      }
    },
    {
      "id": "faq-2",
      "block": {
        "kind": "prose",
        "heading": "Potete consigliarmi sulla mia posizione fiscale?",
        "body": "No. La consulenza fiscale è regolamentata e spetta a un commercialista o a un avvocato tributarista. Posso assicurarmi che le domande giuste arrivino a loro e che le risposte siano comprese da entrambe le parti."
      }
    },
    {
      "id": "faq-3",
      "block": {
        "kind": "prose",
        "heading": "Allora per cosa vi sto pagando?",
        "body": "Per sapere in cosa consiste davvero il progetto, quale professionista serva a ciascun passaggio e come tenere in movimento un processo tra due lingue e due sistemi. È coordinamento, ed è giusto essere precisi sui suoi limiti."
      }
    },
    {
      "id": "faq-4",
      "block": {
        "kind": "prose",
        "heading": "Garantite un risultato?",
        "body": "No. Nessuno in condizione di esservi onesto lo fa, e qui gli esiti dipendono da autorità e professionisti che nessuno dei due controlla."
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Stai spostando un’attività tra Italia e Turchia?",
        "body": "Descrivi cosa vuoi fare e ti dirò cosa comporta davvero — comprese le parti che affiderei ad altri.",
        "cta": "Parliamo di una discovery transfrontaliera",
        "href": "/it/contact?topic=cross-border"
      }
    }
  ]
}
```

### /it/volumes/greenwashing-risk-scoring

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "greenwashing-risk-scoring",
    "kind": "evidence",
    "href": "/volumes/greenwashing-risk-scoring",
    "motifKey": "modules",
    "color": "#c83222",
    "foil": "#efb0aa",
    "palette": {
      "paper": "#1e1514",
      "paperDeep": "#140d0c",
      "paperPale": "#f6e9e6",
      "ink": "#f8eeec",
      "inkSoft": "#c5aeaa",
      "wall": "#1e1514",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f7cfc6",
      "fill": "#c08278"
    },
    "width": 1,
    "height": 1.48,
    "depth": 0.3,
    "seed": 55
  },
  "title": "La Promessa Eccedente",
  "discipline": "Ricerca · document intelligence",
  "note": "Una dichiarazione che supera l’impegno. Valutata su 29 casi — e ne manca la maggior parte.",
  "deck": "Un rilevatore che ordina le dichiarazioni ambientali in base a quanto il linguaggio corra avanti rispetto all’impegno. Segue da vicino il giudizio esperto — Pearson 0,906 — e trova comunque al massimo il 40% di ciò che un revisore segnalerebbe. È pubblicato qui perché è il secondo numero a decidere come possa essere usato.",
  "theme": "Una coda di lettura senza un ordine difendibile",
  "binding": "Ricerca · repository pubblico",
  "format": "Punteggi per dichiarazione, un impianto di validazione e i numeri che non hanno retto",
  "roman": "V",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "V",
        "discipline": "Ricerca · document intelligence",
        "title": "La Promessa Eccedente",
        "note": "Una dichiarazione che supera l’impegno. Valutata su 29 casi — e ne manca la maggior parte."
      }
    },
    {
      "id": "maturity",
      "block": {
        "kind": "prose",
        "heading": "Ricerca",
        "body": "Lavoro di indagine con un artefatto pubblicato. Non installato e non usato da nessuno."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Il problema",
        "body": "Un analista di sostenibilità che legge le comunicazioni aziendali deve decidere quali dichiarazioni ambientali meritino di essere contestate. Le dichiarazioni che contano sono raramente false in modo netto: sono vaghe dove dovrebbero essere specifiche. La lettura è lenta, soggettiva e difficile da difendere quando due analisti non concordano."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "A chi serve",
        "body": "Analisti di sostenibilità ed ESG, e i team di rischio che devono motivare perché una specifica dichiarazione sia stata segnalata."
      }
    },
    {
      "id": "context",
      "block": {
        "kind": "prose",
        "heading": "Contesto",
        "body": "È nato come tesi magistrale alla Bocconi ed è diventato un codice funzionante con un impianto di validazione. È ricerca: non è mai stato installato presso un cliente e non ha utenti in produzione."
      }
    },
    {
      "id": "role",
      "block": {
        "kind": "prose",
        "heading": "Il mio ruolo",
        "body": "Ho progettato e sviluppato l’intero sistema — estrazione delle dichiarazioni, componenti di punteggio, questionario usato per raccogliere i giudizi esperti e script di validazione che producono i numeri qui sotto."
      }
    },
    {
      "id": "data",
      "block": {
        "kind": "prose",
        "heading": "Provenienza dei dati",
        "body": "Dichiarazioni ambientali estratte da comunicazioni aziendali pubbliche. I giudizi di riferimento sono valutazioni umane raccolte con un questionario strutturato e conservate nel repository insieme al codice."
      }
    },
    {
      "id": "constraints",
      "block": {
        "kind": "prose",
        "heading": "Vincoli",
        "body": "Un insieme di riferimento di ventinove dichiarazioni valutate. Era il limite onesto del tempo di valutazione esperta disponibile, e vincola ogni conclusione che ne deriva."
      }
    },
    {
      "id": "approach-1",
      "block": {
        "kind": "list",
        "heading": "Approccio",
        "items": [
          "Estrarre singole dichiarazioni ambientali con spaCy invece di valutare il documento nel suo insieme, così che un punteggio sia sempre riconducibile a una frase.",
          "Valutare ogni dichiarazione su più componenti — densità lessicale del linguaggio promozionale, specificità semantica tramite ClimateBERT, somiglianza a schemi narrativi noti tramite Sentence Transformers — combinandole con pesi tenuti in un unico file di configurazione."
        ]
      }
    },
    {
      "id": "approach-2",
      "block": {
        "kind": "list",
        "heading": "Approccio",
        "items": [
          "Validare con metriche di correlazione ed errore, non con la sola accuratezza, perché la grandezza sottostante è un grado di rischio e non una classe.",
          "Tenere tre versioni del rilevatore affiancate sullo stesso insieme, invece di riportare solo quella che appare migliore."
        ]
      }
    },
    {
      "id": "decisions-1",
      "block": {
        "kind": "pairs",
        "heading": "Decisioni che hanno contato",
        "items": [
          {
            "term": "Riportata la correlazione e l’errore rispetto ai giudizi continui prima di qualsiasi accuratezza binaria.",
            "detail": "Il rischio di greenwashing è una questione di grado. Binarizzarlo per primo avrebbe nascosto che il modello segue bene il giudizio dell’analista pur restando un filtro debole."
          }
        ]
      }
    },
    {
      "id": "decisions-2",
      "block": {
        "kind": "pairs",
        "heading": "Decisioni che hanno contato",
        "items": [
          {
            "term": "Mantenuta la versione lessicale semplice (v1) come modello di riferimento pur avendo una versione transformer.",
            "detail": "La versione semantica (v2) correlava peggio — 0,557 contro 0,906 — ed è stata ritirata. Usare l’architettura più sofisticata avrebbe prodotto una storia migliore e uno strumento peggiore."
          }
        ]
      }
    },
    {
      "id": "decisions-3",
      "block": {
        "kind": "pairs",
        "heading": "Decisioni che hanno contato",
        "items": [
          {
            "term": "La v3 è stata tarata verso il richiamo mantenendo la precisione a 1,00.",
            "detail": "Uno strumento di supporto che lancia un falso allarme consuma fiducia molto più in fretta di uno che resta silenzioso. Le omissioni si recuperano leggendo; un’accusa sbagliata no."
          }
        ]
      }
    },
    {
      "id": "figure",
      "block": {
        "kind": "figure",
        "heading": "Figura",
        "slug": "greenwashing-risk-scoring",
        "caption": "Punteggio del rilevatore rispetto al giudizio esperto per ciascuna delle 29 dichiarazioni valutate, con il confronto tra le tre versioni. Riprodotto dall’output di validazione del repository, 29 gennaio 2026.",
        "alt": "Un confronto tra tre versioni del rilevatore rispetto ai giudizi esperti su 29 dichiarazioni. La versione 1 ha la correlazione più alta, Pearson 0,906, con errore assoluto medio 0,206; la versione 3 raggiunge 0,793 con errore 0,256; la versione 2 è la più debole a 0,557 ed è stata ritirata. Nella segnalazione binaria la versione 1 individua il 15% delle dichiarazioni segnalabili e la versione 3 il 40%, entrambe con precisione del 100%.",
        "synthetic": false
      }
    },
    {
      "id": "baseline",
      "block": {
        "kind": "prose",
        "heading": "Riferimento",
        "body": "Due confronti interni: un rilevatore a densità di parole chiave e le precedenti versioni v1 e v2 valutate sulle stesse dichiarazioni. Non esiste un benchmark esterno pubblicato per questo compito."
      }
    },
    {
      "id": "evaluation",
      "block": {
        "kind": "prose",
        "heading": "Come è stato valutato",
        "body": "Ogni versione è valutata sulle stesse 29 dichiarazioni giudicate da esperti. L’accordo continuo è misurato con le correlazioni di Pearson, Spearman e Kendall più MAE e RMSE; il comportamento di segnalazione con precisione, richiamo e F1. L’affidabilità tra valutatori è riportata perché il tetto umano sia visibile. I dati pubblicati sono stati rieseguiti e riprodotti il 29 gennaio 2026."
      }
    },
    {
      "id": "results",
      "block": {
        "kind": "list",
        "heading": "Risultati",
        "items": [
          "Il rilevatore v1 segue da vicino i giudizi esperti: Pearson r = 0,906, Spearman 0,811, MAE 0,206.",
          "Come strumento di segnalazione è debole. La v1 individua il 15% delle dichiarazioni segnalabili; la v3 a regole, tarata, arriva al 40% con F1 0,571.",
          "Nessuna versione ha prodotto falsi positivi su questo insieme — precisione 1,00 — ma su ventinove elementi si tratta di una manciata di decisioni corrette, non di una proprietà del metodo.",
          "I valutatori umani concordano a un alfa di Krippendorff di 0,69, che è il tetto rispetto al quale ogni modello viene misurato."
        ]
      }
    },
    {
      "id": "deliverables",
      "block": {
        "kind": "list",
        "heading": "Cosa è stato consegnato",
        "items": [
          "Un pacchetto Python che trasforma un documento in punteggi per dichiarazione, con le componenti che vi contribuiscono esposte.",
          "Un impianto di validazione che rigenera ogni metrica pubblicata a partire dai giudizi conservati.",
          "Relazioni scritte su algoritmo, versioni del rilevatore e confronto delle prestazioni."
        ]
      }
    },
    {
      "id": "consequences",
      "block": {
        "kind": "prose",
        "heading": "Cosa cambia nella pratica",
        "body": "Usato come previsto, accorcia la coda invece di svuotarla: l’analista legge per prime le dichiarazioni con punteggio più alto e dispone di una scomposizione delle componenti da mostrare per spiegare l’ordinamento. Non riduce il numero di dichiarazioni che alla fine una persona deve leggere."
      }
    },
    {
      "id": "limitations",
      "block": {
        "kind": "list",
        "heading": "Limiti",
        "items": [
          "Ventinove dichiarazioni valutate. Ogni numero qui porta un’ampia incertezza e nessuno si generalizza a un nuovo corpus senza rivalutazione.",
          "Il punteggio è un segnale di ordinamento. Non è una probabilità calibrata, e un punteggio alto non è la constatazione che un’azienda abbia fatto greenwashing.",
          "Richiamo di 0,40 nel caso migliore. La maggior parte delle dichiarazioni segnalabili resta comunque non individuata.",
          "Valutato solo su comunicazioni aziendali in lingua inglese.",
          "I pesi sono stati tarati sullo stesso piccolo insieme su cui vengono riportati, quindi i numeri sono ottimistici."
        ]
      }
    },
    {
      "id": "human-review",
      "block": {
        "kind": "prose",
        "heading": "Revisione umana",
        "body": "Ogni punteggio è rivisto da una persona prima di arrivare a una conclusione. Il sistema ordina e spiega; non emette mai un verdetto su un’azienda."
      }
    },
    {
      "id": "evidence-1",
      "block": {
        "kind": "evidence",
        "heading": "Registro delle prove · 01",
        "lede": "Ogni cifra citata sopra, con la sua fonte e ciò che non dice.",
        "entries": [
          {
            "metric": "Evaluation set",
            "value": "29 claims",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Environmental claims extracted from corporate communications and rated for greenwashing risk by human reviewers, forming the reference set the detector is scored against. Human expert ratings collected via a structured questionnaire, then used as ground truth.",
            "asOf": "2026-01-29",
            "limitations": "Twenty-nine items is a small evaluation set. Every figure derived from it carries wide uncertainty and none of it should be read as a population estimate."
          }
        ]
      }
    },
    {
      "id": "evidence-2",
      "block": {
        "kind": "evidence",
        "heading": "Registro delle prove · 02",
        "lede": "",
        "entries": [
          {
            "metric": "Krippendorff's α",
            "value": "0.69",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Agreement between the human raters who produced the reference ratings. Krippendorff's alpha across raters; pairwise agreement ≈ 0.852.",
            "asOf": "2026-01-29",
            "limitations": "α = 0.69 is substantial but not strong agreement: the humans themselves disagree on roughly a third of the signal, which caps how well any model can be expected to match them."
          }
        ]
      }
    },
    {
      "id": "evidence-3",
      "block": {
        "kind": "evidence",
        "heading": "Registro delle prove · 03",
        "lede": "",
        "entries": [
          {
            "metric": "Pearson r (v1)",
            "value": "0.906",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Correlation between the v1 detector score and the human reference rating, over the 29-claim set. Pearson correlation on continuous scores. Spearman 0.811, Kendall 0.627, MAE 0.206, RMSE 0.237.",
            "baseline": "v3 rule-based detector, r = 0.793; v2 semantic detector, r = 0.557.",
            "asOf": "2026-01-29",
            "limitations": "Correlation on 29 items. It says the score moves with reviewer judgement, not that the score is calibrated as a probability of greenwashing."
          }
        ]
      }
    },
    {
      "id": "evidence-4",
      "block": {
        "kind": "evidence",
        "heading": "Registro delle prove · 04",
        "lede": "",
        "entries": [
          {
            "metric": "Recall / precision (v3)",
            "value": "0.40 recall at 1.00 precision",
            "source": "greenwashing-detection · PERFORMANCE_REPORT.md",
            "sourceUrl": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "method": "Binary flag / no-flag performance of the v3 rule-based detector against the human reference labels. Thresholded score compared with binarised human labels on the same 29-claim set.",
            "baseline": "v1 baseline: recall 0.15 at precision 1.00 (F1 0.261). v3 reaches F1 0.571.",
            "asOf": "2026-01-29",
            "limitations": "Recall of 0.40 means roughly three in five flaggable claims are missed. Precision of 1.00 on a set this small is a handful of correct positives, not a guarantee. The tool is a reviewer aid; it cannot be a filter that runs unattended."
          }
        ]
      }
    },
    {
      "id": "sources",
      "block": {
        "kind": "links",
        "heading": "Materiale di origine",
        "items": [
          {
            "label": "Repository",
            "href": "https://github.com/bumincetin/greenwashing-detection",
            "external": true
          },
          {
            "label": "Relazione sulle prestazioni",
            "href": "https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md",
            "external": true
          }
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Hai un problema di questa forma?",
        "body": "Dimmi che cosa stai cercando di decidere e ti dirò se questo approccio è adatto. Servizio collegato: Document intelligence.",
        "cta": "Parliamo del tuo progetto",
        "href": "/it/contact?topic=document-intelligence"
      }
    }
  ]
}
```

### /it/volumes/parliamentary-seat-forecast

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "parliamentary-seat-forecast",
    "kind": "evidence",
    "href": "/volumes/parliamentary-seat-forecast",
    "motifKey": "frames",
    "color": "#da3b2f",
    "foil": "#ff8eab",
    "palette": {
      "paper": "#1f1615",
      "paperDeep": "#150e0c",
      "paperPale": "#f7e9ec",
      "ink": "#f9eff1",
      "inkSoft": "#c7adb3",
      "wall": "#1f1615",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f9cdd6",
      "fill": "#c2808f"
    },
    "width": 0.96,
    "height": 1.57,
    "depth": 0.24,
    "seed": 66
  },
  "title": "Il Salto di Soglia",
  "discipline": "Ricerca · previsione",
  "note": "Se un esito attraversa una soglia, è la soglia che va modellata.",
  "deck": "Una tesi triennale che ha trattato un’elezione come un problema di previsione. L’incertezza interessante non è mai stata nei sondaggi: stava in una regola dove una frazione di punto da una parte o dall’altra di una soglia cambia del tutto la risposta. Scaglioni fiscali, covenant e soglie di volume si comportano allo stesso modo.",
  "theme": "Una previsione che appiana proprio la parte che conta",
  "binding": "Ricerca · repository pubblico",
  "format": "Metodo, provenienza dei dati, e nessuna dichiarazione di accuratezza perché nessuna è pubblicata",
  "roman": "VI",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "VI",
        "discipline": "Ricerca · previsione",
        "title": "Il Salto di Soglia",
        "note": "Se un esito attraversa una soglia, è la soglia che va modellata."
      }
    },
    {
      "id": "maturity",
      "block": {
        "kind": "prose",
        "heading": "Ricerca",
        "body": "Lavoro di indagine con un artefatto pubblicato. Non installato e non usato da nessuno."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Il problema",
        "body": "I sondaggi sulle quote di voto non rispondono alla domanda che le persone si pongono davvero. Con la ripartizione D’Hondt e una soglia di sbarramento, piccole variazioni di quota producono variazioni grandi e discontinue nei seggi: l’incertezza interessante vive in quella conversione, non nei sondaggi."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "A chi serve",
        "body": "Un pubblico metodologico. È pubblicato qui come prova di come affronto la previsione sotto regole strutturali, non come analisi politica."
      }
    },
    {
      "id": "context",
      "block": {
        "kind": "prose",
        "heading": "Contesto",
        "body": "La mia tesi triennale in Economia, Management e Informatica alla Bocconi, conclusa nel 2023. È ricerca e non è più mantenuta da allora."
      }
    },
    {
      "id": "role",
      "block": {
        "kind": "prose",
        "heading": "Il mio ruolo",
        "body": "Autore unico: raccolta dati, modellazione e stesura della tesi."
      }
    },
    {
      "id": "data",
      "block": {
        "kind": "prose",
        "heading": "Provenienza dei dati",
        "body": "Risultati storici pubblicati dal Consiglio elettorale supremo (YSK), indicatori demografici e socio-economici dell’Istituto statistico turco (TurkStat), sondaggi pubblici e file dei confini amministrativi."
      }
    },
    {
      "id": "constraints",
      "block": {
        "kind": "prose",
        "heading": "Vincoli",
        "body": "Solo dati pubblicati a livello provinciale e uno storico di sondaggi la cui accuratezza passata è essa stessa incerta — il che spinge il lavoro a modellare le regole di conversione invece di cercare di battere i sondaggi."
      }
    },
    {
      "id": "approach-1",
      "block": {
        "kind": "list",
        "heading": "Approccio",
        "items": [
          "Assemblare i risultati storici provinciali e allinearli agli indicatori demografici e socio-economici.",
          "Modellare la quota di voto a livello provinciale anziché nazionale, poiché la ripartizione dei seggi avviene per circoscrizione.",
          "Applicare le regole effettive di ripartizione, soglia inclusa, così che le discontinuità siano riprodotte e non appianate."
        ]
      }
    },
    {
      "id": "approach-2",
      "block": {
        "kind": "list",
        "heading": "Approccio",
        "items": [
          "Esaminare dove la previsione è più sensibile — concentrata in un piccolo numero di province vicine ai confini di ripartizione."
        ]
      }
    },
    {
      "id": "decisions-1",
      "block": {
        "kind": "pairs",
        "heading": "Decisioni che hanno contato",
        "items": [
          {
            "term": "Previsione dei seggi attraverso le regole di ripartizione anziché una regressione diretta sui seggi.",
            "detail": "Il numero di seggi è una funzione deterministica delle quote e delle regole. Impararla da una manciata di elezioni passate, quando la regola è già nota esattamente, significherebbe adattarsi al rumore."
          }
        ]
      }
    },
    {
      "id": "decisions-2",
      "block": {
        "kind": "pairs",
        "heading": "Decisioni che hanno contato",
        "items": [
          {
            "term": "Analisi mantenuta a livello provinciale.",
            "detail": "Un errore di un punto sulla quota nazionale conta enormemente in alcune province e per nulla in altre."
          }
        ]
      }
    },
    {
      "id": "figure",
      "block": {
        "kind": "figure",
        "heading": "Figura",
        "slug": "parliamentary-seat-forecast",
        "caption": "Come una piccola variazione della quota di voto sposta i seggi con una ripartizione a soglia. Tratto dal metodo della tesi; un’illustrazione del meccanismo, non una previsione.",
        "alt": "Un grafico che mostra la ripartizione dei seggi in funzione della quota di voto, con un gradino netto in corrispondenza della soglia: i partiti sotto soglia non ricevono seggi, quelli appena sopra ne guadagnano un numero sproporzionato. La relazione tra quota e seggi è piatta al centro dell’intervallo e ripida vicino ai confini.",
        "synthetic": false
      }
    },
    {
      "id": "evaluation",
      "block": {
        "kind": "prose",
        "heading": "Come è stato valutato",
        "body": "Il repository documenta il metodo e le fonti dei dati; non riporta un valore di accuratezza su dati esclusi dall’addestramento. Qui non viene formulata alcuna affermazione sulle prestazioni perché nessuna è pubblicata, e inventarne una a posteriori non sarebbe una misurazione."
      }
    },
    {
      "id": "results",
      "block": {
        "kind": "prose",
        "heading": "Risultati",
        "body": "Per questo progetto non è pubblicata alcuna misura di prestazione, quindi non ne viene dichiarata alcuna."
      }
    },
    {
      "id": "deliverables",
      "block": {
        "kind": "list",
        "heading": "Cosa è stato consegnato",
        "items": [
          "Notebook su stima delle quote di voto, ripartizione dei seggi e corsa presidenziale.",
          "Un dataset provinciale che unisce fonti elettorali, demografiche e socio-economiche.",
          "La tesi scritta."
        ]
      }
    },
    {
      "id": "consequences",
      "block": {
        "kind": "prose",
        "heading": "Cosa cambia nella pratica",
        "body": "Il punto trasferibile riguarda la struttura, non la politica: quando un esito passa attraverso una regola con salti, la previsione deve modellare la regola. Lo stesso ragionamento vale per scaglioni fiscali, covenant e soglie di volume."
      }
    },
    {
      "id": "limitations",
      "block": {
        "kind": "list",
        "heading": "Limiti",
        "items": [
          "Non è pubblicata alcuna accuratezza su dati esclusi, quindi non si dichiara alcuna prestazione predittiva.",
          "Costruito per una sola elezione con un solo insieme di regole; non è un modello elettorale generale.",
          "Non mantenuto dal 2023."
        ]
      }
    },
    {
      "id": "human-review",
      "block": {
        "kind": "prose",
        "heading": "Revisione umana",
        "body": "È un risultato di ricerca e va letto come tale. Nulla qui è una previsione offerta per prendere decisioni."
      }
    },
    {
      "id": "sources",
      "block": {
        "kind": "links",
        "heading": "Materiale di origine",
        "items": [
          {
            "label": "Repository",
            "href": "https://github.com/bumincetin/TurkishElection2023",
            "external": true
          }
        ]
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Hai un problema di questa forma?",
        "body": "Dimmi che cosa stai cercando di decidere e ti dirò se questo approccio è adatto. Servizio collegato: Previsione & analisi finanziaria.",
        "cta": "Parliamo del tuo progetto",
        "href": "/it/contact?topic=forecasting"
      }
    }
  ]
}
```

### /it/volumes/portfolio-optimizer

Destination: same route; all source strings and block IDs below retained. Optional fields absent from a route are not applicable, not missing.

```json
{
  "spine": {
    "id": "portfolio-optimizer",
    "kind": "evidence",
    "href": "/volumes/portfolio-optimizer",
    "motifKey": "compass",
    "color": "#78a7bd",
    "foil": "#e4e7e5",
    "palette": {
      "paper": "#1a1715",
      "paperDeep": "#110f0d",
      "paperPale": "#e9eff2",
      "ink": "#eff4f6",
      "inkSoft": "#aebcc4",
      "wall": "#1a1715",
      "shelf": "#3a2118",
      "shelfDark": "#1c0e0a",
      "light": "#f2ddc6",
      "fill": "#b39a80"
    },
    "width": 1.12,
    "height": 1.63,
    "depth": 0.28,
    "seed": 77
  },
  "title": "Il Modello Sigillato",
  "discipline": "Dimostrazione · dati sintetici",
  "note": "Un’allocazione che non puoi interrogare. Ipotesi inventate, mostrate per intero.",
  "deck": "I modelli di allocazione arrivano come un grafico a torta senza un legame visibile tra ipotesi e risultato, così nessuno può chiedere cosa succede se una view è sbagliata. Questo gira nel tuo browser su ipotesi scritte nel codice, e le pubblica tutte.",
  "theme": "Una raccomandazione che nessuno può verificare",
  "binding": "Dimostrazione sintetica · costruita per questo sito",
  "format": "Un solutore con cui discutere, e la tabella delle ipotesi che lo alimenta",
  "roman": "VII",
  "pages": [
    {
      "id": "title",
      "block": {
        "kind": "title",
        "roman": "VII",
        "discipline": "Dimostrazione · dati sintetici",
        "title": "Il Modello Sigillato",
        "note": "Un’allocazione che non puoi interrogare. Ipotesi inventate, mostrate per intero."
      }
    },
    {
      "id": "maturity",
      "block": {
        "kind": "prose",
        "heading": "Dimostrazione sintetica",
        "body": "Costruita per questo sito su dati inventati per mostrare un metodo. Non è un incarico, non è un risultato di cliente e non è usata da nessuno."
      }
    },
    {
      "id": "problem",
      "block": {
        "kind": "prose",
        "heading": "Il problema",
        "body": "I modelli di allocazione vengono di solito presentati come una risposta: un grafico a torta senza alcun legame visibile tra le ipotesi e il risultato. Chi lo riceve non ha modo di chiedere cosa succede se una view è sbagliata."
      }
    },
    {
      "id": "audience",
      "block": {
        "kind": "prose",
        "heading": "A chi serve",
        "body": "Chiunque stia valutando se so costruire uno strumento quantitativo che un non specialista possa davvero usare. È una dimostrazione di metodo."
      }
    },
    {
      "id": "context",
      "block": {
        "kind": "prose",
        "heading": "Contesto",
        "body": "Costruito per questo sito. È una dimostrazione sintetica, non un incarico e non un prodotto: nessun cliente l’ha commissionato e nessuno lo usa per allocare denaro."
      }
    },
    {
      "id": "role",
      "block": {
        "kind": "prose",
        "heading": "Il mio ruolo",
        "body": "Progettato e sviluppato interamente da me — il solutore, la simulazione e l’interfaccia."
      }
    },
    {
      "id": "data",
      "block": {
        "kind": "prose",
        "heading": "Provenienza dei dati",
        "body": "Nessuna. Ogni input è un’ipotesi di lungo periodo inventata e scritta nel codice sorgente, non un flusso di mercato: otto classi di attivo con rendimenti attesi stilizzati, volatilità, una matrice di correlazione e pesi di riferimento. Non viene scaricato alcun prezzo e in questo strumento non esistono dati di mercato."
      }
    },
    {
      "id": "constraints",
      "block": {
        "kind": "prose",
        "heading": "Vincoli",
        "body": "Deve girare nel browser senza server e deve restare onesto sul proprio carattere sintetico pur comportandosi come il metodo reale."
      }
    },
    {
      "id": "approach-1",
      "block": {
        "kind": "list",
        "heading": "Approccio",
        "items": [
          "Partire dai pesi di riferimento e ricavare per inversione i rendimenti di equilibrio che essi implicano, come fa Black–Litterman.",
          "Permettere al visitatore di esprimere view come scenari, combinarle con la distribuzione a priori di equilibrio a una confidenza che controlla lui, e risolvere di nuovo.",
          "Eseguire percorsi Monte Carlo dall’allocazione risultante per mostrare la dispersione degli esiti invece di un singolo rendimento atteso."
        ]
      }
    },
    {
      "id": "approach-2",
      "block": {
        "kind": "list",
        "heading": "Approccio",
        "items": [
          "Esporre ipotesi e formule in una vista avanzata, così che i numeri possano essere verificati anziché creduti."
        ]
      }
    },
    {
      "id": "decisions-1",
      "block": {
        "kind": "pairs",
        "heading": "Decisioni che hanno contato",
        "items": [
          {
            "term": "Ipotesi tenute visibili e modificabili invece che nascoste dietro il grafico.",
            "detail": "Il senso dello strumento è che il risultato discende da input dichiarati. Nasconderli lo renderebbe decorativo."
          },
          {
            "term": "Mostrare una distribuzione di esiti, mai un singolo rendimento previsto.",
            "detail": "Un numero singolo invita a essere letto come una previsione. Non lo è."
          }
        ]
      }
    },
    {
      "id": "decisions-2",
      "block": {
        "kind": "pairs",
        "heading": "Decisioni che hanno contato",
        "items": [
          {
            "term": "Tutto viene eseguito lato client.",
            "detail": "Nessun server significa che nulla di ciò che un visitatore digita viene trasmesso o conservato."
          }
        ]
      }
    },
    {
      "id": "figure",
      "block": {
        "kind": "figure",
        "heading": "Figura",
        "slug": "portfolio-optimizer",
        "caption": "Allocazione e dispersione degli esiti prodotte dall’ottimizzatore a partire dalle sue ipotesi interne. Illustrazione sintetica — gli input sono inventati e non è coinvolto alcun dato di mercato.",
        "alt": "Un’allocazione su otto classi di attivo mostrata rispetto ai pesi di riferimento, accanto a un ventaglio di percorsi simulati che si allarga nel tempo. Il ventaglio mostra un ampio intervallo di esiti anziché una singola linea, con il percorso mediano al centro e bande progressivamente più larghe attorno.",
        "synthetic": true
      }
    },
    {
      "id": "baseline",
      "block": {
        "kind": "prose",
        "heading": "Riferimento",
        "body": "Ogni allocazione è mostrata rispetto ai pesi di riferimento da cui è partita, così l’effetto di una view è visibile come differenza."
      }
    },
    {
      "id": "evaluation",
      "block": {
        "kind": "prose",
        "heading": "Come è stato valutato",
        "body": "Il solutore è coperto da test unitari che verificano le sue proprietà matematiche — che i pesi sommino a uno, che una view neutra riproduca il riferimento, che la matrice di covarianza resti definita positiva. Non c’è alcuna affermazione di accuratezza da valutare, perché non si sta prevedendo nulla."
      }
    },
    {
      "id": "results",
      "block": {
        "kind": "prose",
        "heading": "Risultati",
        "body": "Per questo progetto non è pubblicata alcuna misura di prestazione, quindi non ne viene dichiarata alcuna."
      }
    },
    {
      "id": "deliverables",
      "block": {
        "kind": "list",
        "heading": "Cosa è stato consegnato",
        "items": [
          "Un solutore Black–Litterman lato client con simulatore Monte Carlo.",
          "Viste semplice e avanzata sullo stesso calcolo.",
          "Test di regressione sulla logica finanziaria."
        ]
      }
    },
    {
      "id": "consequences",
      "block": {
        "kind": "prose",
        "heading": "Cosa cambia nella pratica",
        "body": "Mostra i passaggi. Il metodo è lo stesso usato su mandati reali; solo i numeri sono inventati, e lo strumento lo dichiara apertamente."
      }
    },
    {
      "id": "limitations",
      "block": {
        "kind": "list",
        "heading": "Limiti",
        "items": [
          "Ogni input è inventato. Nulla qui è un’osservazione di mercato, un backtest o un track record.",
          "Non è consulenza in materia di investimenti e non produce raccomandazioni su alcun titolo reale.",
          "Ipotesi di lungo periodo senza cambi di regime, costi di transazione o imposte."
        ]
      }
    },
    {
      "id": "human-review",
      "block": {
        "kind": "prose",
        "heading": "Revisione umana",
        "body": "Non applicabile — è una dimostrazione e il suo output non è usato per alcuna decisione."
      }
    },
    {
      "id": "demo",
      "block": {
        "kind": "demo",
        "heading": "Calcolo interattivo",
        "lede": "Calcolato nel tuo browser dalle ipotesi dichiarate. Nessun dato esterno."
      }
    },
    {
      "id": "colophon",
      "block": {
        "kind": "colophon",
        "heading": "Hai un problema di questa forma?",
        "body": "Dimmi che cosa stai cercando di decidere e ti dirò se questo approccio è adatto. Servizio collegato: Previsione & analisi finanziaria.",
        "cta": "Parliamo del tuo progetto",
        "href": "/it/contact?topic=forecasting"
      }
    }
  ]
}
```

## Asset inventory

| Asset | Bytes | SHA-256 |
|---|---:|---|
| public/.nojekyll | 0 | e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 |
| public/bumin1.webp | 133572 | 13dfb8ea22a51784223f5d6ed155563e00ccb8d4d0fed5188fff14f8e4c1e86f |
| public/bumin2.webp | 47624 | 447e84c5324128da86ab081fef9c99aff93d73a5a55229c129a08a8bb9bff73c |
| public/bumin3.webp | 61830 | 9d144c7d8ef66e9a242c47bd93f463b2d1224592e2754f6aca78a18a72232352 |
| public/BuminLogo.png | 14827 | 66ef0265d337609e3d42e0aea718220d116188328993d82bc3ff6356bb2d39a6 |
| public/file.svg | 391 | 2b67812c325c199a02536cdbeea0c593a72f707d323b72ee3e08dbab06753bd4 |
| public/globe.svg | 1035 | b614b9bf183925957661ac851498fe1d8029fd43a62fbfed86f9e2624a57e7cf |
| public/logo-mark.webp | 9536 | 40b7297849829b48295589319d94e455c14d0a157278661904f274784f61c1a5 |
| public/logo.webp | 6742 | f8f874c4dcc1563b805584de4f17eff5b19df810699a9d7cf0fc48d189762d2b |
| public/next.svg | 1375 | 55995dfad6ecb4945a1e856ddca03c5e16aa5bf13fd21b4df6a74ae79357bcfc |
| public/portrait.jpg | 2272764 | 299455419bd0d376774abf620f3c7c2646eb6eb122ff85b5f58412907b1f9d7f |
| public/profile.webp | 268520 | 6c5f1a57a391d994ecaaa490d31cbf059151f1d6806f6389514f653f3868a18f |
| public/shelf/covers.webp | 440958 | 30536331bc911f1e9310f2ea44dca373201b83f2b11dac4434f8acf07018e963 |
| public/shelf/wood.webp | 92864 | f64eba8c9996b77873bbd70424769bc2c399a8a5c1e2d28ecea2673728118f9f |
| public/sketchbook/divider.png | 170548 | ef8ed266a6ee6f2f6fb8f235657d9ea9e4d57af6d84e75e4e81373de9d3632bb |
| public/sketchbook/instrument-serif-italic.woff2 | 15684 | 6ee678c33f388dd7ba59700ebea635deb98821baafd817b09891f7927177f702 |
| public/sketchbook/instrument-serif.woff2 | 15040 | 60c06664b5a95c7de6cc3e00d1f9034d78bd1e40b564016b241674449a067d4d |
| public/sketchbook/newsreader.woff2 | 131848 | 01817351be3edfc1714fe6d60ddea6a22a169a5ebd033b50c7f9495e5d9c386a |
| public/vercel.svg | 128 | f081337b2fee635b455b63275406a3e7f39d6a014e25ad90dab5a67e62a12ac4 |
| public/window.svg | 385 | 644768c4aaeb4767bce293344eeb0c125fb804a94d801440424072202d85e3a1 |
| public/_headers | 288 | 9f005623ef08c07aae344678567cd02186489c2aa26a5f6ed445d3681aaf69bd |

All existing media remains in public at its original URL. New procedural visuals represent document/model structure, not measured business results. No reference assets are reused.
