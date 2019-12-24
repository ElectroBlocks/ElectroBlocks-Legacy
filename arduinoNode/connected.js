"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require("serialport");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * Helper function to determine if usb port is an arduino.
 *
 * @param port
 * @returns {boolean}
 */
exports.isArduino = function (port) {
    if (port.vendorId || port.productId) {
        return (port.vendorId === '2341' ||
            port.productId === '0043' ||
            port.vendorId === '0x2341' ||
            port.productId === '0x0043');
    }
    return false;
};
exports.arduinoPorts$ = rxjs_1.interval(500).pipe(operators_1.switchMap(function () { return rxjs_1.from(SerialPort.list()); }), operators_1.map(function (usbs) { return usbs.filter(exports.isArduino)[0]; }), operators_1.distinctUntilChanged(function (prev, curr) {
    if (curr === prev) {
        return true;
    }
    if (curr === undefined && prev) {
        return false;
    }
    if (prev === undefined && curr) {
        return false;
    }
    return prev.comName === curr.comName;
}), operators_1.share());
//# sourceMappingURL=connected.js.map