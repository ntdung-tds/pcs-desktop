# PCS v2.0 — Verification Report
**Date:** 2026-10-31 (UTC+07) · **Scope:** local/offline toolkit, NOT cloud or model-provider certification.

## Outcomes actually executed

| Test scope | Actual | Verdict |
|---|---|---|
| Node 22 built-in 31 automated tests (`node --test tools/pcs.test.mjs`) | 31 passed / 0 failed | PASS |
| Strict project/task/feature/flow/release invalid states | Rejected incorrect QA, missing provenance, acceptance gaps, bad dates, duplicate or cyclic dependencies | PASS for implemented checks |
| Security basics | Secret fields and obvious private-key patterns rejected in PCS state | PASS for implemented detection, not a complete DLP scanner |
| Local evidence | Missing/altered local proof rejected by SHA-256 | PASS |
| Feature/flow/release gates | Subtask acceptance did not imply feature, E2E or release acceptance | PASS |
| History / checkpoint | Immutable-named UUID snapshots, full state, per-moment hash, previous hash, read-only restore; corruption detected | PASS for local corruption scenarios |
| Writer coordination | Required `--expect` base revision; lock prevents concurrent cooperating CLI writers; stale base rejected | PASS locally; noncooperating editors remain a risk |
| Current Markdown projections | `CHECKLIST_MOMENT.md` and `PROJECT_PROGRESS.md` generated and verified | PASS |
| Clean install in a separate directory | Copied STARTER, verified, ran all 31 tests, modified task, checkpointed, verified, restore-previewed without write | PASS |
| JSON Schema syntax + demo data validation | Project, tasks, features, flows and releases validated with Draft 2020-12 and format checker | PASS |
| DOCX layout | 8 pages rendered to PNG and visually reviewed after removing duplicate legacy sections | PASS visual review |

## Deliberately NOT claimed
- **No Claude Code/Codex/Cursor/Antigravity live interface run.** Configuration layouts are based on cited provider docs; real discovery behavior depends on local versions/settings.
- **No live GitHub Issues/Projects connector sync, CI remote readback, cloud deployment, D1/R2 changes or production tests.** The bundled GitHub workflow is a template and not executed on a GitHub-hosted runner here.
- **Remote evidence cannot be proven by a local string plus metadata.** `VERIFIED` for URLs is a recorded attestation unless a trusted API/reviewer has actually checked it. Operators should not treat CLI validation as independent remote confirmation.
- **Local chain is not adversary-proof.** Someone able to rewrite every snapshot and the local pointer may fabricate a consistent history. Use protected Git, signed provenance or independently stored anchors for high-trust audit.
- **No quantitative token/cost or relative vendor productivity claim.** Quality-first comparison needs representative real tasks across models.
- **No guaranteed all-version support for any vendor UI.** Consult `GUIDES/07_PLATFORM_ADAPTERS.md` and official provider documentation.
- The CLI's secret detection targets obvious fields/patterns; follow secure secret storage and independent scanning for regulated projects.
- Atomic writes apply per file, not as a single filesystem transaction across all state/report files. Interrupted checkpoint may leave a partial set; `verify` detects inconsistencies and review/recovery is manual.

## V1 audit closure mapping

| Legacy audit issue | PCS v2.0 control | Residual limitation |
|---|---|---|
| ACCEPTED without QA and fake proof | Type-aware QA+approval+evidence; code requires PASS/provenance | Remote provider must be checked externally |
| Snapshot could not restore full past state | Moment carries full project/tasks/features/flows/releases | Restore preview intentionally read-only |
| Tail tamper passed simple comparison | Moment hashes, history chain and checkpoint integrity guard | Whole-chain rewrite needs protected external anchor |
| Weak dates/duplicate dependencies | Strict UTC date, duplicate ID/dependency and cycle checks; JSON schemas | CLI does not implement every JSON Schema keyword |
| Hard dependency overconstrained engineering | Typed soft/start/accept gates; hierarchy distinguishes task vs feature acceptance | Gate choice depends on correct project design |
| Concurrent agents may overwrite | Base revision, lock, atomic file write, isolated worktree recommendation | Only cooperating local CLI writers blocked by lock |

**Consequence:** PCS v2.0 Starter is ready for controlled evaluation/adoption, not an automated external compliance, release, acceptance or authorization authority.
