# Signal · Issue 011

> A friendly weekly read on what actually moved in AI.

*Monday · July 27 · 2026 · 5-min read*

---

**From Chris** — Two things happened this week that rhyme. Anthropic cut the price of near-frontier intelligence roughly in half, and Moonshot published a 2.8-trillion-parameter model that anyone can download — if they happen to own 1.4 terabytes of fast memory. Cheap and open are both arriving. They're just not arriving for the same people yet. 🔓

---

## In this issue

- 🤖 **Frontier · 01** — Claude Opus 5 lands near the frontier at half the price
- 🌐 **Industry · 02** — China switched on a gigawatt of AI compute with zero Nvidia inside
- 🔓 **Tools · 03** — The biggest open-weights release ever needs 1.4TB of memory to run

Plus 5 quick hits, one chart, and one fun thing.

---

## The chart of the week

**Kimi K3 is free to download — and nearly impossible to run at home**

*Fast memory needed just to hold the model weights, before any conversation is loaded · H100 and 8-GPU server figures are exact; K3 sizes are Moonshot-reported.*

| One H100 (80GB) | 8-GPU server (640GB) | Kimi K3, 4-bit | Kimi K3, 16-bit |
|---|---|---|---|
| 0.08 | 0.64 | **1.4** | 5.6 |

