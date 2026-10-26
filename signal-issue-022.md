# Signal · Issue 022

> A friendly weekly read on what actually moved in AI.

*Monday · October 26 · 2026 · 5-min read*

---

**From Chris** — Big week, and the biggest story is a little uncomfortable: AI found a hole in 70% of the internet, and attackers were already poking at it before anyone said a word in public. Also — Google started selling OpenAI's models, and Claude got an app that messages you first. 🔎

---

## In this issue

- 🛡️ **Security · 01** — AI found a decade-old flaw in 70% of the web — and attackers got there first
- 🌐 **Industry · 02** — Google Cloud is now selling OpenAI's models
- 🤖 **Tools · 03** — Claude got an app that messages you first

Plus 5 quick hits, one chart, and one fun thing.

---

## The chart of the week

**One week, four AI infrastructure numbers — and the biggest one came from the chip vendor**

*Nvidia's quarterly filing (Forbes, Oct 21), CNBC (Oct 20), Reuters, CBS News · US dollars, as reported Oct 20–23 · these are deliberately different kinds of commitment — a guarantee, a deal in talks, a debt raise, a community fund — so read the scale, not a like-for-like comparison. Two of the four are unsigned.*

| Nvidia guarantees behind AI data centres | Anthropic–Nscale second deal (in talks) | SpaceX debt for Nvidia chips (in talks) | Amazon fund for data-centre towns |
|---|---|---|---|
| **164.5** | 45 | 40 | 1 |

