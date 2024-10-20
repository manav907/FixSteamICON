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

1.  Install npm - just follow the on screen instructions and install as normal. - https://nodejs.org/en/download
2.  ensure python is installed to path and reboot(important) - There are menue options available by selecting advanced/customize installation during installation. Ensure that the following are ticked.
3.  run the install-dependencies.bat - Note: you may encounter Microsoft Defender SmartScreen prompt. to get past it simply click on the "more info" text to proceed.
4.  run the run-server.bat
5.  run fix steam.py and select "DefaultSteamInstallDIR" location - if this closes instantly you probably messed up steps 1-3 - they default path should be "C:\Program Files (x86)\Steam"
6.  run Rebuild_Icon_Cache.bat

the problem should be resolved now.

The following should provide a reffrence to the installation options they are in order but incomplete steps.

![vmconnect_2024-10-21_00-55-08](https://github.com/user-attachments/assets/bf56220e-0370-4aea-93b5-b40178da5a3c)
![vmconnect_2024-10-21_00-55-18](https://github.com/user-attachments/assets/bf05ee2f-cd0f-446e-9344-96edc76bfbb0)
![vmconnect_2024-10-21_00-55-27](https://github.com/user-attachments/assets/77619fa1-b5a5-407b-9ab8-025718a43179)
![vmconnect_2024-10-21_00-55-47](https://github.com/user-attachments/assets/8e6e0475-637e-463a-99fb-63a44d98a5d7)
![vmconnect_2024-10-21_00-56-15](https://github.com/user-attachments/assets/4f6f614c-998e-427d-be2f-0a61bbbfa361)
![vmconnect_2024-10-21_00-56-24](https://github.com/user-attachments/assets/9ee7dc03-9b1c-46f8-a612-38ada3c50cb1)
![vmconnect_2024-10-21_00-56-37](https://github.com/user-attachments/assets/72740e61-cc62-4c26-9532-e6c6a4b06d9c)
![vmconnect_2024-10-21_00-58-13](https://github.com/user-attachments/assets/34146aa7-5024-44be-86b7-fcf7868c00c9)
![vmconnect_2024-10-21_00-58-44](https://github.com/user-attachments/assets/51dd27be-8d05-479c-a315-0315a86f9d44)
![vmconnect_2024-10-21_00-58-49](https://github.com/user-attachments/assets/3fa849ae-3189-463b-893e-092052258acf)
![vmconnect_2024-10-21_00-58-55](https://github.com/user-attachments/assets/88bc25b9-41d2-446a-b1dd-bd24682b108b)
![vmconnect_2024-10-21_00-59-07](https://github.com/user-attachments/assets/c7bc4b0e-4212-49b1-a2f6-428cf1986a48)
![explorer_2024-10-21_01-02-27](https://github.com/user-attachments/assets/774d88c8-7395-43ab-80a1-85eded3a3540)
![vmconnect_2024-10-21_00-54-55](https://github.com/user-attachments/assets/93e3c3fc-0684-4747-81de-5aa043891f50)


## Credits

special thanks to @DoctorMcKay for the steam-pics-api - https://github.com/DoctorMcKay/steam-pics-api
and Shawn Brink for the convenient batch file for rebuilding icons cache - https://www.tenforums.com/tutorials/5645-rebuild-icon-cache-windows-10-a.html
