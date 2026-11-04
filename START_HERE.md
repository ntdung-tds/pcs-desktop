# PCS Desktop — AI quick start

**Use PCS with an AI coding assistant on your computer.** Start with your project request. This file is the minimal AI entrypoint; do not load all 103 legacy distribution files into chat context.

## Standard resume command

**"Tiếp tục dự án theo PCS, sử dụng trạng thái mới nhất trên GitHub."** is the canonical resume instruction. Use the already identified project workspace and repository, read the active `pcs/current.json` and its Moment (native 2.1), verify GitHub commit if connected, inspect only relevant changes and continue within granted permissions. If the repository is not known or ambiguous, ask for the project link or workspace path. Without GitHub access, report that progress remains local rather than claiming synchronization.

## Two ways to use Desktop

**A. Prompt-first (no PCS installation):** Ask your coding AI to read this file and work in your existing project workspace using **its available** terminal, file, Git and connector tools. It can plan, edit code, test, document and checkpoint. If it has no access to files, tests or GitHub, it must explain the limitation rather than claim completion. No PCS Python/Node installation is a prerequisite for this mode; your coding application may have its own requirements.

**B. Native integration (optional one-time setup):** If you want automatic agent rules, PCS project bootstrap/resume and the full PCS 2.1 starter tools, install the verified distribution from [`distribution/pcs21/`](distribution/pcs21/) following its README. This optional mode **does** require the environment/dependencies described there. Installation is not a prerequisite for Mode A.

## Optional Skill — no extra installation for prompt-first

Native PCS 2.1 already bundles **one** `pcs-continuity` Skill in `distribution/pcs21/KIT/starter/.agents/skills/pcs-continuity/SKILL.md`. It is available only when the host/installer actually installs or discovers it. Prompt-first mode works **without any Skill**; do not create a duplicate Skill for SRS or checklists. Use `docs/REQUIREMENT_CHANGE_CONTROL.md` only when a requirement changes; keep the original SRS untouched.

## Outcome-first agent autonomy

- Treat SRS/SOW as requirements for outcomes, business invariants, data boundaries, security, compatibility and acceptance. Example routes, schemas, DDL, tests and task decomposition are **implementation aids**, not automatically binding contracts.
- Use the actual local coding tools to choose solutions, refine internal contracts, split/combine tasks, refactor and test in proportion to risk **without asking for Owner approval on each routine design choice**. Preserve approved/public interfaces and required outcomes.
- OPEN decisions block only the dependent or irreversible action; safe independent work can continue. Production, IAM/secrets, sensitive data, destructive changes, financial actions or breaking approved contracts still require verified authority and real evidence.
- Keep existing PCS 2.1 state and distribution formats unchanged. Record real requirement deltas only in the project's `pcs/SRS_CHANGES.md`; never silently rewrite the baseline or claim unrun tests passed.

## Agent checklist

1. Identify the user's project and actual workspace/tools. Read the user's requirements, project instructions and current project state. For an existing PCS 2.1 workspace, prefer `pcs/current.json` and its current Moment, use the optional bounded context selector when available, and use the existing project `AGENTS.md` / `node tools/pcs.mjs resume` only when the toolkit is installed and applicable.
2. Inspect only relevant project files, architecture, dependencies, interfaces and tests. Never bulk-load the PCS distribution, handbook, archives, starter templates or unrelated code to the conversation.
3. Break work into meaningful deliverables; implement and verify using the coding tools actually available. State unrun tests clearly. The Owner reviews product outcomes; routine technical decisions are the agent's responsibility within granted permissions.
4. When GitHub is connected, use the **user-selected** repository, which can be **Public or Private**. If a new repository must be created and visibility is unspecified, ask the user to choose. Do not publish credentials, restricted data or private internal sources to Public, and check permissions before writes.
5. Save/checkpoint project progress in the **existing** project format, link actual commits/test results and identify an exact next action. Do not silently mix schemas from other PCS versions or fabricate a persistent checkpoint. If remote storage is unavailable, save an accessible portable handoff and report that GitHub is not synced.

## Read more only when needed

- [`PROMPT.md`](PROMPT.md) — starter prompt intended for the human user; an agent already following this entrypoint need not reread it.
- [`docs/REQUIREMENT_CHANGE_CONTROL.md`](docs/REQUIREMENT_CHANGE_CONTROL.md) — during an active task capture only delta in project `pcs/SRS_CHANGES.md`, deriving Task/Feature from native PCS; no SRS section requested from Owner, no SRS sync.
- [`docs/CONTEXT_ENGINE.md`](docs/CONTEXT_ENGINE.md) — on-demand context selection and handoff; optional `tools/pcs-desktop-context.mjs`.
- [`docs/STATE_OPERATIONS.md`](docs/STATE_OPERATIONS.md) — read when investigating a large 2.1 backlog, diffing snapshots or handling Public/Private data classification.
- [`distribution/pcs21/README.md`](distribution/pcs21/README.md) — native installation and verification.
- `distribution/pcs21/GUIDES/`, `REFERENCES/`, `runtime/`, `KIT/` — only when using, debugging or maintaining the installed PCS 2.1 toolkit.
- Tests, manifests and the handbook — only when validating the corresponding implementation or resolving an issue.

**The distribution is preserved intact** for reproducibility. Prompt-first mode is instruction-driven and cannot guarantee automatic bootstrap, cross-session persistence or system-wide agent activation without real tools/permissions.