_(See the interactive chart on the [live page](https://chris94949.github.io/signal-newsletter/signal-issue-022.html).)_

---

## This week's three stories

### 🛡️ Security · story 01 — AI found a decade-old flaw in 70% of the web — and attackers got there first

> **Why you'd care** — Almost every website you used this week runs on the software that just got emergency-patched, and the reason the flaw finally became exploitable is that frontier AI made the hard part easy.

On October 21, Wiz Research disclosed two critical vulnerabilities in core PHP — the language behind WordPress, Drupal, Joomla and Wikipedia's MediaWiki — tracked as CVE-2026-109618 and CVE-2026-109619, both rated CVSS 9.2. They allow unauthenticated remote code execution *(a stranger running their own code on your server, with no login)* plus Heartbleed-style memory leaks that can spill passwords, tokens and API keys. Every PHP release going back to version 5.4 is affected by at least one. PHP shipped the patch the same day. Amazon's threat intelligence team saw an exploitation attempt on October 17 — four days before anyone announced anything.

[Wiz Research →](https://www.wiz.io/blog/php2shell-php-rce)

**More on this.** The headline number is 70% of websites, but the interesting number is one week. Wiz says a single researcher, working with Wiz Atlas, Google's Gemini 4 Argon and an OpenAI model, did in about a week what would previously have taken a world-class team months. The bugs themselves are ancient; what was hard was chaining them together and adapting the exploit to each server's memory layout, which traditionally meant weeks of specialist debugging per target. Models collapsed that cost. Google DeepMind's head of Gemini security framed it as a defensive win, and in this case it was — coordinated disclosure, a patch, and mitigations pre-staged at Cloudflare, AWS, Google, Akamai, Fastly and Vercel before the details went public. But Wiz's own conclusion is the one worth sitting with: if complexity no longer protects a bug, then a lot of software currently filed under "theoretically vulnerable" has quietly moved into "exploitable." Nobody has re-audited that pile yet. Practical note if you run anything PHP: patch, and prioritise mod_php setups, where an unauthenticated request can trigger the bug before your application code runs at all.

---

### 🌐 Industry · story 02 — Google Cloud is now selling OpenAI's models

> **Why you'd care** — The two companies people describe as the fiercest rivals in AI just agreed that enterprise customers care more about one invoice than about picking a side.

On October 21, Google Cloud announced that three of OpenAI's GPT-6 models — Astra among them — are available in its Model Garden, as a private preview for selected enterprise customers who request access through an interest form. Usage lands on a single Google Cloud bill and counts against existing cloud commitments. Google says prompts, context and outputs stay inside the customer's data perimeter and are not used to train models, with Zero Data Retention and Confidential Compute listed as coming soon. Developers can also point OpenAI's Codex CLI and desktop tools at Google's platform for inference. OpenAI's own post is careful to add that "Microsoft remains OpenAI's primary cloud partner."

[Google Cloud →](https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-brings-openai-models-to-customers)

**More on this.** This is a distribution deal dressed as a truce. Google's pitch to large enterprises has long been hampered by one objection — we're standardising on OpenAI — and it just removed it, at the cost of helping a competitor's models reach more buyers. OpenAI gets the reverse: access to customers whose procurement, security review and spend commitments all live inside Google Cloud, without them having to open a second vendor relationship. The clause about Microsoft is doing real work; this is additive, not a migration. What to watch: whether general availability actually lands "in the coming weeks" as OpenAI says (Google has committed to no date), and whether existing OpenAI API applications run unchanged against the Google endpoints, which the announcement notably does not promise. The broader signal is that the frontier-model layer is commoditising faster than the cloud layer underneath it. When your fiercest rival's product becomes a line item in your own marketplace, the moat has moved somewhere else.

---

### 🤖 Tools · story 03 — Claude got an app that messages you first

> **Why you'd care** — Every assistant so far has waited to be asked; this one decides on its own when something deserves your attention, which is a genuinely different relationship with a piece of software.

Anthropic opened a research preview of Claude Duet on October 21 — a waitlisted app for US Pro and Max subscribers. Duet sends a morning brief, re-checks your connected apps every few hours, and messages you only when it judges something needs you. Tasks run on its own cloud virtual machine with its own browser, so work continues with your laptop shut. Four categories of action are gated behind explicit approval: sending messages, making payments, signing documents, and deleting things. Background checks draw on your existing plan limits rather than a new fee, and Anthropic says plainly that Duet can still misjudge what's urgent.

[Anthropic →](https://claude.com/product/claude-duet)

**More on this.** The design choice worth noticing is the approval gate, because it defines where the product is actually betting. Duet is allowed to decide what matters — a judgment call, and the one Anthropic admits it gets wrong — but it is not allowed to send, pay, sign or delete without a yes. That split says the hard, unsolved problem isn't capability, it's trust in irreversible actions. Duet also launched into a crowded week: Meta and OpenAI have both been shipping proactive agent products, and the category has quietly become the main competitive front now that chat is table stakes. The honest limitations are a decent guide to the state of the art — no phone calls, no SMS, no general local file access, no Microsoft 365. And the usage model has a catch worth flagging: if the agent is working in the background on your quota, you're paying attention-tax in tokens for checks that may surface nothing. Worth watching whether proactive agents stay inside flat-rate subscriptions once people actually leave them running.

---

## Worth knowing in one sentence

1. **70% of all websites.** That's the share running PHP, and every version back to 5.4 is affected by at least one of the two critical flaws disclosed October 21. The bug sits in PHP's core engine, below your application — a "Hello World" page on a vulnerable version is still exposed. The patch shipped the same day as the disclosure; Cloudflare, AWS, Google, Akamai, Fastly and Vercel had mitigations staged in advance for anyone who can't update immediately.
2. **Can a chip company be its own customer?** Nvidia has put as much as $164.5 billion of guarantees and commitments behind the data centres that buy its GPUs, per figures in its latest quarterly filing reported October 21. The single largest piece is a guarantee on lease payments for an Ohio campus being built for OpenAI. None of that is spending, exactly — it's Nvidia making someone else's financing possible so the chips get bought. Whether that counts as demand depends on who you ask.
3. **Complexity has stopped being a defence.** The PHP flaws sat in plain sight for over a decade because exploiting them required chaining multiple bugs and re-tuning for each server's memory layout — too fiddly to be worth it. With frontier models doing the adaptation, Wiz says one researcher managed in a week what a world-class team would have needed months for. A whole category of bugs just got reclassified from theoretical to practical.
4. **$45 billion, for the second time.** Anthropic is in talks for a second Nscale deal of roughly that size, covering another 460-megawatt data centre at the same West Virginia site as the first, per CNBC on October 20. That's the same Nscale whose IPO filing last week showed $103 billion in contracts and $2.6 billion actually switched on. Meanwhile investors have started shorting neocloud names, and CoreWeave's bonds have reportedly traded at distressed levels.
5. **Voxtral 3 listens, thinks and speaks in one unbroken stream.** Mistral's October 20 release bundles speech-to-text, text-to-speech and a voice-agent SDK built on LiveKit, so transcription, reasoning, tool calls and reply audio all run in a single pipeline instead of three stitched-together services. The realtime transcriber is reported to stream text in under 500 milliseconds, at roughly $0.008 per minute. No open weights this time — it's a hosted API, EU-hosted first.

---

## One fun thing

**A robot rolling up behind you seems to be moving faster than the exact same robot rolling toward your face.**

A team at Toyohashi University of Technology led by Hideki Tamura ran five experiments using a real autonomous mobile robot and immersive VR, and found that approaches from behind are judged faster at identical physical speed — in about 92% of participants. It isn't that people become less precise; the whole judgment shifts, and it seems tied to the act of turning to look rather than to how the robot looks. They then baked the bias into a navigation model, which produced robots that start avoiding you earlier and give you more room. Published in *IEEE Robotics and Automation Letters* — a rare case of a perceptual quirk becoming a politeness feature. 🤖

---

*Signal — a friendly weekly read on what actually moved in AI. Issue 022 · Monday · October 26 · 2026.*

*Want to reply with one word? christienabrhm94@gmail.com*

---

> **For syndication:** This piece was originally published at https://chris94949.github.io/signal-newsletter/signal-issue-022.html. When importing to Medium, Substack, Dev.to, or any platform that supports it, set this URL as the canonical URL in the story settings — this preserves SEO and credits the original source.
