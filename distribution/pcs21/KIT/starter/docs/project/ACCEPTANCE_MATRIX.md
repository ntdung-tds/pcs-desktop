# Acceptance by level — evidence over checkboxes

| Level | May be marked complete when | Never inferred from |
|---|---|---|
| Task TECH_DONE | bounded artifact exists and evidence verified for that scope | comment/plan alone |
| Task ACCEPTED | approved criteria + artifact-specific QA/review policy; code QA PASS | CI from other SHA |
| Component VERIFIED | contract/behavior tested in named environment | task accepted alone |
| Feature ACCEPTED | required tasks accepted + integration PASS + evidence + approval | one service unit test |
| Flow ACCEPTED | feature set accepted + valid end-to-end path PASS + evidence | all feature names merely present |
| Release APPROVED | critical flows, security, rollback, deploy plan and authorized approval | PR merge or staging smoke test |

QA for document/research tasks may be `NA` with recorded review; code tasks require QA PASS. External evidence recorded in PCS is **attested**, not automatically independently verified by this CLI. For regulated/high-risk projects, add signed human review and actual provider readback.
