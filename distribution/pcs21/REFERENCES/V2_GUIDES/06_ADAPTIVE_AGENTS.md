# 06. Adaptive Agent Engineering — quality first

## One root rule, domain knowledge on demand
`AGENTS.md` is a short operating map; `CLAUDE.md` provides a bridge, Cursor uses root AGENTS + optional `.cursor/rules/*.mdc`, Antigravity supports root AGENTS and `.agents/skills`. Agent may read any relevant file; mapping is a guide not an access restriction.

## Decision model
- **Small and local:** inspect relevant files, implement, verify. No obligatory long planning doc.
- **Cross module:** identify capability/flow, impacted service/API/DB/authorization/consumers; read Product & Architecture Maps and contracts selectively.
- **High risk/irreversible:** assess safety, ask for actual permission if missing, make reversible plan, test negative paths, preserve recovery.
- **Stale or conflicting docs:** inspect code and runtime; record discrepancy, propose correction; do not blindly trust old descriptions.

## Agent autonomy
Agents own technical methods and reasonable refactoring. They may deviate from recommended library/style if rationale/test quality improves outcome. Strict constraints only around legal/security/data/production/user-approved architecture decisions and outcomes.

## Coordination
One primary agent is a useful default, not a policy. Add subagents for independent exploration, unbiased review or separable modules; do not split a tightly coupled feature merely to show multi-agent usage. For parallel writers: isolated worktrees, stable contracts, source SHA, integration owner; do not share mutable state files.

## Cost is optional
Measure regression rate, accepted-outcome rate, post-review fixes, time to usable product, resume accuracy and safety misses. Token/cost can be tracked optionally; never drop necessary tests or reasoning merely to hit an artificial token ceiling.
