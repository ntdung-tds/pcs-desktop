# PCS release notes

## v2.0 — 2026-10-31

- Quality-first, outcome-based agent autonomy; cost/token optional.
- Task → Feature → Business Flow → Release acceptance levels.
- Product Map / Architecture Map / contracts and impact review.
- Codex, Claude Code, Cursor and Antigravity adapter files with one shared policy source.
- New dependency-free Node CLI: `resume`, `status`, `verify`, `checkpoint`, `restore-preview`; full state snapshots with per-moment SHA-256/previous-hash; safe read-only history preview; base-revision guards.
- Code artifact QA provenance, document-specific acceptance, evidence integrity, explicit owner approval and local secret detection.
- 31 offline tests, separate clean-install exercise and JSON Schema validation.
- 10 comprehensive focused guides, 31 optional templates, 8-page handbook and official source ledger.
- V1 data formats are **not backward compatible**; see `REFERENCES/MIGRATION_V1.md`. Do not rewrite historical V1 moments.

**Breaking changes:** state schema v2; `pcs/project.json` uses `id` rather than `project_id`; dependencies typed, QA object and multi-level records; checkpoint `--expect` means observed `base_revision` before a work batch.
