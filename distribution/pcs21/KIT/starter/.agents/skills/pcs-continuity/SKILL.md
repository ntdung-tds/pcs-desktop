---
name: pcs-continuity
description: Resume or hand off long-running software project work; validate PCS moments, product/architecture impact, cross-module acceptance, QA evidence and release gates. Use for project planning, multi-step feature work, interrupted sessions, blocked tasks or reviews.
---

# PCS project continuity

## Activate only when relevant
For cross-session work, significant task batches, release/acceptance and cross-module implementation: run `node tools/pcs.mjs resume --json` and inspect the active task. For a tiny typo, only read relevant files and follow ordinary repository policy.

## Understand impact, not just file edits
- Find the user-facing feature and business flow in `docs/project/PRODUCT_MAP.md`; current and proposed states differ.
- Explore `ARCHITECTURE_MAP.md` and affected contracts/callers/consumers; open deeper docs only if related.
- Determine whether a change is local, interface-affecting, data/security-affecting or release-affecting. Test accordingly.
- If docs disagree with code/runtime, report drift and gather evidence; do not blindly rewrite behavior to match outdated prose.

## Close the right level
- `TECH_DONE`: bounded implementation, with verified evidence.
- `ACCEPTED` task: artifact-specific tests/review and authorized approval; code needs QA PASS.
- Feature accepted: required tasks accepted, integration PASS, credible evidence and approval.
- Flow accepted: related features and E2E PASS.
- Release approved: critical flows, security, rollback and explicit release approval.

## Moment and handoff
1. Save task state, `last_completed_step`, `current_step`, `next_action`, blockers, evidence with provenance.
2. Validate JSON state. Use `node tools/pcs.mjs resume --json` for **base_revision before editing**, `node tools/pcs.mjs checkpoint --reason=handoff --expect=<base_revision>`.
3. `node tools/pcs.mjs verify`; report current SHA / test layer and unverified work. Do not claim remote evidence is verified solely because the JSON says so.
4. On restart verify actual repo/CI/runtime and open relevant issue before modifying risky systems. Never turn an old moment into a live approval.
