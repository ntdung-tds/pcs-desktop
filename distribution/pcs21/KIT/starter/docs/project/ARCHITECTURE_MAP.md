# Architecture Map — discover, then fill with verified references
**State:** DEMO / UNVERIFIED. Do not infer a production architecture from this template.

## System context (C4 level 1 where useful)
- People/external systems: [name, role, trust boundary]
- Purpose and data categories: [non-sensitive / personal / confidential]
- Source evidence: [real code path, deployment identifier and observation date]

## Containers and responsibility
| Component | Responsibilities | Data source of truth | API/contract | Consumers | Trust boundary |
|---|---|---|---|---|---|
| web-ui | UI | none | application routes | users | browser/server |
| api | server-side authority | [choose DB] | [OpenAPI/schema] | web-ui, other clients | auth boundary |

## Contracts and cross-domain impact
When changing a provider, search consuming code, API routes, events, data schemas, permission checks and rollback. Trace `provides → consumes`; record observed references, not speculative edges. A generated import graph cannot prove behavioral compatibility.

## Deployment and recovery
- Environments: [dev, staging, production], exact owner and authority
- CI/tests: [commands and trusted evidence]
- Migration rollback and data restoration: [documented and tested plan]
- External integration and secret storage: [restricted records; no secrets in PCS]

## ADRs
Use `docs/adr/` only for material trade-offs; agents can propose alternatives. Approval is separate from code changes.
