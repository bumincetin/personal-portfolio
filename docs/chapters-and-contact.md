# Chapters and Contact

`/[locale]/chapters` owns the portrait, five career chapters, education,
experience and languages. The dates and roles come from the existing `story.ts`
and `translations.ts`. Desktop scroll advances a pinned sequence of illustrated
scenes; phones use an ordinary vertical timeline with local reveals. Neither
captures scrolling. The print stylesheet exposes the CV and contact identity.
`/about` redirects here. Both new destinations appear in navigation and sitemap.

`/[locale]/contact` asks for name/company, subject, idea and timing. It compiles
an editable draft locally. No answers are posted to the server or analytics.
The visitor chooses the destination and sends the message there. Back navigation
preserves the answers; returning to review regenerates the draft from them.

WhatsApp uses the existing number from `profile.ts` and the documented
[click-to-chat format](https://faq.whatsapp.com/5913398998672934).
Mobile offers the Outlook compose app scheme, with an Outlook browser fallback.
Desktop uses `mailto:`: the operating system chooses the registered mail app.
[Microsoft documents setting Outlook as the default](https://support.microsoft.com/en-us/outlook/make-outlook-your-default-application-for-e-mail-calendar-and-contacts).
A browser cannot force every visitor's desktop email-app preference. App launch
also requires installation; the site cannot confirm that a draft was sent.

The contact sculpture is built with Three.js geometry and local lighting. It
pauses offscreen, in background tabs, under reduced motion, or from its pause
control. Disposal releases geometry, materials, observers and the renderer.
The SVG fallback and direct contact links work without WebGL. With JavaScript
disabled the interactive questionnaire is hidden so native form submission
cannot put answers into the page URL.

`npm run test:experience -- <url>` checks both routes at 360, 768 and 1440 pixels,
all three locales, accessibility at multiple states, answer retention, URL
encoding, animation/pause, printing and no-JavaScript fallbacks. The suite never
opens a messaging destination or submits an inquiry.
