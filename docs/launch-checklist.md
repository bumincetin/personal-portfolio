# Launch checklist

Everything that must happen before this site is published, and everything that
is deliberately switched off until someone decides otherwise.

Nothing here has been done on the owner's behalf. No deployment has been made,
no DNS touched, no secret created.

---

## 1. Environment configuration

All secrets are server-side. On Cloudflare Workers use `wrangler secret put`, or
Workers & Pages → the project → Settings → Variables and Secrets. Locally, a
`.env.local` (git-ignored). See `.env.example`.

| Variable | Required for | Effect while unset |
| --- | --- | --- |
| `RESEND_API_KEY` | contact form delivery | form renders **disabled**, with the verified email address offered instead |
| `CONTACT_TO_EMAIL` | contact form delivery | same |
| `CONTACT_FROM_EMAIL` | contact form delivery | same — must be a sender verified on the Resend account |

The three are read together: a partial configuration behaves exactly like none,
so the form can never be shown as working when it is not.

### Verifying delivery for real

This has **not** been done and cannot be done from here. After configuring:

1. Deploy to a preview environment.
2. Submit one inquiry from the live form.
3. Confirm it arrives at `CONTACT_TO_EMAIL`, and that replying goes back to the
   address in the form (the endpoint sets `reply_to`).
4. Confirm SPF/DKIM are aligned for `CONTACT_FROM_EMAIL`, or the mail will be
   accepted by the provider and land in spam. The endpoint reports provider
   *acceptance*; it cannot report delivery, and the success copy says so.
5. Submit the same message twice in quick succession and confirm only one email
   arrives — the endpoint sends an `Idempotency-Key`.

### Rate limiting

`/api/contact` keeps a per-isolate, best-effort limiter (5/hour). On Workers,
requests may land on different isolates, so it is a speed bump against a naive
script, not a security control. If abuse ever justifies it, back it with a
Durable Object or KV. The honeypot, the 16 kB body cap and server-side
validation do not depend on it.

---

## 2. Contact details to confirm

Held in `src/lib/profile.ts`. Publishing anything not listed there requires
editing that file, deliberately.

- [ ] **Email.** `cetinbumink@gmail.com` is published site-wide. A domain
      address (`hello@bumincetin.com` or similar) would suit a consulting
      practice better. **It is not published anywhere** because it does not
      exist. Provision it, then change `CONTACT.email.address` — and use it for
      `CONTACT_TO_EMAIL` too.
- [ ] **WhatsApp.** +39 348 170 5207 was already in the repository. Confirm it
      is still current, or remove it.
- [ ] **Scheduling.** There is no calendar link anywhere, on purpose:
      `CONTACT.scheduling` is `null` and the contact page says a time gets
      agreed in the first reply. If a booking calendar is ever set up, fill that
      field — do not add a "Book a call" button before then.

---

## 3. Content sign-off

`docs/content-verification.md` lists ten open questions. These block nothing
technically, but each is a claim the site currently declines to make:

- [ ] Registered Alvolo role; whether "Co-Founder" is accurate
- [ ] Whether any current Bocconi affiliation exists
- [ ] Whether the Alvolo and ImpactScope engagements are ongoing or closed as dated
- [ ] Evidence behind the "80%" figure, if it is ever to return
- [ ] Whether the ImpactScope product used RoBERTa, and whether anything is citable
- [ ] Client permission and measurement for any SME outcome that is real
- [ ] Named cross-border professional partners, and their agreement to be referred to

---

## 4. Translation review

- [ ] **Turkish and Italian copy has not been reviewed by a native speaker.**
      It was written as part of this work. `npm run test:i18n` proves the three
      locales are structurally complete; it says nothing about whether they read
      well or use the right register for a Turkish or Italian business audience.
- [ ] The financial and legal vocabulary in the cross-border volume is the
      highest-risk of the three languages. Have it read by someone who works in
      that field in Italy.

