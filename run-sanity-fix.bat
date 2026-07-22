@echo off
cd /d "%~dp0"
echo === Sanity attribute count (before) ===
node scripts/count-sanity-attributes.mjs
echo.
echo === Strip legacy fields (dry-run) ===
node scripts/strip-legacy-page-fields.mjs
echo.
set /p CONFIRM=Apply fix to andres-prod? (y/N): 
if /i not "%CONFIRM%"=="y" exit /b 0
node scripts/strip-legacy-page-fields.mjs --apply
echo.
echo === Sanity attribute count (after) ===
node scripts/count-sanity-attributes.mjs
pause