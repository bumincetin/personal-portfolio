# Content verification

Every disputed claim on the site, what evidence was reviewed, what was decided,
and what still needs the owner's confirmation.

The rule applied throughout: where evidence was insufficient, the specific claim
was **removed or reworded to something non-time-sensitive**, never softened into
a vaguer version of itself and never replaced with an invented substitute.

Nothing in this document names a client or reproduces private material.

**Note on structure.** The site has since been rebuilt as a shelf of seven
volumes plus a colophon (see `docs/implementation-summary.md`). Page names
below refer to where a claim *was* published; every one of those pages now
redirects to the volume that carries its content, and every decision recorded
here still holds. Two sections describe things that were removed entirely rather
than rewritten: §7, the demo portal, and the euro-denominated SME outcomes in
§6, whose page is also gone.

---

## 1. Conflicting roles and affiliations

### 1.1 Three different Alvolo Consulting titles

**What was published.** Three titles for the same engagement, on three surfaces:

| Surface | Title |
| --- | --- |
| `aboutPage.experienceData` | Founder |
| `about.desc1` (home + About) | CEO & Co-Founder |
| `smeSection.hybridDetails` (SME page) | CEO |

The Italian copy said "CEO e Co-Fondatore"; the Turkish said "CEO'su".

**Evidence reviewed.** Only the repository's own content. There is no external
artefact in reach that establishes a title — a company register entry would, and
none was available.

**Decision.** "Founder" is kept where the About page's dated experience list
already carried it, because that is the site's own record of the engagement.
"CEO" and "Co-Founder" were removed everywhere. `about.desc1` and
`hybridDetails` were rewritten in all three locales to describe what was done
rather than to assert a title.

**Still needed from the owner.** The registered role and, if "Co-Founder" is
accurate, who the other founder is. A co-founder claim implies a second person
and should not be published without them.

### 1.2 "Data Scientist and AI Specialist **at** Bocconi University"

**What was published.** `about.desc1` in English and Italian read as current
employment by the university.

**Evidence reviewed.** `aboutPage.educationData` records two completed degrees
(B.Sc. 2020–2023, M.Sc. 2023–2025). Nothing in the repository records employment
by Bocconi. The public GitHub profile bio still describes the master's as in
progress, which contradicts the site's own dates and is more likely a stale bio
than evidence either way.

**Decision.** The affiliation claim was removed. The degrees are stated as
degrees, with their dates, on the About page. No current institutional
affiliation is asserted anywhere on the site.

**Still needed from the owner.** Whether any current Bocconi affiliation exists
(research associate, teaching assistant, alumnus-only). Until confirmed, none is
published.

### 1.3 Open-ended engagement dates

**What was published.** `story.ts` gave the Alvolo chapter as `2025 —`, and the
hero eyebrow read "Founder, Alvolo Consulting" as a present-tense role. The
About page's own record dates the engagement **March 2025 – November 2025**, and
ImpactScope **December 2024 – December 2025**. Both are closed.

**Decision.** The open-ended `2025 —` was closed to `2025`. The hero eyebrow no
longer names a role or an organisation; it reads "Applied AI and financial
analytics · Milan". Dated entries on the About page are unchanged — they are the
record, and correcting a date is the owner's call, not the site's.

**Still needed from the owner.** Whether either engagement is in fact ongoing.
If so, the dates in `aboutPage.experienceData` should be updated at source; the
site will follow them.

---

## 2. Contact details

**What was published.** Two addresses. `bumin.cetin@studbocconi.it` on the About
page, `cetinbumink@gmail.com` in the footer and the booking dialog.

**Decision.** One address is published site-wide: `cetinbumink@gmail.com`, held
in `src/lib/profile.ts`. The student address was removed — it is tied to
enrolment and is the one most likely to have been deprovisioned.

**Recommended, not published.** An address on the site's own domain
(`hello@bumincetin.com` or similar) would be better for a consulting practice
than a personal Gmail address. It is **not** published anywhere, because it does
not exist yet. See `docs/launch-checklist.md`.

The WhatsApp number (+39 348 170 5207) was already in the repository as a live
contact channel and is retained. **Owner to confirm** it is still current.

---

## 3. "Reducing manual review time by 80%"

**What was published.** Six occurrences across `translations.ts` and `story.ts`,
in all three locales, attributed to the ImpactScope greenwashing work.

**Evidence reviewed.** The linked repository
(`github.com/bumincetin/greenwashing-detection`) publishes a detailed
`PERFORMANCE_REPORT.md`. It reports correlation, error and classification
metrics against expert ratings. **It reports no time measurement of any kind** —
no before/after, no baseline review duration, no sample of reviewers, no method.

**Decision.** Removed everywhere. There was nothing to qualify it with: a
percentage reduction needs a baseline, a sample, a measurement method and a date,
and none of the four exists. It was not replaced with a smaller number or a
hedge.

