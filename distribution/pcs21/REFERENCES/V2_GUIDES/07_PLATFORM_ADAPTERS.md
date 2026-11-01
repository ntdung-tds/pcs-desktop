# 07. Claude Code / Codex / Cursor / Antigravity — configuration notes (31 Oct 2026)

| Tool | Core entrypoint in STARTER | Scoped extension | Verification |
|---|---|---|---|
| Codex | `AGENTS.md` repository root, plus nested when appropriate | `.agents/skills/pcs-continuity/SKILL.md` when installed/discoverable | confirm observed instructions and run CLI |
| Claude Code | `CLAUDE.md` with `@AGENTS.md` import for compatibility; some newer releases also read `AGENTS.md` directly | Claude skills/rules where supported | confirm with `/memory` or `/context` in actual client; avoid duplicated persistent instructions |
| Cursor | Root `AGENTS.md`; Cursor may also load `CLAUDE.md` (keep bridge tiny) | `.cursor/rules/pcs-context.mdc` with `alwaysApply:false` | test rule selection in Agent UI; `.cursorrules` legacy |
| Antigravity | Root `AGENTS.md`/`GEMINI.md` | `.agents/skills/pcs-continuity/SKILL.md`; optional `.agents/rules` with valid trigger frontmatter | inspect active customizations in installed build |

Compatibility **grounded in provider documentation**, not a claim that all four desktop/CLI clients were run here. Providers change discovery and precedence; always review the official docs when upgrading and test one real task in each client.

## Do not overconfigure
No duplicate full prompt in each vendor adapter, no auto-running costly subagents, no forced deep architecture reading for simple fixes, no agent-specific “do everything” rule. Use Skills when a multi-step procedure really adds value.
