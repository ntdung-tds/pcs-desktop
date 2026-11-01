# PCS Changelog

## 2.1.0 — 2026-10-31

**Major UX improvement:** no per-project Starter copy. A once-per-agent user-level skill/rule enables a one-sentence project start from SRS/outline. Agent bootstraps or safely adopts a workspace.

Added:
- Global installer with user-level adapters for Claude Code, Codex and Antigravity; Cursor User Rules onboarding.
- Offline source extraction for TXT/MD/DOCX and text PDFs, private original and extracted text, intake metadata + hash.
- New/reused-project bootstrap and first verified PCS checkpoint. Does **not** claim app is built or requirements are approved.
- Adaptive agent playbook, source-trust boundary, cross-module completion and evidence guidelines.
- Expanded local installer/bootstrap regression suite and clean-room verification report.

Retained: PCS v2 state engine, four-level completion model, full moments, internal chain checks, schemas, templates, existing user manual and historical guides under REFERENCES.

Known limits: Cursor needs one-time user UI configuration; vendor apps not run end-to-end here; offline script cannot generate full app, access private provider APIs or guarantee remote deployment; no OCR; local hash chain needs external trusted anchor for tamper-resistance.
