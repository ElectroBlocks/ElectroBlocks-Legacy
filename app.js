const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const RX = require('rxjs/Rx');
const { Observable } = RX;
const menuTemplate = require('./menu_template');
const { APP_TITLE } = require('./constants');
const { arduinoUSB$ } = require('./serial_port');
const { uploadCode } = require('./upload_code');

let mainWindow;

/**
 * This turns the on ready callback to an Observable
 */
const appReady = Observable.fromEventPattern(
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

let code = `void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(5000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
`;

let uploadedOnce = false;

/**
 * This subscribes to ready and usb ports observable.  It will continue to get message from usb ports observable and update the menu.
 */
Observable
    .combineLatest(appStart, arduinoUSB$)
    .map(result => result[1] == undefined || result[1].length === 0 ? undefined : result[1][0])
    .subscribe(usb => {
        menuTemplate[2].submenu[0].label = usb ? 'Arduino Ready \u2713' : 'Please Connect Arduino';
        app.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

        if (usb && !uploadedOnce) {
            uploadedOnce = true;
            uploadCode(code).take(1).subscribe(err => console.log('Finished', err));
        }

    });
