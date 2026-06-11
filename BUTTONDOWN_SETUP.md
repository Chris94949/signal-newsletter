# Buttondown setup — email + subscribers in one place

This is a one-time setup. After it's done, every Monday Claude renders your issue → auto-sends it to your Buttondown subscriber list. Your friends can subscribe via a form on your GitHub Pages archive page.

## What Buttondown does for you

- Stores your subscriber list (handles signups, unsubscribes, bounces, spam complaints)
- Sends each issue as a real email with good deliverability
- Provides a subscribe-form embed for your GitHub Pages site
- Free under 100 subscribers, $9/month above that, pay-what-you-want at all tiers

## Setup steps (~15 minutes, one time)

### 1. Create your Buttondown account

Go to https://buttondown.com and sign up. Pick a username — this becomes part of your subscribe URL (`buttondown.com/<your-username>`). Suggested: something like `signal-newsletter` or `chrissignal` or whatever fits.

When you confirm your email, you're in.

### 2. Set the basics in Buttondown

In Buttondown's settings (top-right gear icon → Settings):

- **Newsletter name:** Signal
- **Description:** A friendly weekly read on what actually moved in AI.
- **From name:** Chris (or whatever you want subscribers to see)
- **From email:** Either use Buttondown's default (`<username>@buttondown.email`) or verify your own domain later

You don't need to do anything else in their UI — Claude will handle the actual sending via API.

### 3. Grab your API key

In Buttondown: **Settings → API key**. Click "Reveal" and copy the key (it looks like a long random string).

Open `signal.secrets.json` in your project folder and paste it in:

```json
{
  "buttondown_api_key": "PASTE_THE_KEY_HERE"
}
```

Save the file. This file is gitignored — it will never be pushed to GitHub.

### 4. Tell render.js your Buttondown username

Open `signal.config.json` and set `buttondown_username` to whatever you picked:

```json
{
  "base_url": "https://chris94949.github.io/signal-newsletter/",
  "buttondown_username": "signal-newsletter"
}
```

Save the file. (This one IS committed — your username is public anyway.)

### 5. Test the wiring

In Terminal:

```bash
cd "/Users/christienabraham/Documents/Claude/Projects/Interactive Newsletter"
node render.js 003
```

You should see:

```
✓ Rendered Issue 003 (links → https://chris94949.github.io/signal-newsletter/)
  signal-issue-003.html
  signal-issue-003.email.html
  signal-issue-003.md
  index.html (N issues archived)
  ✓ buttondown: queued for send (id: ...)
```

That `✓ buttondown: queued for send` line is the proof — Buttondown has received the issue. Check your Buttondown dashboard's "Emails" tab; you should see "Signal · Issue 003" listed as a draft or scheduled send.

⚠ **Important:** Buttondown drafts the email but may not send it immediately on first try (their default is "manual review" for new accounts to prevent abuse). Open the draft in Buttondown's UI once and click "Send" — after that first manual send, subsequent issues go automatically.

### 6. Test the subscribe form

Run the auto-deploy to push the updated archive (now with the subscribe form):

```bash
bash deploy.sh
```

Wait ~30 seconds for GitHub Pages to rebuild, then visit `https://chris94949.github.io/signal-newsletter/`. You should see a "📩 Get Signal in your inbox" card with an email input above the issue list. Try subscribing yourself with a test email — confirm you get a Buttondown confirmation email.

## What changes about your weekly flow

Before Buttondown:
- Monday: scheduled task renders issue → LaunchAgent pushes to GitHub Pages → live URL updates

After Buttondown:
- Monday: scheduled task renders issue → LaunchAgent pushes to GitHub Pages → live URL updates → **Buttondown sends the email to your subscribers**

All four steps are automatic. The Medium paste step remains optional.

## Sharing with friends

Just send them `https://chris94949.github.io/signal-newsletter/`. The subscribe form is right at the top. They enter their email, confirm in their inbox, and they're on the list. Next Monday's issue arrives automatically.

Or, if you'd rather send them a direct subscribe link: `https://buttondown.com/<your-buttondown-username>`.

## Failure modes worth knowing

- **API key invalid or revoked.** Symptom: `render.js` output shows `✗ buttondown send failed: 401`. Fix: regenerate the API key in Buttondown settings, paste new key into `signal.secrets.json`.
- **Daily send limit hit.** Buttondown's free tier sends a few thousand emails/month, well above what you'd hit at this scale. If you do hit it, the issue is still rendered and live on GitHub Pages; the email just queues for the next billing window.
- **Buttondown holds the send for review.** New accounts often get the first 1-3 sends paused for spam review. Just go to the Emails tab in Buttondown and click "Send" once. Future sends auto-flow.
- **A subscriber unsubscribes.** Buttondown handles this entirely — they click the unsubscribe link in any email, get removed from the list, future sends skip them. You don't need to do anything.

## Migrating away later

If you ever decide to leave Buttondown:

- Your subscriber list exports as CSV with one click (Settings → Export)
- Your content stays in your `signal-issue-NNN.json` files — Buttondown only stores send records, not your source
- Set `buttondown_api_key` to empty in `signal.secrets.json` and the auto-send turns off; everything else keeps working

No lock-in. That's the whole point.
