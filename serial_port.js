const RX = require('rxjs/Rx');
const SerialPort = require('SerialPort');
const {Observable, BehaviorSubject} = RX;
const Readline = SerialPort.parsers.Readline;

/**
 * Observable of all usb ports
 */
const observableUSBPorts$ = Observable
    .interval(500)
    .flatMap(() => RX.Observable.fromPromise(SerialPort.list()))
    .distinctUntilChanged(null, (ports) => ports.length)
    .map(ports => ports.filter(port => isArduino(port)))
    .filter(ports => ports.length > 0)
    .map(ports => ports[0].comName);


const subjectSerialOutput = new BehaviorSubject("");

const serialOutput$ = subjectSerialOutput.asObservable();

let serialPort = undefined;

function openSerialOpen() {

    return closeSerialPort()
        .flatMap(() => observableUSBPorts$)
        .take(1)
        .flatMap(usbPort => {
            return Observable.create(observer => {

                serialPort = new SerialPort(usbPort, {autoOpen: true});
                serialPort.pipe(new Readline());
                serialPort.on('data', line => subjectSerialOutput.next(line));
                serialPort.on('close', () => {
                    console.log('Serial Port was closed')
                });

                serialPort.on('open', err => {
                    if (err) {
                        observer.error(err);
                        return;
                    }
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
    'serialOutput$': serialOutput$,
    'openSerialPort': openSerialOpen,
    'closeSerialPort': closeSerialPort
};
