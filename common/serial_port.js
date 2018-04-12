const RX = require('rxjs');
const SerialPort = require('serialport');
const Delimiter = require('parser-delimiter');
const { DEBUG_TABLE_FILTER, DEBUG_BLOCK } = require('./constants');

const { Observable, BehaviorSubject } = RX;

/**
 * Observable of all usb ports
 */
const observableUSBPorts$ = Observable
    .interval(500)
    .flatMap(() => RX.Observable.fromPromise(SerialPort.list()))
    .distinctUntilChanged(null, (ports) => ports.length)
    .map(ports => ports.filter(port => isArduino(port)))
    .map(ports => ports.length > 0 ? ports[0].comName : undefined);

observableUSBPorts$
    .filter(usb => usb)
    .flatMap(usb => openSerialPort())
    .take(1)
    .subscribe(err => console.log('Opening Serial Port After Arduino Connected, err: ', err));

const subjectSerialOutput = new BehaviorSubject("");

const serialOutput$ = subjectSerialOutput.asObservable().share();

const serialDebugOutput$ = serialOutput$
                            .filter(data => data.toString().indexOf(DEBUG_TABLE_FILTER) > -1)
                            .map(data => data.toString().replace(DEBUG_TABLE_FILTER,'').split('_|_'));

const serialPrintOutput$ = serialOutput$
    .filter(data => data.toString().indexOf(DEBUG_TABLE_FILTER) === -1 && data.toString().indexOf(DEBUG_BLOCK) === -1);

const serialDebugBlockOutput$ = serialOutput$
    .filter(data => data.toString().indexOf(DEBUG_BLOCK) > -1)
    .map(data => data.toString().replace(DEBUG_BLOCK, '').trim());

let serialPort = undefined;

function openSerialPort() {

    return closeSerialPort()
        .flatMap(() => observableUSBPorts$)
        .take(1)
        .flatMap(usbPort => {

            return Observable.create(observer => {
                console.log('serial monitor');

                serialPort = new SerialPort(usbPort.toString(), {
                    autoOpen: true,
                    debug: true
                });
                const parser = serialPort.pipe(new Delimiter({ delimiter: '\n' }));

                parser.on('data', line => {
                    subjectSerialOutput.next(line)
                });
                serialPort.on('close', () => {
                    console.log('Serial Port was closed')
                });

                serialPort.on('open', err => {
                    if (err) {
                        observer.error(err);
                        return;
                    }
                    console.log('serial port open');
                    observer.next(undefined);
                    observer.complete();
                });
            });
        });
}


function closeSerialPort() {
    if (serialPort == null || !serialPort.isOpen) {
        return Observable.of(undefined);
    }

    return Observable.create(observer => {
        serialPort.close(err => {
            if (err) {
                observer.error(err);
            }
            else {
                observer.next(undefined);
            }
            observer.complete();
        })
    });

}

function sendContinueFunction() {
    if (serialPort !== null) {
        serialPort.write("s|");
    } else {
        console.log('SERIAL PORT NOT OPEN');
    }
}

function sendSerialMonitorMessage(word) {
    if (serialPort !== null && word && word.length > 0) {
        serialPort.write(word);
    } else {
        console.log('SERIAL PORT NOT OPEN OR WORD NOT DEFINED');
    }
}



/**
 * Helper function to determine if usb port is an arduino.
 *
 * @param port
 * @returns {boolean}
 */
function isArduino(port) {
    return typeof port.manufacturer !== 'undefined' && port.manufacturer.indexOf('Arduino') > -1;
}

module.exports = {
    'arduinoUSB$': observableUSBPorts$,
    'serialPrintOutput$': serialPrintOutput$,
    'serialDebugOutput$': serialDebugOutput$,
    'serialDebugBlockOutput$': serialDebugBlockOutput$,
    'openSerialPort': openSerialPort,
    'closeSerialPort': closeSerialPort,
    'sendContinueFunction': sendContinueFunction,
    sendSerialMonitorMessage
};
