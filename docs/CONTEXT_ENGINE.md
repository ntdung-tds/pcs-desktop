# PCS Desktop 2.1 — Context-efficient operation (3.3 candidate)

Desktop retains its own PCS 2.1 canonical workspace and native distribution; **do not adopt PCS 3.2 STATE schema** or alter the hashed 103-file package. A new context packet is a read-only projection, never a second source of truth.

## Start/resume
1. Read `START_HERE.md` once. For installed native projects, read `pcs/current.json` and its pointed Moment first, then verify with `node tools/pcs.mjs resume` / `verify` when available.
2. Fetch only selected task, changed code, tests and dependent interfaces; avoid loading the distribution, handbook and unrelated files.
3. Optional: `node tools/pcs-desktop-context.mjs --root=/workspace/project --task=TASK-001 --limit=6`. Node is required only to use this helper. It reads the project locally and emits bounded metadata, not task free text.
4. Expand to risk, acceptance, QA and permission evidence from canonical project files before writing or marking completion. Do not infer Owner authorization from a summary. Preserve project-native checkpoint semantics.

## Contract for coding-agent handoff
Specify the task ID and current Moment, approved goal and scope, relevant paths, dependencies, acceptance criteria, source refs, git base/head, PR/commit links, tests actually run, unverified facts, blockers and next action. Do not transmit full tool logs or speculation when references suffice. Review security and approval gates independently.

## Measurement and E2E
Measure initial context tokens, output from tools, cache if provider exposes it, resume overhead and recovery accuracy. The 300–800 token bootstrap target is illustrative, not a hard cap. The new helper does NOT claim Desktop 2.1 native installer compatibility or cross-chat connector E2E; preserve and separately test those paths.
