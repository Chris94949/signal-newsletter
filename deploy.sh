#!/usr/bin/env bash
#
# deploy.sh — one-command Signal deployment helper
#
# Usage:
#   bash deploy.sh                          # local commit only (run this first)
#   bash deploy.sh <github-repo-url>        # local commit + set remote + push
#
# Example:
#   bash deploy.sh https://github.com/yourname/signal-newsletter.git
#
# What it does:
#   1. Verifies git is installed.
#   2. Initializes the repo if needed (idempotent).
#   3. Stages all files (respecting .gitignore).
#   4. Commits with a sensible default message.
#   5. Sets branch to 'main'.
#   6. If a remote URL is provided, sets origin and pushes.

set -e

cd "$(dirname "$0")"

# 1. Check git
if ! command -v git >/dev/null 2>&1; then
  echo "✗ Git isn't installed. Install it via Xcode Command Line Tools:"
  echo "  xcode-select --install"
  echo "Then re-run this script."
  exit 1
fi

REPO_URL="${1:-}"
COMMIT_MSG="${2:-Signal update — $(date +%Y-%m-%d)}"

# 2. Init if needed
if [ ! -d .git ]; then
  echo "→ Initializing repository..."
  git init -q
else
  echo "→ Repository already initialized."
fi

# 3. Stage
echo "→ Staging files..."
git add .

# Show what's about to be committed (first 20 entries)
echo ""
echo "Files staged:"
git diff --cached --name-only | head -20 | sed 's/^/  /'
TOTAL=$(git diff --cached --name-only | wc -l | tr -d ' ')
echo "  ($TOTAL files total)"
echo ""

# 4. Commit (only if there's something to commit)
if git diff --cached --quiet; then
  echo "→ Nothing new to commit."
else
  echo "→ Committing: \"$COMMIT_MSG\""
  git commit -q -m "$COMMIT_MSG"
fi

# 5. Branch to main
git branch -M main

# 6. Remote + push (only if URL provided)
if [ -n "$REPO_URL" ]; then
  echo "→ Setting origin to $REPO_URL"
  if git remote | grep -q '^origin$'; then
    git remote set-url origin "$REPO_URL"
  else
    git remote add origin "$REPO_URL"
  fi

  echo "→ Pushing to origin/main (browser auth may pop up)..."
  git push -u origin main
  echo ""
  echo "✓ Pushed successfully."
  echo ""
  echo "Next:"
  echo "  1. Visit your repo on GitHub."
  echo "  2. Settings → Pages → Source: Deploy from a branch → Branch: main → Folder: / (root) → Save"
  echo "  3. Wait 30-90 seconds, then visit the green URL it shows you."
  echo "  4. Tell Claude that URL, and they'll set base_url and re-render."
else
  echo ""
  echo "✓ Local commit ready."
  echo ""
  echo "Next:"
  echo "  1. Create a public repo at https://github.com/new (name it whatever — e.g. 'signal-newsletter')."
  echo "     Do NOT initialize with README/license/gitignore — yours already exist."
  echo "  2. Copy the HTTPS clone URL GitHub shows you (ends in .git)."
  echo "  3. Re-run: bash deploy.sh <that-url>"
fi
