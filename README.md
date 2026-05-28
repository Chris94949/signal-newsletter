# Signal

A weekly interactive newsletter on what actually moved in AI — three stories, five quick-hits, one fun fact, three sources. Friendly explainer voice.

Ships every Monday via a scheduled Claude task that researches the past 7 days, writes the issue content as JSON, and runs `render.js` to produce the interactive page, the email-safe twin, and an updated archive.

## File structure

```
.
├── README.md                      ← this file
├── signal.config.json             ← publish-time settings (base_url)
├── render.js                      ← build script: JSON → page + email + archive
├── signal-issue-001-v2.html       ← page template (do not edit by hand)
│
├── signal-issue-NNN.json          ← content for issue NNN (the source of truth)
├── signal-issue-NNN.html          ← rendered interactive page (output)
├── signal-issue-NNN.email.html    ← rendered email-safe twin (output)
│
└── index.html                     ← archive page, regenerated on every render
```

The `-v2` original and three mockup files (`signal-mockup-1/2/3-*.html`) are kept for design reference. They're not part of the runtime pipeline; safe to delete.

## How an issue is built

1. **Research.** A scheduled Claude task runs every Monday at 7:01am local time. It uses web search to pull frontier AI/tech news from the past 7 days, picks 3 headlines + 5 quick-hits + 1 fun fact, and selects ≤3 outbound links.
2. **Content.** The task writes the curated content to `signal-issue-NNN.json` (incrementing from the highest existing issue number).
3. **Render.** It runs `node render.js`, which produces the three output files and updates the archive.
4. **Notify.** It reports back with computer:// links to the new page and email.

The schema for `signal-issue-NNN.json` is documented in the task prompt at `/Users/christienabraham/Documents/Claude/Scheduled/signal-newsletter-weekly/SKILL.md`.

## Local commands

```bash
# Render the latest issue (auto-detected as highest-numbered JSON)
node render.js

# Render a specific issue
node render.js 002

# Render an explicit JSON file
node render.js ./signal-issue-002.json
```

After editing any `signal-issue-NNN.json`, run `node render.js NNN` to regenerate.

## Publishing

This repo is structured for **GitHub Pages**: every file is at the root, so enabling Pages on the `main` branch (root) makes the archive live at `https://<user>.github.io/<repo>/`.

After enabling Pages, edit `signal.config.json`:

```json
{ "base_url": "https://<user>.github.io/<repo>/" }
```

Then re-render every issue so the email "Read the full story" links resolve to absolute URLs:

```bash
for json in signal-issue-*.json; do node render.js "$json"; done
```

Commit, push, and the live URLs in every email will match the hosted pages.

## Editorial bar

- **Why you'd care first** — every story leads with one plain-English sentence on impact. Technical depth goes behind the "More on this" expander.
- **Inline jargon glosses** — terms with insider connotations get a parenthetical aside the first time they appear.
- **Three outbound links per issue, max.** Quality over quantity.
- **Five quick-hits, five different shapes.** Stat lede / question lede / verdict / observation / money. Variety is the rhythm.
- **Friendly explainer voice.** Morning Brew / The Hustle DNA — but smarter and less breathless. No hot takes, no vendor cheerleading.

## Editing the bar

To tune voice, sources, story shape, or anything else: edit the prompt at
`/Users/christienabraham/Documents/Claude/Scheduled/signal-newsletter-weekly/SKILL.md`.

The page design lives in `signal-issue-001-v2.html` (template).
The email design lives inside `render.js` (renderEmail function).
The build logic lives in `render.js` (main / loadConfig / renderPage / renderEmail / renderIndex).
