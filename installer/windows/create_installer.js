const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'arduino-blockly-ide-win32-x64/'),
    authors: 'Noah Glaser',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows'),
    exe: 'arduino-blockly-ide.exe',
    setupExe: 'ArduinoBlocklyIDE.exe',
    description: 'An IDE for writing Arduino Code using blockly.',
    setupIcon: path.join(rootPath, 'icons', 'win-icon.ico')
  })
}