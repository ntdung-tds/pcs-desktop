# 08. Nâng PCS v1.0 hoặc áp dụng vào repository đang hoạt động

1. Backup/copy PCS v1.0 without changing its moments; record last hash, Git SHA, CI, backlog and runtime. **Never silently rewrite legacy history.**
2. Put PCS v2 in a new branch/worktree; review diff of `AGENTS.md`, `CLAUDE.md`, CI and product code. Do not overwrite project policies or remove existing QA docs.
3. Map old fields: `project_id→id`, `quality.qa→qa.status`, `dependencies:[id]→[{id,gate:"soft"}]` as a conservative starting proposal, `external_ref`/tracking provenance, old moment IDs preserved under read-only legacy archive. Missing fields = UNKNOWN / NOT_RUN, never PASS.
4. Map existing tasks to `features`, `flows` and `releases` only where meaningful; use evidence-based IDs and owner approval. Historical TECH_DONE does not automatically become ACCEPTED.
5. Ensure Product Map and Architecture Map reflect **actual code and environments**, not a speculative wish list. Prior docs may be inconsistent with repo head; identify drift.
6. Run v2 tests and validator, make a new initial v2 Moment with explicit migration provenance, check CI on exact commit. Keep v1 read-only backup and link it from migration report.
7. Pilot on a single real cross-module feature and a controlled interrupted session before organization-wide adoption.

**For IAICT:** do not edit SRS until explicit `chốt`; do not export code to Drive until `bàn giao`; production and Cloudflare Access changes need separately verified authorization. This is a migration note, not an instruction to execute deployment.
