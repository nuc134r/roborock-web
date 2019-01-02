Work in progress.

![ready - fully charged](https://user-images.githubusercontent.com/13202642/50579668-3e800900-0e58-11e9-8a44-4c6036448838.png)

Developed for use on devices not capable of running Mi Home app. No vacuum rooting needed. Other than S50 versions of Mi Vacuum can be supported if enough feedback is provided.

# Setting up
Node.js application must be hosted in the same LAN with the vacuum. Robot IP address and token are set in `config.json`. Token can be obtained with [this patched Mi Home app](http://www.kapiba.ru/2017/11/mi-home.html).

Vacuum must be assigned a static DHCP IP addess. Automatic discovery of the robot is possible and can be implemented with the APIs of [miio](https://github.com/aholstenson/miio) library (fill out an issue if you need it).

# Build instructions
// TODO ...build probably requires TypeScript compiler installation

# Localization
1. Copy `/i18n/en-US.json` file
2. Translate strings to the needed language
3. Save file under any name (please use ISO format like 'ru_RU', 'en_US' if you want to PR it)
4. Set locale file name in `config.json`

Locale contributions are welcome.
