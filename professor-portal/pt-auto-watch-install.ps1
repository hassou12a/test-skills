$ErrorActionPreference='Continue'
Write-Host '=== Packet Tracer Auto Installer Watcher ===' -ForegroundColor Cyan
$oldUninstaller='C:\Cisco Packet Tracer 9.0.0\unins000.exe'
if(Test-Path $oldUninstaller){
  Write-Host 'Removing old Packet Tracer 9.0.0 ...' -ForegroundColor Yellow
  $p=Start-Process -FilePath $oldUninstaller -PassThru
  $p.WaitForExit()
  Write-Host 'Old version uninstall finished.' -ForegroundColor Green
} else {
  Write-Host 'Old uninstaller not found; skipping uninstall.' -ForegroundColor DarkYellow
}
$dl=Join-Path $env:USERPROFILE 'Downloads'
Write-Host "Watching folder: $dl" -ForegroundColor Yellow
Write-Host 'Go to NetAcad page and click Download now...' -ForegroundColor Gray
$installer=$null
while(-not $installer){
  $installer = Get-ChildItem $dl -File -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match 'packet\s*tracer|ciscopackettracer|packettracer' -and $_.Extension -in '.exe','.msi' } |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 1
  if(-not $installer){ Start-Sleep -Seconds 3 }
}
Write-Host "Installer detected: $($installer.FullName)" -ForegroundColor Green
Write-Host 'Launching installer...' -ForegroundColor Yellow
$setup=Start-Process -FilePath $installer.FullName -PassThru
$setup.WaitForExit()
Write-Host 'Installer finished.' -ForegroundColor Green
$newExe = Get-ChildItem 'C:\' -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like 'Cisco Packet Tracer*' } |
  ForEach-Object { Join-Path $_.FullName 'bin\PacketTracer.exe' } |
  Where-Object { Test-Path $_ } |
  Select-Object -First 1
if($newExe){
  $ver=(Get-Item $newExe).VersionInfo.ProductVersion
  Write-Host "Installed: $newExe" -ForegroundColor Green
  Write-Host "Version: $ver" -ForegroundColor Green
  Start-Process -FilePath $newExe
  Write-Host 'Packet Tracer launched.' -ForegroundColor Cyan
}else{
  Write-Host 'Could not auto-detect installed executable. Check setup wizard completion.' -ForegroundColor Red
}
