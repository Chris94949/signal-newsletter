# Syndicating Signal to Medium

Each Monday, `render.js` produces a `signal-issue-NNN.md` file alongside the interactive page and email. That Markdown file is the syndication-ready version of the issue — paste it into Medium (or Substack, Dev.to, etc.) and set the canonical URL to your GitHub Pages link.

## Why canonical URLs matter

When the same content appears on two sites, Google penalizes duplicate content — unless one of them is declared "canonical" (the original). Medium supports this explicitly. Setting it correctly means:

- Your GitHub Pages site keeps all the SEO credit
- Medium readers still see and read the piece
- You get Medium's discovery (Topics, Recommendations) without losing your own search-engine standing

## The Medium publish flow — exact steps

### Once: connect your account

1. Go to https://medium.com and sign in (or create an account).
2. In your profile menu, click **Settings → Integrations**. Confirm your email is verified.
3. (Optional, recommended) Create a Publication for Signal so it has its own page on Medium. Profile menu → **Publications → New publication**. Name it "Signal" or similar. This is where every weekly issue will live.

### Every week: publish the new issue

1. Open `signal-issue-NNN.md` from your project folder. Select all (Cmd+A), copy (Cmd+C).
2. On Medium, click **Write** (the pen icon, top right).
3. Paste the Markdown directly into the editor. Medium parses Markdown on paste — headings, blockquotes, lists, code blocks, links, and bold/italic all convert correctly. Tables convert to formatted lists.
4. **Clean up after paste:**
   - The first line (`# Signal · Issue NNN`) becomes the story title automatically. Delete the `#` line if it duplicates.
   - The `> A friendly weekly read on what actually moved in AI.` line becomes the subtitle if you select it and click the small "T" formatting option. Otherwise it stays as a blockquote.
   - The `---` horizontal rules render as Medium's section dividers automatically.
   - The last block (the "For syndication" canonical-URL note) is just a reminder for you — delete it before publishing.
5. **Set the canonical URL — this is the important step:**
   - Click the **three-dot menu (⋯)** in the top-right while editing.
   - Click **More settings**.
   - Scroll to **Customize SEO and Social Settings**.
   - In **Canonical URL**, paste:
     ```
     https://chris94949.github.io/signal-newsletter/signal-issue-NNN.html
     ```
     (Replace `NNN` with the actual issue number.)
6. **Add tags** for discovery. 3–5 recommended. Good options for Signal: `Artificial Intelligence`, `Tech`, `AI`, `Newsletter`, plus one specific to the week's stories (e.g. `OpenAI`, `Anthropic`, `Robotics`).
7. **Publish to your Publication** if you set one up — the dropdown lets you choose between publishing to your personal profile or your Publication. Publication gets better long-term discovery.
8. **Click Publish.**

The whole flow takes 3–5 minutes once you're used to it.

## Recommended tweaks (do these once)

- **Custom cover image.** Medium auto-picks an image from the post. For Signal, no images are embedded by default — Medium will pull from your linked sources. To control this, click the first paragraph in the Medium editor and use the `+` icon → image upload. A simple "SIGNAL · Issue NNN" graphic works well.
- **Subtitle.** Set the subtitle to the week's editor note (the "From Chris —" line), trimmed to ~100 characters. This is the preview text Medium shows in feeds.
- **Story preview.** Once published, Medium generates a story preview image with your title overlaid. You can override in story settings if needed.

## What if you want full automation later?

The Medium API still exists but has been restricted since 2020 — it only supports creating drafts for accounts that have a Medium integration token, and it doesn't support setting canonical URLs via API. So fully automated cross-posting isn't possible right now without a workaround like RSS import (which Medium also restricts).

The current "manual paste with canonical URL" flow is the cleanest path. If you ever want to lower friction further, the realistic options are:
- **Zapier / IFTTT** — RSS-to-Medium drafts (limited; doesn't set canonical correctly).
- **Custom script via Medium token API** — possible for drafts, not for canonical URLs.
- **Move primary publication to Medium and reverse the canonical** — the cleanest "fully automated" answer if you decide Medium is your primary distribution channel.

For now, the 3-5 minute weekly paste is the right shape: keeps you in control, keeps your GitHub Pages site as the primary, and gives Medium readers a clean reading experience.

## Beyond Medium

Same `.md` file works (with minor adjustments) for:

- **Substack** — Settings → Import → "Import from URL" or paste directly. Substack supports canonical URLs in post settings.
- **Dev.to** — Paste Markdown directly. Set canonical URL via the post editor's "Edit metadata" pencil icon.
- **HackerNoon** — Submit through their editor. They review before publishing; canonical is supported.
- **LinkedIn Articles** — Don't paste the full version. Instead, write a shorter post with: the three "Why you'd care" lines, your editor note, and a "Read the full issue →" link to GitHub Pages.
