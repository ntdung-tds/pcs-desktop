# 09. Đánh giá chất lượng PCS trên tác vụ thật

## Benchmark (ưu tiên chất lượng)
Choose representative tasks: typo/UI; backend; cross-domain feature; schema migration; auth/IDOR; failed contract; stale architecture; partial completion; chat handoff; concurrent writers; release rollback. Fix starting SHA, environment, user requirements, allowed tools and acceptance oracle. Run repeated trials to reduce variability.

Primary: functional correctness, E2E completeness, security regressions, architecture quality, acceptance rate, resume accuracy, human interventions and maintainability. Secondary: time, tokens, operating cost. No invented savings or performance figures.

## Maturity
- Level 0: ad hoc prompts and unverifiable checkbox.
- Level 1: minimal project map/task + CLI checkpoint.
- Level 2: feature/flow gates + QA + branch review + evidence.
- Level 3: provider-backed sync, protected branch, signed external anchoring, reliable recovery, risk-aware security review.

Never claim Level 3 based on offline validator alone. Improve agent prompts only when observed failures recur; prefer adding a test or schema constraint when the rule can be enforced mechanically.
