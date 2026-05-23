#!/usr/bin/env bash
# Rewrites relative paths in the Didomi design bundle so it works under the new
# Zeroheight/ repo layout. Idempotent — safe to re-run after any future
# Claude Design re-export. Run from repo root.
set -euo pipefail

cd "$(dirname "$0")/.."

# ── slides/ ────────────────────────────────────────────────────────────────
#  ../colors_and_type.css       → ../design-system/tokens/colors_and_type.css
#  ../assets/                   → ../design-system/assets/
for f in slides/templates.html slides/blank-layouts.html; do
  [ -f "$f" ] || continue
  sed -i '' \
    -e 's|"\.\./colors_and_type\.css"|"../design-system/tokens/colors_and_type.css"|g' \
    -e 's|"\.\./assets/|"../design-system/assets/|g' \
    "$f"
done

# ── previews/ ──────────────────────────────────────────────────────────────
#  ../colors_and_type.css       → ../design-system/tokens/colors_and_type.css
#  ../assets/                   → ../design-system/assets/
#  preview.css stays alongside (relative ref unchanged)
for f in previews/*.html; do
  [ -f "$f" ] || continue
  sed -i '' \
    -e 's|"\.\./colors_and_type\.css"|"../design-system/tokens/colors_and_type.css"|g' \
    -e 's|"\.\./assets/|"../design-system/assets/|g' \
    "$f"
done

# ── ui-kits/ ───────────────────────────────────────────────────────────────
#  ../../colors_and_type.css    → ../../design-system/tokens/colors_and_type.css
#  ../../assets/                → ../../design-system/assets/
for f in ui-kits/*/index.html; do
  [ -f "$f" ] || continue
  sed -i '' \
    -e 's|"\.\./\.\./colors_and_type\.css"|"../../design-system/tokens/colors_and_type.css"|g' \
    -e 's|"\.\./\.\./assets/|"../../design-system/assets/|g' \
    "$f"
done

# ── design-system/tokens/colors_and_type.css ──────────────────────────────
#  ./fonts/ → ../fonts/  (now one level up inside design-system/)
sed -i '' \
  -e 's|url("\./fonts/|url("../fonts/|g' \
  design-system/tokens/colors_and_type.css

echo "Path rewrite complete. Quick verify:"
echo "  slides/templates.html       → $(grep -c '../design-system/' slides/templates.html) refs"
echo "  previews/01-core-palette.html → $(grep -c '../design-system/' previews/01-core-palette.html) refs"
echo "  ui-kits/platform/index.html → $(grep -c '../../design-system/' ui-kits/platform/index.html) refs"
echo "  colors_and_type.css         → $(grep -c '../fonts/' design-system/tokens/colors_and_type.css) font refs"
