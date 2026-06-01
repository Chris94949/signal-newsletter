# Signal · Issue 002

> A friendly weekly read on what actually moved in AI.

*Monday · June 1 · 2026 · 5-min read*

---

**From Chris** — Welcome to Signal #002. This week the AI industry stopped being a private-market story — two trillion-dollar IPOs are on the runway and the actual cost of running a frontier lab leaked into a public filing. Oh, and an AI casually disproved an 80-year-old math conjecture. 🧮

---

## In this issue

- 🧮 **Research · 01** — AI just disproved an 80-year-old math conjecture
- 💰 **Industry · 02** — OpenAI filed for the biggest IPO in history
- 🏗️ **Industry · 03** — A leaked S-1 line exposed Anthropic's $45B compute bill

Plus 5 quick hits, one chart, and one fun thing.

---

## The chart of the week

**Anthropic's quarterly revenue is going vertical**

*Anthropic quarterly revenue, $B · Q1 '26 reported, Q2 '26E projected to investors · earlier quarters derived from disclosed run-rates (illustrative)*

| Q4 '24 | Q2 '25 | Q4 '25 | Q1 '26 | Q2 '26E |
|---|---|---|---|---|
| 0.3 | 0.8 | 2.25 | 4.8 | **10.9** |

_(See the interactive chart on the [live page](https://chris94949.github.io/signal-newsletter/signal-issue-002.html).)_

---

## This week's three stories

### 🧮 Research · story 01 — AI just disproved an 80-year-old math conjecture

> **Why you'd care** — AI stopped doing math homework this week and started doing math research — solving an open problem that mathematicians couldn't crack since 1946.

On May 20, an internal OpenAI reasoning model autonomously disproved Erdős's planar unit distance conjecture *(an open question from 1946 about how often points in a plane can sit exactly 1 unit apart)*, using techniques from algebraic number theory that the field hadn't expected to apply. Fields medalist Tim Gowers called the result "a milestone in AI mathematics." The proof has been externally verified.

[OpenAI →](https://openai.com/index/model-disproves-discrete-geometry-conjecture/)

**More on this.** The framing matters as much as the result. This wasn't a math-specialist model scaffolded for theorem-proving — it was a general-purpose reasoning model that chose to apply infinite class field towers and Golod-Shafarevich theory *(esoteric tools from algebraic number theory)* to a geometry problem on its own. That suggests we're past the era when AI mathematics needed hand-tuning per problem class, and into the era when the model picks its own toolkit. Companion paper signed by Gowers himself.

---

### 💰 Industry · story 02 — OpenAI just filed for the biggest IPO in history

> **Why you'd care** — The single largest IPO ever attempted is now on the runway — and it's an AI company, not a bank or oil major.

On May 22, OpenAI confidentially filed its S-1 *(the SEC form companies submit to go public)* with Goldman Sachs and Morgan Stanley co-leading. Target valuation is $852 billion to over $1 trillion, with a listing window as early as September 2026. The numbers behind it: roughly $2 billion in monthly revenue, a $25 billion annualized run rate, 50 million consumer subscribers, and 9 million business users.

**More on this.** If it prices at the top of the range, this would beat Saudi Aramco's $25B raise and become the largest IPO of all time. The more interesting story is what a public OpenAI means for the rest of the industry — quarterly earnings calls force the company to defend its compute spend, model costs, and consumer economics in public for the first time. Expect competitors (especially Anthropic, now eyeing an October listing) to time their own offerings against OpenAI's tape, and expect AI to dominate every business desk for the back half of the year.

---

### 🏗️ Industry · story 03 — A deleted line in SpaceX's S-1 exposed Anthropic's real compute bill

> **Why you'd care** — We finally have a number for what it actually costs to be a frontier AI lab — and it's bigger than almost any cloud contract in history.

Buried on page 13 of SpaceX's public prospectus was a disclosure that Anthropic is paying SpaceX **$1.25 billion a month** for dedicated GPU capacity at the Colossus 1 and 2 data centers — about $15 billion a year, $45 billion through May 2029. That's 200,000+ NVIDIA GPUs powering Claude. The line item was quietly deleted from a later draft, but reporters had already pulled it.

[PitchBook →](https://pitchbook.com/news/articles/spacex-s1-deleted-disclosure-ai-infrastructure)

**More on this.** Two things this changes. First, it confirms the gap between AI-lab revenue and AI-lab compute spend is closing fast — Anthropic's Q2 revenue is now larger than its quarterly Colossus bill, which is why a first profitable quarter is in reach. Second, it makes the SpaceX-Anthropic relationship one of the most consequential infrastructure pairings in tech, alongside the existing Anthropic-Google-Broadcom 3.5GW TPU deal. The Musk-versus-OpenAI feud has produced an unexpected winner: the lab Musk doesn't own.

---

## Worth knowing in one sentence

1. **$10.9 billion** — Anthropic's projected Q2 revenue, more than 2× Q1, with a first-ever operating profit of $559M. Investors got the memo ahead of an October IPO targeting a ~$900B valuation. [CNBC →](https://www.cnbc.com/2026/05/20/anthropic-revenue-explosive-growth-ipo-profitable-quarter.html)
2. **Did the EU just blink?** Negotiators reached a political agreement on the AI Act 'Digital Omnibus,' pushing high-risk system rules from August 2026 to December 2027. Industry got 16 more months; new prohibitions on non-consensual AI imagery got added in exchange.
3. **Biggest Search update in 25 years.** Google rebuilt the Search box around AI agents at I/O — Gemini 3.5 Flash is now the default AI Mode model globally, and persistent information agents now run 24/7 in the background and ping you when something changes.
4. **$30 billion** — the size of Anthropic's new funding round, led by Sequoia, Dragoneer, Altimeter, and Greenoaks, at a roughly $900B pre-money valuation. For context: that's larger than the entire US venture market in a typical 2010s quarter.
5. **Karpathy joined Anthropic.** OpenAI co-founder and ex-Tesla AI lead Andrej Karpathy is launching a new team under Nick Joseph with a recursive mandate: use Claude to accelerate the pre-training of the next Claude. Highest-profile AI talent move in two years.

---

## One fun thing

**An AI is now running its own science experiments — overnight, while humans sleep.**

A Boston lab profiled by NPR this week has handed the full design-of-experiment loop to an AI: it forms hypotheses, writes protocols, dispatches robots to mix the chemistry, reviews the results, and decides what to try next. 🧪 Researchers walk in each morning to a queue of discoveries the lab made without them. The team calls it 'putting the AI in the chemist seat' — and the overnight discoveries are starting to outrun the human review backlog.

---

*Signal — a friendly weekly read on what actually moved in AI. Issue 002 · Monday · June 1 · 2026.*

*Want to reply with one word? christienabrhm94@gmail.com*

---

> **For syndication:** This piece was originally published at https://chris94949.github.io/signal-newsletter/signal-issue-002.html. When importing to Medium, Substack, Dev.to, or any platform that supports it, set this URL as the canonical URL in the story settings — this preserves SEO and credits the original source.
