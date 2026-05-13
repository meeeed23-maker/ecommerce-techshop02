@echo off
if "%1"=="lead" (
    git config user.name "meeeed23-maker"
    git config user.email "meeeed23@gmail.com"
    echo Switched to LEAD account
) else if "%1"=="reviewer" (
    git config user.name "mhamedachbani "
    git config user.email "mhamed.achbani@uit.ac.ma"
    echo Switched to REVIEWER account
) else (
    echo Usage: switch-git.bat {lead^|reviewer}
)
git config user.name
git config user.email
