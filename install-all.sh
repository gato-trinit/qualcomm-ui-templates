#!/usr/bin/env bash
#
# Runs an install in every templates/* directory concurrently.
#
# Each template is a standalone package (this repo is not a monorepo), so
# installs are independent and run in parallel. Each install runs from the
# template's own directory using the package manager pinned in that template's
# package.json "packageManager" field, dispatched through Corepack so the exact
# pinned version is used. Per-template output is buffered to a temp file and
# printed once that install finishes, keeping the concurrent logs readable
# instead of interleaved.

set -uo pipefail

cd "$(dirname "$0")"

log_dir="$(mktemp -d)"
trap 'rm -rf "$log_dir"' EXIT

pids=()
names=()

for dir in templates/*/; do
  [ -f "$dir/package.json" ] || continue
  name="$(basename "$dir")"

  (
    cd "$dir" || exit 1

    # Derive the package manager (npm/pnpm/yarn) from the "packageManager"
    # field, e.g. "pnpm@11.3.0+sha512..." -> "pnpm". Corepack reads the same
    # field from this cwd to run the exact pinned version.
    pm="$(node -p "(require('./package.json').packageManager || 'npm').split('@')[0]")"

    # Without a TTY, pnpm aborts rather than prompting before purging an
    # unexpected node_modules dir. Auto-confirm so non-interactive runs proceed.
    if [ "$pm" = "pnpm" ]; then
      corepack pnpm --config.confirm-modules-purge=false install
    else
      corepack "$pm" install
    fi
  ) >"$log_dir/$name.log" 2>&1 &

  pids+=("$!")
  names+=("$name")
done

if [ "${#pids[@]}" -eq 0 ]; then
  echo "No templates with a package.json found." >&2
  exit 1
fi

echo "Installing ${#pids[@]} templates concurrently..."

failed=()
for i in "${!pids[@]}"; do
  name="${names[$i]}"
  if wait "${pids[$i]}"; then
    status="✓ ok"
  else
    status="✗ FAILED"
    failed+=("$name")
  fi

  echo
  echo "===== $name ($status) ====="
  cat "$log_dir/$name.log"
done

echo
if [ "${#failed[@]}" -gt 0 ]; then
  echo "Failed: ${failed[*]}" >&2
  exit 1
fi

echo "All ${#pids[@]} templates installed successfully."