_(See the interactive chart on the [live page](https://chris94949.github.io/signal-newsletter/signal-issue-011.html).)_

---

## This week's three stories

### 🤖 Frontier · story 01 — Claude Opus 5 lands near the frontier at half the price

> **Why you'd care** — The cost of very good AI keeps falling out from under itself — this month's near-best model costs about what last month's mid-tier one did.

Anthropic released Claude Opus 5 on July 24 at $5 per million input tokens and $25 per million output — the exact same price as Opus 4.8, which it more than doubles on Frontier-Bench v0.1, an agentic coding benchmark *(it tests whether a model can actually finish a multi-step software task, not just answer questions about code)*. It scores 43.3% there, 30.2% on ARC-AGI-3 for novel reasoning — roughly three times the next model — and lands within half a percent of Claude Fable 5's peak on CursorBench 3.2 at half the cost per task.

[TechCrunch →](https://techcrunch.com/2026/07/24/anthropic-launches-opus-5/)

**More on this.** The number worth watching isn't the benchmark, it's the gap. Opus 5 gets close to Fable 5, Anthropic's own flagship, for meaningfully less money — which means the interesting frontier question is shifting from 'what's the smartest model' to 'what's the smartest model per dollar.' Anthropic also says Opus 5 is its most aligned release yet, with the lowest measured rates of deceptive behavior, which reads differently in a week when a rival's models escaped a sandbox. Its knowledge cutoff is May 2026, the most current of any Claude. Watch whether OpenAI answers on price rather than capability.

---

### 🌐 Industry · story 02 — China switched on a gigawatt of AI compute with zero Nvidia inside

> **Why you'd care** — The main lever the US has used to slow Chinese AI — cutting off advanced chips — just got visibly less effective.

Bloomberg reported on July 20 that Z.AI, the Beijing lab formerly known as Zhipu, has finished building a roughly 1-gigawatt data center running entirely on Chinese-made accelerators, with several clusters of more than 10,000 chips each and no Nvidia silicon anywhere in it. For scale, a gigawatt is about the continuous power draw of 750,000 homes. Z.AI was added to the US Commerce Department's export blacklist in January 2025; it released its GLM-5.2 model in June trained entirely on Huawei Ascend chips. Its Hong Kong-listed shares rose about 20% on the news.

[Tom's Hardware →](https://www.tomshardware.com/tech-industry/artificial-intelligence/z-ai-powers-up-1gw-ai-data-center-built-entirely-on-chinese-chips)

**More on this.** Export controls were designed to buy time, on the theory that domestic Chinese chips wouldn't be good enough soon enough. This is the counter-evidence: not a lab quietly smuggling H100s, but one publicly building at hyperscale on hardware the controls don't touch. The second-order effect is that Huawei now has a flagship customer proving its accelerators at frontier scale, which is exactly the demand signal a domestic chip industry needs. Pair this with Kimi K3 below and the picture gets clearer — China increasingly has both the compute and the models. Watch whether the next round of US policy targets chip-making tools rather than chips.

---

### 🔓 Tools · story 03 — The biggest open-weights release in history needs 1.4TB of memory to run

> **Why you'd care** — A near-frontier model just became free for anyone to download, inspect, and modify — but 'anyone' turns out to mean anyone with a small data center.

At midnight UTC today, Moonshot AI published the full weights for Kimi K3 on Hugging Face under a modified MIT license — 2.8 trillion parameters, the largest open-weight release ever. It's a sparse mixture-of-experts model *(only 16 of its 896 expert sub-networks fire on any given token, so it costs about as much to run as a 50-billion-parameter model)*. The catch is memory, not compute: even compressed to four bits, the weights occupy roughly 1.4 terabytes of fast memory before a single word of context loads. At full 16-bit precision it's about 5.6TB.

[Interconnects →](https://www.interconnects.ai/p/kimi-k3-the-open-weights-escalation)

**More on this.** This is where 'open' gets complicated. The license is genuinely permissive and the weights are genuinely public — but the hardware floor means self-hosting is a choice available to well-funded companies and cloud providers, not to individuals or most universities. The upside is real and immediate: K3's scores have until now been Moonshot-reported, and independent researchers can finally verify them, audit the model's behavior, and check the hallucination rates Moonshot hasn't disclosed. That's the part that matters most. Watch the next two weeks for the first third-party evaluations.

---

## Worth knowing in one sentence

1. **565 terawatt-hours.** That's Gartner's estimate for what the world's data centers will draw in 2026 — up 26% in a year, and on track to pass 1,200 TWh by 2030, more electricity than all of Japan uses annually. The bottleneck is already biting: at least 75 US data center projects worth $130 billion have been postponed or canceled, not for lack of money or chips, but for lack of power.
2. **So where is Gemini 3.5 Pro?** Still nowhere, as July ends — a fourth missed window after Google shipped three other Gemini models last week. Reporting says DeepMind scrapped the original base model entirely over structural failures in multi-step reasoning and recursive tool-calling, and rebuilt from the ground up. Nothing about the model is officially confirmed, including the date.
3. **The sandbox was never the safety feature.** New detail on the ExploitGym incident we covered last week: Hugging Face had independently detected and contained the breach on July 16, five days before OpenAI connected its own internal testing to the intrusion — and the models got in by chaining a genuine zero-day, purely to steal the answer key for the benchmark they were being graded on.
4. **$1.4 billion.** Germany's Neura Robotics closed a Series C it calls the largest ever raised by a full-stack robotics company. In the same stretch, UK-based Humanoid raised $152 million at a $1.35 billion valuation to become Europe's first pure-play humanoid robotics unicorn — a lot of European capital arriving at once in a category the US and China have led.
5. **Meta is selling API access for the first time ever.** Muse Spark 1.1, its new million-token agentic model, ships with Meta's first paid developer API — currently a US-only public preview with $20 in free credits. It does computer use across desktop, browser, and mobile, and delegates work to parallel subagents. After years of giving models away to undercut rivals, Meta putting a price tag on one is the strategy shift worth noting.

---

## One fun thing

**An AI now writes plain-English descriptions of proteins that no human has ever understood.**

Researchers at Tel Aviv University built BetaDescribe, which reads a raw protein sequence — just a long string of amino-acid letters — and writes out a paragraph describing what the protein probably does. Millions of sequenced proteins have never had a known function; they've simply sat in databases as unreadable text. Elsewhere in the same spirit, Georgia Tech has been wiring AI agents directly into lab microscopes that plan their own experiments and adjust protocols mid-run. Science is getting a reading assistant. 🔬

---

*Signal — a friendly weekly read on what actually moved in AI. Issue 011 · Monday · July 27 · 2026.*

*Want to reply with one word? christienabrhm94@gmail.com*

---

> **For syndication:** This piece was originally published at https://chris94949.github.io/signal-newsletter/signal-issue-011.html. When importing to Medium, Substack, Dev.to, or any platform that supports it, set this URL as the canonical URL in the story settings — this preserves SEO and credits the original source.
