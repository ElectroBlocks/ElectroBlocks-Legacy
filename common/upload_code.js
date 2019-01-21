const { openSerialPort, closeSerialPort, arduinoUSB$ } = require('./serial_port');
const RX = require('rxjs');
const axios = require('axios');
const fs = require('fs');
const Avrgirl = require('avrgirl-arduino');
const path = require('path');

const { Observable } = RX;

const ARDUINO_FILE = path.join('/', 'tmp', 'Arduino.cpp.hex');

const ARDUINO_TEMP_FOLDER = path.join('/', 'tmp');

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
                    console.error('error flashing', err);
                    observer.error({'avr_girl': err});
                } else {
                    console.log('successfully flashed');
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
            .do(() => console.log('flashed arduino'))
            .flatMap(() => openSerialPort())
            .do(() => console.log('open serial after flashing'))
            .do(() => {
                console.log('before deleting');
                fs.unlinkSync(ARDUINO_FILE)
                console.log('deleted arduino file');
            })
            .map(() => {
                console.log('inside map');
            })
            .catch(err =>  {
                console.log('error');
                return Observable.of(err)
            });
    } catch(e) {
        console.log(e);
    }


};

module.exports = {
    'uploadCode': uploadCode,
};