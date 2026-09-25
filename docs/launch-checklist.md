# Launch checklist

Local implementation and preview validation do not authorize publishing. No
deployment, DNS, credentials or external services were changed during this audit.

## 1. Environment and contact

The public composer needs no mail-provider configuration. It composes drafts for
the visitor's chosen app and never calls `/api/contact`. Direct email and
WhatsApp remain available without JavaScript. No delivery or response-time
guarantee is made.

The retained endpoint may use `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and
`CONTACT_FROM_EMAIL` from `.env.example`; missing or partial configuration
disables **that endpoint**, not the composer. Do not activate it or provision a
provider just to publish the current UI. A separately authorized delivery change
would require provider acceptance/delivery testing, reply routing and abuse
controls. Its current per-isolate limiter is best effort, not a distributed
security guarantee.

## 2. Contact details

- [ ] Confirm `cetinbumink@gmail.com` and +39 348 170 5207 remain current.
- [ ] Any future domain email must exist before replacing the verified address.
- [ ] `CONTACT.scheduling` remains null; do not invent a booking destination.
- [ ] Confirm draft handoff and copy on the owner's intended email/WhatsApp apps
  using synthetic text, without treating link activation as delivery.

## 3. Factual sign-off

Keep the open questions in `content-verification.md`: Alvolo role, current
Bocconi affiliation, engagement dates/status, unpublished outcome evidence,
ImpactScope details, client publication permission and cross-border professional
partners. Research and synthetic labels and limitations must remain visible.

## 4. Translation and accessibility review

- [ ] Native Turkish and Italian review, especially regulated-work vocabulary.
- [ ] Keyboard and screen-reader review on the intended device/browser pairs.
- [ ] Real-phone checks over cellular, including pinch zoom and app handoff.
- [ ] Optional shelf controls across covers, portrait/landscape and large text.

Structural locale parity and axe checks support this work but cannot replace it.

## 5. Analytics

The existing analytics sink remains disabled. Do not add a provider without
authorization and an appropriate consent decision. Event properties must exclude
names, addresses, message bodies and query strings. Opening/copying a draft is
not a submitted or delivered inquiry.

## 6. Search and deployment

- [ ] Verify the published origin against `PROFILE.siteUrl` after an authorized
  deploy. Preserve canonicals, hreflang, verified Person schema and `/sitemap.xml`.
- [ ] Recheck historical 308 redirects at the CDN; `/about` goes to `/chapters`.
- [ ] Keep `/robots.txt` disallowing `/api/`.
- [ ] Run `npm run build` to validate the Cloudflare artifact. Publishing is a
  separate action (`npm run deploy`) and was not performed here.

## 7. Assets and licenses

- [ ] Confirm the ThreeUI commercial-use license covers the shelf and artwork.
  Attribution alone is not a license. Original source hashes/notices stay intact.
- [ ] Keep Bklit/Kokonut MIT notices and the existing font assets.
- [ ] The live navbar uses `logo-mark.webp`; the original logo is also a generator
  input. Do not delete source artwork based only on a `src/` import scan.
- [ ] Portrait dimensions and Next/Image optimization remain. Unreferenced
  photographs are not presumed to contribute client transfer and were preserved.

## 8. Production verification

Run `npm run verify`, `test:generated`, and the browser suites against the actual
preview URL: `test:library`, `test:smoke`, `test:mobile`, `test:experience`,
`test:motion`, `test:a11y`, `test:canvas`, `test:links`, `test:redirects`,
`test:chapter-pages`, `test:volume-turns`. Counts/outcomes belong in the audit,
not hard-coded historical checklist claims.

See `library-audit.md` for reproducible Lighthouse settings and actual local
measurements. Field mobile/desktop 75th-percentile LCP, INP and CLS remain
unmeasured. Targets: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1. TBT is a lab measure and
does not establish INP or conversion improvement.
