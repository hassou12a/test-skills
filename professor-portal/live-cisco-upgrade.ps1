$ErrorActionPreference = 'Continue'

try {
  $raw = $Host.UI.RawUI
  $size = $raw.WindowSize
  if ($size.Width -lt 150 -or $size.Height -lt 45) {
    $raw.WindowSize = New-Object System.Management.Automation.Host.Size(150, 45)
  }
} catch {}

Clear-Host
Write-Host '=== Cisco Packet Tracer Live Upgrade ===' -ForegroundColor Cyan
Write-Host ''
Write-Host '1) Checking current installation...' -ForegroundColor Yellow
$oldExe = 'C:\Cisco Packet Tracer 9.0.0\bin\PacketTracer.exe'
$oldUninstaller = 'C:\Cisco Packet Tracer 9.0.0\unins000.exe'

if (Test-Path $oldExe) {
  $v = (Get-Item $oldExe).VersionInfo.ProductVersion
  Write-Host "   Found current version: $v" -ForegroundColor Green
} else {
  Write-Host '   Old executable not found (continuing).' -ForegroundColor DarkYellow
}

Write-Host ''
Write-Host '2) Uninstalling old version...' -ForegroundColor Yellow
if (Test-Path $oldUninstaller) {
  Write-Host '   Uninstaller launched. Complete prompts if shown...' -ForegroundColor Gray
  $p = Start-Process -FilePath $oldUninstaller -PassThru
  $p.WaitForExit()
  Write-Host '   Uninstall step finished.' -ForegroundColor Green
} else {
  Write-Host '   Uninstaller not found, skipping uninstall.' -ForegroundColor DarkYellow
}

Write-Host ''
Write-Host '3) Opening official Cisco NetAcad download page...' -ForegroundColor Yellow
$downloadPage = 'https://www.netacad.com/resources/lab-downloads?courseLang=en-US'
Start-Process $downloadPage
Write-Host '   Sign in, download latest Packet Tracer installer to Downloads.' -ForegroundColor Gray

Write-Host ''
Write-Host '4) Waiting for installer in Downloads...' -ForegroundColor Yellow
$downloads = Join-Path $env:USERPROFILE 'Downloads'
$installer = $null
while (-not $installer) {
  $installer = Get-ChildItem $downloads -File -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match 'Packet\s*Tracer|CiscoPacketTracer|PacketTracer' -and $_.Extension -eq '.exe' } |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1

  if (-not $installer) {
    Write-Host '   Installer not found yet... waiting 5s' -ForegroundColor DarkGray
    Start-Sleep -Seconds 5
  }
}

Write-Host "   Found installer: $($installer.FullName)" -ForegroundColor Green
Write-Host ''
Write-Host '5) Launching installer (run through setup wizard)...' -ForegroundColor Yellow
$setup = Start-Process -FilePath $installer.FullName -PassThru
$setup.WaitForExit()
Write-Host '   Installer closed.' -ForegroundColor Green

Write-Host ''
Write-Host '6) Verifying installed Packet Tracer executable...' -ForegroundColor Yellow
$newExe = Get-ChildItem 'C:\' -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like 'Cisco Packet Tracer*' } |
  ForEach-Object { Join-Path $_.FullName 'bin\PacketTracer.exe' } |
  Where-Object { Test-Path $_ } |
  Select-Object -First 1

if ($newExe) {
  $newVersion = (Get-Item $newExe).VersionInfo.ProductVersion
  Write-Host "   Installed executable: $newExe" -ForegroundColor Green
  Write-Host "   Installed version: $newVersion" -ForegroundColor Green
  Write-Host ''
  Write-Host '7) Launching Packet Tracer...' -ForegroundColor Yellow
  Start-Process -FilePath $newExe
  Write-Host '   Done.' -ForegroundColor Cyan
} else {
  Write-Host '   Could not locate new Packet Tracer executable automatically.' -ForegroundColor Red
  Write-Host '   Please complete installer and then run this check again.' -ForegroundColor Red
}

Write-Host ''
Write-Host 'Live upgrade script finished. Keep this window open for logs.' -ForegroundColor Cyan
