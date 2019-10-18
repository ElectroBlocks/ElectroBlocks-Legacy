const { openSerialPort, closeSerialPort, arduinoUSB$ } = require('./serial_port');
const RX = require('rxjs');
const axios = require('axios');
const fs = require('fs');
const Avrgirl = require('avrgirl-arduino');
const path = require('path');
const log = require('electron-log');
const { Observable } = RX;

const ARDUINO_FILE = path.join('/', 'tmp', 'Arduino.cpp.hex');

const ARDUINO_TEMP_FOLDER = path.join('/', 'tmp');

const DEFAULT_ARDUINO_URL = 'http://arduino-compile.noahglaser.net/upload-code/uno';

let overRideUrl = undefined;

/**
 * Writes the arduino code
 */
let writeArduinoHexFile = (code) => {

    if (!fs.existsSync(ARDUINO_TEMP_FOLDER)) {
        fs.mkdirSync(ARDUINO_TEMP_FOLDER);
    }

    if (fs.existsSync(ARDUINO_FILE)) {
        fs.unlinkSync(ARDUINO_FILE);
    }
    fs.writeFileSync(ARDUINO_FILE, code);
};

/**
 * This will upload the code to the server and write a hex file
 */
function createHexFile(code) {
    return Observable.fromPromise(axios.post(getUploadUrl(), code, {
        headers: {'Content-Type': 'text/plain'}
    }))
        .do(res => writeArduinoHexFile(res.data));
}

/**
 * Gets the upload url
 *
 * @return {string}
 */
function getUploadUrl() {
    return overRideUrl || DEFAULT_ARDUINO_URL;
}

/**
 * Sets the upload url
 *
 * @param url
 */
function setUploadUrl(url) {
    overRideUrl = url;
}

function resetUploadUrl() {
    overRideUrl = undefined;
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
                    log.error('error flashing', err);
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

    try {
        return Observable.forkJoin(createHexFile(code), closeSerialPort())
            .take(1)
            .flatMap(() => flashArduino())
            .flatMap(() => openSerialPort())
            .do(() => fs.unlinkSync(ARDUINO_FILE))
            .map(() => undefined)
            .catch(err =>  {
                closeSerialPort();
                log.error('error' + JSON.stringify(err));
                return Observable.of(err)
            });
    } catch(e) {
        log.error(e);
        closeSerialPort();
    }


};

module.exports = {
    'uploadCode': uploadCode,
    'setUploadUrl': setUploadUrl,
    'resetUploadUrl': resetUploadUrl
};