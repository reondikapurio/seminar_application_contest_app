@echo off
chcp 65001 > nul
title IoT Platform Shortcut Creator

echo ====================================================
echo   Creating Desktop Shortcut with Custom Icon...
echo ====================================================

set "PROJECT_ROOT=%~dp0"
if "%PROJECT_ROOT:~-1%"=="\" set "PROJECT_ROOT=%PROJECT_ROOT:~0,-1%"

set "TARGET_VBS=%PROJECT_ROOT%\run_all.vbs"
set "ICON_FILE=%PROJECT_ROOT%\frontend\public\favicon.ico"
set "SHORTCUT_NAME=Central IoT Platform"

set "VBS_SCRIPT=%TEMP%\create_shortcut_temp.vbs"

echo set WshShell = WScript.CreateObject("WScript.Shell") > "%VBS_SCRIPT%"
echo desktop = WshShell.SpecialFolders("Desktop") >> "%VBS_SCRIPT%"
echo set shortcut = WshShell.CreateShortcut(desktop ^& "\%SHORTCUT_NAME%.lnk") >> "%VBS_SCRIPT%"
echo shortcut.TargetPath = "%TARGET_VBS%" >> "%VBS_SCRIPT%"
echo shortcut.WorkingDirectory = "%PROJECT_ROOT%" >> "%VBS_SCRIPT%"
echo shortcut.IconLocation = "%ICON_FILE%" >> "%VBS_SCRIPT%"
echo shortcut.WindowStyle = 1 >> "%VBS_SCRIPT%"
echo shortcut.Save >> "%VBS_SCRIPT%"

cscript //nologo "%VBS_SCRIPT%"
del "%VBS_SCRIPT%"

echo ====================================================
echo   ✓ デスクトップにショートカットを自動生成しました！
echo ====================================================
echo.
pause