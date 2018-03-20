const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const RX = require('rxjs/Rx');
const SerialPort = require('SerialPort');
const menuTemplate = require('./menu_template');
const { APP_TITLE } = require('./constants');
let mainWindow;


/**
 * Observable of all usb ports
 */
const observableUSBPorts$ = RX.Observable
    .interval(500)
    .flatMap(() => RX.Observable.fromPromise(SerialPort.list()))
    .distinctUntilChanged(null, (ports) => ports.length);

/**
 * Observable of Arduino USB ports
 */
const arduinoUSBPorts$ = observableUSBPorts$.map(ports => ports.filter(port => isArduino(port)));

/**
 * Observable of Arduino USB ports, used mainly for bluetooth.
 */
const observableNonArduinoUSBPorts = observableUSBPorts$.map(ports => ports.filter(port => !isArduino(port)))

/**
 * This turns the on ready callback to an Obserable
 */
const appReady = RX.Observable.fromEventPattern(
    function add (h) {
        app.on('ready', h);
    },
    function remove (h) {
        app.on('ready', h);
    }
);

/**
 * This will create one main window once
 */
const appStart = appReady
    .take(1)
    .do(() => {
        mainWindow = new BrowserWindow({
            title: APP_TITLE,
            width: 1200,
            height: 800
        });
});

/**
 * This subscribes to ready and usb ports observable.  It will continue to get message from usb ports observable and update the menu.
 */
RX.Observable
    .combineLatest(appStart, arduinoUSBPorts$)
    .map(result => result[1] == undefined || result[1].length === 0 ? undefined : result[1][0])
    .subscribe((usb) => {
        menuTemplate[2].submenu[0].label = usb ? 'Arduino Ready \u2713' : 'Please Connect Arduino';
        app.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
    });


/**
 * Helper function to determine if usb port is an arduino.
 *
 * @param port
 * @returns {boolean}
 */
function isArduino(port) {
    return typeof port.manufacturer !== 'undefined' && port.manufacturer.indexOf('Arduino') > -1;
}
