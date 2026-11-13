#!/usr/bin/env bash
# Production build for the TG homepage.
# Source files stay as-is for editing; this writes an optimized copy to dist/:
#   - all stylesheets (in the order index.html links them) bundled + minified into css/site.min.css
#   - js/main.js minified
#   - SVGs optimized with SVGO
# Usage:  ./build.sh            build only
#         ./build.sh --deploy   build, then deploy dist/ to Vercel production
set -euo pipefail
cd "$(dirname "$0")"

OUT=dist
rm -rf "$OUT"
mkdir -p "$OUT/css" "$OUT/js"

# 1. Assets (images); the share-image source SVG isn't needed on the site
cp -R assets "$OUT/assets"
rm -f "$OUT/assets/og-image.svg"

# 2-5. Each page: bundle its stylesheets (in link order) into one minified file,
#      and swap its <link> tags for that bundle. index.html -> css/site.min.css,
#      other pages -> css/<page>.min.css
for PAGE in *.html; do
  NAME="${PAGE%.html}"
  BUNDLE=$([ "$NAME" = index ] && echo site || echo "$NAME")
  CSS_FILES=$(grep -o 'href="css/[^"]*\.css"' "$PAGE" | sed 's/href="//; s/"$//')
  cat $CSS_FILES | npx --yes esbuild@0.24.0 --loader=css --minify --log-level=warning > "$OUT/css/$BUNDLE.min.css"
  perl -0pe "s#(?:[ \t]*<link rel=\"stylesheet\" href=\"css/[^\"]+\">\n)+#  <link rel=\"stylesheet\" href=\"css/$BUNDLE.min.css\">\n#" "$PAGE" > "$OUT/$PAGE"
done

# 2b. Stamp the css/js links so phones never show an old cached copy after a deploy
STAMP=$(date +%Y%m%d%H%M%S)
perl -pi -e "s#(href=\"css/[^\"]+\.css|src=\"js/[^\"]+\.js)\"#\$1?v=$STAMP\"#g" "$OUT"/*.html

# 3. JS
for JS in js/*.js; do
  npx --yes esbuild@0.24.0 "$JS" --minify --log-level=warning --outfile="$OUT/$JS"
done

# 4. SVGs
npx --yes svgo@3.3.2 --quiet -f assets -o "$OUT/assets" --exclude og-image

# 5. Clean URLs: /pricing serves pricing.html
printf '{ "cleanUrls": true }\n' > "$OUT/vercel.json"

# 6. Point dist/ at the same Vercel project
if [ -f .vercel/project.json ]; then
  mkdir -p "$OUT/.vercel"
  cp .vercel/project.json "$OUT/.vercel/project.json"
fi

echo "Built $OUT/:"
du -sh "$OUT" | cut -f1
echo "  css/site.min.css  $(wc -c < "$OUT/css/site.min.css" | tr -d ' ') bytes"
echo "  js/main.js        $(wc -c < "$OUT/js/main.js" | tr -d ' ') bytes"

if [ "${1:-}" = "--deploy" ]; then
  (cd "$OUT" && npx --yes vercel@latest deploy --prod --yes)
fi
