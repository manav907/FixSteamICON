# Steam Web Shortcuts Icon Fix

This repository addresses a specific issue related to blank icons in Steam (web) shortcuts. This problem cannot be resolved by simply rebuilding the icon cache or setting "internet browser" as the default for .url extensions or verifying game files.

There are easier solutions available, such as:

1.  Manually Changing the Icons: Manually changing the icons is tedious and provides only a temporary fix, as the problem will resurface as soon as a new desktop shortcut is created.
2.  Reinstalling the Games: Reinstalling 300+ GBs of games isn't a great idea, even if you attempt to use the old game files. Steam will waste a significant amount of time verifying installations and may still download some files that you already had.

## Issue Description

The issue occurs when you have an external library folder for Steam, uninstall Steam, reinstall it, and reuse the the external library folder to avoid redownloading steamapps. In this situation, the "DefaultSteamInstallDIR"/steam/games folder does not get repopulated with .ico files of steamapps that were not redownloaded.

## Reproducing the Issue

1. Have an external drive or folder for Steam apps.
2. Uninstall Steam.
3. Reinstall Steam
4. Go to Steam settings.
5. Open Storage -> use drop down to add the old steam library location
6. Close Steam Settings
7. Go to Library .> Right click on a game from the external steamapps folder -> Manage -> add desktop shorcut

Result: there is an blank desktop web shortcut for the said game
## Solution

This repository provides a fix for the described issue. By redownloading .ico files in the "DefaultSteamInstallDIR"/steam/games folder after reinstalling Steam, the blank icons for Steam (web) shortcuts can be resolved.

to resolve the isue follow these steps

1.  install npm https://nodejs.org/en/download
2.  ensure python is installed to path and reboot(important) https://www.python.org/downloads/
3.  run the install-dependencies.bat
4.  run the run-server.bat
5.  run fix steam.py - if this closes instantly you probably messed up steps 1-3
6.  run Rebuild_Icon_Cache.bat

the problem should be resolved now


## Credits

special thanks to @DoctorMcKay for the steam-pics-api - https://github.com/DoctorMcKay/steam-pics-api
and Shawn Brink for the convenient batch file for rebuilding icons cache - https://www.tenforums.com/tutorials/5645-rebuild-icon-cache-windows-10-a.html
