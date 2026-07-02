# Signal · Issue 007

> A friendly weekly read on what actually moved in AI.

*Monday · June 29 · 2026 · 5-min read*

---

**From Chris** — Issue seven, and the theme was AI's economics getting real. OpenAI stopped renting Nvidia's chips and designed its own, Anthropic accused Alibaba of quietly copying Claude, and a new flagship model shipped locked behind a government velvet rope. Underneath it all, the price of intelligence keeps falling off a cliff. Plus a humanoid robot that's learning to play tennis. 🎾

---

## In this issue

- 🌶️ **Industry · 01** — OpenAI unveils Jalapeño, its first custom AI chip
- 🛡️ **Security · 02** — Anthropic accuses Alibaba of copying Claude
- 🤖 **Frontier · 03** — GPT-5.6 launches behind a government velvet rope

Plus 5 quick hits, one chart, and one fun thing.

---

## The chart of the week

**The price of intelligence is falling off a cliff**

*Epoch AI · approx. price per million tokens to match GPT-3.5-level quality · illustrative milestone points, intermediate values approximate.*

| Nov 2022 | Late 2023 | Oct 2024 | 2026 |
|---|---|---|---|
| 20 | 2 | 0.07 | **0.06** |

_(See the interactive chart on the [live page](https://chris94949.github.io/signal-newsletter/signal-issue-007.html).)_

---

## This week's three stories

### 🌶️ Industry · story 01 — OpenAI unveils Jalapeño, its first custom AI chip

> **Why you'd care** — The company that made AI expensive is now trying to make it cheap — by designing its own silicon instead of renting Nvidia's.

On June 24, OpenAI and Broadcom unveiled Jalapeño, OpenAI's first custom chip, built specifically for inference *(running trained models to answer your prompts, as opposed to training new ones)*. Early results show meaningfully better performance-per-watt than today's best alternatives, and the companies plan an initial deployment by the end of 2026. It's the first in a multi-generation platform aimed squarely at loosening Nvidia's grip on AI compute.

[TechCrunch →](https://techcrunch.com/2026/06/24/openai-unveils-its-first-custom-chip-built-by-broadcom/)

**More on this.** This is about owning your costs. Inference is the bill that never stops — every ChatGPT reply burns power and rented GPUs — so a chip tuned only for that workload is a direct lever on OpenAI's margins. Google (TPU), Amazon (Trainium), and Meta (MTIA) already design their own; OpenAI joining means the biggest AI buyers are all trying to route around Nvidia. Watch whether Jalapeño actually ships on time and whether the performance-per-watt claims survive contact with a real data center.

---

### 🛡️ Security · story 02 — Anthropic accuses Alibaba of copying Claude

> **Why you'd care** — The next front in the AI race may be less about who trains the best model and more about who can quietly copy one.

On June 24, Anthropic wrote to the White House alleging that operators tied to Alibaba's Qwen lab ran 28.8 million exchanges through roughly 25,000 fraudulent accounts between April 22 and June 5 to 'distill' Claude *(distillation — training a cheaper model on a stronger model's answers to copy its skills)*. The alleged targets were Claude's software-engineering, agentic reasoning, and cybersecurity abilities. Alibaba denies wrongdoing, and the figures are Anthropic's allegation — not independently verified.

[CNBC →](https://www.cnbc.com/2026/06/24/anthropic-alibaba-distillation-campaign.html)

**More on this.** Distillation is hard to prove and easy to deny, which is exactly why this is a policy fight, not just a lawsuit — Anthropic took it to the White House, framing model capabilities as national IP worth protecting. If regulators agree, expect tighter identity checks, rate limits, and terms-of-service enforcement on frontier APIs, which quietly raises the cost of building with them. The uncomfortable irony: the whole industry was itself trained on scraped public data, so 'who copied whom' is a slippery line to draw.

---

### 🤖 Frontier · story 03 — GPT-5.6 launches behind a government velvet rope

> **Why you'd care** — For the first time, a major AI model shipped with the US government helping decide who gets to use it first.

On June 26, OpenAI previewed GPT-5.6 as a family of three models — Sol (flagship), Terra (balanced), and Luna (fast and cheap) — but rolled it out as a limited preview to only about 20 pre-approved organizations, saying it did so at the request of the US government. OpenAI cited stronger safeguards around higher-risk cyber and misuse cases, and says broader general availability *(GA — open to everyone)* will follow 'in the coming weeks.'

[Axios →](https://www.axios.com/2026/06/26/openai-gpt-sol-terra-luna-trump)

**More on this.** The capability jump matters, but the access model matters more: a gated, government-coordinated launch is a new template for how frontier AI reaches the public. It signals that the most capable systems may increasingly ship to vetted users first and everyone else later — closer to how controlled technologies are released than how software normally ships. Watch how long the 'coming weeks' actually takes, and whether rivals adopt the same staged, permissioned rollout.

---

## Worth knowing in one sentence

1. **9 months.** That's how fast Jalapeño went from first design to manufacturing tape-out — possibly the fastest cycle ever for a high-performance chip — and OpenAI's own AI models helped design it, a loop where AI is now building the hardware that runs AI.
2. **Is bigger still better?** CNBC reports enterprises shifting from 'tokenmaxxing' — chasing the largest model — toward efficiency, buying the cheapest model that clears the bar, as falling prices make raw size a weaker selling point.
3. **Talent is the real moat.** Four senior Gemini researchers announced departures from Google for Anthropic in six days, and Google's Gemini 3.5 Pro slipped to July — a reminder that people, not just GPUs, decide who ships next.
4. **$50 billion.** UAE investment firm MGX raised a fresh war chest aimed at AI infrastructure and deals, the kind of sovereign-scale capital that makes today's multi-billion-dollar AI acquisitions look routine.
5. **Qualcomm bought a CUDA challenger.** Its roughly $4 billion all-stock deal for Modular — the AI-software startup from LLVM and Swift creator Chris Lattner — targets Nvidia's stickiest advantage: the CUDA software that locks developers to Nvidia chips.

---

## One fun thing

**Humanoid robots are now learning to play tennis by watching people swing.**

A wave of 2026 robotics research is teaching two-legged robots racket sports — tennis, badminton — by feeding them imperfect recordings of human motion and letting them figure out the rest. The hard part isn't the swing; it's staying balanced on two legs while lunging for a ball, the same full-body coordination that makes a backhand look easy for us and nearly impossible for a machine. We taught computers chess decades ago; teaching them to chase a fuzzy yellow ball turned out to be the harder game. 🎾

---

*Signal — a friendly weekly read on what actually moved in AI. Issue 007 · Monday · June 29 · 2026.*

*Want to reply with one word? christienabrhm94@gmail.com*

---

> **For syndication:** This piece was originally published at https://chris94949.github.io/signal-newsletter/signal-issue-007.html. When importing to Medium, Substack, Dev.to, or any platform that supports it, set this URL as the canonical URL in the story settings — this preserves SEO and credits the original source.
