const { openSerialPort, closeSerialPort, arduinoUSB$ } = require('./serial_port');
const RX = require('rxjs');
const axios = require('axios');
const fs = require('fs');
const Avrgirl = require('avrgirl-arduino');
const path = require('path');

const { Observable } = RX;

const ARDUINO_FILE = path.join('/','tmp', 'Arduino.cpp.hex');

/**
 * Writes the arduino code
 */
let writeArduinoHexFile = (code) => {
    if (fs.existsSync(ARDUINO_FILE)) {
        fs.unlinkSync(ARDUINO_FILE);
    }
    fs.writeFileSync(ARDUINO_FILE, code);
};

/**
 * This will upload the code to the server and write a hex file
 */
function createHexFile(code) {
    return Observable.fromPromise(axios.post('http://arduino-compile.noahglaser.net/upload-code/uno', code, {
        headers: {'Content-Type': 'text/plain'}
    }))
        .do(res => writeArduinoHexFile(res.data));
}

/**
 * Flashes the arduino
 */
function flashArduino() {
    return arduinoUSB$
        .filter(usbPort => usbPort)
        .map(usbPort => new Avrgirl({
            board: 'uno',
            port: usbPort,
            manualReset: true
        })).flatMap(avrgirl => Observable.create(observer => {
            avrgirl.flash(ARDUINO_FILE, (err) => {
                if (err) {
                    observer.error({'avr_girl': err});
                } else {
                    observer.next(undefined)
                }
                observer.complete();
            });
        }));
}

/**
 * Uploads the code to the Arduino.
 * @param code the code being uploaded
 * @return Observable
 */
let uploadCode = (code) => {

    return Observable.forkJoin(createHexFile(code), closeSerialPort())
        .take(1)
        .flatMap(() => flashArduino())
        .flatMap(() => openSerialPort())
        .do(() => fs.unlinkSync(ARDUINO_FILE))
        .map(() => undefined)
        .catch(err => Observable.of(err));

};

module.exports = {
    'uploadCode': uploadCode,
};