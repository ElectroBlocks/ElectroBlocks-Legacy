"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usb_1 = require("./usb");
class Pin {
    constructor(pinNumber, type, state) {
        this.pinNumber = pinNumber;
        this.type = type;
        this.state = state;
    }
    usbCommand() {
        let pinState = Math.abs(this.state);
        if (this.type == PIN_TYPE.DIGITAL) {
            pinState = pinState == 0 ? Pin.LOW : Pin.HIGH;
        }
        return `${usb_1.USB_COMMAND_TYPES.MOVE}-${usb_1.USB_COMMAND_TYPES.PIN}-${this.type}:${this.pinNumber}:${pinState}${usb_1.USB_COMMAND_TYPES.END_OF_COMMAND}`;
    }
    setupCommandUSB() {
        return '';
    }
    makeCopy() {
        return new Pin(this.pinNumber, this.type, this.state);
    }
}
Pin.HIGH = 1;
Pin.LOW = 0;
exports.Pin = Pin;
var PIN_TYPE;
(function (PIN_TYPE) {
    PIN_TYPE["DIGITAL"] = "D";
    PIN_TYPE["ANALOG"] = "A";
})(PIN_TYPE = exports.PIN_TYPE || (exports.PIN_TYPE = {}));
;
var ARDUINO_UNO_PINS;
(function (ARDUINO_UNO_PINS) {
    ARDUINO_UNO_PINS["PIN_1"] = "1";
    ARDUINO_UNO_PINS["PIN_2"] = "2";
    ARDUINO_UNO_PINS["PIN_3"] = "3";
    ARDUINO_UNO_PINS["PIN_4"] = "4";
    ARDUINO_UNO_PINS["PIN_5"] = "5";
    ARDUINO_UNO_PINS["PIN_6"] = "6";
    ARDUINO_UNO_PINS["PIN_7"] = "7";
    ARDUINO_UNO_PINS["PIN_8"] = "8";
    ARDUINO_UNO_PINS["PIN_10"] = "10";
    ARDUINO_UNO_PINS["PIN_11"] = "11";
    ARDUINO_UNO_PINS["PIN_12"] = "12";
    ARDUINO_UNO_PINS["PIN_13"] = "13";
    ARDUINO_UNO_PINS["PIN_A0"] = "A0";
    ARDUINO_UNO_PINS["PIN_A1"] = "A1";
    ARDUINO_UNO_PINS["PIN_A2"] = "A2";
    ARDUINO_UNO_PINS["PIN_A3"] = "A3";
    ARDUINO_UNO_PINS["PIN_A4"] = "A4";
    ARDUINO_UNO_PINS["PIN_A5"] = "A5";
})(ARDUINO_UNO_PINS = exports.ARDUINO_UNO_PINS || (exports.ARDUINO_UNO_PINS = {}));
//# sourceMappingURL=pin.js.map