# Steam Web Shortcuts Icon Fix

This repository addresses a specific issue related to blank icons in Steam (web) shortcuts. Thes problem cannot be resolved by simply rebuilding the icon cache or setting "internet browser" as the default for .url extensions.

## Issue Description

The issue occurs when you have an external drive or folder for Steam apps, uninstall Steam, reinstall it, and reuse the previously installed contents from the external drive to avoid redownloading steamapps. In this situation, the "DefaultSteamInstallDIR"/steam/games folder does not get repopulated with .ico files of steamapps that were not redownloaded.

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

This repository provides a fix for the described issue. By addressing the lack of .ico files in the "DefaultSteamInstallDIR"/steam/games folder after reinstalling Steam, the blank icons for Steam (web) shortcuts can be resolved.

## Contributing

Contributions to enhance or address additional related issues are welcome. Please follow the guidelines outlined in the contributing documentation.

## License

This project is licensed under the [License Name] - see the [LICENSE](LICENSE) file for details.
