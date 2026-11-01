# Agent handoff contract

**Project:** [id] · **Moment:** [id] · **Observed:** [time] · **Branch/SHA:** [verified]
**Outcome requested:** [user goal] · **Active item:** [ID and scope]
**Last completed:** [exact step, code/QA/evidence]
**Current step and next atomic action:** [precise instruction without prescribing implementation prematurely]
**Unresolved dependencies:** [source owner, API contract, blocked condition]
**Risks and permissions:** [safe scope, production gate, sensitive data, approval]
**What was NOT tested:** [avoid inferred PASS]
**How to resume:** `node tools/pcs.mjs resume`, verify PR/CI/runtime, inspect relevant product/architecture, then proceed.

Agent-to-agent handoff should transfer facts and references, not full chats. Avoid assigning conflicting writes to the same branch/file; use isolated branches/worktrees and review integration.
