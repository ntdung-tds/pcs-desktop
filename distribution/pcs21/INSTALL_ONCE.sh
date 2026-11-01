#!/usr/bin/env sh
set -eu
DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
node "$DIR/runtime/tools/pcs21.mjs" install-agent --target=all
printf '\nPCS installed for Claude Code, Codex and Antigravity.\n'
printf 'Cursor needs ONE manual User Rule paste from ~/.pcs21/cursor-user-rule.txt.\n'
