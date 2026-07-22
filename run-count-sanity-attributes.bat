@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  if exist "%LOCALAPPDATA%\nvm\v22.16.0\node.exe" (
    set "NODE=%LOCALAPPDATA%\nvm\v22.16.0\node.exe"
  ) else (
    echo node not found on PATH and nvm default not found.
    echo Try: where node
    exit /b 1
  )
) else (
  set "NODE=node"
)

"%NODE%" scripts\count-sanity-attributes.mjs %*
exit /b %ERRORLEVEL%