const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const RX = require('rxjs/Rx');
const menuTemplate = require('./menu_template');
const { APP_TITLE } = require('./constants');
const { arduinoUSB$ } = require('./observable/serial_port');

let mainWindow;



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
    .combineLatest(appStart, arduinoUSB$)
    .map(result => result[1] == undefined || result[1].length === 0 ? undefined : result[1][0])
    .subscribe((usb) => {
        menuTemplate[2].submenu[0].label = usb ? 'Arduino Ready \u2713' : 'Please Connect Arduino';
        app.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
    });
