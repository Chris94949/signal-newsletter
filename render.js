#!/usr/bin/env node
/**
 * Signal · render.js
 *
 * Build script for the weekly newsletter. Reads a content JSON file and writes:
 *   - signal-issue-NNN.html       (the interactive page; same layout as v2)
 *   - signal-issue-NNN.email.html (the email-safe twin; tables + inline styles)
 *   - index.html                  (the archive index, regenerated from all known issues)
 *
 * Usage:
 *   node render.js              # render the latest signal-issue-*.json found here
 *   node render.js 001          # render signal-issue-001.json specifically
 *   node render.js ./path.json  # render an explicit file
 *
 * Convention:
 *   - The page TEMPLATE is signal-issue-001-v2.html. Render.js swaps the inline
 *     <script type="application/json" id="issue-data">...</script> block with
 *     the issue's JSON content. Everything else in the page is static.
 *   - The email is generated from scratch in JS template literals (no separate
 *     template file) so the layout stays in one place.
 *   - The archive index is rebuilt by globbing all signal-issue-*.json files
 *     and listing them newest-first.
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const PAGE_TEMPLATE = path.join(DIR, 'signal-issue-001-v2.html');
const CONFIG_PATH = path.join(DIR, 'signal.config.json');

// ---------- config (publish-time settings) ----------
function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return {};
  try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')); }
  catch (e) { console.warn('Warning: signal.config.json is invalid:', e.message); return {}; }
}
function normalizeBaseUrl(u) {
  if (!u) return '';
  // ensure trailing slash so we can concatenate cleanly: base + 'signal-issue-002.html'
  return u.replace(/\/?$/, '/');
}

// ---------- arg parsing ----------
function resolveJsonPath(arg) {
  if (!arg) {
    const found = fs.readdirSync(DIR)
      .filter(f => /^signal-issue-\d{3}\.json$/.test(f))
      .sort();
    if (!found.length) throw new Error('No signal-issue-NNN.json files found.');
    return path.join(DIR, found[found.length - 1]);
  }
  if (fs.existsSync(arg)) return path.resolve(arg);
  const padded = String(arg).padStart(3, '0');
  const candidate = path.join(DIR, `signal-issue-${padded}.json`);
  if (fs.existsSync(candidate)) return candidate;
  throw new Error(`Could not resolve issue from arg: ${arg}`);
}

// ---------- HTML helpers ----------
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// preserve <em>...</em> and <strong>...</strong> inside body fields,
// escape everything else
function safeBody(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/<(?!\/?(?:em|strong)\b)/g, '&lt;')
    .replace(/"/g, '&quot;');
}

// ---------- PAGE rendering (template-swap) ----------
function renderPage(data) {
  if (!fs.existsSync(PAGE_TEMPLATE)) {
    throw new Error(`Page template missing: ${PAGE_TEMPLATE}`);
  }
  const tpl = fs.readFileSync(PAGE_TEMPLATE, 'utf8');
  const jsonBlock = `<script type="application/json" id="issue-data">\n${JSON.stringify(data, null, 2)}\n</script>`;
  const issueStr = String(data.issue).padStart(3, '0');
  return tpl
    .replace(
      /<script type="application\/json" id="issue-data">[\s\S]*?<\/script>/,
      jsonBlock
    )
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>Signal · Issue ${issueStr} · ${esc(data.date_display)}</title>`
    );
}

// ---------- EMAIL rendering ----------
function renderEmail(d) {
  // base_url is set in main() from signal.config.json; if empty, links stay relative
  const base = d.base_url || '';
  const colorByName = {
    orange: { hex: '#E65525', deep: '#B83E12', tint: '#FFF1E6', soft: '#FFE0CF' },
    sage:   { hex: '#4F8A5F', deep: '#3A6648', tint: '#DAEBDF', soft: '#DAEBDF' },
    pink:   { hex: '#D86A82', deep: '#A4506A', tint: '#FBE3E8', soft: '#FBE3E8' }
  };
  const issueStr = String(d.issue).padStart(3, '0');

  const previewRows = d.preview.map((p, i) => `
              <tr>
                <td style="padding:6px 0;${i < d.preview.length-1 ? 'border-bottom:1px dashed #F0E2CF;' : ''}font-size:14px;color:#2A1F1A;">
                  ${esc(p.emoji)} &nbsp; <span style="font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#8C7D72;">${esc(p.label)} · 0${i+1}</span> &nbsp; ${esc(p.title)}
                </td>
              </tr>`).join('');

  const storyBlocks = d.stories.map(s => {
    const c = colorByName[s.color] || colorByName.orange;
    return `
        <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>
        <tr>
          <td style="background-color:#FFFFFF;border-radius:14px;padding:20px 24px;border-left:5px solid ${c.hex};">
            <div style="font-family:Helvetica,Arial,sans-serif;font-size:10.5px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${c.hex};margin-bottom:6px;">${esc(s.kicker)}</div>
            <h2 style="font-family:Georgia,serif;font-weight:400;font-size:22px;line-height:1.25;margin:0 0 12px;color:#2A1F1A;">${esc(s.title)}</h2>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${c.tint};border-radius:8px;margin-bottom:12px;">
              <tr>
                <td style="padding:10px 14px;font-family:Helvetica,Arial,sans-serif;font-size:13.5px;line-height:1.5;color:#2A1F1A;">
                  <span style="font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${c.deep};">Why you'd care &nbsp;·&nbsp;</span>
                  ${esc(s.why_you_care)}
                </td>
              </tr>
            </table>
            <p style="margin:0 0 12px;font-family:Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.6;color:#5B4A40;">${safeBody(s.body)}</p>
            <a href="${base}signal-issue-${issueStr}.html#${esc(s.id)}" style="font-family:Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;color:${c.deep};text-decoration:none;border-bottom:2px solid ${c.soft};">Read the full story →</a>
          </td>
        </tr>`;
  }).join('');

  const quickHitRows = d.quick_hits.map((q, i) => `
              <tr><td style="padding:10px 0;${i < d.quick_hits.length-1 ? 'border-bottom:1px dashed #F0E2CF;' : ''}"><strong style="color:#2A1F1A;">${esc(q.lede)}</strong> ${safeBody(q.text)}</td></tr>`).join('');

  const replyMailto = `mailto:${d.reply_to}?subject=Signal%20%23${issueStr}%20%E2%80%94%20one%20word%20reply&body=One%20word%20on%20this%20week%27s%20issue%3A%20`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>Signal · Issue ${issueStr}</title>
<!--[if mso]>
<xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#FFF6E9;font-family:Helvetica,Arial,sans-serif;color:#2A1F1A;-webkit-font-smoothing:antialiased;">
<div style="display:none;font-size:1px;color:#FFF6E9;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(d.preview.map(p => p.title).join(' · '))}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFF6E9;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;">

        <tr>
          <td style="background-color:#E65525;background-image:linear-gradient(135deg,#E65525 0%,#D14418 100%);border-radius:18px;padding:24px 26px;color:#FFFFFF;" bgcolor="#E65525">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="vertical-align:bottom;">
                  <div style="font-family:Georgia,'Times New Roman',serif;font-size:40px;line-height:1;font-weight:400;color:#FFFFFF;letter-spacing:-1px;">Signal<span style="color:#F6B83F;">.</span></div>
                </td>
                <td align="right" style="vertical-align:bottom;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#FFFFFF;opacity:0.95;line-height:1.6;">
                  Issue ${issueStr}<br/>${esc(d.date_display)}<br/>${esc(d.read_minutes)}-min read
                </td>
              </tr>
            </table>
            <div style="margin-top:14px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.55;color:#FFFFFF;opacity:0.95;">${esc(d.tagline)}</div>
          </td>
        </tr>

        <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>

        <tr>
          <td style="background-color:#FFFFFF;border-radius:14px;padding:18px 22px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td width="50" style="vertical-align:top;padding-right:14px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr><td width="38" height="38" align="center" valign="middle" bgcolor="#E65525" style="background-color:#E65525;border-radius:19px;font-family:Georgia,serif;font-size:18px;color:#FFFFFF;">${esc(d.editor_name.slice(0,1).toUpperCase())}</td></tr>
                  </table>
                </td>
                <td style="vertical-align:top;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.55;color:#5B4A40;">
                  <div style="font-weight:700;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#2A1F1A;margin-bottom:4px;">From ${esc(d.editor_name)}</div>
                  ${esc(d.editor_note)}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>

        <tr>
          <td style="background-color:#FFFFFF;border-radius:14px;padding:18px 22px;">
            <div style="font-family:Georgia,serif;font-style:italic;font-size:14px;color:#B83E12;margin-bottom:10px;">— In this issue</div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:Helvetica,Arial,sans-serif;">${previewRows}
              <tr>
                <td style="padding-top:10px;font-size:12.5px;font-style:italic;color:#8C7D72;border-top:1px dashed #F0E2CF;">+ ${d.quick_hits.length} quick hits, one chart, and one fun thing involving a robot.</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td style="height:24px;line-height:24px;font-size:0;">&nbsp;</td></tr>
${storyBlocks}
        <tr><td style="height:24px;line-height:24px;font-size:0;">&nbsp;</td></tr>

        <tr>
          <td style="background-color:#FFFFFF;border-radius:14px;padding:22px 24px;">
            <h3 style="font-family:Georgia,serif;font-weight:400;font-size:20px;margin:0 0 12px;color:#2A1F1A;">Worth knowing in one sentence</h3>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.55;color:#5B4A40;">${quickHitRows}
            </table>
          </td>
        </tr>

        <tr><td style="height:14px;line-height:14px;font-size:0;">&nbsp;</td></tr>

        <tr>
          <td bgcolor="#4F8A5F" style="background-color:#4F8A5F;background-image:linear-gradient(135deg,#4F8A5F 0%,#2C7A7E 100%);border-radius:18px;padding:24px 26px;color:#FFFFFF;text-align:center;">
            <div style="display:inline-block;background-color:rgba(255,255,255,0.22);padding:5px 12px;border-radius:999px;font-family:Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">🏓 One fun thing</div>
            <h3 style="font-family:Georgia,serif;font-weight:400;font-size:22px;line-height:1.3;margin:0 0 10px;color:#FFFFFF;">${esc(d.fun_fact.title)}</h3>
            <p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.55;margin:0;color:#FFFFFF;opacity:0.95;">${esc(d.fun_fact.body)}</p>
          </td>
        </tr>

        <tr><td style="height:18px;line-height:18px;font-size:0;">&nbsp;</td></tr>

        <tr>
          <td style="background-color:#FFFFFF;border-radius:14px;padding:22px 24px;text-align:center;">
            <div style="font-family:Georgia,serif;font-style:italic;font-size:16px;color:#2A1F1A;margin-bottom:14px;">— ${esc(d.editor_name)} 👋 &nbsp; See you next Monday.</div>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
              <tr>
                <td style="padding:4px;"><a href="${replyMailto}" style="display:inline-block;padding:9px 14px;border-radius:999px;background-color:#FFF1E6;color:#B83E12;font-family:Helvetica,Arial,sans-serif;font-size:12.5px;font-weight:600;text-decoration:none;border:1px solid #FFE0CF;">Reply with one word</a></td>
                <td style="padding:4px;"><a href="${base}${esc(d.archive_url)}" style="display:inline-block;padding:9px 14px;border-radius:999px;background-color:#FFF1E6;color:#B83E12;font-family:Helvetica,Arial,sans-serif;font-size:12.5px;font-weight:600;text-decoration:none;border:1px solid #FFE0CF;">📰 Past issues</a></td>
                <td style="padding:4px;"><a href="mailto:?subject=You%20might%20like%20Signal&body=I%27ve%20been%20reading%20this%20weekly%20AI%20newsletter%20%E2%80%94%20you%27d%20probably%20like%20it." style="display:inline-block;padding:9px 14px;border-radius:999px;background-color:#FFF1E6;color:#B83E12;font-family:Helvetica,Arial,sans-serif;font-size:12.5px;font-weight:600;text-decoration:none;border:1px solid #FFE0CF;">↗ Forward</a></td>
              </tr>
            </table>
            <div style="margin-top:14px;padding-top:14px;border-top:1px dashed #F0E2CF;font-family:Helvetica,Arial,sans-serif;font-size:11.5px;color:#8C7D72;line-height:1.55;">
              <strong style="color:#2A1F1A;">Signal</strong> · Issue ${issueStr} · ${esc(d.date_display)} · ${d.sources_count} sources this week<br/>
              Built with care, served warm.
            </div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ---------- ARCHIVE rendering ----------
function renderIndex(issues) {
  const rows = issues.map(d => {
    const issueStr = String(d.issue).padStart(3, '0');
    const previewStr = d.preview.map(p => `${p.emoji} ${p.title}`).join(' · ');
    return `
        <a class="row" href="signal-issue-${issueStr}.html">
          <div class="meta">
            <span class="num">No. ${issueStr}</span>
            <span class="date">${esc(d.date_display)}</span>
          </div>
          <div class="preview">${esc(previewStr)}</div>
        </a>`;
  }).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Signal · Archive</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --bg:#FFF6E9;--card:#FFFFFF;--ink:#2A1F1A;--ink-soft:#5B4A40;--ink-mute:#8C7D72;
    --orange:#E65525;--orange-deep:#B83E12;--yolk:#F6B83F;
    --shadow:0 10px 24px -16px rgba(60,30,10,0.18),0 2px 6px -2px rgba(60,30,10,0.06);
  }
  *{box-sizing:border-box;}html,body{margin:0;padding:0;}
  body{background:var(--bg);color:var(--ink);font-family:"Inter",-apple-system,sans-serif;line-height:1.55;-webkit-font-smoothing:antialiased;}
  .wrap{max-width:680px;margin:0 auto;padding:36px 22px 64px;}
  .header{background:linear-gradient(135deg,#E65525,#D14418);color:#FFF;border-radius:22px;padding:26px 28px;box-shadow:var(--shadow);}
  .header .mark{font-family:"DM Serif Display",serif;font-size:42px;line-height:1;letter-spacing:-0.02em;}
  .header .mark span{color:var(--yolk);}
  .header .sub{margin-top:8px;font-size:14px;opacity:0.95;}
  h2.section{font-family:"DM Serif Display",serif;font-style:italic;font-size:22px;color:var(--orange-deep);margin:30px 0 14px;}
  .list{display:flex;flex-direction:column;gap:10px;}
  .row{display:block;background:var(--card);border-radius:14px;padding:18px 22px;text-decoration:none;color:inherit;box-shadow:var(--shadow);border-left:5px solid var(--orange);transition:transform 0.15s ease;}
  .row:hover{transform:translateY(-1px);}
  .row .meta{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;}
  .row .num{font-family:"DM Serif Display",serif;font-size:22px;color:var(--ink);}
  .row .date{font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink-mute);}
  .row .preview{font-size:14px;color:var(--ink-soft);line-height:1.5;}
  .empty{background:var(--card);border-radius:14px;padding:24px;text-align:center;color:var(--ink-mute);font-style:italic;box-shadow:var(--shadow);}
  footer{margin-top:32px;text-align:center;font-size:12px;color:var(--ink-mute);}
</style>
</head>
<body>
<div class="wrap">
  <header class="header">
    <div class="mark">Signal<span>.</span></div>
    <div class="sub">The archive — every issue, newest first.</div>
  </header>
  <h2 class="section">— Past issues</h2>
  <div class="list">${rows || '<div class="empty">No issues yet. Monday’s coming.</div>'}</div>
  <footer>Signal · A friendly weekly read on what actually moved in AI.</footer>
</div>
</body>
</html>`;
}

// ---------- MARKDOWN rendering (for Medium / Substack / Dev.to / LinkedIn) ----------
function inlineHtmlToMd(s) {
  if (s == null) return '';
  return String(s)
    .replace(/<em>/gi, '*').replace(/<\/em>/gi, '*')
    .replace(/<strong>/gi, '**').replace(/<\/strong>/gi, '**')
    .replace(/<br\s*\/?>/gi, '\n');
}

function renderMarkdown(d) {
  const issueStr = String(d.issue).padStart(3, '0');
  const base = d.base_url || '';
  const canonicalUrl = base ? `${base}signal-issue-${issueStr}.html` : `signal-issue-${issueStr}.html`;

  const previewLines = d.preview
    .map((p, i) => `- ${p.emoji} **${p.label} · 0${i+1}** — ${p.title}`)
    .join('\n');

  // Chart as a simple Markdown table
  const chartHeader = '| ' + d.chart.labels.join(' | ') + ' |';
  const chartSeparator = '|' + d.chart.labels.map(() => '---').join('|') + '|';
  const chartValues = '| ' + d.chart.values.map((v, i) =>
    i === d.chart.highlight_index ? `**${v}**` : String(v)
  ).join(' | ') + ' |';
  const chartBlock = `**${d.chart.title}**\n\n*${d.chart.caption}*\n\n${chartHeader}\n${chartSeparator}\n${chartValues}\n\n_(See the interactive chart on the [live page](${canonicalUrl}).)_`;

  const storyBlocks = d.stories.map(s => {
    const linkLine = s.link ? `\n\n[${s.link.label} →](${s.link.url})` : '';
    return `### ${s.kicker} — ${s.title}

> **Why you'd care** — ${s.why_you_care}

${inlineHtmlToMd(s.body)}${linkLine}

**More on this.** ${inlineHtmlToMd(s.more)}`;
  }).join('\n\n---\n\n');

  const quickHitLines = d.quick_hits.map((q, i) => {
    const linkSuffix = q.link ? ` [${q.link.label} →](${q.link.url})` : '';
    return `${i+1}. **${q.lede}** ${inlineHtmlToMd(q.text)}${linkSuffix}`;
  }).join('\n');

  return `# Signal · Issue ${issueStr}

> ${d.tagline}

*${d.date_display} · ${d.read_minutes}-min read*

---

**From ${d.editor_name}** — ${d.editor_note}

---

## In this issue

${previewLines}

Plus ${d.quick_hits.length} quick hits, one chart, and one fun thing.

---

## The chart of the week

${chartBlock}

---

## This week's three stories

${storyBlocks}

---

## Worth knowing in one sentence

${quickHitLines}

---

## One fun thing

**${d.fun_fact.title}**

${inlineHtmlToMd(d.fun_fact.body)}

---

*Signal — a friendly weekly read on what actually moved in AI. Issue ${issueStr} · ${d.date_display}.*

*Want to reply with one word? ${d.reply_to}*

---

> **For syndication:** This piece was originally published at ${canonicalUrl}. When importing to Medium, Substack, Dev.to, or any platform that supports it, set this URL as the canonical URL in the story settings — this preserves SEO and credits the original source.
`;
}

// ---------- main ----------
function main() {
  const arg = process.argv[2];
  const jsonPath = resolveJsonPath(arg);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  // Merge publish-time config (currently: base_url for absolute email links)
  const config = loadConfig();
  data.base_url = normalizeBaseUrl(data.base_url || config.base_url || '');

  const issueStr = String(data.issue).padStart(3, '0');

  const pageOut = path.join(DIR, `signal-issue-${issueStr}.html`);
  const emailOut = path.join(DIR, `signal-issue-${issueStr}.email.html`);
  const mdOut = path.join(DIR, `signal-issue-${issueStr}.md`);
  const indexOut = path.join(DIR, 'index.html');

  fs.writeFileSync(pageOut, renderPage(data));
  fs.writeFileSync(emailOut, renderEmail(data));
  fs.writeFileSync(mdOut, renderMarkdown(data));

  // Regenerate archive from all known issues
  const issues = fs.readdirSync(DIR)
    .filter(f => /^signal-issue-\d{3}\.json$/.test(f))
    .map(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')))
    .sort((a, b) => b.issue - a.issue);
  fs.writeFileSync(indexOut, renderIndex(issues));

  console.log(`✓ Rendered Issue ${issueStr}` + (data.base_url ? ` (links → ${data.base_url})` : ' (relative links — set base_url in signal.config.json after hosting)'));
  console.log(`  ${path.basename(pageOut)}`);
  console.log(`  ${path.basename(emailOut)}`);
  console.log(`  ${path.basename(mdOut)} (paste this into Medium / Substack / Dev.to)`);
  console.log(`  ${path.basename(indexOut)} (${issues.length} issue${issues.length===1?'':'s'} archived)`);
}

if (require.main === module) {
  try { main(); }
  catch (e) { console.error('✗ render.js failed:', e.message); process.exit(1); }
}

module.exports = { renderPage, renderEmail, renderMarkdown, renderIndex };
