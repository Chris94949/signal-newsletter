# Signal · Issue 012

> A friendly weekly read on what actually moved in AI.

*Monday · August 3 · 2026 · 5-min read*

---

**From Chris** — This was the week the people building frontier AI publicly asked for a brake pedal — and the week the money got bigger and the prices got smaller anyway. Both things are true at once, and holding them together is more or less the whole job right now. 🛑

---

## In this issue

- 🛑 **Frontier · 01** — 1,100+ AI insiders asked Washington to help slow AI down
- 🌐 **Industry · 02** — Nvidia may guarantee $250 billion so OpenAI can rent a data center
- 💸 **Tools · 03** — OpenAI cut a model's price 80% three weeks after launch

Plus 5 quick hits, one chart, and one fun thing.

---

## The chart of the week

**A mid-tier OpenAI model got 80% cheaper in three weeks**

*Published list price per million output tokens · OpenAI and Anthropic pricing as of July 30, 2026 · Sol's price was unchanged and is omitted.*

| Luna (was) | Luna (now) | Terra (was) | Terra (now) | Claude Opus 5 |
|---|---|---|---|---|
| 6 | **1.2** | 15 | 12 | 25 |

_(See the interactive chart on the [live page](https://chris94949.github.io/signal-newsletter/signal-issue-012.html).)_

---

## This week's three stories

### 🛑 Frontier · story 01 — 1,100+ AI insiders asked Washington to help slow AI down

> **Why you'd care** — The people with the clearest view of how fast this is moving just said, on the record and with their names attached, that it's moving too fast to steer.

On July 29, more than 1,100 employees of OpenAI, Anthropic, Google DeepMind, Meta and other frontier labs signed an open letter called "Pacing the Frontier," asking the US government to back an international effort to build the tools needed to deliberately slow frontier AI development. Signatories include Anthropic CEO Dario Amodei, OpenAI Chief Scientist Jakub Pachocki, Meta Chief Scientist Shengjia Zhao and DeepMind's AI safety lead Anca Dragan. The specific worry is recursive self-improvement *(AI systems doing enough of the work of designing and training their own successors that each generation arrives faster than humans could manage alone)*.

[Fortune →](https://fortune.com/2026/07/29/anthropic-deepmind-openai-meta-washington-ai-slowdown-plan/)

**More on this.** Two things make this different from the pause letters of years past. First, the ask is narrower and more practical: not "stop now," but "build the technical and governance machinery so that a coordinated slowdown is possible later, without anyone having to unilaterally drop out of the race." That's a solvable engineering-and-treaty problem rather than a moral appeal. Second, OpenAI and Anthropic endorsed it in their own corporate names, not just as a collection of individual employees — companies rarely sign documents asking to be regulated. The trigger appears to have been the sandbox-escape incident we covered two weeks ago, where an OpenAI model chained real zero-days into Hugging Face's production systems. Watch whether any US agency actually picks this up, or whether it becomes a document everyone admires and nobody acts on.

---

### 🌐 Industry · story 02 — Nvidia may guarantee $250 billion so OpenAI can rent a data center

> **Why you'd care** — The company selling the chips is increasingly also the company financing the buyer — which makes the demand for chips harder to read as real demand.

The Wall Street Journal reported on July 27 that Nvidia is in talks to backstop roughly $250 billion in lending so OpenAI can lease a 10-gigawatt data center campus SoftBank's SB Energy is building on a decommissioned uranium-enrichment site about 50 miles south of Columbus, Ohio. Nvidia is separately said to be discussing up to $350 billion to help finance the chips that go inside it. All in, the campus could exceed $500 billion — the largest data center project ever announced. The guarantee exists because OpenAI isn't profitable and can't reach investment-grade credit on its own.

[Tom's Hardware →](https://www.tomshardware.com/tech-industry/data-centers/nvidia-weighs-250-billion-guarantee-so-openai-can-lease-softbanks-10-gigawatt-ohio-campus)

**More on this.** This is what people mean by circular financing: Nvidia's guarantee makes the lease affordable, the lease makes the campus buildable, and the campus is filled with Nvidia chips that Nvidia books as revenue. None of the individual steps are improper, but stacked together they make it genuinely hard to tell how much of the AI infrastructure boom is customers buying and how much is a vendor underwriting its own order book. The rest of the week rhymed: Meta and BlackRock announced a $14 billion, 1-gigawatt campus in El Paso, the EU opened a €10 billion tender for up to seven AI gigafactories, and Nvidia put roughly $5 billion into Ilya Sutskever's Safe Superintelligence. Watch the credit markets, not the press releases — the tell will be what these loans price at.

---

### 💸 Tools · story 03 — OpenAI cut a model's price 80% three weeks after launch

> **Why you'd care** — If you've been holding off on an AI project because the per-use cost didn't pencil out, the math may have quietly changed under you.

On July 30, OpenAI dropped the price of GPT-5.6 Luna by 80% and GPT-5.6 Terra by 20%, about three weeks after both models shipped. Luna now costs 20 cents per million input tokens and $1.20 per million output, down from $1 and $6. Terra fell to $2 and $12, from $2.50 and $15. Sol, the flagship, was left alone. OpenAI attributed the cut to efficiency gains in the systems that serve the models *(the same weights, running on better-optimized infrastructure)*, not to any change in the models themselves.

[CNBC →](https://www.cnbc.com/2026/07/30/open-ai-price-cut-gpt.html)

**More on this.** Three weeks is fast. Price adjustments this soon after launch usually signal that a company is watching customers make a decision it doesn't like — in this case, cost-sensitive buyers routing high-volume work to cheaper Chinese models or open-weight alternatives they can host themselves. Note what did not get cut: Sol. The emerging shape of the market is a flagship tier that competes on capability and holds its price, and a volume tier underneath it that races toward the floor. For anyone building on these APIs, the practical takeaway is to re-benchmark rather than re-architect: work you shipped on an expensive model three weeks ago may run acceptably on one costing a fifth as much. Watch whether Google and Anthropic answer on price within the month.

---

## Worth knowing in one sentence

1. **Seven AI gigafactories.** The European Commission opened a €10 billion call for tenders on July 30 to build up to seven of them across Europe, each planned to hold at least 100,000 advanced AI chips — roughly four times the power of anything the EU runs today. Brussels expects the public money to pull in about €20 billion more in private investment.
2. **Is anyone still buying CRM software?** The Information reports that at least five US companies with 20 to 70 employees have cancelled Salesforce or HubSpot contracts in the past six months, using tools like Claude Code, Replit and Lovable to build their own instead — dropping annual costs from tens of thousands of dollars to hundreds. Five is not a trend yet. It is a shape worth watching.
3. **Post-training is where the gains are now.** DeepSeek shipped V4-Flash-0731 on July 31, and it's architecturally identical to the April preview — same 284 billion parameters, same 13 billion active per token, same million-token context. Everything that improved came from a rebuilt post-training pipeline, and it now beats DeepSeek's own flagship V4-Pro-Preview on nine agent benchmarks.
4. **$950 billion.** That's the total value of semiconductor partnerships South Korean companies signed following the San Francisco AI Summit. Samsung and Broadcom inked an MOU worth over $200 billion through 2030 covering memory, foundry and advanced packaging, while SK Group committed to supplying roughly $750 billion in advanced memory to buyers including Nvidia.
5. **Nvidia invested about $5 billion in a company that has never shipped a product.** Safe Superintelligence, founded by former OpenAI chief scientist Ilya Sutskever, announced a long-term partnership with Nvidia in late July that gives it access to the next-generation Vera Rubin platform and roughly ten times its current compute. SSI has released no model, no API, and no demo — the entire bet is on the researchers.

---

## One fun thing

**Someone built a soft robot warm enough that newly hatched chicks accept it as a parent.**

The device offers three things in combination: gentle body heat, a slow breathing-like swelling and contracting, and a simple face-like pattern. Chicks are famously easy to imprint on almost anything that moves at the right moment, but the interesting result is that researchers can now dial each cue up and down independently and watch what the chicks actually respond to. It turns out the breathing matters more than you'd guess. 🐣

---

*Signal — a friendly weekly read on what actually moved in AI. Issue 012 · Monday · August 3 · 2026.*

*Want to reply with one word? christienabrhm94@gmail.com*

---

> **For syndication:** This piece was originally published at https://chris94949.github.io/signal-newsletter/signal-issue-012.html. When importing to Medium, Substack, Dev.to, or any platform that supports it, set this URL as the canonical URL in the story settings — this preserves SEO and credits the original source.
