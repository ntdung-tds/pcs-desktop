# PCS 2.1 — Test & limitations report

**Date:** 2026-10-31 · **Environment:** Linux isolated sandbox; Node.js 22.16.0, Python 3.13. **Scope:** reference CLI, file extraction, local project records, user configuration artifacts — no vendor application automation or cloud deployment.

## Test suites actually run

| Test group | Result | Scope |
|---|---|---|
| New PCS 2.1 CLI tests (`runtime/tools/pcs21.test.mjs`) | **17/17 PASS** | Global installer for 4 platforms with Cursor manual-rule caveat; existing rule preservation; reinstallation; new project; repo adopt; conflicts; security; resume; Vietnamese names; DOCX |
| Inherited PCS 2.0 state tests (`KIT/starter/tools/pcs.test.mjs`) | **31/31 PASS** | Task, feature, flow, release acceptance; state consistency; evidence; dependencies; moments and state restoration |
| Real IAICT IAM DOCX sample | PASS extraction/bootstrapping | Extracted ~67,900 chars from a 27-page DOCX into *temporary local sandbox*; initial PCS moment verification PASS. Source is NOT included in the toolkit and IAICT production/repo unchanged |
| Generated text-based PDF | PASS extraction/bootstrapping | PDF extractor with `pypdf`, no OCR, correct PCS local state |
| Clean-room packaged archive | **PASS** — extracted ZIP, SHA-256 verification (102 files), isolated user installation, SRS bootstrap, resume and local verify | Fresh directory install, verify and bootstrap against extracted ZIP |
| Word handbook | Rendered and visually inspected | 8-page handbook; no page overflow or clipped tables observed |

## Key controls verified

- Installer adds a versioned managed block and retains unrelated content in global rules.
- Claude/Codex/Antigravity Skill path artifacts generated; Cursor **not falsely claimed configured**, it needs one-time User Rules paste via UI.
- Script checks source existence/size/format; does not evaluate shell commands embedded in a document.
- Original and extracted source remain in `.pcs-private` ignored by Git; tracked intake uses SHA-256 and metadata, not raw content.
- `--adopt` preserves pre-existing code/docs and rejects an existing PCS or partial existing state; no silent overwrite.
- Initial checkpoint is marked analysis IN_PROGRESS; bootstrapped is not equivalent to project implemented or accepted.
- Follow-up checkpoint/resume/verify persists work across sessions; local hash-chain needs protected external anchor for tamper-resistance.

## Explicit limits / not tested

1. **Not a full autonomous developer by itself.** Bootstrap extracts source and writes an accountable project scaffold. The AI agent must still read/understand SRS, design, code, integrate, test, and obtain approvals. This has not been benchmarked end-to-end against real projects in all four vendor products.
2. **Not a universal zero-click installation.** A one-time installation is needed for the agent runtime; Cursor User Rules paste is currently manual. Remote/cloud sessions may require their own skill availability.
3. **No network and no credential access.** Installer neither creates GitHub repos nor connects Cloudflare/Drive nor deploys production. Such actions depend on authorized tools and independent release gates.
4. **Document limits.** No OCR, no embedded chart/diagram comprehension from DOCX/PDF text parsing, no full native Office formatting preservation. The agent must inspect non-text content when relevant.
5. **Security model.** Local hash chains and text labels are not cryptographic proof of remote acceptance or resistance against an attacker able to rewrite all local records. Threat models and CI/branch protection are necessary in real organizations.
6. **No quality guarantee based on one command.** The SRS may be incomplete, contradictory or require unavailable accounts/approvals. Agent must mark uncertainties, work safely, and report blockers.

## Vendor acceptance protocol suggested

For each of Claude Code, Codex, Cursor and Antigravity: first verify instructions/Skill are actually loaded; then provide the same SRS, request project delivery, inspect created code/quality and end-to-end flows, reset agent session mid-task and test resume. Measure user-accepted results, regression rate, security and handoff accuracy; expense/token is optional diagnostic, not a hard gate.
