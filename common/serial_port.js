const RX = require('rxjs');
const SerialPort = require('serialport');
const { DEBUG_TABLE_FILTER, DEBUG_BLOCK } = require('./constants');

const { Observable, BehaviorSubject } = RX;

const serialListFunc = RX.Observable.bindCallback(SerialPort.list);

/**
 * Observable of all usb ports
 */
const observableUSBPorts$ = Observable
    .interval(500)
    .flatMap(() => serialListFunc())
    .map(portInfo => portInfo[1])
    .distinctUntilChanged(null, ports =>  ports.length)
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
                    baudRate: 9600,
                    parser: SerialPort.parsers.readline('\n')
                });

                serialPort.on('data', line => {
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


function openSerialPortIfClosed() {
    if (serialPort) {
        return Observable.of(undefined);
    }

    return openSerialPort();
}

function closeSerialPort() {
    if (serialPort == null || !serialPort.isOpen()) {
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
    if (port.vendorId || port.productId) {
        return port.vendorId== '2341' || port.productId == '0043' ||
            port.vendorId== '0x2341' || port.productId == '0x0043';
    }

    return false;
}

module.exports = {
    'arduinoUSB$': observableUSBPorts$,
    'serialPrintOutput$': serialPrintOutput$,
    'serialDebugOutput$': serialDebugOutput$,
    'serialDebugBlockOutput$': serialDebugBlockOutput$,
    'openSerialPort': openSerialPort,
    'closeSerialPort': closeSerialPort,
    'sendContinueFunction': sendContinueFunction,
    openSerialPortIfClosed,
    sendSerialMonitorMessage
};