What replaced it is stronger, because it is checkable: the greenwashing case
study now publishes the figures that *are* reproducible from the repository, in
`src/lib/content/evidence.ts`, each with source, context, baseline, method, date
and limitations.

**Still needed from the owner, if the figure is to return.** The baseline review
time, how it was measured, over how many documents, by how many reviewers, and
on what date. Without those it stays off the site.

---

## 4. RoBERTa vs what the repository actually implements

**What was published.** "Developed Data Product by fine-tuning RoBERTa to flag
greenwashing risk" (About, three locales) and "Fine-tuning RoBERTa on corporate
disclosures" (home page story, three locales). The AI/NLP service page also
listed "RoBERTa, BERT, GPT" as the stack for this work.

**Evidence reviewed.** The linked repository's `README.md` and
`ALGORITHM_GUIDE.md` describe **ClimateBERT** for semantic specificity,
**Sentence Transformers** for similarity, and **spaCy** for preprocessing.
RoBERTa is not mentioned anywhere in the published documentation.

More significant: `PERFORMANCE_REPORT.md` shows the detector that performs best
(v1, Pearson 0.906) is a **lexical, pattern-matching** approach. The
transformer-based version (v2) scored *worst* — Pearson 0.557 — and is marked
"Obsolete". So the site was not only naming the wrong architecture, it was
attributing the result to the class of model that lost.

**Decision.** The RoBERTa claim was removed from every public surface. The case
study describes what the repository shows: a weighted scoring system whose
components include ClimateBERT and Sentence Transformers, in which the simple
lexical version correlates best and the semantic version was retired. That
retirement is written up as a *decision*, because choosing the tool that works
over the tool that sounds better is the more interesting fact.

**Ambiguity, recorded and not resolved.** The ImpactScope engagement and the
master's thesis are two different pieces of work that the old copy had merged
into one paragraph. It is entirely possible the ImpactScope data product did use
RoBERTa and simply has no public artefact. The site now makes no architecture
claim about the ImpactScope work at all.

**Still needed from the owner.** Whether the ImpactScope product used RoBERTa,
and whether any artefact from it can be cited. If yes, it can be stated as a
separate, sourced claim.

---

## 5. "24/7 without errors" and other absolutes

**What was published.** `smeSection.benefits.automate.desc`, in all three
locales: "AI-powered automation handles repetitive tasks 24/7 without errors" /
"7/24 hatasız" / "24/7 senza errori".

Also on the cross-border page: "we set up the legal infrastructure flawlessly" /
"hatasız" / "senza errori".

**Decision.** All replaced with what is actually deliverable: validation rules,
an exception queue, and a person reviewing what the system is unsure about. No
error-free claim appears on the site.

---

## 6. Unattributed quantified SME outcomes

**What was published.** Five client outcomes on the SME page, in all three
locales:

- wholesale distributor: 4 hours/day → 15 minutes, €15,000 saved annually
- manufacturer: downtime down 40%, €50,000 in repairs prevented
- professional services firm: legal review costs down 60%
- retail chain: stockouts down 35%, excess inventory down 28%, €80,000 cash flow
- healthcare practice: 20 admin hours/week saved

Plus, in the same section: "Predict cash flow issues 3–6 months in advance",
"Process documents, invoices, and forms 10-100x faster", "Access Fortune
500-level analytics tools", and a page subtitle promising "SME-friendly prices".

**Evidence reviewed.** None exists. No client, no engagement, no measurement, no
permission. They read as first-party results and are not attributed to any cited
third-party source either.

**Decision.** All five removed, along with the speed and lead-time figures, the
Fortune 500 comparison and the price claim. They are replaced by *situations* —
shapes of problem, carrying no numbers — under a heading that says
"Situations this comes up in" and a note stating explicitly that these are
illustrative and not client results.

**Still needed from the owner.** If any of these are real engagements, each needs
the client's written permission plus the measurement behind the figure before it
can be republished. Anonymising is not sufficient on its own.

---

## 7. "Calculations strictly follow IFRS standards" — page since retired

**What was published.** The demo portal's methodology note.

**What was actually happening.** `/api/analyze` sent the uploaded document's
full text to Google's Gemini API with a prompt instructing the model to
"CALCULATE RATIOS … you MUST calculate the actual numeric value", and rendered
whatever came back as financial ratios. The numbers were model output, not
calculations.

**First decision.** The claim was fixed in code rather than in copy: ratios were
moved to a deterministic calculator with unit tests asserting exact values, and
the model's role was reduced to transcription.

**Final decision.** The demo portal was then retired from the site altogether at
the owner's direction, along with `/api/analyze`. Nothing on the site now asks
a language model for a number, and no document leaves the browser, because there
is no upload path at all. The deterministic calculator went with the page it
served.

