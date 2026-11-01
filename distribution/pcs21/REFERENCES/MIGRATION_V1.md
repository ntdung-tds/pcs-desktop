# Change log PCS 1.0 → PCS 2.0

**Preserved concepts:** Charter/Plan, risk/QA/release template, task status, checkpoint, append-only moments, GitHub CI, agent autonomy.

**Corrected after double audit:**
- v1 `ACCEPTED` with QA NOT_RUN and arbitrary evidence → v2 type-aware gate, local file hash evidence, required approval and code QA PASS.
- v1 summary-only moment → v2 complete state snapshot with read-only restoration preview.
- v1 weak history checking → v2 each moment hash + previous hash, explicitly not tamper-proof absent protected external anchor.
- v1 timestamp/dependency gaps → v2 strict UTC ISO validation, duplicate detection, soft/start/accept typed gates.
- v1 checkpoint concurrency → v2 base revision check + atomic file writes + lock, with recommendation for isolated worktrees. Does not guarantee against non-cooperating writers.
- v1 task-only → v2 Task → Feature → Business Flow → Release hierarchy.
- v1 forced universal context → v2 short AGENTS map, selective Product/Architecture/Contract reading.
- v1 partial platform instructions → v2 shared root instructions + Claude/Cursor/Antigravity adapters.

**Breaking format:** v1 JSON snapshots are NOT read by v2 validator. Archive old versions read-only and migrate verified facts deliberately. Do not auto-mark old DONE as accepted v2.
