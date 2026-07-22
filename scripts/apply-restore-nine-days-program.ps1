# Restores siteSettings.nineDaysProgram from pre-migration dump.
# Requires SANITY_API_TOKEN in .env.local
param(
  [switch]$Apply
)

$args = @("scripts/restore-nine-days-program.mjs")
if ($Apply) { $args += "--apply" }

node @args
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }