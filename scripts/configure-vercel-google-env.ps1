# Adds Google OAuth env vars to Vercel from local clasp credentials.
# Run after: clasp login --extra-scopes "https://www.googleapis.com/auth/spreadsheets"
# And enable Google Sheets API in GCP console.

$claspPath = Join-Path $env:USERPROFILE ".clasprc.json"
if (-not (Test-Path $claspPath)) {
  Write-Error "No .clasprc.json found. Run: npx clasp login --extra-scopes https://www.googleapis.com/auth/spreadsheets"
  exit 1
}

$tokens = (Get-Content $claspPath | ConvertFrom-Json).tokens.default

$vars = @{
  GOOGLE_OAUTH_CLIENT_ID = $tokens.client_id
  GOOGLE_OAUTH_CLIENT_SECRET = $tokens.client_secret
  GOOGLE_OAUTH_REFRESH_TOKEN = $tokens.refresh_token
}

Push-Location $PSScriptRoot\..

foreach ($entry in $vars.GetEnumerator()) {
  Write-Host "Setting $($entry.Key) on Vercel production..."
  $entry.Value | npx vercel env add $entry.Key production --force
}

Write-Host "Done. Redeploy with: npx vercel --prod"
Pop-Location