---

## 5. Analytics

Off by default and deliberately so. `src/lib/analytics.ts` defines the funnel —
`volume_viewed`, `volume_page_turned`, `inquiry_started`, `inquiry_submitted`,
`contact_email_clicked` — and routes it to a sink that does nothing.

To enable:

- [ ] Choose a provider and decide, with advice, whether it needs consent in the
      EU. **This has not been assessed and no compliance claim is made.**
- [ ] If consent is needed, add a consent gate before installing the sink.
- [ ] Call `setAnalyticsSink()` once, client-side.
- [ ] Confirm the `EventProps` type still permits nothing beyond a topic, a slug
      and a kind. Names, addresses, form text and query strings must never reach
      it, and the type is the enforcement.
- [ ] `inquiry_submitted` fires only on backend acceptance; `contact_email_clicked`
      is a different event. Do not merge them in a dashboard — a click on an
      address is not a lead.

---

## 6. Search and indexing

- [ ] Confirm the deployed origin matches `PROFILE.siteUrl`
      (`https://bumincetin.com`). Canonicals, `hreflang` and the sitemap are all
      built from it.
- [ ] After the first deploy, re-crawl the retired URLs and confirm each returns
      **308** to its volume (`next.config.js`). Verified locally; re-verify in
      production, where a CDN may cache differently.
- [ ] Submit `/sitemap.xml`. It lists only live routes — the redirects are
      deliberately absent.
- [ ] Confirm `/robots.txt` still disallows `/api/`.
- [ ] The `Person` structured data on the colophon asserts only name, city,
      `alumniOf`, languages and profile links. Do not add `jobTitle` or
      `worksFor` until item 3 above is settled.

---

## 7. Assets and licensing

- [ ] **The shelf presentation is ThreeUI's work**, used under whatever licence
      covers the registered component. `public/shelf/covers.webp` and
      `wood.webp` are the authored textures, extracted byte-identical from the
      canonical source. Confirm the licence permits this use on a commercial
      site before publishing. The static catalogue credits it; the credit is not
      a substitute for the licence.
- [ ] `public/portrait.jpg` is 2.27 MB at 2048×2048. Next/Image resizes it, but
      re-exporting at ~1200 px would cut the source weight.
- [ ] Delete the unreferenced images in `public/`: `bumin1.webp`, `bumin2.webp`,
      `bumin3.webp`, `profile.webp`, `BuminLogo.png`, and the Next.js scaffolding
      SVGs (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`).
      Nothing in `src/` references any of them. They are left in place rather
      than removed here because they are your photographs and the call is
      yours; `logo.webp` and `portrait.jpg` *are* used and must stay.

---

## 8. Production checks

- [ ] `npm run verify` (lint → types → i18n → contrast → unit → build)
- [ ] `npm run test:smoke -- <preview-url>` — 42 checks
- [ ] `npm run test:a11y -- <preview-url>` — 55 scans
- [ ] `npm run test:canvas -- <preview-url>` — 8 overlay elements over the scene
- [ ] `npm run test:links -- <preview-url>` — nothing 404s. Worth running against
      the deployed origin as well as locally: a static asset that resolves from
      the dev server can still be missing from what actually got uploaded.
- [ ] `npm run test:redirects -- <preview-url>` — 44 retired URLs. Run this
      against the **deployed** origin, not just locally: redirects are the one
      thing that a hosting layer can silently rewrite.
- [ ] Load the home page on a real mid-range phone over cellular and confirm the
      WebGL shelf is acceptable there. It has only been exercised in desktop
      Chrome at a 390 px viewport, which is **not** the same as a real device.
- [ ] Confirm the static catalogue appears when WebGL is unavailable — force it
      by disabling hardware acceleration.
- [ ] **Core Web Vitals have not been measured.** If they matter, gather field
      data after launch; a single lab run proves nothing about the 75th
      percentile, and INP cannot be measured without real interactions.
