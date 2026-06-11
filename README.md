# Signal

A weekly interactive newsletter on what actually moved in AI — three stories, five quick-hits, one fun fact, three sources. Friendly explainer voice.

Ships every Monday automatically: a scheduled Claude task researches the past 7 days, writes the issue content as JSON, and runs `render.js`. A macOS LaunchAgent watches the output and pushes to GitHub Pages within ~60 seconds. The only manual step left is optionally pasting the Markdown version into Medium.

## The full automation pipeline

```
 Monday 7am ─ Scheduled Claude task
              │
              ├─ Step 1: List existing signal-issue-*.json files → next issue number
              ├─ Step 2: WebSearch the past 7 days of AI/tech news
              ├─ Step 3: Curate to 3 headlines + 5 quick-hits + 1 fun fact + 1 chart
              ├─ Step 4: Write signal-issue-NNN.json
              ├─ Step 5: Run `node render.js`
              │           ↓
              │   Writes:  signal-issue-NNN.html       (interactive page)
              │            signal-issue-NNN.email.html (email-safe twin)
              │            signal-issue-NNN.md         (Medium-ready Markdown)
              │            index.html                  (regenerated archive)  ←┐
              │                                                                │
              ├─ Step 6: Verify outputs                                        │
              └─ Step 7: Notify Chris with live URL                            │
                                                                               │
 macOS LaunchAgent (com.signal.autodeploy) ───── watches ─────────────────────┘
              │
              └─ index.html changes → fires `bash deploy.sh`
                 ↓
                 git add + commit + push origin main
                 ↓
 GitHub Pages rebuilds (~30s)
              │
              └─ https://chris94949.github.io/signal-newsletter/signal-issue-NNN.html  goes live
```

Total Chris action on a normal Monday: zero. The optional Medium paste takes 3-5 minutes; everything else is hands-off.

## File structure

```
.
├── README.md                      ← this file
├── SYNDICATION.md                 ← how to publish each issue to Medium
├── signal.config.json             ← publish-time settings (base_url)
├── render.js                      ← build script: JSON → page + email + Markdown + archive
├── deploy.sh                      ← git stage/commit/push (called by LaunchAgent)
├── install-autodeploy.sh          ← one-time installer for the macOS auto-deploy
├── com.signal.autodeploy.plist    ← LaunchAgent definition (installed to ~/Library/LaunchAgents/)
├── signal-issue-001-v2.html       ← page template (do not edit by hand)
│
├── signal-issue-NNN.json          ← content for issue NNN (the source of truth)
├── signal-issue-NNN.html          ← rendered interactive page (output)
├── signal-issue-NNN.email.html    ← rendered email-safe twin (output)
├── signal-issue-NNN.md            ← rendered Markdown for Medium / Substack (output)
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

## One-time setup for full automation

After the first manual `bash deploy.sh <repo-url>` push has stored your GitHub credentials in the macOS keychain, install the auto-deploy LaunchAgent:

```bash
cd "/Users/christienabraham/Documents/Claude/Projects/Interactive Newsletter"
bash install-autodeploy.sh
```

This copies `com.signal.autodeploy.plist` into `~/Library/LaunchAgents/` and loads it via `launchctl`. From that point onward, every time `render.js` writes a new `index.html`, the LaunchAgent fires `bash deploy.sh` within ~60 seconds — including the weekly Monday-morning task run.

Verify it's active:

```bash
launchctl list | grep com.signal.autodeploy
tail -f .autodeploy.log
```

Uninstall:

```bash
bash install-autodeploy.sh --uninstall
```

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
