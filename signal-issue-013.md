# Signal · Issue 013

> A friendly weekly read on what actually moved in AI.

*Tuesday · August 11 · 2026 · 5-min read*

---

**From Chris** — Three different stories this week are all secretly about the same thing: who gets to check the work. A model claims a math breakthrough and mathematicians go looking for the footnotes; Europe starts requiring chatbots to admit what they are; Meta hands out weights so you can inspect them yourself. Verification is having a moment. 🔍

---

## In this issue

- 🧮 **Research · 01** — OpenAI claimed ten math breakthroughs. Mathematicians found the footnotes missing.
- 💻 **Tools · 02** — Meta released a 30B agent model that runs on your laptop
- 🛡️ **Policy · 03** — In Europe, chatbots now have to tell you they're chatbots

Plus 5 quick hits, one chart, and one fun thing.

---

## The chart of the week

**Six months of 2026 out-raised all of 2025**

*Crunchbase · global venture funding into startups, $ billions · Q1 and Q2 2026 are shown alongside the H1 total they add up to, not in addition to it.*

| All of 2025 | Q1 2026 | Q2 2026 | H1 2026 |
|---|---|---|---|
| 440 | 305 | 205 | **510** |

_(See the interactive chart on the [live page](https://chris94949.github.io/signal-newsletter/signal-issue-013.html).)_

---

## This week's three stories

### 🧮 Research · story 01 — OpenAI claimed ten math breakthroughs. Mathematicians found the footnotes missing.

> **Why you'd care** — The question of whether AI can do original research now turns on something unglamorous — whether it can tell you where its ideas came from.

On August 1, OpenAI published a 249-page manuscript claiming ten new results in pure mathematics and theoretical computer science, produced by an internal model the company then named its next family after: Astra. It shipped with a public repository of Lean proofs *(machine-checkable, so a computer can confirm each logical step)* and a companion document reconstructing how the model searched. Within days, named mathematicians pushed back. Steven Miller of Yeshiva University says the flagship sphere-packing result leans on an argument from his own 2016 paper without crediting it, and Francesco Fournier-Facio of Cambridge flagged the same pattern in the non-sofic groups result.

[Scientific American →](https://www.scientificamerican.com/article/openais-latest-math-breakthroughs-commit-research-misconduct-experts-say/)

**More on this.** The Lean proofs are almost certainly valid — that's the point of Lean. What's contested is novelty, and those are different claims that got blurred together in the announcement. A proof can be formally correct, fully verified, and still not be new. That distinction is exactly what peer review exists to catch, and OpenAI went around it. This is the second documented instance in under a year of the company claiming research progress on problems where prior work went unacknowledged, which starts to look less like an oversight and more like a gap in process. The interesting technical question underneath: a model trained on the mathematical literature has, in some sense, read Miller's paper. Reproducing an argument you absorbed and can't cite is a failure mode with no clean human analogue. Watch for whether OpenAI issues corrections, and whether journals start writing rules for AI-assisted submissions.

---

### 💻 Tools · story 02 — Meta released a 30B agent model that runs on your laptop

> **Why you'd care** — An AI agent that lives on your own machine can work on your files without any of them leaving it — which changes what you're willing to point it at.

Meta released Muse Glimmer on August 10: a 30-billion-parameter model built specifically for agent work, free under Apache 2.0, with weights on Hugging Face. It's essentially an open version of Muse Spark, the closed model Meta debuted in April. The target is a single consumer GPU or a decent Mac — Meta measured roughly 3.1× faster inference on an NVIDIA RTX 5090, 1.8× on an Apple M5 Max and 1.5× on an M4 Max versus its own prior local models. The intended jobs are function calling, local coding, and LLM-as-a-judge evaluation *(using one model to grade another model's output, which is cheap to run constantly if it's running on your own hardware)*.

[Meta AI Research →](https://research.meta.ai/blog/introducing-muse-glimmer-open-agentic-model)

**More on this.** Note the shape of the release, not just the size. Meta didn't open-weight its flagship; it open-weighted the agent-shaped one, in the size that fits the machine already on your desk. That's a distribution strategy — the closed model competes for API revenue, the open one competes for the position of default local runtime. It also lands in the same month Mistral shipped an open safety classifier under Apache 2.0, which suggests the open-weight fight has moved from raw capability to the boring infrastructure layer around agents. For anyone with data they can't send to an API — health records, client files, unreleased code — a competent 30B agent running locally is a genuinely different proposition from a better one running in someone else's data center. The practical caveat: local agents still need sandboxing, and this year has made clear that agents escape sandboxes.

---

### 🛡️ Policy · story 03 — In Europe, chatbots now have to tell you they're chatbots

> **Why you'd care** — If you ship anything with a chat box or an image generator to European users, you now have disclosure duties whether or not your product is considered risky.

Article 50 of the EU AI Act took effect on August 2. It requires that people be told when they're talking to an AI system rather than a person, that AI-generated or manipulated content be machine-readably marked, that deepfakes be disclosed, and that emotion-recognition and biometric-categorisation systems announce themselves to the people they're pointed at. Enforcement runs through national market surveillance authorities, with fines up to €15 million or 3% of worldwide annual turnover, whichever is larger. There's a grace period only for the marking-and-detection duty on generative systems already in market — those have until December 2, 2026.

[European Commission →](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act)

**More on this.** The notable thing is what Article 50 does *not* depend on. Most of the AI Act keys off a risk classification, and most companies concluded they weren't high-risk and moved on. Article 50 keys off the interaction itself, so a small SaaS product with a support chatbot is in scope alongside a frontier lab. The marking requirement is the harder engineering lift: 'machine-readable' in practice means provenance metadata or watermarking that survives a screenshot, a re-encode, and a crop, and nobody has fully solved that. Expect the December deadline to be where the real fight happens. The second-order effect worth watching is whether disclosure becomes global by default — it's usually cheaper to label everything everywhere than to maintain two versions of your product.

---

## Worth knowing in one sentence

1. **89% more AI-enabled attacks.** CrowdStrike's latest threat reporting logs an 89% year-over-year jump in AI-assisted threat activity, alongside a finding that 88% of vulnerability attacks now begin within 48 hours of proof-of-concept code going public. The defenders' window used to be measured in weeks.
2. **Do you actually know when your model's knowledge ends?** Independent researcher Shrivu Shankar published a method on August 10 for inferring a model's real training cutoff from historical-fact quizzes and self-identification rather than trusting the published date. His finding: the dates cluster by training run, not by release, and at least one flagship model shows a knowledge state noticeably older than its stated cutoff.
3. **The bottleneck is power, not chips.** Across Q2 earnings calls, Microsoft, Alphabet and Meta all shifted the metric they talk about from total capex to 'time-to-energy' — how fast a signed power contract becomes revenue-generating compute. Five data centers of a gigawatt or more are expected online this year, each run by a different hyperscaler, and Meta committed over $9 billion to a 1 GW campus in Alberta.
4. **$510 billion.** Global venture funding in the first half of 2026, per Crunchbase — more than the $440 billion invested across all of 2025. AI took more than 70% of Q2's dollars, up from just under 50% a year earlier, and OpenAI and Anthropic between them absorbed over 40% of every venture dollar deployed worldwide.
5. **The plumbing that connects AI agents to your systems just got rebuilt.** The Model Context Protocol shipped its 2026-07-28 specification, the largest revision since launch: the transport is now stateless, protocol-level sessions and the Mcp-Session-Id header are gone, authorization aligns properly with OAuth and OpenID Connect, and Tasks and MCP Apps are promoted to first-class extensions. If you built an MCP server last year, some of it breaks.

---

## One fun thing

**People bonded more with a robot when it made mistakes — and their hormones proved it.**

Drexel researchers ran what appears to be the first study measuring brain activity, hormone levels, self-reported attitudes and actual behavior all at once during interactions with a humanoid robot. Oxytocin — the hormone associated with bonding to friends and family — went *up* when the expressive robot fumbled. Stated trust, meanwhile, went down. So the participants said they trusted it less while their bodies quietly warmed to it, which is a very human way to feel about a machine. 🤖

---

*Signal — a friendly weekly read on what actually moved in AI. Issue 013 · Tuesday · August 11 · 2026.*

*Want to reply with one word? christienabrhm94@gmail.com*

---

> **For syndication:** This piece was originally published at https://chris94949.github.io/signal-newsletter/signal-issue-013.html. When importing to Medium, Substack, Dev.to, or any platform that supports it, set this URL as the canonical URL in the story settings — this preserves SEO and credits the original source.
