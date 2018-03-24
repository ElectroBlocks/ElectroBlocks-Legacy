const RX = require('rxjs/Rx');
const SerialPort = require('SerialPort');

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
 * Helper function to determine if usb port is an arduino.
 *
 * @param port
 * @returns {boolean}
 */
function isArduino(port) {
    return typeof port.manufacturer !== 'undefined' && port.manufacturer.indexOf('Arduino') > -1;
}

module.exports = {
    'arduinoUSB$': arduinoUSBPorts$
};
