#!/usr/bin/env bash
# Beacon Momentum production deployment asset contract:
# The public Nginx virtual host serves /assets/ from the shared directory,
# while Vite emits the main site's hashed bundles into this application's build.
# Copy every emitted asset before the PM2 restart and verify index references.
set -euo pipefail

SOURCE_DIR="${1:-/var/www/beacon-momentum-www/dist/public/assets}"
DESTINATION_DIR="${2:-/var/www/beacon-shared-assets}"
INDEX_FILE="${3:-/var/www/beacon-momentum-www/dist/public/index.html}"

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "ERROR: source asset directory does not exist: $SOURCE_DIR" >&2
  exit 1
fi

if [[ ! -f "$INDEX_FILE" ]]; then
  echo "ERROR: built index file does not exist: $INDEX_FILE" >&2
  exit 1
fi

mkdir -p "$DESTINATION_DIR"
shopt -s nullglob
assets=("$SOURCE_DIR"/*)

if [[ ${#assets[@]} -eq 0 ]]; then
  echo "ERROR: no build assets were emitted to: $SOURCE_DIR" >&2
  exit 1
fi

copied=0
for asset in "${assets[@]}"; do
  [[ -f "$asset" ]] || continue
  install -m 0644 "$asset" "$DESTINATION_DIR/$(basename "$asset")"
  ((copied += 1))
done

if [[ $copied -eq 0 ]]; then
  echo "ERROR: no regular build asset files were copied" >&2
  exit 1
fi

mapfile -t referenced_assets < <(
  grep -oE '(src|href)="/assets/[^"]+"' "$INDEX_FILE" \
    | sed -E 's/^(src|href)="\/assets\///; s/"$//' \
    | sort -u
)

if [[ ${#referenced_assets[@]} -eq 0 ]]; then
  echo "ERROR: build index has no /assets/ references to verify" >&2
  exit 1
fi

for asset in "${referenced_assets[@]}"; do
  if [[ ! -s "$DESTINATION_DIR/$asset" ]]; then
    echo "ERROR: referenced build asset is missing or empty in shared directory: $asset" >&2
    exit 1
  fi
done

echo "Synchronized $copied build assets to $DESTINATION_DIR"
printf 'Verified public bundle: /assets/%s\n' "${referenced_assets[@]}"
