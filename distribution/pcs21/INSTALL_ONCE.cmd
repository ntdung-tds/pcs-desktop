@echo off
setlocal
node "%~dp0runtime\tools\pcs21.mjs" install-agent --target=all
if errorlevel 1 exit /b 1
echo PCS installed for Claude Code, Codex and Antigravity.
echo For Cursor, paste %%USERPROFILE%%\.pcs21\cursor-user-rule.txt into Settings - Rules - User Rules once.
