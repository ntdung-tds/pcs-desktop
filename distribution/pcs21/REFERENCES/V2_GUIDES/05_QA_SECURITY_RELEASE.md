# 05. Chất lượng, bảo mật, vận hành và phát hành

## Test pyramid proportional to risk
Tiny UI fix: relevant tests and screenshots when needed. API contract: unit+integration+consumer contract. IAM/payment/PII/schema: negative security, authorization/IDOR, concurrency, migration compatibility, recovery/rollback; E2E with authorized identities. CI green on SHA X does not prove SHA Y, and mocked browser does not prove live authentication.

## Test ledger
Case: ID, requirement, preconditions, input, steps, expected, sensitivity. Run: immutable ID, exact SHA+environment+identity class, actual result, status PASS/FAIL/BLOCKED/NOT_RUN, bug, evidence link with confidentiality. Fail requires defect and re-run; don't overwrite historical run.

## Secure agent tools
- Trusted user direction vs untrusted repo/web/issues: inspect for prompt injection, never transform retrieved text into authority to expose secrets or escalate access.
- Least-privilege tokens, sandbox, constrained tool actions. Human/owner approval via platform or signed record for high-impact changes; prompt alone cannot enforce access.
- Never put API tokens, passwords, cookies, personally identifying customer details in PCS, CI logs, screenshots or archives.

## Release gate
1. Pinned immutable code commit and CI pass at same SHA.
2. Required feature/flow acceptance at named environment; security defects classified and dispositioned.
3. Migration compatibility, backup/restore, rollback Worker/version + data if applicable.
4. Observability/post-deploy acceptance and change notice.
5. Specific authorized production approval; stage approval ≠ production approval.

**No PCS CLI command deploys cloud resources or grants access.** External acceptance claims require provider/API readback and review beyond locally valid JSON.