---

## 8. Regulated services on the cross-border page

**What was published.** First-person delivery of work reserved in Italy to
licensed professionals: "We manage the entire process from determining the
company type (S.r.l, S.p.A) to completing registration procedures", "We structure
the tax framework most suitable for your business model", "end-to-end financial
and legal support from investment return calculations to property transfer
procedures".

**Decision.** The service is on a separate track from the three technical
services, with a responsibility map rendered *before* anything that reads as an
offer:

- **Performed personally:** scoping, sequencing, coordination, commercial and
  cultural translation.
- **Alvolo Consulting:** the practice through which engagements run where that is
  the appropriate vehicle.
- **A licensed professional:** notarial acts, company formation filings, tax
  advice and opinions, legal advice, statutory accounting and audit — performed
  by qualified professionals with whom the client holds a direct relationship.

Four FAQs answer "Can you set up my Italian company?" and "Can you advise on my
tax position?" with "No", and explain what is being paid for instead. The scope
boundaries list these as explicitly out of scope.

**Still needed from the owner.** Whether named professional partners exist and
have agreed to be referred to. Until confirmed, the page describes the
*category* of professional each step needs and names nobody.

---

## 9. Ambiguous "live" labels

**What was published.** The portfolio optimizer was labelled "Live instrument" /
"Canlı araç" / "Strumento live" and described as running "entirely in your
browser" without saying what it ran *on*. The chapter attention widget carried a
`live` badge over hard-coded token weights.

**Evidence reviewed.** `src/lib/optimizer/universe.ts` contains eight asset
classes with stylised long-run expected returns, volatilities, a correlation
matrix and benchmark weights, all written into the source. There is no market
data anywhere in the tool and no network request.

**Decision.** A four-way provenance vocabulary now labels every figure on the
site — **live data**, **interactive calculation**, **recorded example**,
**synthetic illustration** — rendered by `ProvenanceBadge`. The optimizer is
labelled a synthetic illustration and an interactive calculation, and its
advanced view publishes the full assumptions table. No surface on the site is
currently labelled "live data", because nothing on it is.

---

## 10. Maturity of published work

**Decision.** Every entry in Work & Research carries an explicit maturity label
with a description that is spelled out in full on the detail page:

| Entry | Label | Why |
| --- | --- | --- |
| Greenwashing risk scoring | Research | Thesis codebase with a published validation harness. Never deployed, no users. |
| Parliamentary seat forecast | Research | Bachelor thesis, 2023, unmaintained. |
| Portfolio optimizer | Synthetic demonstration | Built for this site on invented assumptions. Not commissioned, not in use. |


**Deliberately not published as case studies:** the Fedrigoni, N26 and
ImpactScope engagements. All three are real and dated on the About page, but
none has a public artefact or client permission, so none is written up. The gap
is left visible rather than filled — the business intelligence service page says
in as many words that it has the least published evidence behind it.

No testimonials appear anywhere on the site, because there are none to publish.

---

## 11. Figures that survived, and why

The only quantitative claims on the site are the four in
`src/lib/content/evidence.ts`, all from the greenwashing repository's
`PERFORMANCE_REPORT.md`, which states its metrics were re-run and reproduced on
**29 January 2026**:

| Figure | Value | Why it is publishable |
| --- | --- | --- |
| Evaluation set | 29 expert-rated claims | Stated in the report; the limitation is published alongside it. |
| Rater reliability | Krippendorff's α = 0.69 | Published; makes the human ceiling visible. |
| v1 correlation | Pearson 0.906, MAE 0.206 | Published, with the v2/v3 comparison as baseline. |
| v3 flagging | recall 0.40 at precision 1.00 | Published, with v1's 0.15 recall as baseline. |

Each renders on the case study with its source link, method, comparison,
as-of date and — the field that does the most work — what it does not tell you.
The recall figure is presented as the reason the tool cannot run unattended,
which is the honest reading of it.

---

## Open items for the owner

1. Registered Alvolo role, and whether "Co-Founder" is accurate.
2. Whether any current Bocconi affiliation exists.
3. Whether the Alvolo and ImpactScope engagements are ongoing or closed as dated.
4. Whether the WhatsApp number is still current.
5. Evidence behind the 80% figure, if it is to be republished.
6. Whether the ImpactScope product used RoBERTa, and whether anything is citable.
7. Client permission and measurement for any SME outcome that is real.
8. Named cross-border professional partners, and their agreement to be referred to.
9. A domain email address to replace the published Gmail address.
10. Native-speaker review of the Turkish and Italian copy. It has **not**
    happened and is not claimed — see `docs/launch-checklist.md` §4.
11. Confirmation that the ThreeUI licence covers using the shelf presentation
    and its cover artwork on a commercial site — see
    `docs/launch-checklist.md` §7.
