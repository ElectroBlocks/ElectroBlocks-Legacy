"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serialport = require('serialport');
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * Helper function to determine if usb port is an arduino.
 *
 * @param port
 * @returns {boolean}
 */
function isArduino(port) {
    if (port.vendorId || port.productId) {
        return (port.vendorId === '2341' ||
            port.productId === '0043' ||
            port.vendorId === '0x2341' ||
            port.productId === '0x0043');
    }
    return false;
}
exports.arduinoConnectted$ = rxjs_1.interval(500).pipe(operators_1.switchMap(function () { return rxjs_1.from(serialport.list()); }), operators_1.map(function (usbs) { return usbs.filter(isArduino); }), operators_1.map(function (usbs) { return usbs.length > 0; }), operators_1.distinctUntilChanged(), operators_1.startWith(false));
//# sourceMappingURL=arduino_connected.js.map