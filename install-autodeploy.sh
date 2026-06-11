#!/usr/bin/env bash
#
# install-autodeploy.sh — one-time installer for Signal's macOS auto-deploy.
#
# After running this once, every time render.js writes a new index.html
# (i.e. every Monday at 7am when the scheduled Claude task fires), macOS
# will automatically run `bash deploy.sh` and push to GitHub.
#
# To uninstall:
#   bash install-autodeploy.sh --uninstall
#
# To check it's working:
#   launchctl list | grep com.signal.autodeploy
#   tail -f .autodeploy.log

set -e

PLIST_NAME="com.signal.autodeploy.plist"
PROJECT_DIR="/Users/christienabraham/Documents/Claude/Projects/Interactive Newsletter"
SOURCE_PLIST="$PROJECT_DIR/$PLIST_NAME"
LA_DIR="$HOME/Library/LaunchAgents"
TARGET_PLIST="$LA_DIR/$PLIST_NAME"

if [ "$1" = "--uninstall" ]; then
  echo "→ Uninstalling Signal auto-deploy..."
  launchctl unload "$TARGET_PLIST" 2>/dev/null || true
  rm -f "$TARGET_PLIST"
  echo "✓ Auto-deploy removed. Future renders will need a manual 'bash deploy.sh'."
  exit 0
fi

if [ ! -f "$SOURCE_PLIST" ]; then
  echo "✗ Couldn't find $SOURCE_PLIST"
  exit 1
fi

if ! command -v git >/dev/null 2>&1; then
  echo "✗ git isn't installed. Install with: xcode-select --install"
  exit 1
fi

# Verify deploy.sh has an origin set (otherwise auto-deploy will fail every Monday)
cd "$PROJECT_DIR"
if [ -d .git ] && ! git remote | grep -q '^origin$'; then
  echo "⚠ Warning: no git origin is set yet. Run 'bash deploy.sh <your-repo-url>' once first,"
  echo "  then re-run this installer. Otherwise auto-deploy will commit but can't push."
  read -p "Continue installing anyway? (y/N) " ans
  [ "$ans" != "y" ] && exit 1
fi

mkdir -p "$LA_DIR"
cp "$SOURCE_PLIST" "$TARGET_PLIST"

# Unload if it was already loaded (idempotent)
launchctl unload "$TARGET_PLIST" 2>/dev/null || true
launchctl load "$TARGET_PLIST"

echo ""
echo "✓ Signal auto-deploy installed."
echo ""
echo "What it does:"
echo "  • Watches $PROJECT_DIR/index.html"
echo "  • When it changes (i.e. after render.js writes a new issue),"
echo "    bash deploy.sh runs automatically — within ~60 seconds."
echo "  • Logs go to: $PROJECT_DIR/.autodeploy.log"
echo ""
echo "Verify it's active:"
echo "  launchctl list | grep com.signal.autodeploy"
echo ""
echo "Test it:"
echo "  cd \"$PROJECT_DIR\""
echo "  node render.js     # any render fires the watcher"
echo "  tail -f .autodeploy.log   # watch the deploy happen"
echo ""
echo "To uninstall later:"
echo "  bash install-autodeploy.sh --uninstall"
