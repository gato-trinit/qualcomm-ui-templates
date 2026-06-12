#!/usr/bin/env bash
#
# Runs a package-manager action in every templates/* directory concurrently.
#
# Each template is a standalone package (this repo is not a monorepo), so
# commands are independent and run in parallel. Each command runs from the
# template's own directory using the package manager pinned in that template's
# package.json "packageManager" field, dispatched through Corepack so the exact
# pinned version is used. Per-template output is buffered to a temp file and
# printed once that command finishes, keeping the concurrent logs readable
# instead of interleaved.

set -uo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
repo_root="$(dirname "$script_dir")"

usage() {
  echo "Usage: $(basename "$0") <build|install|lint|update-pnpm>" >&2
}

if [ "$#" -ne 1 ]; then
  usage
  exit 2
fi

action="$1"

case "$action" in
  build)
    start_message="Building"
    success_message="built"
    ;;
  install)
    start_message="Installing"
    success_message="installed"
    ;;
  lint)
    start_message="Linting"
    success_message="linted"
    ;;
  update-pnpm)
    start_message="Updating pnpm for"
    success_message="updated"
    ;;
  *)
    usage
    exit 2
    ;;
esac

cd "$repo_root"

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

    case "$action" in
      install)
        if [ "$pm" = "pnpm" ]; then
          # Without a TTY, pnpm aborts rather than prompting before purging an
          # unexpected node_modules dir. Auto-confirm so non-interactive runs proceed.
          corepack pnpm --config.confirm-modules-purge=false install
        else
          corepack "$pm" install
        fi
        ;;
      build|lint)
        corepack "$pm" run "$action"
        ;;
      update-pnpm)
        corepack use pnpm@latest
        ;;
    esac
  ) >"$log_dir/$name.log" 2>&1 &

  pids+=("$!")
  names+=("$name")
done

if [ "${#pids[@]}" -eq 0 ]; then
  echo "No templates with a package.json found." >&2
  exit 1
fi

echo "$start_message ${#pids[@]} templates concurrently..."

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

echo "All ${#pids[@]} templates $success_message successfully."
