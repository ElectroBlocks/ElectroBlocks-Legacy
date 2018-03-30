const RX = require('rxjs/Rx');
const SerialPort = require('SerialPort');
const Delimiter = require('parser-delimiter');
const { DEBUG_TABLE_FILTER } = require('./constants');

const {Observable, BehaviorSubject} = RX;

/**
 * Observable of all usb ports
 */
const observableUSBPorts$ = Observable
    .interval(500)
    .flatMap(() => RX.Observable.fromPromise(SerialPort.list()))
    .distinctUntilChanged(null, (ports) => ports.length)
    .map(ports => ports.filter(port => isArduino(port)))
    .map(ports => ports.length > 0 ? ports[0].comName : undefined);


const subjectSerialOutput = new BehaviorSubject("");

const serialOutput$ = subjectSerialOutput.asObservable().share();

let serialPort = undefined;

function openSerialOpen() {

    return closeSerialPort()
        .flatMap(() => observableUSBPorts$)
        .take(1)
        .flatMap(usbPort => {

            return Observable.create(observer => {
                console.log('serial monitor');

                serialPort = new SerialPort(usbPort.toString(), {
                    autoOpen: true,
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
    if (serialPort == null) {
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
    'serialOutput$': serialOutput$.filter(data => data.toString().indexOf(DEBUG_TABLE_FILTER) === -1),
    'serialDebugOutput$': serialOutput$.filter(data => data.toString().indexOf(DEBUG_TABLE_FILTER) > -1),
    'openSerialPort': openSerialOpen,
    'closeSerialPort': closeSerialPort
};
